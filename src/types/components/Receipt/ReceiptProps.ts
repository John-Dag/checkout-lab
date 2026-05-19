import type { PaymentIntent } from '@stripe/stripe-js';

export interface ReceiptProps {
  paymentIntent: PaymentIntent;
}
