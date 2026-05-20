import type Stripe from 'stripe';

export const getTotal = (products: Stripe.Product[]) => {
  let total = 0;

  if (!products) return 0;

  for (const product of products) {
    const price = product.default_price;
    if (price && typeof price !== 'string') {
      total += price.unit_amount ?? 0;
    }
  }

  return total / 100;
};
