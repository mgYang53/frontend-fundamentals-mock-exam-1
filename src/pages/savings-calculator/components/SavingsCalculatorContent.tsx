import { Border, ListRow, Spacing } from 'tosslib';
import { useSavingsProducts, useFilteredProducts } from '../hooks';
import type { PageTabValues, SavingsProduct } from '../types';
import SavingsProductsList from './SavingsProductsList';
import CalculationResult from './CalculationResult';
import RecommendedProductsList from './RecommendedProductsList';

interface SavingsCalculatorContentProps {
  targetAmount: string;
  monthlyAmount: string;
  savingsTerms: number;
  selectedProduct: SavingsProduct | null;
  setSelectedProduct: (product: SavingsProduct) => void;
  selectedTab: PageTabValues;
}

export default function SavingsCalculatorContent({
  targetAmount,
  monthlyAmount,
  savingsTerms,
  selectedProduct,
  setSelectedProduct,
  selectedTab,
}: SavingsCalculatorContentProps) {
  const { products: savingsProducts, loading, error } = useSavingsProducts();
  const displayedProducts = useFilteredProducts(savingsProducts, monthlyAmount, savingsTerms);

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
          selectedProduct={selectedProduct}
          onClickProduct={setSelectedProduct}
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

          <RecommendedProductsList displayedProducts={displayedProducts} />

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
