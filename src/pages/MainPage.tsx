import MainContainer from "@/components/common/MainContainer";
import MainHeroSection from "@/components/layout/MainHeroSection";
import InputUtilitySection from "@/components/input/InputUtilitySection";
import ExpenseInputSection from "@/components/input/ExpenseInputSection";
import ResultModal from "@/components/result/ResultModal";

import { useMainService } from "@/hooks/useMainService";

export default function MainPage() {
  const {
    expenseInput,
    validation,
    analysis,
    isModalOpen,
    setIsModalOpen,
    handleAnalyze,
  } = useMainService();

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
