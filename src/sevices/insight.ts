import type { InsightPayload } from "@/types/clientTypes";
import { HttpError } from "@/types/errorTypes";
import type { LLMInsight } from "@/types/responseTypes";
import { retry } from "@/utils/fetchUtils";

export async function requestInsight(
  data: InsightPayload,
): Promise<LLMInsight> {
  return retry(async () => {
    const res = await fetch("/api/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (!res.ok) {
        throw new HttpError("Insight request failed", res.status);
      }
    }

    return res.json();
  });
}
