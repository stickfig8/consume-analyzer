import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
type Props = {
  isExporting: boolean;
  onClose: () => void;
  onSave: () => void;
  onExport: () => void;
};

export default function ModalButtons({
  isExporting,
  onClose,
  onSave,
  onExport,
}: Props) {
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
        className="bg-[var(--sub-button)] hover:bg-[var(--sub-button)]/80  cursor-pointer"
        disabled={isExporting}
        onClick={onExport}
      >
        <Download />
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
