import type {
  AnalysisResult,
  AnalysisStatus,
  Expense,
} from "@/types/clientTypes";
import { useState } from "react";
import { requestClassify } from "@/sevices/classify";
import { calculateEmotion, calculateSummary } from "@/utils/calculate";
import { requestInsight } from "@/sevices/insight";

export function useExpenseAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function analyze(expenses: Expense[]) {
    if (status === "loading") return;

    setStatus("loading");
    setError(null);

    try {
      // 1: LLM 분류
      const classification = await requestClassify(expenses);

      // 2: 클라이언트 요약 계산
      const summary = calculateSummary(expenses, classification);

      // 3: 클라이언트 감정 점수 계산
      const emotionScore = calculateEmotion(summary);

      // 4: LLM 해석
      const insight = await requestInsight({
        total: summary.totalExpense,
        fixedPercent: summary.percentage.fixed,
        routinePercent: summary.percentage.routine,
        emotionalPercent: summary.percentage.emotional,
        emotionScore: emotionScore.score,
        emotionLevel: emotionScore.level,
      });

      // 5: 최종 결과
      setResult({
        summary,
        emotionScore,
        insight,
      });
      setStatus("success");
    } catch (err: any) {
      const status = err?.status;

      if (status === 503) {
        setError("현재 분석 요청이 많습니다. 잠시 후 다시 시도해주세요.");
      } else if (status === 429) {
        setError("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setError("분석 중 오류가 발생했습니다.");
      }

      setStatus("error");
    }
  }

  return {
    result,
    status,
    error,
    analyze,
  };
}
