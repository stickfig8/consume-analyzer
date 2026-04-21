import type { AnalysisStatus, Expense, Period } from "@/types/clientTypes";
import type { Report } from "@/types/responseTypes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function useExpenseAnalysis() {
  const [result, setResult] = useState<Report | null>(null);
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
      setStatus("classifying");
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/api/reports/generate",
        { expenses, period },
        {
          signal: controller.signal,
        },
      );
      console.log(res.data);

      setResult(res.data.data);
      setStatus("success");
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled");
        return;
      }

      if (err.code === "ERR_CANCELED") {
        console.log("Request cancelled");
        return;
      }

      if (err.response?.status === 503) {
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
