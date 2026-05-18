import { type UseFormReturnType } from '@mantine/form';
import { type PaymentFormValues } from '../formData/FormDataTypes';

export interface PaymentFormProps {
  checked: boolean;
  setChecked: (v: boolean) => void;
  form: UseFormReturnType<PaymentFormValues>;
  submitted: boolean;
  onStripeValidityChange: (valid: boolean) => void;
}
