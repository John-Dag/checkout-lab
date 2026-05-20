# Checkout Lab

A checkout application built with React 19, Mantine v9, and Stripe Elements. Two-column layout with an invoice panel, payment form, optional shipping form, and a post-payment receipt — all wired up to a Vercel serverless backend.

**Live demo:** https://checkout-lab-iota.vercel.app/

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Mantine v9** — UI components and form state
- **Stripe Elements** — `CardNumberElement`, `CardExpiryElement`, `CardCvcElement`
- **React Query** — async mutation for PaymentIntent creation
- **Vercel Serverless Functions** — Stripe PaymentIntent creation server-side
- **Vercel Analytics** — page view tracking
- **SCSS Modules** — co-located styles, typed via `typed-scss-modules`

## Getting started

```bash
pnpm install
```

Create a `.env.local` with your Stripe keys:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Run with `vercel dev` to get both the Vite frontend and the serverless function:

```bash
vercel dev
```

Or run the frontend only (the payment endpoint won't work):

```bash
pnpm dev
```

## Payment flow

The frontend uses individual Stripe card elements rather than the prebuilt Payment Element, giving full control over layout and styling.

On submit:

1. Mantine form validation runs on name, email, and shipping fields
2. Stripe field completeness is checked (card number, expiry, CVV)
3. `createPaymentIntent` hits `/api/create-payment-intent` — a Vercel function that creates a PaymentIntent server-side using the Stripe secret key
4. `stripe.confirmCardPayment` is called with the returned `client_secret`
5. On success, the form unmounts and a Receipt component renders with the returned PaymentIntent data

## Test cards

This project runs on Stripe test keys — real card numbers will fail. Use any of these:

| Card number             | Result                         |
| ----------------------- | ------------------------------ |
| `4242 4242 4242 4242`   | Visa — payment succeeds        |
| `5555 5555 5555 4444`   | Mastercard — payment succeeds  |
| `3782 822463 10005`     | Amex — payment succeeds        |
| `6011 1111 1111 1117`   | Discover — payment succeeds    |
| `4000 0000 0000 9995`   | Declined (insufficient funds)  |
| `4000 0025 0000 3155`   | Requires 3D Secure auth        |

Any future expiry date, any 3-digit CVC (4-digit for Amex), and any ZIP. Full list: [stripe.com/docs/testing](https://stripe.com/docs/testing).

## Deployment

Hosted on Vercel. The `api/` folder contains the serverless function for PaymentIntent creation. Required environment variables in Vercel:

- `VITE_STRIPE_PUBLISHABLE_KEY` (Production + Preview)
- `STRIPE_SECRET_KEY` (Production + Preview + Development)

## Scripts

```bash
pnpm dev          # Vite dev server + SCSS type watcher
pnpm build        # tsc + Vite build
pnpm format       # Prettier
pnpm types:scss   # Regenerate SCSS module type definitions
vercel dev        # Run frontend + serverless functions together
```
