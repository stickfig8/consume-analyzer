import type { Expense, ExpenseError } from "@/types/clientTypes";
import { Input } from "../ui/input";
import { CircleMinus } from "lucide-react";
import CommonAppCard from "../common/CommonAppCard";

type Props = {
  data: Expense;
  onChange: (id: string, field: keyof Expense, value: string | number) => void;
  onRemove: (id: string) => void;

  error: ExpenseError;
  shouldShake: boolean;
  clearFieldError: (id: string, field: keyof ExpenseError) => void;
};

export default function PriceInputCard({
  data,
  onChange,
  onRemove,
  error,
  shouldShake,
  clearFieldError,
}: Props) {
  return (
    <CommonAppCard className={`${shouldShake ? "shake" : ""}`}>
      <div className="w-full flex px-3 justify-between items-center gap-4 h-16">
        <div className="cursor-pointer" onClick={() => onRemove(data.id)}>
          <CircleMinus className="text-red-500 w-4 h-4" />
        </div>

        <Input
          type="text"
          value={data.item}
          onChange={(e) => {
            onChange(data.id, "item", e.target.value);
            clearFieldError(data.id, "item");
          }}
          placeholder="품목 / 구매처"
          className={`w-50 ${error?.item ? "border-red-500" : ""}`}
        />

        <div className="w-fit relative">
          <Input
            type="text"
            inputMode="numeric"
            value={data.price.toLocaleString("ko-KR")}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              const numeric = Number(raw);

              if (!isNaN(numeric) && numeric >= 0) {
                onChange(data.id, "price", numeric);
              }

              clearFieldError(data.id, "price");
            }}
            placeholder="가격"
            className={`w-50 pr-7 text-right ${
              error?.price ? "border-red-500" : ""
            }`}
          />

          <p className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            원
          </p>
        </div>

        <Input
          type="text"
          value={data.memo}
          onChange={(e) => onChange(data.id, "memo", e.target.value)}
          placeholder="메모"
          className="w-50"
        />
      </div>
    </CommonAppCard>
  );
}
