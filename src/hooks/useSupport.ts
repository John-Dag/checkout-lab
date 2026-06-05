import { useMutation } from '@tanstack/react-query';
import { askSupport } from '../api/support';

export const useSupport = () => useMutation({ mutationFn: askSupport });
