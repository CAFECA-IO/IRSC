"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UI_TEXT, DIMENSION_LABELS_MULTILINGUAL } from '@/constants/ui_text';
import { extractScore, startAnalysis, getJobStatus, getRecentReports, getReportDetails, JobStatus } from '@/services/analyzer';
import { Dimension, Reports, Scores, Language, HistoryItem } from '@/interfaces/types';
import { MarkdownView } from '@/components/markdown_view';
import { IRSCRadarChart } from '@/components/irsc_radar_chart';

const HISTORY_KEY = 'isunfa_history_v1';
const MAX_HISTORY = 10;

// Step Order
const STEPS = [
  Dimension.ECQ,
  Dimension.MMP,
  Dimension.UEE,
  Dimension.GDI,
  Dimension.TPM,
  Dimension.SRR,
  Dimension.ERE,
  Dimension.GES,
  Dimension.FINAL
];

export default function Home() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState<Dimension>(Dimension.FINAL);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('zh-TW');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Right-side drawer menu
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Data State
  const [reports, setReports] = useState<Reports>({} as Reports);
  const [scores, setScores] = useState<Scores>({} as Scores);

  // Global History State
  const [globalHistory, setGlobalHistory] = useState<{ id: string, companyName: string, timestamp: string }[]>([]);
  const [historyTab, setHistoryTab] = useState<'local' | 'global'>('local');
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  const analysisEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<boolean>(false);
  const t = UI_TEXT[language];
  const dimensionLabels = DIMENSION_LABELS_MULTILINGUAL[language];

  // Load History on Mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const saveToHistory = (newReports: Reports, newScores: Scores, name: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      companyName: name,
      reports: newReports,
      scores: newScores,
      language: language
    };

    setHistory(prev => {
      // Remove duplicates by name if needed
      const filtered = prev.filter(item => item.companyName.toLowerCase() !== name.toLowerCase());
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setCompanyName(item.companyName);
    setReports(item.reports);
    setScores(item.scores);
    setLanguage(item.language);
    setActiveTab(Dimension.FINAL);
    setError(null);
    setCurrentReportId(item.id); // Enable sharing for history items
    setIsProcessing(false);
    setIsMenuOpen(false); // Close menu on load
    // Scroll to dashboard
    setTimeout(() => {
      analysisEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };



  useEffect(() => {
    if (isMenuOpen && historyTab === 'global') {
      getRecentReports().then(setGlobalHistory).catch(console.error);
    }
  }, [isMenuOpen, historyTab]);

  const handleStop = () => {
    abortRef.current = true;
    setIsProcessing(false);
    setError("Analysis stopped by user.");
  };

  const runAnalysis = useCallback(async () => {
    if (!companyName.trim()) return;

    setIsProcessing(true);
    setError(null);
    setCurrentStepIndex(0);
    abortRef.current = false;

    // Clear previous data
    setReports({} as Reports);
    setScores({} as Scores);
    setActiveTab(Dimension.ECQ);

    try {
      const jobId = await startAnalysis(companyName, language);

      // Start polling
      const poll = async () => {
        if (abortRef.current) return;

        try {
          const status = await getJobStatus(jobId);

          if (status.status === 'failed') {
            setError(status.error || "Analysis failed");
            setIsProcessing(false);
            return;
          }

          // Update Reports & Scores
          // We only update if we have new data to avoid unnecessary renders, 
          // or just overwrite since React handles diffing.
          if (status.results) {
            setReports(prev => ({ ...prev, ...status.results }));

            // Extract scores from current results
            const currentScores: Scores = {} as Scores;
            Object.entries(status.results).forEach(([key, val]) => {
              if (key !== 'Final Report' && key !== 'DONE') {
                // @ts-ignore
                currentScores[key as Dimension] = extractScore(val);
              }
            });
            setScores(prev => ({ ...prev, ...currentScores }));

            // Update Active Tab if logic dictates (e.g. follow progress)
            // status.currentStep is like 'ECQ', 'MMP'
            if (status.currentStep && status.currentStep !== 'DONE' && status.currentStep !== 'STARTING') {
              const stepIdx = STEPS.indexOf(status.currentStep as Dimension);
              if (stepIdx !== -1) setCurrentStepIndex(stepIdx);
            }
          }

          if (status.status === 'completed') {
            setIsProcessing(false);
            setCurrentStepIndex(9); // Done
            // Save to history
            // We need to reconstruct the full report object for history
            // status.results contains all markdown strings
            const finalReports = status.results as unknown as Reports;

            const finalScores: Scores = {} as Scores;
            Object.entries(status.results).forEach(([key, val]) => {
              if (STEPS.includes(key as Dimension) && key !== Dimension.FINAL) {
                // @ts-ignore
                finalScores[key as Dimension] = extractScore(val);
              }
            });

            saveToHistory(finalReports, finalScores, companyName);
            setCurrentReportId(jobId);

            setTimeout(() => {
              analysisEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

          } else {
            // Continued polling
            setTimeout(poll, 2000);
          }

        } catch (e) {
          console.error("Polling error", e);
          // Don't stop on single poll error, retry
          setTimeout(poll, 3000);
        }
      };

      poll();

    } catch (error) {
      console.error(error);
      setError("Failed to start analysis.");
      setIsProcessing(false);
    }
  }, [companyName, language]);


  const shareReport = () => {
    if (!currentReportId) return;
    const url = `${window.location.origin}/report/${currentReportId}`;
    navigator.clipboard.writeText(url);
    alert("Report link copied to clipboard!");
  };

  // Scroll to results when processing starts
  useEffect(() => {
    if (isProcessing && analysisEndRef.current) {
      analysisEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isProcessing]);

  const calculateAverageScore = (s: Scores) => {
    const values = Object.values(s);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  };

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

  const toggleLang = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const getLangLabel = (lang: Language) => {
    switch (lang) {
      case 'zh-TW': return '繁體中文';
      case 'en': return 'English';
      case 'ja': return '日本語';
      case 'ko': return '한국어';
      default: return 'Language';
    }
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-orange-500/30">

      {/* Navbar / Brand */}
      <nav className="border-b border-white/5 bg-[#0f1218]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            {/* Logo Icon */}
            <div className="w-9 h-9 relative shrink-0">
              <svg width="40" height="35" viewBox="0 0 54 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="_&#229;&#156;&#150;&#229;&#177;&#164;_1" clipPath="url(#clip0_5014_284558)">
                  <path id="Vector" d="M43.443 4.15585C38.1283 0.409056 32.1053 -0.726334 25.7363 0.43609C18.8068 1.69944 13.4849 5.40478 9.73633 11.2926C10.7023 15.845 12.6919 20.5289 15.6404 24.9641L25.3921 15.2124C26.3869 14.2176 27.9999 14.2176 28.9947 15.2124C29.9895 16.2072 29.9895 17.8202 28.9947 18.815L18.7221 29.0876C19.4412 29.9472 20.1999 30.7907 20.9947 31.6179L41.1831 11.4296C42.1779 10.4347 43.7908 10.4347 44.7857 11.4296C45.7805 12.4244 45.7805 14.0374 44.7857 15.0322L24.7163 35.1016C25.5994 35.8459 26.5005 36.5469 27.4124 37.2083L35.8629 28.7578C36.8578 27.763 38.4707 27.763 39.4655 28.7578C40.4604 29.7526 40.4604 31.3656 39.4655 32.3604L31.8044 40.0216C35.4719 42.0779 39.2511 43.4944 42.9366 44.2388C48.6082 40.6956 52.582 34.9303 53.6525 27.945C55.1754 18.0184 51.6683 9.96076 43.4412 4.15945L43.443 4.15585ZM33.1776 13.5255C31.7701 13.5255 30.6311 12.3847 30.6311 10.979C30.6311 9.57328 31.7719 8.43249 33.1776 8.43249C34.5834 8.43249 35.7242 9.57328 35.7242 10.979C35.7242 12.3847 34.5834 13.5255 33.1776 13.5255Z" fill="url(#paint0_linear_5014_284558)" />
                  <path id="Vector_2" d="M28.1798 43.6435C26.6966 42.8073 25.2314 41.8648 23.7986 40.8213C21.8324 39.3885 19.9239 37.7647 18.1127 35.9535C17.053 34.8938 16.0581 33.8017 15.1264 32.6843C14.0072 31.3399 12.9818 29.9576 12.0536 28.5518C9.6585 24.9276 7.90134 21.1376 6.82002 17.3926C6.4758 18.2685 6.13698 19.1461 5.77474 20.013C3.97794 24.3185 2.19736 28.6311 0.418577 32.9438C0.112201 33.6881 0.229345 33.8648 1.02232 33.8756C2.29468 33.8918 3.56884 33.8702 4.8412 33.8792C5.75672 33.8864 5.97478 33.9368 6.02525 34.5784C6.03606 34.7208 6.03966 34.8902 6.03966 35.0975C6.04327 37.3196 6.04327 39.5435 6.04147 41.7656C6.04147 43.4471 6.04147 45.1268 6.04147 46.8082C6.04147 47.9418 6.09553 47.9941 7.24714 47.9959C10.3722 47.9977 13.4954 47.9959 16.6204 47.9959C17.4567 47.9959 18.2911 47.9959 19.1273 47.9959C20.6934 47.9959 22.2595 47.9959 23.8257 47.9959C25.909 47.9959 27.9906 47.9959 30.0739 47.9977C31.5517 47.9995 33.0151 47.8445 34.4587 47.5615C35.0786 47.439 35.6896 47.2966 36.2915 47.1326C33.581 46.318 30.8507 45.1484 28.1798 43.6435Z" fill="#FFFFFF" />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_5014_284558" x1="46.8438" y1="7.23402" x2="22.0382" y2="32.0396" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFA502" />
                    <stop offset="1" stopColor="#FF8430" />
                  </linearGradient>
                  <clipPath id="clip0_5014_284558">
                    <rect width="53.7382" height="48" fill="white" transform="translate(0.261719)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">iSunFA</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-xs font-medium text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="hidden md:inline">{getLangLabel(language)}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                  {(['zh-TW', 'en', 'ja', 'ko'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLang(lang)}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-700 ${language === lang ? 'text-orange-400 font-bold' : 'text-slate-300'}`}
                    >
                      {getLangLabel(lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="text-xs font-medium hidden md:block">{t.menu}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu Drawer (Right) */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#161b22] border-l border-white/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.historyHeader}
            </h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10">
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

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10">

        {/* Hero & Search Section */}
        <section className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 mb-6 tracking-tight">
            {t.heroTitle} <br />
            <span className="text-xl md:text-2xl font-medium text-slate-400">{t.heroSubtitle}</span>
          </h1>

          <div className="w-full max-w-2xl relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
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

          {/* Homepage Recent History Grid - Automatically shown on entry */}
          {!isProcessing && Object.keys(reports).length === 0 && history.length > 0 && (
            <div className="mt-16 w-full max-w-4xl animate-[fadeIn_0.8s_ease-out]">
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
                      <h4 className="text-lg font-bold text-slate-200 mb-1 truncate group-hover:text-white">{item.companyName}</h4>
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
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm max-w-2xl animate-pulse">
              ⚠️ {error}
            </div>
          )}
        </section>


        <div ref={analysisEndRef} />

        {/* Loading Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 z-40 bg-[#0f1218] flex flex-col items-center justify-center p-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-md w-full text-center space-y-8">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white animate-pulse">
                  AI is analyzing hundreds of financial documents...
                </h2>
                <p className="text-slate-400 font-mono text-sm">
                  {currentStepIndex >= 0 && currentStepIndex < STEPS.length
                    ? `Analyzing ${STEPS[currentStepIndex]}... (${Math.round(((currentStepIndex + 0.1) / 9) * 100)}%)`
                    : "Initializing Analysis Protocol..."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 ease-in-out"
                  style={{ width: `${Math.max(5, ((currentStepIndex + 1) / 9) * 100)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-widest mt-8 opacity-50">
                <div className="text-left">1. Data Collection</div>
                <div className="text-center">2. Reasoning</div>
                <div className="text-right">3. Synthesis</div>
              </div>

              <button
                onClick={handleStop}
                className="mt-12 text-slate-500 hover:text-red-400 text-sm transition-colors border border-transparent hover:border-red-500/30 px-4 py-2 rounded"
              >
                Cancel Analysis
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Area (Hidden while processing) */}
        {!isProcessing && Object.keys(reports).length > 0 && (
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
                  {STEPS.map((step) => {
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
        )}
      </div>
    </div>
  );
}
