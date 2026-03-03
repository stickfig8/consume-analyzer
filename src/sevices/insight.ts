import type { InsightPayload } from "@/types/clientTypes";
import type { LLMInsight } from "@/types/responseTypes";

export async function requestInsight(
  data: InsightPayload,
): Promise<LLMInsight> {
  const res = await fetch("/api/insight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Insight request failed");
  }

  return res.json();
}
