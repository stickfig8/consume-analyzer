import type { LLMInsight } from "./responseTypes";

export type Expense = {
  id: string;
  item: string;
  price: number;
  memo?: string;
};

export type ExpenseError = {
  item?: boolean;
  price?: boolean;
};

export type ExpenseSummary = {
  totalExpense: number;

  prices: {
    fixed: number;
    routine: number;
    emotional: number;
  };

  percentage: {
    fixed: number;
    routine: number;
    emotional: number;
  };
};

export type EmotionLevel =
  | "low"
  | "mediumLow"
  | "medium"
  | "mediumHigh"
  | "high";

export type EmotionScore = {
  score: number; // 0 ~ 100
  level: EmotionLevel;
};

export type ImproveCandidate = {
  impact: number;
  adjustScore: number;
  item: string;
  total: number;
  category: string;
};

export type InsightPayload = {
  total: number;
  fixedPercent: number;
  routinePercent: number;
  emotionalPercent: number;
  emotionScore: number;
  emotionLevel: string;
  candidates: ImproveCandidate[];
  period: Period;
};

// 최종 UI 전달 자료형
export type AnalysisResult = {
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  insight: LLMInsight;
  period: Period;
};

// 분석 현황 타입
export type AnalysisStatus =
  | "idle"
  | "classifying"
  | "calculating"
  | "insighting"
  | "success"
  | "error";

// 로딩 현황 타입
export type LoadingStatus = "classifying" | "calculating" | "insighting";

export type Period = "month" | "week" | "day";
