import { Button } from "@/components/ui/button";
import type { LoadingStatus } from "@/types/clientTypes";

type Props = {
  status: LoadingStatus;
  onCancel: () => void;
};
export default function LoadingIndicator({ status, onCancel }: Props) {
  const progressMap = {
    classifying: 10,
    calculating: 30,
    insighting: 70,
  };
  const message = {
    classifying: "🔎 소비 항목을 분류하는 중입니다...",
    calculating: "📊 소비 구조를 계산하는 중입니다...",
    insighting: "🧠 소비 패턴을 분석하는 중입니다...",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <p className="text-lg font-medium animate-pulse">{message[status]}</p>

      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progressMap[status]}%` }}
        />
      </div>

      <Button
        onClick={onCancel}
        className="bg-[var(--sub-button)] hover:bg-[var(--sub-button)]/80 cursor-pointer"
      >
        취소하기
      </Button>
    </div>
  );
}
