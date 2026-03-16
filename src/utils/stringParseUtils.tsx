import { getEmotionLevelByScore } from "./calculateUtils";
import React from "react";

type HighlightToken =
  | { type: "text"; value: string }
  | { type: "money"; value: string }
  | { type: "percent"; value: string }
  | { type: "score"; value: string }
  | { type: "category"; value: string }
  | { type: "candidate"; value: string }
  | { type: "structure"; value: string }
  | { type: "risk"; value: string };

const CATEGORY_REGEX =
  /(고정 소비|고정 지출|일상 소비|일상 지출|감정 소비|감정 지출)/;
const MONEY_REGEX = /\d{1,3}(?:,\d{3})*원/;
const PERCENT_REGEX = /\d+(?:\.\d+)?%/;
const SCORE_REGEX = /\d+(?:\.\d+)?점/;
const STRUCTURE_REGEX =
  /(감정 우세형|구조 안정형|루틴 주도형|관리 안정형|균형형)/;
const RISK_REGEX = /(안정 단계|주의 단계|경계 단계|위험 단계)/;

export function parseMarkedText(
  text: string,
  candidates: string[] = [],
): React.ReactNode[] {
  if (!text) return [];

  // candidates 긴 문자열 우선 정렬
  const sortedCandidates = [...candidates].sort((a, b) => b.length - a.length);

  // 하나의 통합 정규식 생성
  const candidatePattern = sortedCandidates.length
    ? sortedCandidates.map((c) => escapeRegex(c)).join("|")
    : null;

  const combinedRegex = new RegExp(
    [
      candidatePattern,
      CATEGORY_REGEX.source,
      MONEY_REGEX.source,
      PERCENT_REGEX.source,
      SCORE_REGEX.source,
      STRUCTURE_REGEX.source,
      RISK_REGEX.source,
    ]
      .filter(Boolean)
      .join("|"),
    "g",
  );

  const tokens: HighlightToken[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(combinedRegex)) {
    const matchText = match[0];
    const index = match.index ?? 0;

    // 앞 일반 텍스트
    if (index > lastIndex) {
      tokens.push({
        type: "text",
        value: text.slice(lastIndex, index),
      });
    }

    // 타입 판별
    if (sortedCandidates.includes(matchText)) {
      tokens.push({ type: "candidate", value: matchText });
    } else if (CATEGORY_REGEX.test(matchText)) {
      tokens.push({ type: "category", value: matchText });
    } else if (MONEY_REGEX.test(matchText)) {
      tokens.push({ type: "money", value: matchText });
    } else if (PERCENT_REGEX.test(matchText)) {
      tokens.push({ type: "percent", value: matchText });
    } else if (SCORE_REGEX.test(matchText)) {
      tokens.push({ type: "score", value: matchText });
    } else if (STRUCTURE_REGEX.test(matchText)) {
      tokens.push({ type: "structure", value: matchText });
    } else if (RISK_REGEX.test(matchText)) {
      tokens.push({ type: "risk", value: matchText });
    } else {
      tokens.push({ type: "text", value: matchText });
    }

    lastIndex = index + matchText.length;
  }

  // 마지막 남은 텍스트
  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  // ReactNode로 변환
  return tokens.map((token, index) => {
    switch (token.type) {
      case "money":
        return (
          <span key={index} className="text-slate-800 font-bold">
            {token.value}
          </span>
        );

      case "percent": {
        const color = getPercentColor(token.value);
        return (
          <span key={index} className={`${color} font-semibold`}>
            {token.value}
          </span>
        );
      }

      case "score": {
        const numeric = Number(token.value.replace("점", ""));

        return (
          <span
            key={index}
            style={{ color: `var(--${getEmotionLevelByScore(numeric)})` }}
            className={`font-semibold underline underline-offset-2`}
          >
            {token.value}
          </span>
        );
      }

      case "category":
        return (
          <span key={index} className="text-primary font-semibold">
            {token.value}
          </span>
        );

      case "candidate":
        return (
          <span
            key={index}
            className="bg-blue-500 text-white px-[3px] mx-[2px] rounded-[2px] font-medium"
          >
            {token.value}
          </span>
        );
      case "structure":
        return (
          <span
            key={index}
            className="text-slate-900 font-semibold tracking-wide"
          >
            [{token.value}]
          </span>
        );

      case "risk":
        return (
          <span
            key={index}
            className="text-slate-900 font-semibold tracking-wide"
          >
            "{token.value}"
          </span>
        );
      default:
        return <React.Fragment key={index}>{token.value}</React.Fragment>;
    }
  });
}

//정규식 특수문자 이스케이프
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getPercentColor(percentText: string) {
  const numeric = Number(percentText.replace("%", ""));

  if (isNaN(numeric)) return "text-purple-500";

  if (numeric < 20) return "text-emerald-500"; // 초록
  if (numeric < 40) return "text-yellow-500"; // 노랑
  if (numeric < 60) return "text-orange-500"; // 주황
  return "text-red-500"; // 빨강
}
