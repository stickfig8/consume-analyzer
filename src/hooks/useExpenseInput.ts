import type { Expense } from "@/types/clientTypes";
import { useState } from "react";

export function useExpenseInput() {
  function createEmptyExpense(): Expense {
    return {
      id: crypto.randomUUID(),
      item: "",
      price: 0,
      memo: "",
    };
  }

  const [expenses, setExpenses] = useState<Expense[]>([createEmptyExpense()]);

  function addCard() {
    setExpenses((prev) => [...prev, createEmptyExpense()]);
  }

  function updateExpense(
    id: string,
    field: keyof Expense,
    value: string | number,
  ) {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense,
      ),
    );
  }

  function removeExpense(id: string) {
    setExpenses((prev) =>
      prev.length > 1 ? prev.filter((expense) => expense.id !== id) : prev,
    );
  }

  return {
    expenses,
    addCard,
    updateExpense,
    removeExpense,
  };
}
