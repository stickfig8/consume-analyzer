import { getEmotionColor } from "@/utils/chartUtils";
import type { ExpenseSummary } from "@/types/clientTypes";

type Props = {
  summary: ExpenseSummary;
  score: number;
};

export default function MobileCompareCompact({ summary, score }: Props) {
  const data = [
    {
      type: "고정 소비",
      price: summary.prices.fixed,
      percent: summary.percentage.fixed,
      color: "var(--fixed-color)",
    },
    {
      type: "루틴 소비",
      price: summary.prices.routine,
      percent: summary.percentage.routine,
      color: "var(--routine-color)",
    },
    {
      type: "감정 소비",
      price: summary.prices.emotional,
      percent: summary.percentage.emotional,
      color: getEmotionColor(score),
      highlight: true,
    },
  ];

  return (
    <div className="hidden w-full flex-col divide-y divide-border/60 max-[600px]:flex">
      {data.map((item) => (
        <div
          key={item.type}
          className="flex items-center justify-between py-2 text-sm"
        >
          {/* 타입 */}
          <span
            className="font-medium"
            style={{
              color: item.highlight ? item.color : undefined,
            }}
          >
            {item.type}
          </span>

          {/* 금액 */}
          <span className="font-semibold">
            {item.price.toLocaleString("ko-KR")}원
          </span>

          {/* 비율 */}
          <span
            className="text-muted-foreground text-xs min-w-[36px] text-right"
            style={{
              color: item.highlight ? item.color : undefined,
            }}
          >
            {item.percent}%
          </span>
        </div>
      ))}
    </div>
  );
}
