import type { AnalysisResult, Expense } from "@/types/clientTypes";
import { useState } from "react";
import { requestClassify } from "@/sevices/classify";
import { calculateEmotion, calculateSummary } from "@/utils/calculate";
import { requestInsight } from "@/sevices/insight";

export function useExpenseAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function analyze(expenses: Expense[]) {
    setIsLoading(true);

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    result,
    isLoading,
    analyze,
  };
}
