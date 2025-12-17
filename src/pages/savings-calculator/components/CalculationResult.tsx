import { colors, ListRow } from 'tosslib';
import { useSavingsProducts } from '../hooks';
import { calculateSavingsResults } from '../utils';
import type { SavingsTerms } from '../types';

interface CalculationResultProps {
  selectedProductId: string | null;
  targetAmount: string;
  monthlyAmount: string;
  savingsTerms: SavingsTerms;
}

/**
 * 계산 결과 컴포넌트
 *
 * 제어의 역전(IoC) 패턴 적용:
 * - 데이터 페칭은 내부에서 처리 (useSavingsProducts)
 * - selectedProductId로 선택된 상품 찾기
 * - 선택된 상품이 없으면 빈 상태 표시
 */
export default function CalculationResult({
  selectedProductId,
  targetAmount,
  monthlyAmount,
  savingsTerms,
}: CalculationResultProps) {
  // 데이터는 내부에서 fetch (Suspense throw)
  const allProducts = useSavingsProducts();

  // selectedProductId로 선택된 상품 찾기
  const selectedProduct = allProducts.find(p => p.id === selectedProductId);

  // 선택된 상품이 없으면 빈 상태 표시
  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const { expectedProfit, diffFromTargetAmount, recommendedMonthlyAmount } = calculateSavingsResults({
    monthlyAmount: Number(monthlyAmount),
    savingsTerms,
    annualRate: selectedProduct.annualRate,
    targetAmount: Number(targetAmount),
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
