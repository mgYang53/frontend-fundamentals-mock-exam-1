import { colors, ListRow } from 'tosslib';
import { calculateSavingsResults } from '../utils';

interface CalculationResultProps {
  annualRate: number;
  targetAmount: number;
  monthlyAmount: number;
  savingsTerms: number;
}

export default function CalculationResult({
  annualRate,
  targetAmount,
  monthlyAmount,
  savingsTerms,
}: CalculationResultProps) {
  const { expectedProfit, diffFromTargetAmount, recommendedMonthlyAmount } = calculateSavingsResults({
    monthlyAmount,
    savingsTerms,
    annualRate,
    targetAmount,
  });
  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${expectedProfit.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${diffFromTargetAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthlyAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
}
