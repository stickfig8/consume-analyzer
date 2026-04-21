import type { Period } from "./clientTypes";

export type ExpenseCategory = "fixed" | "routine" | "emotional";

// 소비데이터 + 분류
export type ClassifiedExpense = {
  id: string;
  item: string;
  price: number;
  memo?: string;
  category: ExpenseCategory;
  reason?: string;
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

export type LLMInsight = {
  // 전체 요약 문장
  summaryComment: string;

  // 소비 패턴 해석 리스트
  patternAnalysis: string[];

  // 개선 제안 리스트
  improvementSuggestions: string[];

  // 개선 항목 리스트
  selectedCandidates: string[];

  // 리스크 전망
  expectedRisks: string[];
};

export type Report = {
  mergedExpenses: ClassifiedExpense[];
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  insight: LLMInsight;
  period: Period;
};
