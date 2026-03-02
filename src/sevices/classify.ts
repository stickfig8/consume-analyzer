import type { Expense } from "@/types/clientTypes";

export async function classifyExpenses(expenses: Expense[]) {
  const res = await fetch("/api/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      expenses.map(({ id, item, memo }) => ({
        id,
        item,
        memo,
      })),
    ),
  });

  if (!res.ok) {
    throw new Error("Classification failed");
  }

  return res.json();
}
