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
  structureType: StructureType;
  riskLevel: RiskLevel;
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

// 기간 타입
export type Period = "month" | "week" | "day";

// 소비 구조 타입
export type StructureType =
  | "감정 우세형"
  | "구조 안정형"
  | "루틴 주도형"
  | "관리 안정형"
  | "균형형";

// 리스크 단계 타입
export type RiskLevel = "안정 단계" | "주의 단계" | "경계 단계" | "위험 단계";

// 리포트 카드 종류 타입
export type ReportCardType = "pattern" | "improve" | "risk";
