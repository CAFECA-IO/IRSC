import React from 'react';
import { HistoryItem, Language, Scores } from '@/interfaces/types';
import { UI_TEXT } from '@/constants/ui_text';

interface RecentHistoryProps {
  history: HistoryItem[];
  loadFromHistory: (item: HistoryItem) => void;
  language: Language;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  history,
  loadFromHistory,
  language
}) => {
  const t = UI_TEXT[language];

  const calculateAverageScore = (s: Scores) => {
    const values = Object.values(s);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  };

  if (history.length === 0) return null;

  return (
    <div className="mt-16 w-full animate-[fadeIn_0.8s_ease-out]">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-slate-800 flex-1"></div>
        <h3 className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">{t.recentInquiries}</h3>
        <div className="h-px bg-slate-800 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.slice(0, 6).map((item) => {
          const avgScore = calculateAverageScore(item.scores);
          return (
            <div
              key={item.id}
              onClick={() => loadFromHistory(item)}
              className="group glass-panel rounded-xl p-5 text-left cursor-pointer hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10 border-transparent hover:border-orange-500/30"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-300 group-hover:text-orange-400 group-hover:bg-slate-700 transition-colors">
                  {item.companyName.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <span className={`block text-2xl font-bold tracking-tight ${avgScore >= 80 ? 'text-emerald-400' : avgScore >= 60 ? 'text-yellow-400' : 'text-white'}`}>{avgScore}</span>
                  <span className="text-[10px] text-slate-500 uppercase">Avg Score</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-lg font-bold text-slate-200 truncate group-hover:text-white">{item.companyName}</h4>
                <span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  {UI_TEXT[language].analysisTypes[item.analysisType || 'company']}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mb-2">{new Date(item.timestamp).toLocaleDateString()}</p>

              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-orange-400 font-medium flex items-center gap-1">
                  {t.load} &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
