import MainContainer from "@/components/common/MainContainer";
import ExpenseInputSection from "@/components/mainPage/ExpenseInputSection";
import ResultModal from "@/components/result/ResultModal";
import MainHeroSection from "@/components/util/MainHeroSection";
import { useExpenseAnalysis } from "@/hooks/useExpenseAnalysis";
import { useExpenseInput } from "@/hooks/useExpenseInput";
import { useExpenseValidation } from "@/hooks/useExpenseValidation";
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
    analysis.analyze(expenseInput.expenses);
  }

  return (
    <MainContainer>
      <MainHeroSection />
      <ExpenseInputSection
        {...expenseInput}
        onAnalyze={() => {
          handleAnalyze();
        }}
        errors={validation.hasSubmitted ? validation.errors : {}}
        clearFieldError={validation.clearFieldError}
        shakeIds={validation.shakeIds}
      />
      <ResultModal
        isOpen={isModalOpen}
        status={analysis.status}
        result={analysis.result}
        error={analysis.error}
        onClose={() => setIsModalOpen(false)}
      />
    </MainContainer>
  );
}
