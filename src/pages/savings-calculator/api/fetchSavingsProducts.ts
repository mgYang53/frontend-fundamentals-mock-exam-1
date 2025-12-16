import { http, isHttpError } from 'tosslib';
import type { SavingsProduct } from '../types';

export const fetchSavingsProducts = (): Promise<SavingsProduct[]> => {
  return http.get<SavingsProduct[]>('/api/savings-products').catch(err => {
    if (isHttpError(err)) {
      throw new Error(`적금 상품을 불러올 수 없습니다: ${err.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  });
};
