import type React from 'react';
import type { PaymentIntent } from '@stripe/stripe-js';
import { type UseFormReturnType } from '@mantine/form';
import { type PaymentFormValues, type ShippingFormValues } from '../formData/FormDataTypes';

export interface CheckoutFormProps {
  checked: boolean;
  setChecked: (v: boolean) => void;
  paymentForm: UseFormReturnType<PaymentFormValues>;
  shippingForm: UseFormReturnType<ShippingFormValues>;
  shippingWrapperRef: React.RefObject<HTMLDivElement | null>;
  onPaymentSuccess: (intent: PaymentIntent) => void;
}
