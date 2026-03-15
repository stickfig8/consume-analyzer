import type { EmotionScore, ExpenseSummary } from "@/types/clientTypes";
import CommonAppCard from "../common/CommonAppCard";
import RadialChart from "./overview/RadialChart";
import CompareCard from "./overview/CompareCard";
import ResultCardTitle from "./common/ResultCardTitle";
import MobileCompareCard from "./overview/MobileCompareCard";
import CommonMotionDiv from "./common/CommonMotionDiv";
import { parseMarkedText } from "@/utils/stringParseUtils";

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
    <CommonMotionDiv delay={1.0}>
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
            {parseMarkedText(summaryComment)}
          </p>
        </article>
      </CommonAppCard>
    </CommonMotionDiv>
  );
}
