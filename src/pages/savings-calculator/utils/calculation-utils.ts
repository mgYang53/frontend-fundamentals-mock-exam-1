export interface CalculationParams {
  monthlyAmount: number;
  savingsTerms: number;
  annualRate: number;
  targetAmount: number;
}

export interface CalculationResults {
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
    expectedProfit: Number.isFinite(expectedProfit) ? expectedProfit : 0,
    diffFromTargetAmount: Number.isFinite(diffFromTargetAmount) ? diffFromTargetAmount : 0,
    recommendedMonthlyAmount: Number.isFinite(recommendedMonthlyAmount) ? recommendedMonthlyAmount : 0,
  };
};
