import CommonAppCard from "@/components/common/CommonAppCard";
import ResultCardTitle from "./ResultCardTitle";
import CommonMotionDiv from "./CommonMotionDiv";
import { parseMarkedText } from "@/utils/stringParseUtils";
import type { ReportCardType } from "@/types/clientTypes";

type Props = {
  title: string;
  contents: string[];
  selectedCandidates: string[];
  cardType: ReportCardType;
  delay: number;
};
export default function CommonReportCard({
  title,
  contents,
  selectedCandidates,
  cardType,
  delay,
}: Props) {
  return (
    <CommonMotionDiv delay={delay}>
      <CommonAppCard>
        <article className="w-full h-fit flex flex-col gap-5 p-3">
          <ResultCardTitle title={title} />
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground ml-2 max-[900px]:ml-0 max-[900px]:text-[13px]">
            {contents.map((content, i) => (
              <p key={i} className="relative pl-4 max-[900px]:pl-3">
                {(() => {
                  switch (cardType) {
                    case "pattern":
                      return (
                        <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-foreground/40" />
                      );

                    case "improve":
                      return (
                        <span className="absolute left-0 top-0 text-primary">
                          ✓
                        </span>
                      );

                    case "risk":
                      return (
                        <span className="absolute left-0 top-0 text-orange-500">
                          !
                        </span>
                      );

                    default:
                      return null;
                  }
                })()}

                {parseMarkedText(content, selectedCandidates)}
              </p>
            ))}
          </div>
        </article>
      </CommonAppCard>
    </CommonMotionDiv>
  );
}
