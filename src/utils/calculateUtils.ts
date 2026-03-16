import { categoryWeight } from "@/configs/candidateConfigs";
import type {
  EmotionLevel,
  EmotionScore,
  Expense,
  ExpenseSummary,
  ImproveCandidate,
} from "@/types/clientTypes";
import type { LLMClassification } from "@/types/responseTypes";

export function calculateSummary(
  expenses: Expense[],
  classificationResult: LLMClassification[],
): ExpenseSummary {
  const categoryPrices = {
    fixed: 0,
    routine: 0,
    emotional: 0,
  };

  classificationResult.forEach((item) => {
    const expense = expenses.find((expense) => expense.id === item.id);
    if (!expense) return;

    categoryPrices[item.category] += expense.price;
  });

  const total =
    categoryPrices.fixed + categoryPrices.routine + categoryPrices.emotional;

  const percentage = {
    fixed: total ? Math.round((categoryPrices.fixed / total) * 100) : 0,
    routine: total ? Math.round((categoryPrices.routine / total) * 100) : 0,
    emotional: total ? Math.round((categoryPrices.emotional / total) * 100) : 0,
  };

  return {
    totalExpense: total,
    prices: categoryPrices,
    percentage,
  };
}

export function getEmotionLevelByScore(score: number): EmotionLevel {
  if (score < 20) return "low";
  else if (score < 40) return "mediumLow";
  else if (score < 60) return "medium";
  else if (score < 80) return "mediumHigh";
  else return "high";
}

export function calculateEmotion(summary: ExpenseSummary): EmotionScore {
  const emotional = summary.percentage.emotional;

  let baseScore = emotional * 2; // 기본 2배

  if (emotional > summary.percentage.routine) {
    baseScore += 10;
  }

  if (emotional > summary.percentage.fixed) {
    baseScore += 15;
  }

  const score = Math.min(100, Math.round(baseScore));

  const level = getEmotionLevelByScore(score);

  return {
    score,
    level,
  };
}

export function extractCandidates(
  expenses: Expense[],
  classification: LLMClassification[],
  totalExpense: number,
): ImproveCandidate[] {
  // 소비에 classification추가
  const merged = expenses.map((expense) => ({
    ...expense,
    category: classification.find((item) => item.id === expense.id)?.category,
  }));

  // item 기준 정렬
  const grouped: Record<
    string,
    { item: string; total: number; category: string }
  > = {};

  merged.forEach((expense) => {
    if (!grouped[expense.item]) {
      grouped[expense.item] = {
        item: expense.item,
        total: 0,

        category: expense.category!,
      };
    }

    grouped[expense.item].total += expense.price;
  });

  // 비율 기반 점수 계산
  const candidates = Object.values(grouped).map((item) => {
    const weight =
      categoryWeight[item.category as keyof typeof categoryWeight] ?? 0.5;

    const impact = item.total / totalExpense;

    return {
      ...item,
      impact,
      adjustScore: impact / weight,
    };
  });

  // 상위 4개 추출
  return candidates.sort((a, b) => b.adjustScore - a.adjustScore).slice(0, 4);
}
