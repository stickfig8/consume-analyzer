import type { Expense } from "@/types/clientTypes";
import type { LLMClassification } from "@/types/responseTypes";

export async function requestClassify(
  expenses: Expense[],
): Promise<LLMClassification[]> {
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
