"use client";


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { extractScore, startAnalysis, getJobStatus, getRecentReports } from '@/services/analyzer';
import { Dimension, Reports, Scores, Language, HistoryItem } from '@/interfaces/types';
import { Navbar } from '@/components/home/Navbar';
import { HistoryDrawer } from '@/components/home/HistoryDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { RecentHistory } from '@/components/home/RecentHistory';
import { LoadingOverlay } from '@/components/home/LoadingOverlay';
import { ResultsDashboard } from '@/components/home/ResultsDashboard';

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
  const [analysisType, setAnalysisType] = useState<'company' | 'stock' | 'fund'>('company');
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

  const saveToHistory = (newReports: Reports, newScores: Scores, name: string, reportId: string, type: 'company' | 'stock' | 'fund') => {
    const newItem: HistoryItem = {
      id: reportId,
      timestamp: Date.now(),
      companyName: name,
      reports: newReports,
      scores: newScores,
      language: language,
      analysisType: type
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
    setAnalysisType(item.analysisType || 'company');
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
      getRecentReports().then(setGlobalHistory).catch((e) => {
        console.error(e);
      });
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
      const jobId = await startAnalysis(companyName, language, analysisType);

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
          if (status.results) {
            setReports(prev => ({ ...prev, ...status.results }));

            // Extract scores from current results
            const currentScores: Scores = {} as Scores;
            Object.entries(status.results).forEach(([key, val]) => {
              if (key !== 'Final Report' && key !== 'DONE') {
                currentScores[key as Dimension] = extractScore(val);
              }
            });
            setScores(prev => ({ ...prev, ...currentScores }));

            // Update Active Tab if logic dictates
            if (status.currentStep && status.currentStep !== 'DONE' && status.currentStep !== 'STARTING') {
              const stepIdx = STEPS.indexOf(status.currentStep as Dimension);
              if (stepIdx !== -1) setCurrentStepIndex(stepIdx);
            }
          }

          if (status.status === 'completed') {
            setIsProcessing(false);
            setCurrentStepIndex(9); // Done
            // Save to history
            const finalReports = status.results as unknown as Reports;

            const finalScores: Scores = {} as Scores;
            Object.entries(status.results).forEach(([key, val]) => {
              if (STEPS.includes(key as Dimension) && key !== Dimension.FINAL) {
                finalScores[key as Dimension] = extractScore(val);
              }
            });

            saveToHistory(finalReports, finalScores, companyName, jobId, analysisType);
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
          // Don't retry immediately if error could be persistent, but here we retry
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

  const toggleLang = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-orange-500/30">

      <Navbar
        language={language}
        toggleLang={toggleLang}
        isLangMenuOpen={isLangMenuOpen}
        setIsLangMenuOpen={setIsLangMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <HistoryDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        history={history}
        globalHistory={globalHistory}
        historyTab={historyTab}
        setHistoryTab={setHistoryTab}
        loadFromHistory={loadFromHistory}
        deleteHistoryItem={deleteHistoryItem}
        clearHistory={clearHistory}
        language={language}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-10">

        <HeroSection
          companyName={companyName}
          setCompanyName={setCompanyName}
          analysisType={analysisType}
          setAnalysisType={setAnalysisType}
          runAnalysis={runAnalysis}
          isProcessing={isProcessing}
          handleStop={handleStop}
          currentStepIndex={currentStepIndex}
          reports={reports}
          language={language}
        />

        {/* Homepage Recent History Grid - Automatically shown on entry */}
        {!isProcessing && Object.keys(reports).length === 0 && (
          <RecentHistory
            history={history}
            loadFromHistory={loadFromHistory}
            language={language}
          />
        )}

        {error && (
          <div className="flex justify-center">
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm max-w-2xl animate-pulse">
              ⚠️ {error}
            </div>
          </div>
        )}

        <div ref={analysisEndRef} />

        <LoadingOverlay
          isProcessing={isProcessing}
          currentStepIndex={currentStepIndex}
          steps={STEPS}
          handleStop={handleStop}
        />

        {/* Dashboard Area (Hidden while processing) */}
        {!isProcessing && Object.keys(reports).length > 0 && (
          <ResultsDashboard
            scores={scores}
            reports={reports}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            shareReport={shareReport}
            currentReportId={currentReportId}
            steps={STEPS}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
