import type { EmotionScore, ExpenseSummary } from "@/types/clientTypes";
import CommonAppCard from "../common/CommonAppCard";
import RadialChart from "./overview/RadialChart";
import CompareCard from "./overview/CompareCard";
import ResultCardTitle from "./common/ResultCardTitle";
import MobileCompareCard from "./overview/MobileCompareCard";

type Props = {
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  summaryComment: string;
};

export default function OverViewCard({
  summary,
  emotionScore,
  summaryComment,
}: Props) {
  return (
    <CommonAppCard>
      <article className="w-full h-fit flex flex-col gap-5 p-4">
        <ResultCardTitle title="📊 요약" />
        <div className="flex gap-5 h-[200px] max-[900px]:h-[100px]">
          <RadialChart
            score={emotionScore.score}
            unit="점"
            desc="감정 소비 점수"
          />
          <CompareCard summary={summary} score={emotionScore.score} />
          <MobileCompareCard summary={summary} score={emotionScore.score} />
        </div>

        <p className="text-sm leading-relaxed text-foreground max-[900px]:text-[13px]">
          {summaryComment}
        </p>
      </article>
    </CommonAppCard>
  );
}
