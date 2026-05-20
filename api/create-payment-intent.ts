import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const merchantAccountId = process.env.MERCHANT_ACCOUNT_ID || '';
    const products = await stripe.products.list({ limit: 100, expand: ['data.default_price'] }, { stripeAccount: merchantAccountId });

    let amount = 0;

     // Calculate the total amount separately from frontend 
    for (const product of products.data) {
        const price = product.default_price;
        if (price && typeof price !== "string") {
            amount += price.unit_amount ?? 0;
        }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Failed to create payment intent: ', err);
    res.status(500).json({ error: 'Failed to create payment intent'});
  }
}
