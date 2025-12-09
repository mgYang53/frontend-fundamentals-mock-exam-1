import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../types';

interface SavingsProductsListProps {
  savingsProducts: SavingsProduct[];
  selectedProduct?: SavingsProduct | null;
  onClickProduct?: (product: SavingsProduct) => void;
}

export default function SavingsProductsList({
  savingsProducts,
  selectedProduct,
  onClickProduct,
}: SavingsProductsListProps) {
  return (
    <>
      {savingsProducts.length > 0 ? (
        savingsProducts.map(product => (
          <ListRow
            key={product.id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={product.name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${product.annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={selectedProduct === product && <Assets.Icon name="icon-check-circle-green" />}
            onClick={onClickProduct ? () => onClickProduct(product) : undefined}
          />
        ))
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="해당 조건의 상품이 없습니다." />} />
      )}
    </>
  );
}
