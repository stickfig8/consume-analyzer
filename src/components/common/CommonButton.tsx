import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  width?: string;
  height?: string;
  className?: string;
  onClick: () => void;
};

export default function CommonButton({
  text,
  width = "20",
  height = "8",
  className,
  onClick,
}: Props) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        `w-${width} h-${height} cursor-pointer `,
        "rounded-md border shadow-sm ",
        "transition-all duration-200",
        "hover:shadow-md",
        className,
      )}
    >
      {text}
    </Button>
  );
}
