import React from 'react';
import { Dimension } from '@/interfaces/types';

interface LoadingOverlayProps {
  isProcessing: boolean;
  currentStepIndex: number;
  steps: Dimension[];
  handleStop: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isProcessing,
  currentStepIndex,
  steps,
  handleStop
}) => {
  if (!isProcessing) return null;

  return (
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
            {currentStepIndex >= 0 && currentStepIndex < steps.length
              ? `Analyzing ${steps[currentStepIndex]}... (${Math.round(((currentStepIndex + 0.1) / 9) * 100)}%)`
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
  );
};
