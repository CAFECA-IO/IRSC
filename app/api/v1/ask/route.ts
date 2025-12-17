
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Dimension, Language } from "@/interfaces/types";
import { PROMPTS } from "@/constants/prompts";
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const getLanguageInstruction = (lang: Language): string => {
  switch (lang) {
    case 'zh-TW':
      return "Output Language: Traditional Chinese (繁體中文).";
    case 'en':
      return "Output Language: English.";
    case 'ja':
      return "Output Language: Japanese (日本語).";
    case 'ko':
      return "Output Language: Korean (한국어).";
    default:
      return "Output Language: Traditional Chinese.";
  }
};

const STRICT_PROTOCOLS = `
**STRICT IDENTITY & ANTI-HALLUCINATION PROTOCOLS:**
1. **Identity:** Audit the Target Company ONLY. Match the EXACT name. If financials are missing, DO NOT use a proxy/competitor.
2. **Missing Data:** If specific data is not found, output "N/A" and Score 0.
3. **Honesty:** NEVER fabricate numbers. NEVER use industry averages to fill gaps.
4. **Format:** Output strictly using Markdown Lists. Do not use tables.
`;

async function saveReportToFile(content: string, type: string, payload: any): Promise<string> {
  const { companyName, reportId: providedId } = payload;
  const reportId = providedId || crypto.randomUUID();
  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const reportDir = path.join(process.cwd(), outputDir, reportId);

  await fs.mkdir(reportDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = payload.dimension ? `${payload.dimension}.md` : `${type}_${timestamp}.md`;
  const filePath = path.join(reportDir, filename);

  // Add metadata header
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
    } catch (e) {
      // index might not exist yet
    }

    const newItem = {
      id: reportId,
      companyName: companyName,
      timestamp: new Date().toISOString()
    };

    // Prepend new item
    indexData.unshift(newItem);

    // Keep top 50
    if (indexData.length > 50) {
      indexData = indexData.slice(0, 50);
    }

    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
  }

  return reportId;
}

const writeStatus = async (reportId: string, dimension: string, status: string, result?: string, error?: string) => {
  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const reportDir = path.join(process.cwd(), outputDir, reportId);
  await fs.mkdir(reportDir, { recursive: true });
  const statusPath = path.join(reportDir, `${dimension}_status.json`);

  const data = {
    status,
    result,
    error,
    timestamp: new Date().toISOString()
  };

  await fs.writeFile(statusPath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function POST(req: NextRequest) {
  try {
    const { type, ...payload } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key is missing." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Generate Report ID if not provided
    const reportId = payload.reportId || crypto.randomUUID();
    const dimension = type === 'report' ? payload.dimension : 'FINAL';

    // 1. Write Initial Status = processing
    await writeStatus(reportId, dimension, 'processing');

    // 2. Start Background Process (Fire and Forget)
    (async () => {
      try {
        let text = "";
        const model = process.env.MODEL || "gemini-2.0-flash-exp";

        if (type === 'report') {
          const { model, language, companyName } = payload;
          // @ts-ignore
          const prompt = PROMPTS[payload.dimension];
          const langInstruction = getLanguageInstruction(language);
          const fullPrompt = `${STRICT_PROTOCOLS}\n${langInstruction}\n\n**Target Company:** ${companyName}\n\n${prompt}`;

          const response = await ai.models.generateContent({
            model,
            contents: fullPrompt,
            config: { tools: [{ googleSearch: {} }] }
          });
          text = response.text || "No response generated.";

        } else if (type === 'final_report') {
          const { reports, language, companyName } = payload;
          const finalPromptTemplate = PROMPTS.FINAL;
          const langInstruction = getLanguageInstruction(language);
          let fullPrompt = `${langInstruction}\n\n${finalPromptTemplate.replace("[Company Name]", companyName)}`;

          fullPrompt = fullPrompt.replace("[ECQ_CONTENT]", reports.ECQ || "No Data");
          fullPrompt = fullPrompt.replace("[MMP_CONTENT]", reports.MMP || "No Data");
          fullPrompt = fullPrompt.replace("[UEE_CONTENT]", reports.UEE || "No Data");
          fullPrompt = fullPrompt.replace("[GDI_CONTENT]", reports.GDI || "No Data");
          fullPrompt = fullPrompt.replace("[TPM_CONTENT]", reports.TPM || "No Data");
          fullPrompt = fullPrompt.replace("[SRR_CONTENT]", reports.SRR || "No Data");
          fullPrompt = fullPrompt.replace("[ERE_CONTENT]", reports.ERE || "No Data");
          fullPrompt = fullPrompt.replace("[GES_CONTENT]", reports.GES || "No Data");

          const response = await ai.models.generateContent({
            model,
            contents: fullPrompt,
          });
          text = response.text || "Failed to generate final report.";
        }

        // Save Result to File
        await saveReportToFile(text, type, { ...payload, reportId });

        // Update Status to Completed
        await writeStatus(reportId, dimension, 'completed', text);

      } catch (err: any) {
        console.error("Background Generation Error:", err);
        await writeStatus(reportId, dimension, 'error', undefined, err.message);
      }
    })();

    // 3. Return immediately
    return NextResponse.json({ reportId, status: 'processing' });

  } catch (error: any) {
    console.error("Gemini API Request Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
