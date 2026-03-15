import CommonAppCard from "@/components/common/CommonAppCard";
import ResultCardTitle from "./ResultCardTitle";
import CommonMotionDiv from "./CommonMotionDiv";
import { parseMarkedText } from "@/utils/stringParseUtils";

type Props = {
  title: string;
  contents: string[];
  isImprove?: boolean;
};
export default function CommonReportCard({
  title,
  contents,
  isImprove = false,
}: Props) {
  const delay = isImprove ? 4.0 : 2.5;
  return (
    <CommonMotionDiv delay={delay}>
      <CommonAppCard>
        <article className="w-full h-fit flex flex-col gap-5 p-3">
          <ResultCardTitle title={title} />
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground ml-2 max-[900px]:ml-0 max-[900px]:text-[13px] max-[900px]:gap-1">
            {contents.map((content, i) => (
              <p key={i} className="relative pl-4 max-[900px]:pl-3">
                {isImprove ? (
                  <span className="absolute left-0 top-0 text-primary">✓</span>
                ) : (
                  <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-foreground/40" />
                )}

                {parseMarkedText(content)}
              </p>
            ))}
          </div>
        </article>
      </CommonAppCard>
    </CommonMotionDiv>
  );
}
