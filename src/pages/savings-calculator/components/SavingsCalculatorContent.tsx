import { useState } from 'react';
import { Border, ListRow, Spacing } from 'tosslib';
import { useSavingsProducts, useFilteredProducts } from '../hooks';
import SavingsProductsList from './SavingsProductsList';
import CalculationResult from './CalculationResult';
import RecommendedProductsList from './RecommendedProductsList';
import type { PageTabValues } from '../SavingsCalculatorPage';

interface SavingsCalculatorContentProps {
  targetAmount: string;
  monthlyAmount: string;
  savingsTerms: number;
  selectedTab: PageTabValues;
}

/**
 * 적금 계산기 탭 컨텐츠
 *
 * 책임: 탭별 컨텐츠 렌더링
 * - 상품 목록 탭: 필터링된 적금 상품 목록 표시
 * - 계산 결과 탭: 선택한 상품의 계산 결과 + 추천 상품 표시
 * - 선택된 상품 상태 관리 (두 탭 간 공유)
 */
export default function SavingsCalculatorContent({
  targetAmount,
  monthlyAmount,
  savingsTerms,
  selectedTab,
}: SavingsCalculatorContentProps) {
  // 선택된 상품 ID - Content 내부에서만 사용하므로 여기서 관리
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { products: savingsProducts, loading, error } = useSavingsProducts();
  const displayedProducts = useFilteredProducts(savingsProducts, monthlyAmount, savingsTerms);

  const selectedProduct = savingsProducts.find(product => product.id === selectedProductId);

  if (loading) {
    return <div css={{ padding: '16px', textAlign: 'center' }}>로딩 중...</div>;
  }

  if (error) {
    return <div css={{ padding: '16px', textAlign: 'center', color: '#e53e3e' }}>{error}</div>;
  }

  return (
    <>
      {/* 적금 목록 */}
      {selectedTab === 'products' && (
        <SavingsProductsList
          savingsProducts={displayedProducts}
          selectedProductId={selectedProductId}
          onClickProduct={product => setSelectedProductId(product.id)}
        />
      )}

      {/* 선택한 적금 상품에 따른 결과 */}
      {selectedTab === 'results' && (
        <>
          <Spacing size={8} />

          {selectedProduct ? (
            <CalculationResult
              annualRate={selectedProduct.annualRate}
              targetAmount={Number(targetAmount)}
              monthlyAmount={Number(monthlyAmount)}
              savingsTerms={savingsTerms}
            />
          ) : (
            <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
          )}

          <Spacing size={8} />
          <Border height={16} />
          <Spacing size={8} />

          <RecommendedProductsList displayedProducts={displayedProducts} selectedProductId={selectedProductId} />

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
