"use client";

import React, { useState } from 'react';
import { MarkdownView } from '@/components/markdown_view';

interface CollapsibleSectionProps {
  title: string;
  score: number | string;
  content: string;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  score,
  content,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#1e2330]/50 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`origin-center transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-0'}`} />
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-amber-400">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-white">{score || '-'}</div>
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-6 border-t border-white/5 bg-[#1e2330]/30">
          <MarkdownView content={content} />
        </div>
      </div>
    </div>
  );
};
