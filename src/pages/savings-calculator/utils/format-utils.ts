// 숫자만 추출
export const extractDigits = (str: string) => str.replace(/\D/g, '');
// 천단위 구분 포맷팅
export const formatAmount = (raw: string) => (raw ? Number(raw).toLocaleString() : '');
