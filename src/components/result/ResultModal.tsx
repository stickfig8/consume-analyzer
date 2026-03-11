import type { AnalysisResult, AnalysisStatus } from "@/types/clientTypes";
import ModalBackground from "../common/ModalBackground";
import OverViewCard from "./OverViewCard";
import { X } from "lucide-react";
import CommonReportCard from "./common/CommonReportCard";

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
  return (
    <ModalBackground onClose={onClose}>
      <article
        className="max-w-[880px] w-full h-[85%] bg-white rounded-xl flex flex-col gap-7 pt-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <header className="w-full flex justify-between px-5">
          <div></div>
          <h1>분석 결과</h1>
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </header>

        {/* 결과 */}
        {status === "success" && result && (
          <div className="flex flex-col gap-3 h-full overflow-y-auto scrollbar-style p-5">
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
