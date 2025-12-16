import { useMemo } from 'react';

import { createSuspenseResource } from 'shared/utils';
import { fetchSavingsProducts } from '../api';
import type { SavingsProduct } from '../types';

/**
 * Suspense 기반 적금 상품 조회 훅
 *
 * - 로딩 상태는 Suspense fallback에서 처리
 * - 에러는 Error Boundary에서 처리
 * - 성공 케이스만 반환하여 컴포넌트가 정상 흐름에 집중할 수 있도록 함
 */
export const useSavingsProducts = (): SavingsProduct[] => {
  const resource = useMemo(() => createSuspenseResource(fetchSavingsProducts()), []);

  return resource.read();
};
