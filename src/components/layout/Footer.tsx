import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <footer className="p-3 mx-auto w-full border-t mt-10">
      <GithubIcon />
      <div className="text-center text-sm mt-3">
        Copyright © 2026 Hyeongyu Kim
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        본 서비스는 AI 기반 분석을 제공합니다.
      </p>
    </footer>
  );
}
