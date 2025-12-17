# Frontend Fundamentals 모의고사 과제

> "서비스의 유지보수나 장기적인 확장성을 고려한 설계, 추상화 관점에 집중해서 기능 구현"

## 구현 개요

### 과제 요구사항

- 적금 상품 목록 연동
- 저축 목표 입력 기능 (목표 금액, 월 납입액, 저축 기간)
- 조건에 따른 상품 필터링
- 상품 선택 기능
- 계산 결과 탭 (예상 수익, 목표 금액과의 차이, 추천 월 납입액)
- 추천 상품 목록 (연 이자율 높은 순 2개)

### 구현 완료

- ✅ 모든 요구사항 구현
- ✅ 변경에 유연한 코드 구조
- ✅ 의미 있는 추상화만 수행

---

## 핵심 설계 원칙

### 1. 가독성 - UI 구조와 코드 구조 1:1 매핑

#### 화면을 보면 코드가 떠오르고, 코드를 보면 화면이 떠오름

**화면 구조**

```
적금 계산기
├── 입력 필드 (목표 금액, 월 납입액, 저축 기간)
└── 탭
    ├── 적금 상품 탭 → 상품 목록
    └── 계산 결과 탭 → 계산 결과 + 추천 상품 2개
```

**코드 구조**

```tsx
<SavingsCalculatorPage>
  {/* 입력 필드 섹션 */}
  <TextField label="목표 금액" />
  <TextField label="월 납입액" />
  <SelectBottomSheet label="저축 기간" />

  {/* 탭 네비게이션 및 컨텐츠 */}
  <TabPanel value={selectedTab} onChange={setSelectedTab}>
    <TabPanel.Item value="products" label="적금 상품">
      <SavingsProductsList />
    </TabPanel.Item>

    <TabPanel.Item value="results" label="계산 결과">
      <CalculationResult />
      <SavingsProductsList limit={2} sortFn={sortByAnnualRateDesc} />
    </TabPanel.Item>
  </TabPanel>
</SavingsCalculatorPage>
```

---

### 2. 예측 가능성 - 일관된 패턴과 직관적인 API

#### 제어 컴포넌트 패턴의 일관성

**TabPanel 컴포넌트**

```tsx
<TabPanel value={selectedTab} onChange={setSelectedTab}>
  <TabPanel.Item value="products" label="적금 상품">
    탭 1 컨텐츠
  </TabPanel.Item>
  <TabPanel.Item value="results" label="계산 결과">
    탭 2 컨텐츠
  </TabPanel.Item>
</TabPanel>
```

**왜 예측 가능한가?**

- 일반적인 제어 컴포넌트 패턴 (`value` + `onChange`)
- React의 합성 컴포넌트(Compound Component) 패턴
- 선택된 탭만 렌더링하는 것이 명확

---

### 3. 응집도 - 관련된 것들은 함께

#### 단일 책임의 컴포넌트

**CalculationResult**

```tsx
/**
 * 계산 결과 컴포넌트
 * 책임: 선택된 상품의 계산 결과를 보여주는 것
 */
export default function CalculationResult({
  selectedProductId,
  targetAmount,
  monthlyAmount,
  savingsTerms,
}: CalculationResultProps) {
  // 1. 데이터 페칭
  const allProducts = useSavingsProducts();

  // 2. 선택된 상품 찾기
  const selectedProduct = allProducts.find(p => p.id === selectedProductId);

  // 3. 빈 상태 처리
  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  // 4. 계산 로직
  const { expectedProfit, diffFromTargetAmount, recommendedMonthlyAmount } =
    calculateSavingsResults({...});

  // 5. UI 렌더링
  return (/* 3개의 ListRow */);
}
```

**왜 응집도가 높은가?**

- "계산 결과 표시"라는 단일 책임
- 관련 로직(데이터 페칭, 상품 찾기, 계산, 렌더링)이 한 곳에 모여 있음

---

### 4. 결합도 - 의존성 주입으로 재사용성 확보

#### IoC 패턴으로 유연한 컴포넌트

**SavingsProductsList**

```tsx
/**
 * 제어의 역전(IoC) 패턴:
 * - 데이터 페칭은 내부에서 처리
 * - 필터/정렬/제한 로직은 외부에서 주입
 */
export default function SavingsProductsList({
  filterFns,
  sortFn,
  limit,
  selectedProductId,
  onClickProduct,
}: SavingsProductsListProps) {
  const allProducts = useSavingsProducts();

  let products = allProducts;

  // 필터링: 외부에서 주입된 함수 배열 적용
  if (filterFns && filterFns.length > 0) {
    products = products.filter(product => filterFns.every(fn => fn(product)));
  }

  // 정렬: 외부에서 주입된 함수 적용
  if (sortFn) {
    products = [...products].sort(sortFn);
  }

  // 개수 제한
  if (limit) {
    products = products.slice(0, limit);
  }

  return (/* UI */);
}
```

**왜 결합도가 낮은가?**

- 구체적인 필터링 조건을 몰라도 됨
- "월 납입액", "저축 기간" 같은 비즈니스 로직과 무관
- 다양한 용도로 재사용 가능

#### 동일한 컴포넌트, 다른 용도

```tsx
{
  /* 적금 상품 탭: 필터링만 */
}
<SavingsProductsList
  filterFns={filterFns}
  selectedProductId={selectedProductId}
  onClickProduct={product => setSelectedProductId(product.id)}
/>;

{
  /* 계산 결과 탭: 필터링 + 정렬 + 제한 */
}
<SavingsProductsList
  filterFns={filterFns}
  sortFn={sortByAnnualRateDesc}
  limit={2}
  selectedProductId={selectedProductId}
/>;
```

---

## 프로젝트 구조

```
src/pages/savings-calculator/
├── SavingsCalculatorPage.tsx        # 페이지: 레이아웃 및 상태 조율
├── components/
│   ├── SavingsProductsList.tsx      # 재사용 가능한 상품 목록
│   └── CalculationResult.tsx        # 계산 결과
├── hooks/
│   ├── useSavingInput.ts            # 입력 상태 관리
│   └── useSavingsProducts.ts        # 데이터 페칭
├── types/
└── utils/

src/shared/components/
└── TabPanel.tsx                     # 공용 컴포넌트 (합성 패턴)
```

**설계 원칙:**

- Page: 레이아웃 및 상태 조율
- Components: UI 렌더링
- Hooks: 상태 관리
- Utils: 순수 함수 (테스트 가능, 재사용 가능)
- Types: 도메인 규칙 표현

---

## 마무리

### 학습한 핵심 원칙

1. **"변경하기 쉬운 코드"** (가독성, 예측 가능성, 응집도, 결합도)
   - 관련된 것들은 함께 (응집도 ↑)
   - 의존성은 최소화 (결합도 ↓)
   - 순수 함수로 로직 분리 (가독성 ↑)
   - 타입으로 규칙 표현 (예측 가능성 ↑)

2. **"의미 있는 추상화"만 수행**
   - 단순 추출 ≠ 추상화
   - 과도한 분리는 복잡도 증가
   - "이 분리가 유지보수를 용이하게 하는가?" 질문

3. **"UI와 코드 구조의 1:1 매핑"**
   - 화면 보면 코드가 떠오름
   - 코드 보면 화면이 떠오름

4. **"예측 가능한 코드"**
   - 컴포넌트는 본래 역할에 충실
   - Props는 직관적인 이름
   - 과도한 유연성 지양

### 회고

요구사항은 항상 변할 수 있기 때문에 매번 구조를 뒤엎지 않고 대응하려면, 처음부터 변경에 유연한 설계가 필요하다고 느꼈습니다.

그 과정에서 중요한 것은:

- 직관적이고 예측 가능한 구조
- 의미 있는 추상화 (과도한 분리 지양)
- UI와 코드의 매핑
- 타입으로 안전성 확보

위 기준들을 참고하여 확장성과 유지보수성의 관점에서 좋은 코드는 무엇인지를 고민하며 과제를 진행했습니다.
이를 통해 컴포넌트 설계 및 구현 시 상황에 맞는 설계와 사고를 할 수 있는 경험을 축적하는 좋은 기회가 되었습니다.
