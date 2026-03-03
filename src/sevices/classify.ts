import type { Expense } from "@/types/clientTypes";
import { HttpError } from "@/types/errorTypes";
import type { LLMClassification } from "@/types/responseTypes";
import { retry } from "@/utils/fetchUtils";

export async function requestClassify(
  expenses: Expense[],
): Promise<LLMClassification[]> {
  return retry(async () => {
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
      if (!res.ok) {
        throw new HttpError("Classify request failed", res.status);
      }
    }

    return res.json();
  });
}
