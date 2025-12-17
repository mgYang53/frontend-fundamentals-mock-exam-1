import { useCallback, useState } from 'react';
import { extractDigits } from '../utils';
import type { SavingInput, SavingsTerms } from '../types';

/**
 * 적금 계산기 입력 상태를 관리하는 커스텀 훅
 *
 * 책임:
 * - 목표 금액, 월 납입액, 저축 기간 상태 관리
 * - 숫자 입력 포맷팅 로직 캡슐화 (숫자 추출 및 천단위 구분 표시)
 * - 저축 기간의 타입 안전성 보장
 */
export const useSavingInput = () => {
  const [savingInput, setSavingInput] = useState<SavingInput>({
    targetAmount: '',
    monthlyAmount: '',
    savingsTerms: 6,
  });

  // 통합 입력 업데이트 함수
  const updateInput = useCallback(
    <K extends keyof SavingInput>(field: K, value: K extends 'savingsTerms' ? SavingsTerms : string) => {
      const processedValue = field === 'savingsTerms' ? value : extractDigits(value as string);

      setSavingInput(prev => ({ ...prev, [field]: processedValue }));
    },
    []
  );

  return {
    // 상태 값
    targetAmount: savingInput.targetAmount,
    monthlyAmount: savingInput.monthlyAmount,
    savingsTerms: savingInput.savingsTerms,
    // 통합 Setter 함수
    updateInput,
  };
};
