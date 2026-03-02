import { useState } from "react";
import type { Expense, ExpenseError } from "@/types/clientTypes";

export function useExpenseValidation() {
  const [errors, setErrors] = useState<Record<string, ExpenseError>>({});

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [shakeIds, setShakeIds] = useState<string[]>([]);

  function validate(expenses: Expense[]) {
    setHasSubmitted(true);
    const newErrors: Record<string, ExpenseError> = {};
    let hasError = false;

    expenses.forEach((expense) => {
      const error: ExpenseError = {};

      if (!expense.item.trim()) {
        error.item = true;
        hasError = true;
      }

      if (!expense.price || expense.price <= 0) {
        error.price = true;
        hasError = true;
      }

      if (Object.keys(error).length > 0) {
        newErrors[expense.id] = error;
      }
    });

    setErrors(newErrors);

    if (hasError) {
      const ids = Object.keys(newErrors);
      setShakeIds(ids);

      setTimeout(() => {
        setShakeIds([]); // animation 다시 트리거 가능하게 초기화
      }, 400);
    }

    return !hasError;
  }

  function clearFieldError(id: string, field: keyof ExpenseError) {
    setErrors((prev) => {
      const copy = { ...prev };

      if (copy[id]) {
        delete copy[id][field];

        if (Object.keys(copy[id]).length === 0) {
          delete copy[id];
        }
      }

      return copy;
    });
  }

  return {
    errors,
    hasSubmitted,
    shakeIds,
    validate,
    clearFieldError,
  };
}
