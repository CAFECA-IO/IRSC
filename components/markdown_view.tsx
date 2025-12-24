"use client";

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownViewProps {
  content: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  const components: Components = {
    // Header 1 (Title)
    h1: ({ node, ...props }) => (
      <div className="mb-8 pb-4 border-b border-white/10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200" {...props} />
      </div>
    ),
    // Header 2 (Section)
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-semibold text-orange-200 mt-8 mb-4 flex items-center">
        <span className="w-1 h-6 bg-orange-500 rounded-full mr-3 shrink-0"></span>
        <span {...props} />
      </h2>
    ),
    // Header 3 (Subsection)
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-medium text-slate-200 mt-6 mb-3 border-l-2 border-slate-600 pl-3" {...props} />
    ),
    // Paragraph
    p: ({ node, ...props }) => (
      <p className="mb-3 text-slate-300 leading-relaxed tracking-wide text-[0.95rem]" {...props} />
    ),
    // Blockquote
    blockquote: ({ node, ...props }) => (
      <blockquote className="my-4 pl-4 border-l-4 border-orange-500/50 bg-white/5 py-2 pr-2 rounded-r-lg italic text-slate-300" {...props} />
    ),
    // List Item
    li: ({ node, ...props }) => {
      const { ordered } = props as any;
      if (ordered) {
        return <li className="ml-4 pl-2 text-slate-300 list-decimal marker:text-orange-500 my-1.5 leading-relaxed" {...props} />;
      }
      return (
        <li className="ml-4 pl-2 text-slate-300 list-none relative my-1.5 leading-relaxed">
          <span className="absolute left-[-1rem] top-2.5 w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span {...props} />
        </li>
      );
    },
    // Ordered List
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-5 mb-4 text-slate-300 space-y-1" {...props} />
    ),
    // Strong / Bold
    strong: ({ node, ...props }) => (
      <strong className="text-orange-300 font-semibold" {...props} />
    ),
    // Table
    table: ({ node, ...props }) => (
      <div className="my-6 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" {...props} />
        </div>
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="border-b border-white/10 bg-white/5" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="px-4 py-3 font-semibold text-orange-200 whitespace-nowrap" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-slate-300" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0" {...props} />
    ),
    // Horizontal Rule
    hr: ({ node, ...props }) => (
      <hr className="my-8 border-t border-white/10" {...props} />
    ),
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};