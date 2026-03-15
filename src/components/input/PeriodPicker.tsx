import type { Period } from "@/types/clientTypes";

type Props = {
  selected: Period;
  onClick: (period: Period) => void;
};

const periods: Period[] = ["month", "week", "day"];

export default function PeriodPicker({ selected, onClick }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">기준:</span>

      <div className="flex rounded-md border overflow-hidden text-xs">
        {periods.map((period) => (
          <button
            key={period}
            className={`px-3 py-[2px] transition-colors cursor-pointer ${
              selected === period
                ? "bg-primary text-white"
                : "bg-background text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => onClick(period)}
          >
            {period === "day" ? "일" : period === "week" ? "주" : "월"}
          </button>
        ))}
      </div>
    </div>
  );
}
