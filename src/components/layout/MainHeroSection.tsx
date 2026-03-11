import CommonAppCard from "../common/CommonAppCard";

export default function MainHeroSection() {
  return (
    <CommonAppCard className="mb-6">
      <section className="w-full py-10 flex flex-col items-center text-center gap-6">
        <span className="text-sm px-3 py-1 bg-muted rounded-full">
          AI 소비 분석 서비스
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          숫자만 입력하면 <br />
          <span className="text-primary">소비 패턴을 읽어드립니다</span>
        </h1>

        <p className="text-muted-foreground max-w-xl">
          총 지출, 감정 소비 지수, 소비 성향까지 AI가 리포트 형태로
          분석해드립니다.
        </p>
      </section>
    </CommonAppCard>
  );
}
