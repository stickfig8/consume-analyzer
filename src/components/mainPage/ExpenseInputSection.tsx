import PriceInputCard from "../user/PriceInputCard";
import AddCard from "../user/AddCard";
import type { Expense, ExpenseError } from "@/types/clientTypes";
import CommonButton from "../common/CommonButton";
import { useOverflowScroll } from "@/hooks/useOverflowScroll";

type Props = {
  expenses: Expense[];
  addCard: () => void;
  updateExpense: (...args: any) => void;
  removeExpense: (...args: any) => void;
  onAnalyze: () => void;

  errors: Record<string, ExpenseError>;
  shakeIds: string[];
  clearFieldError: (id: string, field: keyof ExpenseError) => void;
};

export default function ExpenseInputSection({
  expenses,
  addCard,
  updateExpense,
  removeExpense,
  onAnalyze,
  errors,
  shakeIds,
  clearFieldError,
}: Props) {
  const total = expenses.reduce((sum, expense) => sum + expense.price, 0);
  const ref = useOverflowScroll(expenses.length);
  return (
    <section className="flex flex-col">
      {/* 상단 바 */}
      <div className="w-full flex justify-between my-5 px-1 items-end">
        <p className="text-muted-foreground text-xs">{`총액: ${total.toLocaleString("ko-KR")} 원`}</p>
        <div className="flex gap-3">
          <AddCard onClick={addCard} />
          <CommonButton text="분석하기" onClick={onAnalyze} />
        </div>
      </div>

      <div ref={ref} className="flex flex-col gap-2 max-h-100 overflow-y-auto">
        {expenses.map((expense) => (
          <PriceInputCard
            key={expense.id}
            data={expense}
            onChange={updateExpense}
            onRemove={removeExpense}
            error={errors[expense.id]}
            shouldShake={shakeIds.includes(expense.id)}
            clearFieldError={clearFieldError}
          />
        ))}
      </div>
    </section>
  );
}
