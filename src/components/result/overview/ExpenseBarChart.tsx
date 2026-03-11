import { getEmotionColor } from "@/lib/chartUtils";
import type { ExpenseSummary } from "@/types/clientTypes";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  summary: ExpenseSummary;
  score: number;
};
export default function ExpenseBarChart({ summary, score }: Props) {
  const chartData = [
    {
      type: "고정 소비",
      value: summary.prices.fixed,
      fill: "var(--fixed-color)",
    },
    {
      type: "루틴 소비",
      value: summary.prices.routine,
      fill: "var(--routine-color)",
    },
    {
      type: "감정 소비",
      value: summary.prices.emotional,
      fill: getEmotionColor(score),
    },
  ];

  return (
    <div className="w-full h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ right: 16 }}
        >
          <YAxis
            dataKey="type"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="value" type="number" hide />
          <Bar dataKey="value" layout="vertical" radius={4}>
            <LabelList
              dataKey="type"
              position="insideLeft"
              offset={8}
              className="fill-(--radial-color)"
              fontSize={12}
            />
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number) =>
                value.toLocaleString("ko-KR") + "원"
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
