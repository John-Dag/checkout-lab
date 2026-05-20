import { useQuery } from '@tanstack/react-query';
import { getMerchant } from '../api/merchant';

export const useMerchant = () => useQuery({ queryKey: ['merchant'], queryFn: getMerchant });
