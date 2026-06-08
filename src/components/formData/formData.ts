import { useForm } from '@mantine/form';
import {
  type PaymentFormValues,
  type ShippingFormValues,
} from '../../types/components/formData/FormDataTypes';
import {
  validateName,
  validateEmail,
  validateAddress,
  validateCity,
  validateState,
  validateZip,
} from './validators';

export type { PaymentFormValues, ShippingFormValues };

export const usePaymentForm = () =>
  useForm<PaymentFormValues>({
    initialValues: {
      name: '',
      email: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
    },
    validate: {
      name: validateName,
      email: validateEmail,
      billingAddress: validateAddress,
      billingCity: validateCity,
      billingState: validateState,
      billingZip: validateZip,
    },
    validateInputOnBlur: true,
  });

export const useShippingForm = () =>
  useForm<ShippingFormValues>({
    initialValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    validate: {
      name: validateName,
      address: validateAddress,
      city: validateCity,
      state: validateState,
      zip: validateZip,
    },
    validateInputOnBlur: true,
  });
