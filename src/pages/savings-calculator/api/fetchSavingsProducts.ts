import { http, isHttpError } from 'tosslib';
import type { SavingsProduct } from '../types';

let cache: Promise<SavingsProduct[]> | null = null;

export const fetchSavingsProducts = (): Promise<SavingsProduct[]> => {
  if (cache) {
    return cache;
  }

  cache = http.get<SavingsProduct[]>('/api/savings-products').catch(err => {
    cache = null; // 에러 시 캐시 초기화하여 재시도 가능하도록
    if (isHttpError(err)) {
      throw new Error(`적금 상품을 불러올 수 없습니다: ${err.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  });

  return cache;
};
