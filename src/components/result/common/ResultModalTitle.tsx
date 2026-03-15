import type { Period } from "@/types/clientTypes";
import { getToday, parsePeriod } from "@/utils/utils";

type Props = {
  period: Period;
};
export default function ResultModalTitle({ period }: Props) {
  return (
    <header className="w-full flex flex-col gap-1 mt-2 justify-center items-center">
      <h1 className="text-lg">분석 결과</h1>

      <p className="text-sm text-muted-foreground">{getToday()}</p>
      <p className="text-xs text-slate-500">{`분석 기준: ${parsePeriod(period)}`}</p>
    </header>
  );
}
