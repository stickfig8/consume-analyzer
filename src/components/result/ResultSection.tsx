import type { AnalysisResult } from "@/types/responseTypes";

type Props = {
  resultReport: AnalysisResult | null;
};

export default function ResultSection({ resultReport }: Props) {
  return (
    <section>
      <article>
        {resultReport ? (
          <p>test</p>
        ) : (
          <div className="bg-gray-400 flex items-center justify-center text-white h-80 rounded-lg shadow-lg">
            분석을 기다리고 있어요!
          </div>
        )}
      </article>
    </section>
  );
}
