import type { FallbackProps } from 'react-error-boundary';

/**
 * ErrorBoundary의 fallback UI 컴포넌트
 *
 * - 에러 메시지 표시
 * - 다시 시도 버튼 제공
 */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div css={{ padding: '16px', textAlign: 'center', color: '#e53e3e' }}>
      <div>{error.message}</div>
      <button
        css={{
          marginTop: '16px',
          padding: '8px 16px',
          border: '1px solid #e53e3e',
          borderRadius: '4px',
          background: 'white',
          color: '#e53e3e',
          cursor: 'pointer',
        }}
        onClick={resetErrorBoundary}
      >
        다시 시도
      </button>
    </div>
  );
}
