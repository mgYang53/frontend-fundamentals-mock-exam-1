/** 유효한 저축 기간 (개월) */
export type SavingsTerms = 6 | 12 | 24;

/** 적금 계산기 입력 상태 */
export interface SavingInput {
  targetAmount: string;
  monthlyAmount: string;
  savingsTerms: SavingsTerms;
}
