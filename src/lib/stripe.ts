import { loadStripe } from '@stripe/stripe-js';
import type { Appearance } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const stripeAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#863bff',
    colorBackground: '#ffffff',
    colorText: '#1a1a2e',
    colorDanger: '#fa5252',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    borderRadius: '4px',
    spacingUnit: '4px',
  },
};
