import { ListHeader, Spacing } from 'tosslib';
import type { SavingsProduct } from '../types';
import SavingsProductsList from './SavingsProductsList';

interface RecommendedProductsListProps {
  displayedProducts: SavingsProduct[];
  selectedProductId: string | null;
}

export default function RecommendedProductsList({
  displayedProducts,
  selectedProductId,
}: RecommendedProductsListProps) {
  const recommendedProducts = [...displayedProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  return (
    <>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <SavingsProductsList savingsProducts={recommendedProducts} selectedProductId={selectedProductId} />
    </>
  );
}
