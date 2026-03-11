import { getEmotionClass } from "@/utils/chartUtils";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

type Props = {
  score: number;
  unit: string;
  desc: string;
};

export default function RadialChart({ score, unit, desc }: Props) {
  const chartData = [
    {
      name: "emotion",
      value: score,
      fill: "var(--radial-color)",
    },
  ];
  return (
    <div className={`${getEmotionClass(score)} h-full`}>
      <div className="h-full aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - (score / 100) * 360}
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

            <RadialBar dataKey="value" cornerRadius={50} background />

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
                      <tspan className="text-3xl font-bold mb-5">
                        {score + unit}
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
