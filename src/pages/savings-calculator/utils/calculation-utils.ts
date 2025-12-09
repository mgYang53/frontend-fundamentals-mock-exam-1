interface CalculationParams {
  monthlyAmount: number;
  savingsTerms: number;
  annualRate: number;
  targetAmount: number;
}

interface CalculationResults {
  expectedProfit: number;
  diffFromTargetAmount: number;
  recommendedMonthlyAmount: number;
}

export const calculateSavingsResults = ({
  monthlyAmount,
  savingsTerms,
  annualRate,
  targetAmount,
}: CalculationParams): CalculationResults => {
  const rateMultiplier = 1 + (annualRate / 100) * 0.5;

  const expectedProfit = monthlyAmount * savingsTerms * rateMultiplier;

  const diffFromTargetAmount = targetAmount - expectedProfit;

  const recommendedMonthlyAmount = savingsTerms > 0 ? targetAmount / (savingsTerms * rateMultiplier) : 0;

  return {
    expectedProfit,
    diffFromTargetAmount,
    recommendedMonthlyAmount: Math.round(recommendedMonthlyAmount / 1000) * 1000, // 1,000 단위 반올림
  };
};
