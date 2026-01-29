
export interface AnalysisResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
  candidateStrengths: string[];
  improvements: string[];
  unbiasedVerdict: string;
}

export interface Candidate extends AnalysisResult {
  id: string;
  name: string;
  date: string;
  role: string;
}

export interface ScreeningRequest {
  resumeText: string;
  jobDescription: string;
}

export type ViewType = 'SCREENER' | 'POOL' | 'ANALYTICS' | 'FAIRNESS' | 'SETTINGS';
export type AppState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
