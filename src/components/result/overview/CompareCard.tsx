import type { ExpenseSummary } from "@/types/clientTypes";
import ExpenseBarChart from "./ExpenseBarChart";

type Props = {
  summary: ExpenseSummary;
  score: number;
};
export default function CompareCard({ summary, score }: Props) {
  return (
    <div className="w-full flex flex-col gap-5 justify-center relative max-[600px]:hidden">
      <ExpenseBarChart summary={summary} score={score} />
      <p className="text-sm text-muted-foreground">{`총 소비액: ${summary.totalExpense.toLocaleString("ko-KR")}원`}</p>
    </div>
  );
}
