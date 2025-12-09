import { useEffect, useState } from 'react';
import { http, isHttpError } from 'tosslib';
import type { SavingsProduct } from '../types';

interface UseSavingsProductsReturn {
  products: SavingsProduct[];
  loading: boolean;
  error: string | null;
}

export const useSavingsProducts = (): UseSavingsProductsReturn => {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await http.get<SavingsProduct[]>('/api/savings-products');
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          if (isHttpError(err)) {
            setError(`적금 상품을 불러올 수 없습니다: ${err.message}`);
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};
