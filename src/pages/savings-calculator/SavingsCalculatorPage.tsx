import { Suspense, useState } from 'react';
import { Border, ListHeader, NavigationBar, SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, TabPanel } from 'shared/components';
import { SavingsProductsList, CalculationResult } from './components';
import { useSavingInput } from './hooks';
import { formatAmount, getProductFilters, sortByAnnualRateDesc } from './utils';

type PageTabValues = 'products' | 'results';

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
  const { targetAmount, monthlyAmount, savingsTerms, updateInput } = useSavingInput();

  // 탭 상태
  const [selectedTab, setSelectedTab] = useState<PageTabValues>('products');

  // 선택된 상품 ID - 두 탭 간 공유되는 상태
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // 필터 함수 배열 생성
  const filterFns = getProductFilters(monthlyAmount, savingsTerms);

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
        onChange={e => updateInput('targetAmount', e.target.value)}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatAmount(monthlyAmount)}
        onChange={e => updateInput('monthlyAmount', e.target.value)}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingsTerms}
        onChange={value => updateInput('savingsTerms', value)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      {/* 탭 네비게이션 및 컨텐츠 */}
      <TabPanel value={selectedTab} onChange={setSelectedTab}>
        {/* 적금 상품 탭 */}
        <TabPanel.Item value="products" label="적금 상품">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div css={{ padding: '16px', textAlign: 'center' }}>로딩 중...</div>}>
              <SavingsProductsList
                filterFns={filterFns}
                selectedProductId={selectedProductId}
                onClickProduct={product => setSelectedProductId(product.id)}
              />
            </Suspense>
          </ErrorBoundary>
        </TabPanel.Item>

        {/* 계산 결과 탭 */}
        <TabPanel.Item value="results" label="계산 결과">
          <Spacing size={8} />

          {/* 선택한 상품 계산 결과 */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div css={{ padding: '16px', textAlign: 'center' }}>로딩 중...</div>}>
              <CalculationResult
                selectedProductId={selectedProductId}
                targetAmount={targetAmount}
                monthlyAmount={monthlyAmount}
                savingsTerms={savingsTerms}
              />
            </Suspense>
          </ErrorBoundary>

          <Spacing size={8} />
          <Border height={16} />
          <Spacing size={8} />

          {/* 추천 상품 목록 */}
          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
          <Spacing size={12} />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div css={{ padding: '16px', textAlign: 'center' }}>로딩 중...</div>}>
              <SavingsProductsList
                filterFns={filterFns}
                sortFn={sortByAnnualRateDesc}
                limit={2}
                selectedProductId={selectedProductId}
              />
            </Suspense>
          </ErrorBoundary>

          <Spacing size={40} />
        </TabPanel.Item>
      </TabPanel>
    </>
  );
}
