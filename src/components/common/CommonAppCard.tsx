import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CommonAppCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white shadow-sm w-full",
        "transition-all duration-200",
        "hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
