import type { SavingsProduct, SavingsTerms } from '../types';

/**
 * 입력 조건에 따라 적금 상품 필터 함수 배열 생성
 *
 * @param monthlyAmount - 월 납입액
 * @param savingsTerms - 저축 기간
 * @returns 적금 상품을 필터링하는 함수 배열
 */
export const getProductFilters = (
  monthlyAmount: string,
  savingsTerms: SavingsTerms
): Array<(product: SavingsProduct) => boolean> => {
  const filters: Array<(product: SavingsProduct) => boolean> = [];

  // 월 납입액 필터
  if (monthlyAmount && Number(monthlyAmount) > 0) {
    const amount = Number(monthlyAmount);
    filters.push(product => amount >= product.minMonthlyAmount && amount <= product.maxMonthlyAmount);
  }

  // 저축 기간 필터
  if (savingsTerms > 0) {
    filters.push(product => savingsTerms === product.availableTerms);
  }

  return filters;
};

/**
 * 연 이자율 내림차순 정렬 함수
 */
export const sortByAnnualRateDesc = (a: SavingsProduct, b: SavingsProduct) => b.annualRate - a.annualRate;
