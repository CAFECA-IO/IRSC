
import fs from 'fs/promises';
import path from 'path';

export interface ReportData {
  id: string;
  companyName: string;
  reports: Record<string, string>;
  scores: Record<string, number>;
  language: string;
}

export async function fetchReportById(id: string): Promise<ReportData | null> {
  const outputDir = process.env.REPORT_OUTPUT_DIR || 'reports';
  const reportDir = path.join(process.cwd(), outputDir, id);

  try {
    await fs.access(reportDir);
  } catch {
    return null;
  }

  const reportFiles = [
    'ECQ.md', 'MMP.md', 'UEE.md', 'GDI.md',
    'TPM.md', 'SRR.md', 'ERE.md', 'GES.md', 'FINAL.md'
  ];

  const reports: Record<string, string> = {};
  let scores: Record<string, number> = {};
  let language = 'zh-TW';
  let companyName = '';

  for (const file of reportFiles) {
    const filePath = path.join(reportDir, file);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const parts = content.split('---');
      let body = content;

      if (parts.length >= 3) {
        body = parts.slice(2).join('---').trim();
        if (!companyName) {
          const meta = parts[1];
          const companyMatch = meta.match(/company:\s*(.+)/);
          if (companyMatch) companyName = companyMatch[1].trim();
        }
      }

      const dimensionName = file.replace('.md', '');
      reports[dimensionName] = body;

      const scoreMatch = body.match(/(?:總分|Total Score|Overall Score|Score|合計スコア|총점|評分)(?:[:\s]*|\**[:\s]*\**)(?:\[)?(\d+(?:\.\d+)?)(?:\])?/i);
      if (scoreMatch && scoreMatch[1]) {
        scores[dimensionName] = parseFloat(scoreMatch[1]);
      }

    } catch (e) {
      // ignore missing files
    }
  }

  return {
    id,
    companyName,
    reports,
    scores,
    language
  };
}
