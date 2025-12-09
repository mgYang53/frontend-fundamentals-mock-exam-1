import { ListHeader, Spacing } from 'tosslib';
import type { SavingsProduct } from '../types';
import SavingsProductsList from './SavingsProductsList';

interface RecommendedProductsListProps {
  displayedProducts: SavingsProduct[];
}

export default function RecommendedProductsList({ displayedProducts }: RecommendedProductsListProps) {
  const recommendedProducts = [...displayedProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  return (
    <>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <SavingsProductsList savingsProducts={recommendedProducts} />
    </>
  );
}
