export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | null;

export const detectCardType = (value: string): CardType => {
  const num = value.replace(/\D/g, '');
  if (!num) return null;
  if (/^4/.test(num)) return 'visa';
  if (/^(5[1-5]|2[2-7][2-9][1-9])/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  if (/^(6011|65|64[4-9]|622(1[2-9][6-9]|[2-8]\d\d|9[01]\d|92[0-5]))/.test(num)) return 'discover';
  return null;
};
