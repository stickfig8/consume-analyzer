import type { Period } from "@/types/clientTypes";

export function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function parsePeriod(period: Period) {
  if (period === "month") return "월간 소비";
  else if (period === "week") return "주간 소비";
  else return "일간 소비";
}
