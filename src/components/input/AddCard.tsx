import { Plus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  onClick: () => void;
};

export default function AddCard({ onClick }: Props) {
  return (
    <Button
      className="bg-[var(--fixed-color)] hover:bg-[var(--fixed-color)]/80 cursor-pointer w-12 h-8"
      onClick={onClick}
    >
      <Plus className="h-full" />
    </Button>
  );
}
