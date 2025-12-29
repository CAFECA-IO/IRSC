import React from 'react';
import { useRouter } from 'next/navigation';
import { HistoryItem, Language } from '@/interfaces/types';
import { UI_TEXT } from '@/constants/ui_text';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  globalHistory: { id: string, companyName: string, timestamp: string, analysisType?: string }[];
  historyTab: 'local' | 'global';
  setHistoryTab: (tab: 'local' | 'global') => void;
  loadFromHistory: (item: HistoryItem) => void;
  deleteHistoryItem: (id: string, e?: React.MouseEvent) => void;
  clearHistory: () => void;
  language: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  globalHistory,
  historyTab,
  setHistoryTab,
  loadFromHistory,
  deleteHistoryItem,
  clearHistory,
  language
}) => {
  const router = useRouter();
  const t = UI_TEXT[language];

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#161b22] border-l border-white/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.historyHeader}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content: History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {/* History Tabs */}
          <div className="flex border-b border-white/10 mb-4">
            <button
              className={`flex-1 py-2 text-sm font-medium ${historyTab === 'local' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'}`}
              onClick={() => setHistoryTab('local')}
            >
              My History
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium ${historyTab === 'global' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400'}`}
              onClick={() => setHistoryTab('global')}
            >
              Global
            </button>
          </div>

          {/* Local History List */}
          {historyTab === 'local' && (
            history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
                <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm">{t.historyEmpty}</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="p-3 mb-2 rounded-lg bg-white/5 hover:bg-white/10 transition group relative">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-slate-200">{item.companyName}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-600 bg-black/20 px-1.5 py-0.5 rounded mt-2 inline-block">
                        {item.language}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded mt-2 ml-2 inline-block">
                        {UI_TEXT[language].analysisTypes[item.analysisType || 'company']}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => loadFromHistory(item)}
                        className="px-2 py-1 bg-amber-500/10 text-amber-500 text-xs rounded hover:bg-amber-500/20"
                      >
                        {t.load}
                      </button>
                      <button
                        onClick={(e) => deleteHistoryItem(item.id, e)}
                        className="px-2 py-1 text-slate-600 hover:text-rose-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          )}

          {/* Global History List */}
          {historyTab === 'global' && (
            globalHistory.length === 0 ? (
              <div className="text-slate-500 text-center py-8">Loading or Empty...</div>
            ) : (
              globalHistory.map((item) => (
                <div key={item.id} className="p-3 mb-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer" onClick={() => router.push(`/report/${item.id}`)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-200">{item.companyName}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                      {item.analysisType && (
                        <span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                          {item.analysisType}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-amber-500">View</div>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Menu Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-white/5">
            <button
              onClick={clearHistory}
              className="w-full py-2 px-4 rounded-lg border border-slate-700 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-xs transition-colors"
            >
              {t.clearHistory}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
