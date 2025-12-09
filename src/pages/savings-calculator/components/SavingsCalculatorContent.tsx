import { Border, ListRow, Spacing } from 'tosslib';
import { useSavingsProducts, useFilteredProducts } from '../hooks';
import type { PageTabValues } from '../types';
import SavingsProductsList from './SavingsProductsList';
import CalculationResult from './CalculationResult';
import RecommendedProductsList from './RecommendedProductsList';

interface SavingsCalculatorContentProps {
  targetAmount: string;
  monthlyAmount: string;
  savingsTerms: number;
  selectedProductId: string | null;
  setSelectedProductId: (productId: string) => void;
  selectedTab: PageTabValues;
}

export default function SavingsCalculatorContent({
  targetAmount,
  monthlyAmount,
  savingsTerms,
  selectedProductId,
  setSelectedProductId,
  selectedTab,
}: SavingsCalculatorContentProps) {
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
