import type { ReactNode } from "react";
import styled from "@emotion/styled";

type Props = {
  children: ReactNode;
};

const StyledContainer = styled.main`
  max-width: 900px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding-top: 16px;
  padding-bottom: 16px;
`;

export default function MainContainer({ children }: Props) {
  return <StyledContainer>{children}</StyledContainer>;
}
