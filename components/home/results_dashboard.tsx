import React from 'react';
import { IRSCRadarChart } from '@/components/irsc_radar_chart';
import { MarkdownView } from '@/components/markdown_view';
import { Scores, Reports, Dimension, Language } from '@/interfaces/types';
import { UI_TEXT, DIMENSION_LABELS_MULTILINGUAL } from '@/constants/ui_text';

interface ResultsDashboardProps {
  scores: Scores;
  reports: Reports;
  activeTab: Dimension;
  setActiveTab: (tab: Dimension) => void;
  shareReport: () => void;
  currentReportId: string | null;
  steps: Dimension[];
  language: Language;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  scores,
  reports,
  activeTab,
  setActiveTab,
  shareReport,
  currentReportId,
  steps,
  language
}) => {
  const t = UI_TEXT[language];
  const dimensionLabels = DIMENSION_LABELS_MULTILINGUAL[language];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-6">

        <IRSCRadarChart scores={scores} />

        {/* Share Button */}
        {currentReportId && (
          <button
            onClick={shareReport}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Report
          </button>
        )}

        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/5 bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            {t.dimensionsHeader}
          </div>
          <div className="p-2 space-y-1">
            {steps.map((step) => {
              const score = scores[step as Exclude<Dimension, Dimension.FINAL>];
              const isActive = activeTab === step;
              const isGenerated = reports[step] !== undefined;

              let scoreColor = "text-slate-500";
              if (score >= 80) scoreColor = "text-emerald-400";
              else if (score >= 60) scoreColor = "text-yellow-400";
              else if (score > 0) scoreColor = "text-rose-400";

              return (
                <button
                  key={step}
                  onClick={() => isGenerated && setActiveTab(step)}
                  disabled={!isGenerated}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${isActive
                    ? 'bg-orange-500/10 text-orange-200 border border-orange-500/20 shadow-lg shadow-orange-900/10'
                    : isGenerated
                      ? 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                      : 'text-slate-700 cursor-not-allowed'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-orange-400 shadow-[0_0_8px_orange]' : 'bg-slate-600'}`}></div>
                    <span className={isActive ? 'font-semibold' : 'font-medium'}>
                      {step === Dimension.FINAL ? t.finalReport : dimensionLabels[step].split('(')[0]}
                    </span>
                  </div>

                  {score !== undefined && step !== Dimension.FINAL && (
                    <span className={`font-mono font-bold ${scoreColor}`}>
                      {score}
                    </span>
                  )}
                  {step === Dimension.FINAL && (
                    <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-bold">HQ</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Report View */}
      <div className="lg:col-span-9 h-[800px]">
        <div className="h-full glass-panel rounded-2xl border border-white/10 flex flex-col relative overflow-hidden">

          {/* Panel Header */}
          <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                {dimensionLabels[activeTab]}
                {activeTab === Dimension.FINAL && (
                  <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-bold text-white shadow-lg">{t.premium}</span>
                )}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">{t.generatedBy} • {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition" title="Copy">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative bg-[#0f1218]/50">
            {reports[activeTab] ? (
              <MarkdownView content={reports[activeTab]} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 space-y-4">
                <div className="w-12 h-12 border-2 border-slate-700 border-t-orange-500 rounded-full animate-spin"></div>
                <p className="font-mono text-sm animate-pulse">{t.generating}</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
