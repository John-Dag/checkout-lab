# Checkout Lab

## Package manager
Always use **pnpm**. Never use npm or yarn.

## Tech stack
- React 19, TypeScript, Vite
- Mantine v9 (components + forms)
- SCSS modules (typed via `typed-scss-modules`)

## Dev
```
pnpm dev       # vite + scss type watcher in parallel
pnpm build     # tsc + vite build
pnpm format    # prettier
```

## Project structure

```
src/
  assets/          # SVG icon components (React, .tsx)
  api/             # Data fetching / fake data
  components/      # Feature and UI components
    ui/            # Reusable primitives (inputs, etc.)
    formData/      # Mantine form hooks (usePaymentForm, useShippingForm)
  types/           # TypeScript definitions — mirrors src/ structure exactly
    assets/
    api/
    components/
    utils/
  utils/           # Pure helpers (formatCurrency, validation)

public/
  checkout-lab-icon.svg   # Favicon (the CL mark)
```

## Type definitions
All interfaces and types live in `src/types/`, mirroring the path of the file that uses them.

- Source file: `src/components/PaymentForm/PaymentForm.tsx`
- Type file: `src/types/components/PaymentForm/PaymentFormProps.ts`

Source files import from `src/types/` and re-export with `export type { ... }` so existing import paths don't break.

## SCSS modules
Every component has a co-located `.module.scss` file. Typed class definitions are auto-generated as `.module.scss.d.ts` — do not edit these files manually. Run `pnpm types:scss` to regenerate after adding new class names.

## Forms
Form state and validation live in `src/components/formData/formData.ts` as custom hooks (`usePaymentForm`, `useShippingForm`). The underlying interfaces (`PaymentFormValues`, `ShippingFormValues`) are defined in `src/types/components/formData/FormDataTypes.ts`.

## Layout
The app is a two-column grid (Invoice left, forms right). The right column uses `justify-content: flex-start` with `padding-top: max(40px, calc(50vh - 260px))` to vertically center the payment form without shifting it when the shipping section expands.
