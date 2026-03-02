import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function AddCard({ onClick }: Props) {
  return (
    <button
      className="w-20 h-8 bg-green-400 flex justify-center items-center rounded-md shadow-md hover:brightness-95 cursor-pointer"
      onClick={onClick}
    >
      <Plus className="h-full" />
    </button>
  );
}
