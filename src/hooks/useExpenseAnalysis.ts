import type { AnalysisResult } from "@/types/responseTypes";
import type { Expense } from "@/types/clientTypes";
import { useState } from "react";
import { classifyExpenses } from "@/sevices/classify";

export function useExpenseAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function analyze(expenses: Expense[]) {
    setIsLoading(true);

    try {
      const classification = await classifyExpenses(expenses);

      console.log("Classification result:", classification);
    } catch (err) {
      console.error("Analyze error:", err);
    }

    // 2️⃣ 클라이언트 계산
    //const summary = calculateSummary(expenses, classification);

    //const emotionScore = calculateEmotion(summary);

    // 3️⃣ LLM 해석
    //const insight = await generateInsight(summary);

    // setResult({
    //   summary,
    //   emotionScore,
    //   insight,
    // });

    setIsLoading(false);
  }

  return {
    result,
    isLoading,
    analyze,
  };
}
