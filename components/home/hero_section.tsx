import React from 'react';
import { UI_TEXT } from '@/constants/ui_text';
import { Reports, Language } from '@/interfaces/types';

interface HeroSectionProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  analysisType: 'company' | 'stock' | 'fund';
  setAnalysisType: (type: 'company' | 'stock' | 'fund') => void;
  runAnalysis: () => Promise<void>;
  isProcessing: boolean;
  handleStop: () => void;
  currentStepIndex: number;
  reports: Reports;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  companyName,
  setCompanyName,
  analysisType,
  setAnalysisType,
  runAnalysis,
  isProcessing,
  handleStop,
  currentStepIndex,
  reports,
  language
}) => {
  const t = UI_TEXT[language];

  const renderProgress = () => {
    const progress = currentStepIndex === -1 && Object.keys(reports).length === 9
      ? 100
      : Math.max(5, ((currentStepIndex) / 9) * 100);

    return (
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 mb-6 tracking-tight">
        {t.heroTitle} <br />
        <span className="text-xl md:text-2xl font-medium text-slate-400">{t.heroSubtitle}</span>
      </h1>

      <div className="w-full max-w-2xl relative group z-10">
        {/* Analysis Type Selector */}
        <div className="flex justify-center mb-4">
          <div className="flex p-1 bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/10">
            {(['company', 'stock', 'fund'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setAnalysisType(type)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${analysisType === type
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {t.analysisTypes[type]}
              </button>
            ))}
          </div>
        </div>


        <div className="relative flex items-center bg-[#1e2330] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="flex-1 px-6 py-5 bg-transparent text-white text-lg placeholder:text-slate-500 focus:outline-none min-w-0"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isProcessing && runAnalysis()}
            disabled={isProcessing}
          />

          {isProcessing ? (
            <button
              onClick={handleStop}
              className="shrink-0 whitespace-nowrap mx-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-rose-600 text-white hover:bg-rose-700 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              {t.stopBtn}
            </button>
          ) : (
            <button
              onClick={runAnalysis}
              disabled={!companyName.trim()}
              className={`shrink-0 whitespace-nowrap mx-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${!companyName.trim()
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-white text-slate-900 hover:bg-orange-50 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
            >
              {t.analyzeBtn}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        {renderProgress()}
        <div className="flex justify-between mt-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
          <span>{t.init}</span>
          <span>{isProcessing ? `${t.step} ${currentStepIndex + 1} / 9` : t.ready}</span>
          <span>{t.synthesis}</span>
        </div>
      </div>
    </section>
  );
};
