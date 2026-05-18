# Checkout Lab

A checkout form UI built with React 19, Mantine v9, and Stripe Elements. Includes a two-column layout with an invoice panel, payment form, and optional shipping form.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Mantine v9** — UI components and form state
- **Stripe Elements** — `CardNumberElement`, `CardExpiryElement`, `CardCvcElement`
- **React Query** — async mutation for PaymentIntent creation
- **SCSS Modules** — co-located styles, typed via `typed-scss-modules`

## Getting started

```bash
pnpm install
```

Copy the environment file and add your Stripe publishable key:

```bash
cp .env.example .env.local
```

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

```bash
pnpm dev
```

## Payment flow

The frontend uses individual Stripe card elements rather than the prebuilt Payment Element, giving full control over layout and styling.

On submit:

1. Mantine form validation runs on name, email, and shipping fields
2. Stripe field completeness is checked (card number, expiry, CVV)
3. `createPaymentIntent` is called — currently a stub in `src/api/payment.ts`
4. `stripe.confirmCardPayment` is called with the returned `client_secret`

### Wiring up a real backend

Replace the stub in `src/api/payment.ts`:

```ts
export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
  return fetch('/api/create-payment-intent', { method: 'POST' }).then(r => r.json());
};
```

Your backend endpoint should create a PaymentIntent using the Stripe secret key and return `{ clientSecret }`. The amount and currency should come from your order/cart data.

## Project structure

```
src/
  api/                  # Data fetching (payment.ts, fakeData.ts)
  assets/               # SVG icon components
  components/
    CheckoutLab/        # Root layout, ResizeObserver centering logic
    CheckoutForm/       # Stripe hooks, submit handler, pay button
    PaymentForm/        # Card fields, name, email, billing checkbox
    ShippingForm/       # Address fields with US state validation
    Invoice/            # Left-column order summary
    ui/
      TextInput/        # Mantine floating label input wrapper
      StripeInput/      # Stripe iframe floating label wrapper
      icons/cards/      # Visa, Mastercard, Amex, Discover SVG icons
  formData/             # usePaymentForm, useShippingForm hooks
  lib/                  # stripe.ts — loadStripe + appearance config
  types/                # TypeScript interfaces (mirrors src/ structure)
  utils/                # formatCurrency, cardIcons, validation helpers
```

## Forms

Form state and validation live in `src/components/formData/formData.ts`.

**Payment** — name (required), email (valid format), card fields (Stripe)

**Shipping** — name, email, address, city, state (valid US state abbreviation), ZIP (5-digit or ZIP+4)

Shipping is hidden behind a "billing address is same as shipping" checkbox and animates in with a CSS grid-template-rows transition.

## Scripts

```bash
pnpm dev          # Vite dev server + SCSS type watcher
pnpm build        # tsc + Vite build
pnpm format       # Prettier
pnpm types:scss   # Regenerate SCSS module type definitions
```
