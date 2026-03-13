import type { Expense } from "@/types/clientTypes";
import CommonButton from "../common/CommonButton";
import AddCard from "./AddCard";
import UsageTooltip from "./UsageTooltip";

type Props = {
  expenses: Expense[];
  errorMessage: String | null;
  addCard: () => void;
  onAnalyze: () => void;
  fillWithDummyData: () => void;
};

export default function InputUtilitySection({
  expenses,
  errorMessage,
  addCard,
  onAnalyze,
  fillWithDummyData,
}: Props) {
  const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
  return (
    <section className="w-full flex justify-between my-5 px-1 items-end max-[700px]:items-center">
      <div className="flex gap-6 max-[700px]:flex-col max-[700px]:gap-1">
        <p className="text-muted-foreground text-xs">{`총액: ${total.toLocaleString("ko-KR")} 원`}</p>
        {errorMessage && (
          <p className="text-xs text-red-500 max-[700px]:text-[10px]">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <UsageTooltip onTestClick={fillWithDummyData} />
        <AddCard onClick={addCard} />
        <CommonButton text="분석하기" onClick={onAnalyze} />
      </div>
    </section>
  );
}
