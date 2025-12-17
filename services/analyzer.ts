
import { Dimension, Language } from "@/interfaces/types";

// Enhanced regex to capture integers and decimals (e.g., 46.5, 80.0)
const SCORE_REGEX = /(?:總分|Total Score|Overall Score|Score|合計スコア|총점|評分)(?:[:\s]*|\**[:\s]*\**)(?:\[)?(\d+(?:\.\d+)?)(?:\])?/i;

export const extractScore = (text: string): number => {
  const match = text.match(SCORE_REGEX);
  if (match && match[1]) {
    const score = parseFloat(match[1]);
    return Math.round(score * 10) / 10;
  }
  return 0;
};

export interface JobStatus {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  results: Record<string, string>;
  error?: string;
  companyName: string;
}

export const startAnalysis = async (
  companyName: string,
  language: Language
): Promise<string> => {
  const response = await fetch('/api/v1/analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companyName, language }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to start analysis");
  }

  const { jobId } = await response.json();
  return jobId;
};

export const getJobStatus = async (jobId: string): Promise<JobStatus> => {
  const response = await fetch(`/api/v1/analysis/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to get job status");
  }
  return response.json();
};

export const getRecentReports = async () => {
  const res = await fetch('/api/v1/recent');
  if (!res.ok) throw new Error("Failed to fetch recent");
  return res.json();
};

export const getReportDetails = async (id: string) => {
  // Use the job status endpoint to get details since it has the same structure for persistence
  // Or keep legacy report endpoint if structure differs. 
  // For now, let's assume we can fetch via analysis/ID if it's a new job, 
  // but let's keep getReportDetails for existing reports if they used a different structure.
  // Actually, the new job.json structure contains all results, so we can probably just use getJobStatus.
  // But let's check legacy compatibility.

  // If we want to support sharing, we might need to ensure the structure matches what the UI expects for "Reports".
  // The UI expects { companyName, reports, scores, language }.
  // The job status sends { results: ... }. "results" map to "reports".

  const res = await fetch(`/api/v1/analysis/${id}`);
  if (res.ok) {
    const data = await res.json();
    // Transform to expected format if needed
    return {
      ...data,
      reports: data.results,
      // Scores need to be extracted on fly or saved. 
      // We can extract them on the client side since we have the text.
    };
  }

  // Fallback to legacy
  const legacyRes = await fetch(`/api/v1/report/${id}`);
  if (!legacyRes.ok) throw new Error("Failed to fetch report");
  return legacyRes.json();
};
