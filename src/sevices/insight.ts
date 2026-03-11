import axios from "axios";
import type { InsightPayload } from "@/types/clientTypes";
import type { LLMInsight } from "@/types/responseTypes";
import { HttpError } from "@/types/errorTypes";
import { retry } from "@/utils/fetchUtils";

export async function requestInsight(
  data: InsightPayload,
  signal?: AbortSignal,
): Promise<LLMInsight> {
  return retry(async () => {
    try {
      const res = await axios.post("/api/insight", data, {
        signal,
      });

      return res.data;
    } catch (err: any) {
      // 요청 취소
      if (axios.isCancel(err) || err.name === "CanceledError") {
        throw new HttpError("Request cancelled", 499);
      }

      // 서버 응답 에러
      if (err.response) {
        throw new HttpError("Insight request failed", err.response.status);
      }

      // 기타 네트워크 에러
      throw err;
    }
  });
}
