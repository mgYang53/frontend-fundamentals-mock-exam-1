import { createSuspenseResource } from 'shared/utils';
import { fetchSavingsProducts } from '../api';
import type { SavingsProduct } from '../types';

// 전역 resource: 모든 컴포넌트가 동일한 resource 공유
const resource = createSuspenseResource(fetchSavingsProducts());

/**
 * Suspense 기반 적금 상품 조회 훅
 *
 * - 로딩 상태는 Suspense fallback에서 처리
 * - 에러는 Error Boundary에서 처리
 * - 성공 케이스만 반환하여 컴포넌트가 정상 흐름에 집중할 수 있도록 함
 * - 전역 resource를 통해 여러 컴포넌트에서 호출해도 Suspense는 한 번만 발생
 */
export const useSavingsProducts = (): SavingsProduct[] => {
  return resource.read();
};
