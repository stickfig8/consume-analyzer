import type {
  AnalysisResult,
  AnalysisStatus,
  Expense,
  Period,
} from "@/types/clientTypes";
import { useEffect, useRef, useState } from "react";
import { requestClassify } from "@/sevices/classify";
import {
  calculateEmotion,
  calculateSummary,
  extractCandidates,
} from "@/utils/calculate";
import { requestInsight } from "@/sevices/insight";

export function useExpenseAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  async function analyze(expenses: Expense[], period: Period) {
    if (
      status === "classifying" ||
      status === "calculating" ||
      status === "insighting"
    )
      return;

    setError(null);

    // 기존 요청 중단
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // 1: LLM 분류
      setStatus("classifying");
      const classification = await requestClassify(expenses, controller.signal);

      // 2: 클라이언트 요약 계산
      setStatus("calculating");
      const summary = calculateSummary(expenses, classification);

      const candidates = extractCandidates(
        expenses,
        classification,
        summary.totalExpense,
      );

      // 3: 클라이언트 감정 점수 계산
      const emotionScore = calculateEmotion(summary);

      // 4: LLM 해석
      setStatus("insighting");
      const insight = await requestInsight(
        {
          total: summary.totalExpense,
          fixedPercent: summary.percentage.fixed,
          routinePercent: summary.percentage.routine,
          emotionalPercent: summary.percentage.emotional,
          emotionScore: emotionScore.score,
          emotionLevel: emotionScore.level,
          candidates,
          period,
        },
        controller.signal,
      );

      // 5: 최종 결과
      setResult({
        summary,
        emotionScore,
        insight,
        period,
      });
      setStatus("success");
    } catch (err: any) {
      if (err.status === 499) {
        console.log("Request cancelled");
        return;
      }

      if (err.status === 503) {
        setError("현재 분석 요청이 많습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setError("분석 중 오류가 발생했습니다.");
      }

      setStatus("error");
    }
  }
  // 언마운트 시 자동 취소
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  function cancel() {
    abortRef.current?.abort();
    setStatus("idle");
  }

  return {
    result,
    status,
    error,
    analyze,
    cancel,
  };
}
