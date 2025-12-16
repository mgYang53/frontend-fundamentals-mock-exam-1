import { Suspense, useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'shared/components';
import { SavingsCalculatorContent } from './components';

export type PageTabValues = 'products' | 'results';

/**
 * 적금 계산기 메인 페이지
 *
 * 책임: 전체 페이지 레이아웃 및 상태 조율
 * - 입력 필드 섹션
 * - 탭 네비게이션
 * - 탭 컨텐츠 (상품 목록 / 계산 결과)
 */
export default function SavingsCalculatorPage() {
  // 입력 상태
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [savingsTerms, setSavingsTerms] = useState<number>(6);

  // 탭 상태
  const [selectedTab, setSelectedTab] = useState<PageTabValues>('products');

  // 아래 두 함수 필요 시 추후 유틸로 분리
  const extractDigits = (str: string) => str.replace(/\D/g, '');
  const formatAmount = (raw: string) => (raw ? Number(raw).toLocaleString() : '');

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      {/* 입력 필드 섹션 */}
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formatAmount(targetAmount)}
        onChange={e => setTargetAmount(extractDigits(e.target.value))}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatAmount(monthlyAmount)}
        onChange={e => setMonthlyAmount(extractDigits(e.target.value))}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingsTerms}
        onChange={setSavingsTerms}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      {/* 탭 네비게이션 */}
      <Tab onChange={value => setSelectedTab(value as PageTabValues)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {/* 탭 컨텐츠 - Suspense와 Error Boundary로 로딩/에러 처리 */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div css={{ padding: '16px', textAlign: 'center' }}>로딩 중...</div>}>
          <SavingsCalculatorContent
            targetAmount={targetAmount}
            monthlyAmount={monthlyAmount}
            savingsTerms={savingsTerms}
            selectedTab={selectedTab}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
