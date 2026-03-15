import type { Expense, Period } from "@/types/clientTypes";
import CommonButton from "../common/CommonButton";
import AddCard from "./AddCard";
import UsageTooltip from "./UsageTooltip";
import PeriodPicker from "./PeriodPicker";

type Props = {
  expenses: Expense[];
  errorMessage: String | null;
  addCard: () => void;
  onAnalyze: () => void;
  fillWithDummyData: () => void;
  period: Period;
  onPeriodClicked: (period: Period) => void;
};

export default function InputUtilitySection({
  expenses,
  errorMessage,
  addCard,
  onAnalyze,
  fillWithDummyData,
  period,
  onPeriodClicked,
}: Props) {
  const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
  return (
    <section className="w-full flex flex-col gap-4 mt-5 mb-2 px-1">
      <div className="w-full flex justify-between items-center">
        <PeriodPicker selected={period} onClick={onPeriodClicked} />
        <div className="flex gap-2">
          <UsageTooltip onTestClick={fillWithDummyData} />
          <AddCard onClick={addCard} />
          <CommonButton text="분석하기" onClick={onAnalyze} />
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-muted-foreground text-xs">{`총액: ${total.toLocaleString("ko-KR")} 원`}</p>

        {errorMessage && (
          <p className="text-xs text-red-500 max-[700px]:text-[10px]">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
