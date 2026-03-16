import { useExpenseAnalysis } from "@/hooks/useExpenseAnalysis";
import { useExpenseInput } from "@/hooks/useExpenseInput";
import { useExpenseValidation } from "@/hooks/useExpenseValidation";
import { useBlockOuterScroll } from "@/hooks/useBlockOuterScroll";
import { useState } from "react";

export function useMainService() {
  const expenseInput = useExpenseInput();

  const validation = useExpenseValidation();

  const analysis = useExpenseAnalysis();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAnalyze() {
    const isVaild = validation.validate(expenseInput.expenses);

    if (!isVaild) return;

    setIsModalOpen(true);
    analysis.analyze(expenseInput.expenses, expenseInput.period);
  }

  useBlockOuterScroll(isModalOpen);

  return {
    expenseInput,
    validation,
    analysis,
    isModalOpen,
    setIsModalOpen,
    handleAnalyze,
  };
}
