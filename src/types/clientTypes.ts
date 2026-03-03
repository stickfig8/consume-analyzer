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

export type period = "daily" | "weekly" | "monthly";

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

export type InsightPayload = {
  total: number;
  fixedPercent: number;
  routinePercent: number;
  emotionalPercent: number;
  emotionScore: number;
  emotionLevel: string;
};

// 최종 UI 전달 자료형
export type AnalysisResult = {
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  insight: LLMInsight;
};

// 분석 현황 타입
export type AnalysisStatus = "idle" | "loading" | "success" | "error";
