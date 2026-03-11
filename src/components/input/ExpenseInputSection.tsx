import PriceInputCard from "./PriceInputCard";
import type { Expense, ExpenseError } from "@/types/clientTypes";

type Props = {
  expenses: Expense[];
  updateExpense: (...args: any) => void;
  removeExpense: (...args: any) => void;
  errors: Record<string, ExpenseError>;
  shakeIds: string[];
  clearFieldError: (id: string, field: keyof ExpenseError) => void;
};

export default function ExpenseInputSection({
  expenses,
  updateExpense,
  removeExpense,
  errors,
  shakeIds,
  clearFieldError,
}: Props) {
  return (
    <section className="flex flex-col min-h-70">
      <div className="flex flex-col gap-2 ">
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
