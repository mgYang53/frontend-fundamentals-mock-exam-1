import { Children, type ReactElement, type ReactNode } from 'react';
import { Tab } from 'tosslib';

interface TabPanelProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
}

interface TabPanelItemProps<T extends string> {
  value: T;
  label: string;
  children: ReactNode;
}

interface TabPanelComponent {
  <T extends string>(props: TabPanelProps<T>): ReactElement;
  Item: <T extends string>(props: TabPanelItemProps<T>) => ReactElement;
}

/**
 * 탭 헤더와 컨텐츠를 선언적으로 연결하는 합성 컴포넌트
 *
 * 사용 예시:
 * ```tsx
 * <TabPanel value={selectedTab} onChange={setSelectedTab}>
 *   <TabPanel.Item value="tab1" label="탭 1">
 *     탭 1 컨텐츠
 *   </TabPanel.Item>
 *   <TabPanel.Item value="tab2" label="탭 2">
 *     탭 2 컨텐츠
 *   </TabPanel.Item>
 * </TabPanel>
 * ```
 */
function TabPanelRoot<T extends string>({ value, onChange, children }: TabPanelProps<T>) {
  const items = Children.toArray(children) as Array<ReactElement<TabPanelItemProps<T>>>;

  return (
    <>
      {/* 탭 헤더 */}
      <Tab onChange={newValue => onChange(newValue as T)}>
        {items.map(item => (
          <Tab.Item key={item.props.value} value={item.props.value} selected={value === item.props.value}>
            {item.props.label}
          </Tab.Item>
        ))}
      </Tab>

      {/* 탭 컨텐츠 - 선택된 탭만 렌더링 */}
      {items.find(item => item.props.value === value)?.props.children}
    </>
  );
}

function TabPanelItem<T extends string>({ children }: TabPanelItemProps<T>) {
  return <>{children}</>;
}

export const TabPanel = TabPanelRoot as TabPanelComponent;
TabPanel.Item = TabPanelItem;
