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

## Project structure

```
api/
  create-payment-intent.ts   # Vercel serverless function — creates Stripe PaymentIntent

src/
  api/                       # Frontend data calls (payment.ts → /api endpoint, fakeData.ts)
  assets/                    # SVG icon components (CheckoutLabIcon, CheckmarkIcon)
  components/
    CheckoutLab/             # Root layout, ResizeObserver centering logic
    CheckoutForm/            # Stripe hooks, submit handler, pay button
    PaymentForm/             # Card fields, name, email, billing checkbox
    ShippingForm/            # Address fields with US state validation
    Invoice/                 # Left-column order summary
    InvoiceHeader/           # Reusable logo + merchant + total block
    Receipt/                 # Post-payment success view
    LoadingScreen/           # Two-column skeleton matching the app layout
    ui/
      TextInput/             # Mantine floating label input wrapper
      StripeInput/           # Stripe iframe floating label wrapper
      icons/cards/           # Visa, Mastercard, Amex, Discover SVG icons
  formData/                  # usePaymentForm, useShippingForm hooks
  lib/                       # stripe.ts — loadStripe + appearance config
  types/                     # TypeScript interfaces (mirrors src/ structure)
  utils/                     # formatCurrency, cardIcons, orderCalculations, validation
```

## Forms

Form state and validation live in `src/components/formData/formData.ts`.

**Payment** — name (required), email (valid format), card fields (Stripe)

**Shipping** — name, email, address, city, state (valid US state abbreviation), ZIP (5-digit or ZIP+4)

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
