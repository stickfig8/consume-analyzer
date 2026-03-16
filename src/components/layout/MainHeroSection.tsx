import CommonAppCard from "../common/CommonAppCard";

export default function MainHeroSection() {
  return (
    <CommonAppCard className="mb-6">
      <section className="w-full py-10 flex flex-col items-center text-center gap-6">
        <span className="text-sm px-3 py-1 bg-muted rounded-full max-[700px]:text-xs">
          AI 소비 구조 분석 리포트
        </span>

        <h1 className="text-5xl font-bold leading-tight max-[700px]:text-3xl">
          숫자 뒤에 숨은 <br />
          <span className="text-primary">소비 구조를 해석합니다</span>
        </h1>

        <p className="text-muted-foreground max-w-xl max-[700px]:text-sm">
          지출 데이터를 기반으로 감정 소비 수준, 구조 유형, 향후 리스크를
          분석합니다.
        </p>
      </section>
    </CommonAppCard>
  );
}
