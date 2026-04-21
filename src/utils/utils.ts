import type { Period } from "@/types/clientTypes";

export function getToday(devide: string = "-") {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  return year + devide + month + devide + day;
}

export function parsePeriod(period: Period) {
  if (period === "monthly") return "월간 소비";
  else if (period === "weekly") return "주간 소비";
  else return "일간 소비";
}
