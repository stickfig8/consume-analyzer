import { getToday } from "@/utils/utils";

export default function ResultModalTitle() {
  return (
    <header className="w-full flex flex-col gap-1 mt-2 justify-center items-center">
      <h1>분석 결과</h1>
      <p className="text-xs text-muted-foreground">{getToday()}</p>
    </header>
  );
}
