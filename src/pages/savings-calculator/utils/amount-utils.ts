export const extractDigits = (str: string) => str.replace(/\D/g, '');

export const formatAmount = (raw: string) => (raw ? Number(raw).toLocaleString() : '');
