import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const merchantAccountId = process.env.MERCHANT_ACCOUNT_ID || '';

    const [account, products] = await Promise.all([
      stripe.accounts.retrieve(merchantAccountId),
      stripe.products.list({ limit: 100, expand: ['data.default_price'] }, { stripeAccount: merchantAccountId }),
    ]);

    res.status(200).json({
      merchant: account,
      products: products.data,
    });
  } catch (err) {
    console.error('Failed to load merchant data: ', err);
    res.status(500).json({ error: 'Failed to load merchant data' });
  }
}
