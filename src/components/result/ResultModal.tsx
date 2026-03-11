import type { AnalysisResult, AnalysisStatus } from "@/types/clientTypes";
import ModalBackground from "../common/ModalBackground";
import OverViewCard from "./OverViewCard";
import CommonReportCard from "./common/CommonReportCard";
import { Button } from "../ui/button";

import { useExportReport } from "@/hooks/useExportReport";
import ResultModalTitle from "./common/ResultModalTitle";
import { useEffect } from "react";
import { useBlockOuterScroll } from "@/hooks/useBlockOuterScroll";

type Props = {
  isOpen: boolean;
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  onClose: () => void;
};

export default function ResultModal({
  isOpen,
  status,
  result,
  error,
  onClose,
}: Props) {
  if (!isOpen) return null;

  const { reportRef, handleDownloadPDF, isExporting } = useExportReport();
  useBlockOuterScroll(isOpen);

  return (
    <ModalBackground onClose={onClose}>
      <article
        className={`max-w-[880px] w-full ${isExporting ? "h-auto" : "h-[85%]"} bg-white rounded-xl flex flex-col gap-7 pt-5`}
        onClick={(e) => e.stopPropagation()}
        ref={reportRef}
      >
        {/* 결과 */}
        {status === "success" && result && (
          <div className="w-full h-full flex flex-col gap-5">
            <ResultModalTitle />
            <div
              className={`flex flex-col gap-3 scrollbar-style p-5 ${isExporting ? "overflow-visible max-h-none" : "h-full overflow-y-auto"}`}
            >
              <OverViewCard
                summary={result.summary}
                emotionScore={result.emotionScore}
                summaryComment={result.insight.summaryComment}
              />
              <CommonReportCard
                title="📋 상세 분석"
                contents={result.insight.patternAnalysis}
              />
              <CommonReportCard
                title="🚀 개선"
                contents={result.insight.improvementSuggestions}
                isImprove={true}
              />

              {/* 버튼 목록 */}
              <div
                className={`w-full flex justify-end gap-2 mt-5 ${isExporting ? "hidden" : ""}`}
              >
                <Button
                  className="bg-[var(--fixed-color)] hover:bg-[var(--fixed-color)]/80 cursor-pointer"
                  onClick={onClose}
                >
                  취소하기
                </Button>
                <Button
                  className="cursor-pointer"
                  disabled={isExporting}
                  onClick={handleDownloadPDF}
                >
                  저장하기
                </Button>
              </div>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center py-10">
            <p className="text-lg font-medium">분석 중입니다...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </article>
    </ModalBackground>
  );
}
