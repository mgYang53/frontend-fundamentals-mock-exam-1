import { useMemo } from 'react';
import type { SavingsProduct } from '../types';

export const useFilteredProducts = (
  products: SavingsProduct[],
  monthlyAmount: string,
  savingsTerms: number
): SavingsProduct[] => {
  return useMemo(() => {
    const monthlyAmt = Number(monthlyAmount);

    return products.filter(product => {
      const matchesTerm = product.availableTerms === savingsTerms;

      const matchesAmount =
        !monthlyAmount || (product.minMonthlyAmount <= monthlyAmt && monthlyAmt <= product.maxMonthlyAmount);

      return matchesTerm && matchesAmount;
    });
  }, [products, monthlyAmount, savingsTerms]);
};
