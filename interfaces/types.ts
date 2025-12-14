
export enum Dimension {
  ECQ = 'ECQ',
  MMP = 'MMP',
  UEE = 'UEE',
  GDI = 'GDI',
  TPM = 'TPM',
  SRR = 'SRR',
  ERE = 'ERE',
  GES = 'GES',
  FINAL = 'FINAL'
}

export type Language = 'zh-TW' | 'en' | 'ja' | 'ko';

export interface AnalysisState {
  status: 'idle' | 'running' | 'completed' | 'error';
  currentStepIndex: number; // 0 to 8
  logs: string[];
  error?: string;
}

export type Reports = Record<Dimension, string>;
export type Scores = Record<Exclude<Dimension, Dimension.FINAL>, number>;

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  companyName: string;
  reports: Reports;
  scores: Scores;
  language: Language;
}
