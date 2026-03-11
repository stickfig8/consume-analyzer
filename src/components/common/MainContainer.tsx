import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainContainer({ children }: Props) {
  return (
    <main className="max-w-[900px] w-full h-full mx-auto flex flex-col py-4 max-[900px]:px-3">
      {children}
    </main>
  );
}
