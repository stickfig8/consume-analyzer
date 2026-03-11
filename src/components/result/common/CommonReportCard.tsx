import CommonAppCard from "@/components/common/CommonAppCard";
import ResultCardTitle from "./ResultCardTitle";

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
  return (
    <CommonAppCard>
      <article className="w-full h-fit flex flex-col gap-5 p-3">
        <ResultCardTitle title={title} />
        <div className="ml-2 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
          {contents.map((content, i) => (
            <p key={i} className="relative pl-4">
              {isImprove ? (
                <span className="absolute left-0 top-0 text-primary">✓</span>
              ) : (
                <span className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-foreground/40" />
              )}

              {content}
            </p>
          ))}
        </div>
      </article>
    </CommonAppCard>
  );
}
