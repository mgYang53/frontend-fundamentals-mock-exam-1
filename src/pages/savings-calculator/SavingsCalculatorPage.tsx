import { useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { SavingsCalculatorContent } from './components';
import { extractDigits, formatAmount } from './utils';
import type { PageTabValues } from './types';

export default function SavingsCalculatorPage() {
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [savingsTerms, setSavingsTerms] = useState<number>(6);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<PageTabValues>('products');

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

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

      <Tab onChange={value => setSelectedTab(value as PageTabValues)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      <SavingsCalculatorContent
        targetAmount={targetAmount}
        monthlyAmount={monthlyAmount}
        savingsTerms={savingsTerms}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        selectedTab={selectedTab}
      />
    </>
  );
}
