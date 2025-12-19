import { GoogleGenAI } from "@google/genai";
import { Dimension, Language } from "@/interfaces/types";
import { PROMPTS } from "@/constants/prompts";
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Enhanced regex to capture integers and decimals (e.g., 46.5, 80.0)
const SCORE_REGEX = /(?:總分|Total Score|Overall Score|Score|合計スコア|총점|評分)(?:[:\s]*|\**[:\s]*\**)(?:\[)?(\d+(?:\.\d+)?)(?:\])?/i;

const extractScore = (text: string): number => {
  const match = text.match(SCORE_REGEX);
  if (match && match[1]) {
    const score = parseFloat(match[1]);
    return Math.round(score * 10) / 10;
  }
  return 0;
};

// Helper to strip markdown code blocks and whitespace
const cleanResponse = (text: string): string => {
  let cleaned = text;
  // Remove ```markdown ... ``` or ``` ... ```
  cleaned = cleaned.replace(/^```[a-z]*\n/i, '').replace(/```$/i, '');
  // Using regex to catch start/end more reliably if they exist
  cleaned = cleaned.replace(/```(?:markdown)?/gi, '');
  return cleaned.trim();
};

const getLanguageInstruction = (lang: Language): string => {
  switch (lang) {
    case 'zh-TW': return "Output Language: Traditional Chinese (繁體中文).";
    case 'en': return "Output Language: English.";
    case 'ja': return "Output Language: Japanese (日本語).";
    case 'ko': return "Output Language: Korean (한국어).";
    default: return "Output Language: Traditional Chinese.";
  }
};

const STRICT_PROTOCOLS = `
**STRICT IDENTITY & ANTI-HALLUCINATION PROTOCOLS:**
1. **Identity:** Audit the Target Company ONLY. Match the EXACT name. If financials are missing, DO NOT use a proxy/competitor.
2. **Missing Data:** If specific data is not found, output "N/A" and Score 0.
3. **Honesty:** NEVER fabricate numbers. NEVER use industry averages to fill gaps.
4. **Format:** Output strictly using Markdown Lists. Do not use tables.
5. **No Filler:** Output ONLY the report content. Do not include "Here is the report" or any intro/outro text. Start directly with the content.
`;

export async function saveReportToFile(content: string, type: string, payload: any): Promise<string> {
  const { companyName, reportId: providedId } = payload;
  const reportId = providedId || crypto.randomUUID();
  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const reportDir = path.join(process.cwd(), outputDir, reportId);

  await fs.mkdir(reportDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = payload.dimension ? `${payload.dimension}.md` : `${type}_${timestamp}.md`;
  const filePath = path.join(reportDir, filename);

  const fileContent = `---
id: ${reportId}
type: ${type}
company: ${companyName}
created: ${new Date().toISOString()}
---

${content}`;

  await fs.writeFile(filePath, fileContent, 'utf-8');

  // Update Global Index if it's a final report
  if (type === 'final_report') {
    const indexPath = path.join(process.cwd(), outputDir, 'index.json');
    let indexData: any[] = [];
    try {
      const existing = await fs.readFile(indexPath, 'utf-8');
      indexData = JSON.parse(existing);
    } catch {
      // index might not exist yet
    }

    const newItem = {
      id: reportId,
      companyName: companyName,
      timestamp: new Date().toISOString()
    };

    indexData.unshift(newItem);
    if (indexData.length > 50) indexData = indexData.slice(0, 50);

    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
  }

  return reportId;
}

export async function generateDimensionReport(
  ai: GoogleGenAI,
  model: string,
  companyName: string,
  dimension: Dimension,
  language: Language
): Promise<string> {
  // @ts-ignore
  const prompt = PROMPTS[dimension];
  if (!prompt) throw new Error(`Prompt for dimension ${dimension} not found`);

  const langInstruction = getLanguageInstruction(language);
  const fullPrompt = `${STRICT_PROTOCOLS}\n${langInstruction}\n\n**Target Company:** ${companyName}\n\n${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: { tools: [{ googleSearch: {} }] }
    });
    const text = response.text || "No response generated.";
    return cleanResponse(text);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(`Error generating ${dimension}:`, error);
    throw error;
  }
}

export async function generateFinalReportService(
  ai: GoogleGenAI,
  model: string,
  companyName: string,
  reports: Record<string, string>,
  language: Language
): Promise<string> {
  const finalPromptTemplate = PROMPTS.FINAL;
  const langInstruction = getLanguageInstruction(language);
  let fullPrompt = `${langInstruction}\n\n${finalPromptTemplate.replace("[Company Name]", companyName)}`;

  const dims = ['ECQ', 'MMP', 'UEE', 'GDI', 'TPM', 'SRR', 'ERE', 'GES'];
  dims.forEach(dim => {
    const content = reports[dim] || "No Data";
    const score = extractScore(content);
    // Inject score explicitly to help the model
    const enhancedContent = `**[${dim}] Extracted Score:** ${score}\n\n${content}`;
    fullPrompt = fullPrompt.replace(`[${dim}_CONTENT]`, enhancedContent);
  });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    const text = response.text || "Failed to generate final report.";
    return cleanResponse(text);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("Error generating Final Report:", error);
    throw error;
  }
}
