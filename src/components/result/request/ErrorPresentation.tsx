import { Button } from "@/components/ui/button";

type Props = {
  error: string | null;
  onClose: () => void;
};
export default function ErrorPresentation({ error, onClose }: Props) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg text-semibold text-red-500">{error}</p>
        <p className="text-sm text-muted-foreground">
          잠시 후 다시 시도해주세요.
        </p>
      </div>

      <Button
        className="bg-[var(--sub-button)] hover:bg-[var(--sub-button)]/80 cursor-pointer !text-xs w-20 h-7 rounded-[4px]"
        onClick={onClose}
      >
        취소하기
      </Button>
    </div>
  );
}
