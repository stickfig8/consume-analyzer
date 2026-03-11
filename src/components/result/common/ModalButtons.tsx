import { Button } from "@/components/ui/button";
type Props = {
  isExporting: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function ModalButtons({ isExporting, onClose, onSave }: Props) {
  return (
    <div
      className={`w-full flex justify-end gap-2 mt-5 ${isExporting ? "hidden" : ""}`}
    >
      <Button
        className="bg-[var(--sub-button)] hover:bg-[var(--sub-button)]/80 cursor-pointer"
        onClick={onClose}
      >
        취소하기
      </Button>
      <Button
        className="cursor-pointer"
        disabled={isExporting}
        onClick={onSave}
      >
        저장하기
      </Button>
    </div>
  );
}
