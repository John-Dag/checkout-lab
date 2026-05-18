import { useForm } from '@mantine/form';
import {
  type PaymentFormValues,
  type ShippingFormValues,
} from '../../types/components/formData/FormDataTypes';

export type { PaymentFormValues, ShippingFormValues };

export const usePaymentForm = () =>
  useForm<PaymentFormValues>({
    initialValues: {
      name: '',
      email: '',
    },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Name is required' : null),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Invalid email address'),
    },
    validateInputOnBlur: true,
  });

export const useShippingForm = () =>
  useForm<ShippingFormValues>({
    initialValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Name is required' : null),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Invalid email address'),
      address: (v) => (v.trim().length < 5 ? 'Address is required' : null),
      city: (v) => (v.trim().length < 2 ? 'City is required' : null),
      state: (v) =>
        /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)$/i.test(
          v.trim(),
        )
          ? null
          : 'Invalid state',
      zip: (v) => (/^\d{5}(-\d{4})?$/.test(v) ? null : 'Invalid ZIP code'),
    },
    validateInputOnBlur: true,
  });
