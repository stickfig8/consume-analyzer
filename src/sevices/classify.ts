import axios from "axios";
import type { Expense } from "@/types/clientTypes";
import type { LLMClassification } from "@/types/responseTypes";
import { HttpError } from "@/types/errorTypes";
import { retry } from "@/utils/fetchUtils";

export async function requestClassify(
  expenses: Expense[],
  signal?: AbortSignal,
): Promise<LLMClassification[]> {
  return retry(async () => {
    try {
      const res = await axios.post(
        "/api/classify",
        expenses.map(({ id, item, memo }) => ({
          id,
          item,
          memo,
        })),
        { signal },
      );

      return res.data;
    } catch (err: any) {
      if (axios.isCancel(err)) {
        throw new HttpError("Request cancelled", 499);
      }

      if (err.response) {
        throw new HttpError("Classify request failed", err.response.status);
      }

      throw err;
    }
  });
}
