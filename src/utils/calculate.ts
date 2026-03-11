import type {
  EmotionLevel,
  EmotionScore,
  Expense,
  ExpenseSummary,
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

export function calculateEmotion(summary: ExpenseSummary): EmotionScore {
  const emotional = summary.percentage.emotional;

  let level: EmotionLevel;

  if (emotional <= 20) {
    level = "low";
  } else if (emotional <= 35) {
    level = "mediumLow";
  } else if (emotional <= 50) {
    level = "medium";
  } else if (emotional <= 65) {
    level = "mediumHigh";
  } else {
    level = "high";
  }

  return {
    score: Math.round(emotional),
    level,
  };
}
