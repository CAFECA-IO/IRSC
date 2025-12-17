import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Dimension, Language } from "@/interfaces/types";
import { generateDimensionReport, generateFinalReportService, saveReportToFile } from "@/services/reporter";
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Steps definition
const STEPS = [
  Dimension.ECQ, Dimension.MMP, Dimension.UEE, Dimension.GDI,
  Dimension.TPM, Dimension.SRR, Dimension.ERE, Dimension.GES
];

interface JobState {
  id: string;
  companyName: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  results: Record<string, string>;
  error?: string;
  timestamp: string;
}

const updateJobFile = async (jobId: string, data: Partial<JobState>) => {
  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const jobDir = path.join(process.cwd(), outputDir, jobId);
  await fs.mkdir(jobDir, { recursive: true });
  const jobPath = path.join(jobDir, 'job.json');

  let currentJob: JobState = {
    id: jobId,
    companyName: '',
    status: 'processing',
    progress: 0,
    currentStep: 'INIT',
    results: {},
    timestamp: new Date().toISOString()
  };

  try {
    const existing = await fs.readFile(jobPath, 'utf-8');
    currentJob = { ...currentJob, ...JSON.parse(existing) };
  } catch (e) {
    // New job
  }

  const updatedJob = { ...currentJob, ...data };
  await fs.writeFile(jobPath, JSON.stringify(updatedJob, null, 2), 'utf-8');
};

export async function POST(req: NextRequest) {
  try {
    const { companyName, language } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key is missing." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const jobId = crypto.randomUUID();

    // Initial Job State
    await updateJobFile(jobId, {
      id: jobId,
      companyName,
      status: 'processing',
      progress: 0,
      currentStep: 'STARTING',
      results: {}
    });

    // Start Background Process
    (async () => {
      try {
        const results: Record<string, string> = {};
        const model = process.env.MODEL || "gemini-2.0-flash-exp";

        for (let i = 0; i < STEPS.length; i++) {
          const step = STEPS[i] as Dimension;

          await updateJobFile(jobId, {
            currentStep: step,
            progress: Math.round((i / 9) * 100)
          });

          // Generate
          const text = await generateDimensionReport(ai, model, companyName, step, language);
          results[step] = text;

          // Save artifact
          await saveReportToFile(text, 'report', { companyName, language, dimension: step, reportId: jobId });

          // Update Job with partial result
          await updateJobFile(jobId, {
            results: { ...results } // Accumulate results in job file
          });

          // Small delay to be nice to API
          await new Promise(r => setTimeout(r, 1000));
        }

        // Final Report
        await updateJobFile(jobId, {
          currentStep: Dimension.FINAL,
          progress: 90
        });

        const finalText = await generateFinalReportService(ai, model, companyName, results, language);
        results[Dimension.FINAL] = finalText;

        await saveReportToFile(finalText, 'final_report', { companyName, language, dimension: Dimension.FINAL, reportId: jobId });

        // Complete
        await updateJobFile(jobId, {
          status: 'completed',
          progress: 100,
          currentStep: 'DONE',
          results: results
        });

      } catch (err: any) {
        console.error("Background Job Error:", err);
        await updateJobFile(jobId, {
          status: 'failed',
          error: err.message || "Unknown error"
        });
      }
    })();

    return NextResponse.json({ jobId, status: 'started' });

  } catch (error: any) {
    console.error("Analysis Request Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
