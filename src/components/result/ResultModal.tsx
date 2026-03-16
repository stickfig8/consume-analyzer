import type { AnalysisResult, AnalysisStatus } from "@/types/clientTypes";
import ModalBackground from "../common/ModalBackground";

import CommonReportCard from "./common/CommonReportCard";
import OverViewCard from "./overview/OverViewCard";

import ResultModalTitle from "./common/ResultModalTitle";
import ModalButtons from "./common/ModalButtons";
import ErrorPresentation from "./request/ErrorPresentation";
import LoadingIndicator from "./request/LoadingIndicator";

import { useExportReport } from "@/hooks/useExportReport";

type Props = {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  onClose: () => void;
  cancel: () => void;
};

export default function ResultModal({
  status,
  result,
  error,
  onClose,
  cancel,
}: Props) {
  const { reportRef, handleDownloadPDF, isExporting } = useExportReport();

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
                title="📋  구조 분석"
                contents={result.insight.patternAnalysis}
                selectedCandidates={result.insight.selectedCandidates}
                cardType="pattern"
                delay={2.5}
              />
              <CommonReportCard
                title="🚀  개선"
                contents={result.insight.improvementSuggestions}
                selectedCandidates={result.insight.selectedCandidates}
                cardType="improve"
                delay={4.0}
              />

              <CommonReportCard
                title="📈  리스크 관리"
                contents={result.insight.expectedRisks}
                selectedCandidates={result.insight.selectedCandidates}
                cardType="risk"
                delay={5.5}
              />
              <p className="text-xs text-muted-foreground">
                본 리포트는 생성형 AI 모델을 활용하여 자동 생성되었습니다.
              </p>
              {/* 버튼 목록 */}
              <ModalButtons
                isExporting={isExporting}
                onClose={onClose}
                onSave={() => handleDownloadPDF(result.period)}
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
