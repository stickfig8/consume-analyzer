import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import CommonButton from "../common/CommonButton";

type Props = {
  onTestClick: () => void;
};

export default function UsageTooltip({ onTestClick }: Props) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors mr-2">
            <Info className="w-4 h-4" />
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          align="start"
          className="w-fit p-5 rounded-xl shadow-xl border bg-popover [&_svg]:hidden!"
        >
          <div className="flex flex-col gap-3">
            {/* 제목 */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-tight">
                소비 분석 사용 방법
              </h3>
              <p className="text-xs text-muted-foreground mt-4">
                항목과 금액을 입력하면 소비 패턴을 분석합니다.
              </p>
            </div>

            {/* 설명 */}
            <div className="flex flex-col gap-2 text-xs text-muted-foreground leading-relaxed">
              <p>• 품목과 가격은 반드시 입력해야 합니다.</p>
              <p>• 메모는 선택 입력입니다.</p>
              <p>• 분석 결과는 감정 소비 지수와 패턴을 제공합니다.</p>
            </div>

            {/* 구분선 */}
            <div className="border-t border-border/60" />

            {/* 테스트 버튼 */}
            <CommonButton onClick={onTestClick} text="샘플 데이터 입력" />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
