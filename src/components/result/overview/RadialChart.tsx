import type { EmotionScore } from "@/types/responseTypes";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

type Props = {
  emotionScore: EmotionScore;
  unit: string;
  desc: string;
  isExporting: boolean;
};

export default function RadialChart({
  emotionScore,
  unit,
  desc,
  isExporting,
}: Props) {
  const chartData = [
    {
      name: "emotion",
      value: emotionScore.score,
      fill: `var(--${emotionScore.level})`,
    },
  ];
  return (
    <div className={`h-full emotion-${emotionScore.level}`}>
      <div className="h-full aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - (emotionScore.score / 100) * 360}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />

            <RadialBar
              dataKey="value"
              cornerRadius={50}
              background
              isAnimationActive={!isExporting}
            />

            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        className={`text-3xl font-bold mb-5`}
                        fill="var(--emotion-current)"
                      >
                        {emotionScore.score + unit}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        dy={24}
                        className="text-muted-foreground text-xs"
                      >
                        {desc}
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
