

import { fetchReportById } from '@/lib/report_utils';
import { MarkdownView } from '@/components/markdown_view';
import { IRSCRadarChart } from '@/components/irsc_radar_chart';
import { CollapsibleSection } from '@/components/collapsible_section';
import Link from 'next/link';


import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const report = await fetchReportById(id);

  if (!report) {
    return { title: 'Report Not Found' };
  }

  return {
    title: `${report.companyName} - IRSC Analysis`,
    description: `View the AI-powered due diligence report for ${report.companyName}.`,
    openGraph: {
      images: [
        {
          url: `/report/${id}/opengraph_image`,
          width: 1200,
          height: 630,
        }
      ],
    }
  };
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchReportById(id);

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Report not found.</div>;
  }

  // Calculate Average
  const dimensionScores: number[] = [];
  Object.keys(data.scores).forEach(k => {
    if (k !== 'FINAL') dimensionScores.push(data.scores[k]);
  });
  const avgScore = dimensionScores.length > 0
    ? Math.round(dimensionScores.reduce((a, b) => a + b, 0) / dimensionScores.length * 10) / 10
    : 0;



  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-amber-500 text-sm hover:underline">← Create Your Own Report</Link>
          <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-2">
            {data.companyName}
          </h1>
          <p className="text-slate-400">IRSC Intelligent Analysis Report</p>
        </div>

        {/* Score Card */}
        <div className="bg-[#1a1d24] rounded-2xl p-6 border border-white/10 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="text-6xl font-bold text-white mb-2">{avgScore}</div>
            <div className="text-sm text-slate-400 uppercase tracking-widest">Overall Score</div>
          </div>
          <div className="flex-1 w-full">
            <IRSCRadarChart scores={data.scores as any} />
          </div>
        </div>

        {/* Summary Content */}
        {data.reports['FINAL'] && (
          <div className="bg-[#1e2330] rounded-xl p-6 md:p-8 border border-white/10 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Investment Summary</h2>
            <MarkdownView content={data.reports['FINAL']} />
          </div>
        )}

        {/* Dimensions */}
        <div className="space-y-4">
          {Object.keys(data.reports).filter(k => k !== 'FINAL').map(dim => (
            <CollapsibleSection
              key={dim}
              title={dim}
              score={data.scores[dim]}
              content={data.reports[dim]}
            />
          ))}
        </div>

        <div className="mt-12 text-center border-t border-white/10 pt-8">
          <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition transform hover:-translate-y-1">
            Analyze Another Company with IRSC-AI
          </Link>
        </div>
      </div>
    </div>
  );
}
