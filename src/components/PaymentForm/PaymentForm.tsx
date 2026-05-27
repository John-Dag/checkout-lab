import { useMemo, useState } from 'react';
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
import { type PaymentFormProps } from '../../types/components/PaymentForm/PaymentFormProps';
import { type StripeFieldState } from '../../types/components/ui/StripeInput/StripeInputProps';
import { useMerchant } from '../../hooks/useMerchant';
import { InvoiceHeader } from '../InvoiceHeader/InvoiceHeader';
import { getTotal } from '../../utils/getTotal';

const buildStripeOptions = (focused: boolean, placeholder?: string) => ({
  placeholder,
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'system-ui, sans-serif',
      color: '#1a1a2e',
      '::placeholder': { color: focused ? '#adb5bd' : 'transparent' },
    },
    invalid: { color: '#fa5252' },
  },
});

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
  const { data } = useMerchant();
  const [card, setCard] = useState<StripeFieldState>(initialFieldState);
  const [expiry, setExpiry] = useState<StripeFieldState>(initialFieldState);
  const [cvv, setCvv] = useState<StripeFieldState>(initialFieldState);

  // Custom placeholder for stripe inputs
  const cardOptions = useMemo(
    () => ({ ...buildStripeOptions(card.focused, '1234 1234 1234 1234'), showIcon: true }),
    [card.focused],
  );
  const expiryOptions = useMemo(
    () => buildStripeOptions(expiry.focused, 'MM / YY'),
    [expiry.focused],
  );
  const cvvOptions = useMemo(() => buildStripeOptions(cvv.focused, 'CVC'), [cvv.focused]);

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

  const handleBillingStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 2)
      .toUpperCase();
    form.setFieldValue('billingState', val);
  };

  return (
    <div className={css.paymentForm}>
      <div className={css.inner}>
        <InvoiceHeader
          merchantLabel={data?.merchant?.business_profile?.name ?? ''}
          total={getTotal(data?.products ?? [])}
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
        <TextInputGeneric
          name="billingAddress"
          placeholder="Street address"
          label="Billing address"
          className={css.textInputName}
          {...form.getInputProps('billingAddress')}
        />
        <div className={css.billingRow}>
          <TextInputGeneric
            name="billingCity"
            placeholder="City"
            label="City"
            className={css.billingCity}
            {...form.getInputProps('billingCity')}
          />
          <TextInputGeneric
            name="billingState"
            placeholder="State"
            label="State"
            className={css.billingState}
            value={form.values.billingState}
            onChange={handleBillingStateChange}
            onBlur={() => form.validateField('billingState')}
            error={form.errors.billingState}
          />
          <TextInputGeneric
            name="billingZip"
            placeholder="ZIP"
            label="ZIP"
            className={css.billingZip}
            maxLength={5}
            {...form.getInputProps('billingZip')}
          />
        </div>
        <StripeInput
          label="Card number"
          state={{ ...card, error: getError(card, 'Card number') }}
          className={`${css.textInputName} ${css.cardLabel}`}
        >
          <CardNumberElement
            options={cardOptions}
            onFocus={() => setCard((p) => ({ ...p, focused: true }))}
            onBlur={() => setCard((p) => ({ ...p, focused: false }))}
            onChange={(e) => {
              handleChange(setCard, e);
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
              options={cvvOptions}
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
              options={expiryOptions}
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
          label="Shipping address is same as billing"
        />
      </div>
    </div>
  );
};
