import Anthropic from '@anthropic-ai/sdk';
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const buildSystemPrompt = (merchantName: string, products: Stripe.Product[]): string => {
  const productLines = products
    .map((p) => {
      const price = p.default_price;
      const amount = price && typeof price !== 'string' ? (price.unit_amount ?? 0) : 0;
      const currency =
        price && typeof price !== 'string' ? (price.currency?.toUpperCase() ?? 'USD') : 'USD';
      const desc = p.description ? ` — ${p.description}` : '';
      return `- ${p.name}: ${(amount / 100).toFixed(2)} ${currency}${desc}`;
    })
    .join('\n');

  return `You are a checkout support assistant for ${merchantName}. Answer questions about the preloaded stripe products, pricing, and the checkout flow — strictly using the data below.

Rules:
- Only use information from the data below. If a question can't be answered from this data (shipping policies, returns, account details, anything else), say you don't have that information and suggest contacting ${merchantName} directly.
- Don't invent products, prices, shipping options, return policies, or anything else not listed below.
- Don't ask for or process personal information.
- Be concise — 1 to 3 sentences. No preamble like "Sure!" or "Of course!".
- This is a Stripe test checkout. Real card numbers won't work; users should use Stripe test cards (e.g. 4242 4242 4242 4242).
- Products are fetched from a Stripe test account. The user doesn't add them to a cart. Predefined order with a set price.

Merchant: ${merchantName}

Products available:
${productLines}`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body as { question?: string };
    if (!question || typeof question !== 'string' || question.length > 500) {
      return res.status(400).json({ error: 'Invalid question' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const merchantAccountId = process.env.MERCHANT_ACCOUNT_ID || '';

    const [account, products] = await Promise.all([
      stripe.accounts.retrieve(merchantAccountId),
      stripe.products.list(
        { limit: 100, expand: ['data.default_price'] },
        { stripeAccount: merchantAccountId },
      ),
    ]);

    const merchantName = account.business_profile?.name ?? 'this merchant';
    const systemPrompt = buildSystemPrompt(merchantName, products.data);

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      thinking: { type: 'adaptive' },
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: question }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const answer = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    res.status(200).json({ answer });
  } catch (err) {
    console.error('support function error:', err);
    res.status(500).json({ error: 'Failed to get support response' });
  }
}
