import { type UseFormReturnType } from '@mantine/form';
import { type ShippingFormValues } from '../formData/FormDataTypes';

export interface ShippingFormProps {
  form: UseFormReturnType<ShippingFormValues>;
}
