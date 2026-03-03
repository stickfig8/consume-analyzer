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

  function dummyData(): Expense[] {
    return [
      { id: crypto.randomUUID(), item: "쿠팡", price: 600000, memo: "식료품" },
      { id: crypto.randomUUID(), item: "월세", price: 600000, memo: "" },
      {
        id: crypto.randomUUID(),
        item: "니케 굿즈",
        price: 60000,
        memo: "니케 전시회",
      },
      { id: crypto.randomUUID(), item: "운동화", price: 100000, memo: "" },
      { id: crypto.randomUUID(), item: "군것질", price: 20000, memo: "두쫀쿠" },
      { id: crypto.randomUUID(), item: "청첩장 모임", price: 30000, memo: "" },
    ];
  }

  //const [expenses, setExpenses] = useState<Expense[]>([createEmptyExpense()]);
  const [expenses, setExpenses] = useState<Expense[]>(dummyData());

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
