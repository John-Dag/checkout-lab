import type Stripe from 'stripe';

export interface MerchantData {
  merchant: Stripe.Account;
  products: Stripe.Product[];
}
