import { type MerchantData } from '../types/api/MerchantTypes';

export const getMerchant = async (): Promise<MerchantData> => {
  const res = await fetch('/api/merchant');
  if (!res.ok) throw new Error('Failed to fetch merchant');
  return res.json();
};
