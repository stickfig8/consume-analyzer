import type { AnalysisResult, AnalysisStatus } from "@/types/clientTypes";
import ModalBackground from "../common/ModalBackground";

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
        className="w-[80%] h-[80%] bg-white rounded-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" && result && (
          <div className="flex flex-col gap-3">
            <p>{result.insight.summaryComment}</p>
            {result.insight.patternAnalysis.map((item) => (
              <p>{item}</p>
            ))}
            {result.insight.improvementSuggestions.map((item) => (
              <p>{item}</p>
            ))}
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
