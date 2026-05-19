import { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import type {
  StripeCardNumberElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardCvcElementChangeEvent,
} from '@stripe/stripe-js';
import { Checkbox } from '@mantine/core';
import css from './PaymentForm.module.scss';
import { TextInputGeneric } from '../ui/TextInput/TextInputGeneric';
import { StripeInput } from '../ui/StripeInput/StripeInput';
import { cardIcons } from '../../utils/cardIcons';
import { type PaymentFormProps } from '../../types/components/PaymentForm/PaymentFormProps';
import { type StripeFieldState } from '../../types/components/ui/StripeInput/StripeInputProps';
import { fakeOrder } from '../../api/fakeData/fakeData';
import { InvoiceHeader } from '../InvoiceHeader/InvoiceHeader';

// Custom styling for stripe inputs
const stripeElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'system-ui, sans-serif',
      color: '#1a1a2e',
      '::placeholder': { color: 'transparent' },
    },
    invalid: { color: '#fa5252' },
  },
};

const initialFieldState: StripeFieldState = {
  focused: false,
  hasValue: false,
  complete: false,
  error: undefined,
};

export const PaymentForm = ({
  checked,
  setChecked,
  form,
  submitted,
  onStripeValidityChange,
}: PaymentFormProps) => {
  const data = fakeOrder;
  const [card, setCard] = useState<StripeFieldState>(initialFieldState);
  const [expiry, setExpiry] = useState<StripeFieldState>(initialFieldState);
  const [cvv, setCvv] = useState<StripeFieldState>(initialFieldState);
  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const handleChange = (
    set: React.Dispatch<React.SetStateAction<StripeFieldState>>,
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent,
  ) => {
    set((prev) => ({ ...prev, hasValue: !e.empty, complete: e.complete, error: e.error?.message }));
  };

  const getError = (state: StripeFieldState, label: string) =>
    state.error ?? (submitted && !state.hasValue ? `${label} is required` : undefined);

  return (
    <div className={css.paymentForm}>
      <div className={css.inner}>
        <InvoiceHeader
          merchantLabel={data?.merchantLabel}
          total={data?.total}
          className={css.invoiceHeader}
        />
        <div className={css.title}>Payment Info</div>
        <TextInputGeneric
          name="name"
          placeholder="Name"
          label="Name"
          className={css.textInputName}
          {...form.getInputProps('name')}
        />
        <TextInputGeneric
          name="email"
          placeholder="Email"
          label="Email"
          className={css.textInputEmail}
          {...form.getInputProps('email')}
        />
        <StripeInput
          label="Card number"
          state={{ ...card, error: getError(card, 'Card number') }}
          className={css.textInputName}
          rightSection={cardBrand ? cardIcons[cardBrand] : undefined}
        >
          <CardNumberElement
            options={stripeElementOptions}
            onFocus={() => setCard((p) => ({ ...p, focused: true }))}
            onBlur={() => setCard((p) => ({ ...p, focused: false }))}
            onChange={(e) => {
              handleChange(setCard, e);
              setCardBrand(e.brand);
              onStripeValidityChange(e.complete && expiry.complete && cvv.complete);
            }}
          />
        </StripeInput>
        <div className={css.expiryInputs}>
          <StripeInput
            label="CVV"
            state={{ ...cvv, error: getError(cvv, 'CVV') }}
            className={css.expiryCvv}
          >
            <CardCvcElement
              options={stripeElementOptions}
              onFocus={() => setCvv((p) => ({ ...p, focused: true }))}
              onBlur={() => setCvv((p) => ({ ...p, focused: false }))}
              onChange={(e) => {
                handleChange(setCvv, e);
                onStripeValidityChange(card.complete && expiry.complete && e.complete);
              }}
            />
          </StripeInput>
          <StripeInput
            label="Expiration"
            state={{ ...expiry, error: getError(expiry, 'Expiration date') }}
            className={css.expiryDate}
          >
            <CardExpiryElement
              options={stripeElementOptions}
              onFocus={() => setExpiry((p) => ({ ...p, focused: true }))}
              onBlur={() => setExpiry((p) => ({ ...p, focused: false }))}
              onChange={(e) => {
                handleChange(setExpiry, e);
                onStripeValidityChange(card.complete && e.complete && cvv.complete);
              }}
            />
          </StripeInput>
        </div>
        <Checkbox
          className={css.shippingCheckbox}
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="Billing address is same as shipping"
        />
      </div>
    </div>
  );
};
