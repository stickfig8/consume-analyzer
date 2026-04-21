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
export type Period = "monthly" | "weekly" | "daily";
