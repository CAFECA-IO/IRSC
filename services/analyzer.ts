

import { Dimension, Language } from "@/interfaces/types";

// Enhanced regex to capture integers and decimals (e.g., 46.5, 80.0)
// Captures "Score: 85", "總分: 46.5", "Total Score: 90 / 100", etc.
const SCORE_REGEX = /(?:總分|Total Score|Overall Score|Score|合計スコア|총점|評分)(?:[:\s]*|\**[:\s]*\**)(?:\[)?(\d+(?:\.\d+)?)(?:\])?/i;

export const extractScore = (text: string): number => {
  // Try to find the pattern
  const match = text.match(SCORE_REGEX);
  if (match && match[1]) {
    // Parse float to handle 46.5, then round it for UI consistency (optional, but safer for charts)
    const score = parseFloat(match[1]);
    return Math.round(score * 10) / 10; // Keep 1 decimal place if needed, or Math.round(score)
  }
  return 0;
};

// Helper for polling
const pollStatus = async (reportId: string, dimension: string): Promise<string> => {
  const maxAttempts = 60; // 2 minutes (2s * 60)
  let attempts = 0;

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 2000)); // Wait 2s
    attempts++;

    try {
      const res = await fetch(`/api/v1/status/${reportId}?dimension=${dimension}`);
      if (res.status === 404) continue; // Not ready yet

      const data = await res.json();
      if (data.status === 'completed') {
        return data.result;
      } else if (data.status === 'error') {
        throw new Error(data.error || "Generation Failed");
      }
      // If processing, continue loop
    } catch (e) {
      console.warn("Polling error:", e);
    }
  }
  throw new Error("Generation Timeout");
};

export const generateReport = async (
  model: string,
  companyName: string,
  language: Language,
  reportId?: string,
  dimension?: string
): Promise<string> => {
  try {
    const response = await fetch('/api/v1/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'report',
        model,
        companyName,
        language,
        dimension,
        reportId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const { reportId: returnedId } = await response.json();

    // Poll for result
    return await pollStatus(returnedId, dimension || 'UNKNOWN');

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateFinalReport = async (
  companyName: string,
  reports: Record<Exclude<Dimension, Dimension.FINAL>, string>,
  language: Language,
  reportId?: string
): Promise<{ result: string; reportId: string }> => {
  try {
    const response = await fetch('/api/v1/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'final_report',
        companyName,
        reports,
        language,
        dimension: 'FINAL',
        reportId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const { reportId: returnedId } = await response.json();

    // Poll for result
    const result = await pollStatus(returnedId, 'FINAL');

    return { result, reportId: returnedId };

  } catch (error) {
    console.error("Gemini Final Report Error:", error);
    throw error;
  }
};

export const getRecentReports = async () => {
  const res = await fetch('/api/v1/recent');
  if (!res.ok) throw new Error("Failed to fetch recent");
  return res.json();
};

export const getReportDetails = async (id: string) => {
  const res = await fetch(`/api/v1/report/${id}`);
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
};
