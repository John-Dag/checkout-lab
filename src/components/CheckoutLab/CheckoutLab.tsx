import { useLayoutEffect, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';
import css from './CheckoutLab.module.scss';
import { Invoice } from '../Invoice/Invoice';
import { usePaymentForm, useShippingForm } from '../formData/formData';
import { stripePromise, stripeAppearance } from '../../lib/stripe';
import type { PaymentIntent } from '@stripe/stripe-js';
import { Receipt } from '../Receipt/Receipt';
import { useMerchant } from '../../hooks/useMerchant';
import { CheckoutLabSkeleton } from '../Skeletons/CheckoutLabSkeleton/CheckoutLabSkeleton';

const stripeOptions = { appearance: stripeAppearance };

export const CheckoutLab = () => {
  const { isLoading } = useMerchant();
  const [checked, setChecked] = useState(true);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const paymentForm = usePaymentForm();
  const shippingForm = useShippingForm();

  const columnRef = useRef<HTMLDivElement>(null);
  const formStackRef = useRef<HTMLDivElement>(null);
  const shippingWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const column = columnRef.current;
    const formStack = formStackRef.current;
    const shippingEl = shippingWrapperRef.current;
    if (!column || !formStack || !shippingEl) return;

    const update = () => {
      const colH = column.clientHeight;
      const stackH = formStack.offsetHeight;
      const shippingH = shippingEl.offsetHeight;
      const stableH = stackH - shippingH;
      const margin = Math.max(40, Math.floor((colH - stableH) / 2)) + 40;
      formStack.style.marginTop = `${margin}px`;
    };

    const ro = new ResizeObserver(update);
    ro.observe(column);
    ro.observe(formStack);
    update();
    return () => ro.disconnect();
  }, [isLoading]);

  if (isLoading) return <CheckoutLabSkeleton />;

  return (
    <div className={css.grid}>
      <div className={css.columnLeft}>
        <Invoice />
      </div>
      <div className={css.columnRight} ref={columnRef}>
        {paymentIntent ? (
          <div className={css.receiptWrapper}>
            <Receipt paymentIntent={paymentIntent} />
          </div>
        ) : (
          <div className={css.formStack} ref={formStackRef}>
            <Elements stripe={stripePromise} options={stripeOptions}>
              <CheckoutForm
                checked={checked}
                setChecked={setChecked}
                paymentForm={paymentForm}
                shippingForm={shippingForm}
                shippingWrapperRef={shippingWrapperRef}
                onPaymentSuccess={setPaymentIntent}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};
