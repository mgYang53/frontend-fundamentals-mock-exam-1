import { Assets, colors, ListRow } from 'tosslib';
import { useSavingsProducts } from '../hooks';
import type { SavingsProduct } from '../types';

interface SavingsProductsListProps {
  filterFns?: Array<(product: SavingsProduct) => boolean>;
  sortFn?: (a: SavingsProduct, b: SavingsProduct) => number;
  limit?: number;
  selectedProductId: string | null;
  onClickProduct?: (product: SavingsProduct) => void;
}

/**
 * 적금 상품 목록 컴포넌트
 *
 * 제어의 역전(IoC) 패턴 적용:
 * - 데이터 페칭은 내부에서 처리 (useSavingsProducts)
 * - 필터/정렬/제한 로직은 외부에서 주입
 * - Suspense 경계를 개별적으로 적용 가능
 */
export default function SavingsProductsList({
  filterFns,
  sortFn,
  limit,
  selectedProductId,
  onClickProduct,
}: SavingsProductsListProps) {
  // 데이터는 내부에서 fetch (Suspense throw)
  const allProducts = useSavingsProducts();

  // 필터링, 정렬, 제한을 외부 함수에 따라 처리
  let products = allProducts;

  // 필터링: 모든 필터 함수를 순차적으로 적용
  if (filterFns && filterFns.length > 0) {
    products = products.filter(product => filterFns.every(fn => fn(product)));
  }

  // 정렬
  if (sortFn) {
    products = [...products].sort(sortFn);
  }

  // 개수 제한
  if (limit) {
    products = products.slice(0, limit);
  }

  return (
    <>
      {products.length > 0 ? (
        products.map(product => (
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
            right={selectedProductId === product.id && <Assets.Icon name="icon-check-circle-green" />}
            onClick={onClickProduct ? () => onClickProduct(product) : undefined}
          />
        ))
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="해당 조건의 상품이 없습니다." />} />
      )}
    </>
  );
}
