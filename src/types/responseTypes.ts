export type ExpenseCategory = "fixed" | "routine" | "emotional";

export type LLMResult = {
  id: string;
  category: ExpenseCategory;
  reason?: string;
};

export type LLMResponse = LLMResult[];

export type ExpenseSummary = {
  totalExpense: number;

  breakdown: {
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

export type EmotionLevel = "low" | "medium" | "high";

export type EmotionScore = {
  score: number; // 0 ~ 100
  level: EmotionLevel;
};

export type LLMInsight = {
  // 전체 요약 문장
  overallComment: string;

  // 소비 패턴 해석 리스트
  patternAnalysis: string[];

  // 개선 제안 리스트
  suggestions: string[];
};

// 최종 UI 전달 자료형
export type AnalysisResult = {
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  insight: LLMInsight;
};
