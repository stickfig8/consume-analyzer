import type { EmotionScore, ExpenseSummary } from "@/types/clientTypes";

import CommonMotionDiv from "../common/CommonMotionDiv";
import CommonAppCard from "@/components/common/CommonAppCard";
import ResultCardTitle from "../common/ResultCardTitle";
import RadialChart from "./RadialChart";
import CompareCard from "./CompareCard";
import MobileCompareCard from "./MobileCompareCard";

import { parseMarkedText } from "@/utils/stringParseUtils";

type Props = {
  summary: ExpenseSummary;
  emotionScore: EmotionScore;
  summaryComment: string;
  isExporting: boolean;
};

export default function OverViewCard({
  summary,
  emotionScore,
  summaryComment,
  isExporting,
}: Props) {
  return (
    <CommonMotionDiv delay={1.0}>
      <CommonAppCard>
        <article className="w-full h-fit flex flex-col gap-5 p-4">
          <ResultCardTitle title="📊  요약" />
          <div className="flex gap-5 h-[200px] max-[900px]:h-[100px]">
            <RadialChart
              emotionScore={emotionScore}
              unit="점"
              desc="감정 소비 점수"
              isExporting={isExporting}
            />
            <CompareCard
              summary={summary}
              emotionLevel={emotionScore.level}
              isExporting={isExporting}
            />
            <MobileCompareCard
              summary={summary}
              emotionLevel={emotionScore.level}
            />
          </div>

          <p className="text-sm leading-relaxed text-foreground max-[900px]:text-[13px]">
            {parseMarkedText(summaryComment)}
          </p>
        </article>
      </CommonAppCard>
    </CommonMotionDiv>
  );
}
