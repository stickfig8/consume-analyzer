import type { Report } from "@/types/responseTypes";
import axios from "axios";
import { useState } from "react";

export function useSaveReport() {
  const [loading, setLoading] = useState(false);

  async function saveReport(report: Report | null) {
    if (loading || !report) return;

    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/api/reports/save",
        {
          total_price: report.summary.totalExpense,
          score: report.emotionScore.score,
          type: report.period,

          insight: report.insight,
          expenses: report.mergedExpenses,
        },
      );

      console.log(res.data);
    } catch (err: any) {
      console.log(err + "리포트 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    saveReport,
  };
}
