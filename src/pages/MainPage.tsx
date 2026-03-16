import MainContainer from "@/components/common/MainContainer";
import MainHeroSection from "@/components/layout/MainHeroSection";
import InputUtilitySection from "@/components/input/InputUtilitySection";
import ExpenseInputSection from "@/components/input/ExpenseInputSection";
import ResultModal from "@/components/result/ResultModal";

import { useExpenseAnalysis } from "@/hooks/useExpenseAnalysis";
import { useExpenseInput } from "@/hooks/useExpenseInput";
import { useExpenseValidation } from "@/hooks/useExpenseValidation";
import { useBlockOuterScroll } from "@/hooks/useBlockOuterScroll";
import { useState } from "react";

export default function MainPage() {
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

  return (
    <MainContainer>
      <MainHeroSection />
      <InputUtilitySection
        expenses={expenseInput.expenses}
        errorMessage={validation.errorMessage}
        addCard={expenseInput.addCard}
        onAnalyze={handleAnalyze}
        fillWithDummyData={expenseInput.fillWithDummyData}
        period={expenseInput.period}
        onPeriodClicked={expenseInput.setPeriod}
      />
      <ExpenseInputSection
        {...expenseInput}
        errors={validation.hasSubmitted ? validation.errors : {}}
        clearFieldError={validation.clearFieldError}
        shakeIds={validation.shakeIds}
      />
      {isModalOpen && (
        <ResultModal
          status={analysis.status}
          result={analysis.result}
          error={analysis.error}
          onClose={() => setIsModalOpen(false)}
          cancel={analysis.cancel}
        />
      )}
    </MainContainer>
  );
}
