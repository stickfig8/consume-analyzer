import type { AnalysisResult, AnalysisStatus } from "@/types/clientTypes";
import ModalBackground from "../common/ModalBackground";
import OverViewCard from "./OverViewCard";
import CommonReportCard from "./common/CommonReportCard";

import { useExportReport } from "@/hooks/useExportReport";
import ResultModalTitle from "./common/ResultModalTitle";
import ModalButtons from "./common/ModalButtons";
import ErrorPresentation from "./request/ErrorPresentation";
import LoadingIndicator from "./request/LoadingIndicator";
//import { useBlockOuterScroll } from "@/hooks/useBlockOuterScroll";

type Props = {
  isOpen: boolean;
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  onClose: () => void;
  cancel: () => void;
};

export default function ResultModal({
  isOpen,
  status,
  result,
  error,
  onClose,
  cancel,
}: Props) {
  if (!isOpen) return null;

  const { reportRef, handleDownloadPDF, isExporting } = useExportReport();
  // useBlockOuterScroll();

  return (
    <ModalBackground
      onClose={() => {
        cancel();
        onClose();
      }}
    >
      <article
        className={`max-w-[880px] w-full ${isExporting ? "h-auto" : "h-[85%]"} bg-white rounded-xl flex flex-col gap-7 pt-5 max-[900px]:mx-2`}
        onClick={(e) => e.stopPropagation()}
        ref={reportRef}
      >
        {/* 결과 */}
        {status === "success" && result && (
          <div className="w-full h-full flex flex-col gap-5 max-[900px]:gap-1">
            <ResultModalTitle period={result.period} />
            <div
              className={`flex flex-col gap-3 scrollbar-style p-5 ${isExporting ? "overflow-visible max-h-none" : "h-full overflow-y-auto"} max-[900px]:p-2`}
            >
              <OverViewCard
                summary={result.summary}
                emotionScore={result.emotionScore}
                summaryComment={result.insight.summaryComment}
                isExporting={isExporting}
              />
              <CommonReportCard
                title="📋  상세 분석"
                contents={result.insight.patternAnalysis}
                selectedCandidates={result.insight.selectedCandidates}
              />
              <CommonReportCard
                title="🚀  개선"
                contents={result.insight.improvementSuggestions}
                selectedCandidates={result.insight.selectedCandidates}
                isImprove={true}
              />

              {/* 버튼 목록 */}
              <ModalButtons
                isExporting={isExporting}
                onClose={onClose}
                onSave={handleDownloadPDF}
              />
            </div>
          </div>
        )}
        {/* 로딩 인디케이터 */}
        {(status === "classifying" ||
          status === "calculating" ||
          status === "insighting") && (
          <LoadingIndicator
            status={status}
            onCancel={() => {
              cancel();
              onClose();
            }}
          />
        )}
        {/* 에러 인디케이터 */}
        {status === "error" && (
          <ErrorPresentation error={error} onClose={onClose} />
        )}
      </article>
    </ModalBackground>
  );
}
