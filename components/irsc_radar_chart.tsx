"use client";


import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Scores, Dimension } from '@/interfaces/types';

interface Props {
  scores: Scores;
}

export const IRSCRadarChart: React.FC<Props> = ({ scores }) => {
  const data = [
    { subject: 'ECQ (獲利)', A: scores[Dimension.ECQ] || 0, fullMark: 100 },
    { subject: 'MMP (護城河)', A: scores[Dimension.MMP] || 0, fullMark: 100 },
    { subject: 'GES (成長)', A: scores[Dimension.GES] || 0, fullMark: 100 },
    { subject: 'UEE (效率)', A: scores[Dimension.UEE] || 0, fullMark: 100 },
    { subject: 'GDI (治理)', A: scores[Dimension.GDI] || 0, fullMark: 100 },
    { subject: 'TPM (技術)', A: scores[Dimension.TPM] || 0, fullMark: 100 },
    { subject: 'SRR (永續)', A: scores[Dimension.SRR] || 0, fullMark: 100 },
    { subject: 'ERE (韌性)', A: scores[Dimension.ERE] || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[360px] glass-panel rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-70"></div>

      <h3 className="text-center text-sm font-medium tracking-widest text-slate-400 uppercase mb-2">IRSC 8-Dimension Analysis</h3>
      <div className="w-full h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#475569" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#f97316" /* Orange-500 */
              strokeWidth={2}
              fill="#f97316"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};