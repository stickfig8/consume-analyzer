export type ExpenseCategory = "fixed" | "routine" | "emotional";

export type LLMClassification = {
  id: string;
  category: ExpenseCategory;
  reason?: string;
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
