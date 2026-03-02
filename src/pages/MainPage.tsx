import MainContainer from "@/components/common/MainContainer";
import ExpenseInputSection from "@/components/mainPage/ExpenseInputSection";
import ResultSection from "@/components/result/ResultSection";
import MainHeroSection from "@/components/util/MainHeroSection";
import { useExpenseAnalysis } from "@/hooks/useExpenseAnalysis";
import { useExpenseInput } from "@/hooks/useExpenseInput";
import { useExpenseValidation } from "@/hooks/useExpenseValidation";

export default function MainPage() {
  const expenseInput = useExpenseInput();
  const analysis = useExpenseAnalysis();
  const validation = useExpenseValidation();

  function handleAnalyze() {
    const isVaild = validation.validate(expenseInput.expenses);

    if (!isVaild) return;

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
      <ResultSection resultReport={analysis.result} />
    </MainContainer>
  );
}
