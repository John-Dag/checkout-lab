import { describe, it, expect } from 'vitest';
import type Stripe from 'stripe';
import { getTotal } from '../../src/utils/getTotal';

const makeProduct = (default_price: Stripe.Product['default_price']): Stripe.Product =>
  ({ default_price }) as unknown as Stripe.Product;

const makePrice = (unit_amount: number | null): Stripe.Price =>
  ({ unit_amount }) as unknown as Stripe.Price;

describe('getTotal', () => {
  it('returns 0 for an empty product list', () => {
    expect(getTotal([])).toBe(0);
  });

  it('returns the unit amount in dollars for a single expanded price', () => {
    expect(getTotal([makeProduct(makePrice(2499))])).toBe(24.99);
  });

  it('sums multiple products and converts cents to dollars', () => {
    const products = [
      makeProduct(makePrice(1000)),
      makeProduct(makePrice(500)),
      makeProduct(makePrice(2550)),
    ];
    expect(getTotal(products)).toBe(40.5);
  });

  it('ignores products whose default_price is an unexpanded string ID', () => {
    const products = [
      makeProduct('price_1ABC' as unknown as Stripe.Product['default_price']),
      makeProduct(makePrice(1000)),
    ];
    expect(getTotal(products)).toBe(10);
  });

  it('treats null default_price as 0', () => {
    expect(getTotal([makeProduct(null), makeProduct(makePrice(1500))])).toBe(15);
  });

  it('treats null unit_amount as 0 rather than producing NaN', () => {
    const products = [makeProduct(makePrice(null)), makeProduct(makePrice(1000))];
    expect(getTotal(products)).toBe(10);
  });
});
