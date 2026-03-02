import { useEffect, useRef } from "react";

export function useOverflowScroll(dependency: number) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const threshold = 20;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    if (isNearBottom) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [dependency]);
  return ref;
}
