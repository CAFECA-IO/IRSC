"use client";

import React from 'react';

interface MarkdownViewProps {
  content: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {

  const parseBold = (text: string) => {
    // Replace **text** with styled strong tag
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-300 font-semibold">$1</strong>');
  };

  const renderTable = (rows: string[], keyPrefix: number) => {
    // Basic Markdown Table Parser
    // Assumes row 0 is header, row 1 is separator (contains ---), others are body
    if (rows.length < 2) return null;

    const headerRow = rows[0];
    const separatorRow = rows[1];
    const bodyRows = rows.slice(2);

    // Check if second row is actually a separator (contains - and |)
    const isRealTable = separatorRow.includes('---');

    // Split helper
    const splitRow = (row: string) => row.split('|').filter((c, i, arr) => {
      // Remove first and last empty strings if they exist (common in | data | format)
      if (i === 0 && c.trim() === '') return false;
      if (i === arr.length - 1 && c.trim() === '') return false;
      return true;
    });

    const headers = splitRow(headerRow);

    return (
      <div key={`table-${keyPrefix}`} className="my-6 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-orange-200 whitespace-nowrap">
                    <span dangerouslySetInnerHTML={{ __html: parseBold(h.trim()) }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isRealTable ? bodyRows.map((row, rIdx) => {
                const cols = splitRow(row);
                return (
                  <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                    {cols.map((col, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-slate-300">
                        <span dangerouslySetInnerHTML={{ __html: parseBold(col.trim()) }} />
                      </td>
                    ))}
                  </tr>
                );
              }) :
                // Fallback if no separator found, just render all as rows
                rows.slice(1).map((row, rIdx) => {
                  const cols = splitRow(row);
                  return (
                    <tr key={rIdx}>
                      {cols.map((col, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-slate-300">
                          <span dangerouslySetInnerHTML={{ __html: parseBold(col.trim()) }} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Table detection
      if (trimmed.startsWith('|')) {
        tableBuffer.push(trimmed);
        continue;
      } else {
        // Flush table buffer if we hit a non-table line
        if (tableBuffer.length > 0) {
          elements.push(renderTable(tableBuffer, i));
          tableBuffer = [];
        }
      }

      // Standard Line Parsing
      // Header 1 (Title)
      if (line.startsWith('# ')) {
        elements.push(
          <div key={i} className="mb-8 pb-4 border-b border-white/10">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-200">
              {line.replace('# ', '')}
            </h1>
          </div>
        );
      }
      // Header 2 (Section)
      else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl font-semibold text-orange-200 mt-8 mb-4 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            {line.replace('## ', '')}
          </h2>
        );
      }
      // Header 3 (Subsection)
      else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg font-medium text-slate-200 mt-6 mb-3 border-l-2 border-slate-600 pl-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // List item
      else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const text = line.replace(/^[\*\-]\s+/, '');
        elements.push(
          <li key={i} className="ml-4 pl-2 text-slate-300 list-none relative my-1.5 leading-relaxed">
            <span className="absolute left-[-1rem] top-2.5 w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span dangerouslySetInnerHTML={{ __html: parseBold(text) }} />
          </li>
        );
      }
      // Default paragraph (ignore empty lines for better spacing control, use margins)
      else if (trimmed !== '') {
        elements.push(
          <p key={i} className="mb-3 text-slate-300 leading-relaxed tracking-wide text-[0.95rem]" dangerouslySetInnerHTML={{ __html: parseBold(line) }} />
        );
      } else {
        // preserve some spacing
        elements.push(<div key={i} className="h-2"></div>);
      }
    }

    // Flush remaining table buffer
    if (tableBuffer.length > 0) {
      elements.push(renderTable(tableBuffer, lines.length));
    }

    return elements;
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};