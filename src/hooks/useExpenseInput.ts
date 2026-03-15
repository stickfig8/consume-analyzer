import { dummyData } from "@/configs/dummyData";
import type { Period, Expense } from "@/types/clientTypes";
import { useState } from "react";

export function useExpenseInput() {
  const [expenses, setExpenses] = useState<Expense[]>(
    Array.from({ length: 5 }, () => createEmptyExpense()),
  );

  const [period, setPeriod] = useState<Period>("month");

  function createEmptyExpense(): Expense {
    return {
      id: crypto.randomUUID(),
      item: "",
      price: 0,
      memo: "",
    };
  }

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

  function fillWithDummyData() {
    setExpenses(dummyData);
  }

  return {
    expenses,
    addCard,
    updateExpense,
    removeExpense,
    fillWithDummyData,

    period,
    setPeriod,
  };
}
