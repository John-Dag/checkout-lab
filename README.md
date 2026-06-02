# Checkout Lab

A checkout application built with React 19, Mantine v9, and Stripe Elements. Merchant details and a product list are pulled from a Stripe Connect test account. Set up your own stripe test account with a connect merchant and products to build your own checkout (See below for Stripe test card numbers)

**Live demo:** https://checkout-lab-iota.vercel.app/

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Mantine v9** — UI components and form state
- **React Query** — merchant data fetching and PaymentIntent mutation
- **Vercel Serverless Functions** — Stripe calls run server-side with the secret key
- **SCSS Modules** — co-located styles, typed via `typed-scss-modules`

## Getting started

```bash
pnpm install
```

Create a `.env` file with your Stripe keys and connected account ID:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MERCHANT_ACCOUNT_ID=acct_...
```

`vercel dev` loads `.env` for both the Vite frontend and the serverless functions, so run:

```bash
vercel dev
```

`pnpm dev` runs the frontend only — the `/api` endpoints won't be available.

## How it works

On load, the app calls `/api/merchant`, which retrieves the connected Stripe account and its products (with prices expanded). The invoice renders from that real product data and amounts.

On submit:

1. Mantine form validation runs on name, email, and shipping fields
2. Stripe field completeness is checked (card number, expiry, CVV)
3. `/api/create-payment-intent` fetches the products again server-side, sums their prices, and creates a PaymentIntent with that amount — the charge total is never trusted from the client
4. `stripe.confirmCardPayment` is called with the returned `client_secret`
5. On success, the form unmounts and a Receipt component renders with the PaymentIntent data

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

## Forms

Form state and validation live in `src/components/formData/formData.ts`.

**Payment** — name (required), email (valid format), card fields (Stripe)

**Shipping** — name, email, address, city, state (valid US state abbreviation), ZIP (5-digit or ZIP+4)

## Deployment

Hosted on Vercel. The `api/` folder contains the serverless functions. Required environment variables in Vercel:

- `VITE_STRIPE_PUBLISHABLE_KEY` (Production + Preview)
- `STRIPE_SECRET_KEY` (Production + Preview + Development)
- `MERCHANT_ACCOUNT_ID` (Production + Preview + Development)

## Scripts

```bash
pnpm dev          # Vite dev server + SCSS type watcher
pnpm build        # tsc + Vite build
pnpm format       # Prettier
pnpm types:scss   # Regenerate SCSS module type definitions
vercel dev        # Run frontend + serverless functions together
```
