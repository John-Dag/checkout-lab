import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';
import css from './CheckoutLab.module.scss';
import { Invoice } from '../Invoice/Invoice';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { usePaymentForm, useShippingForm } from '../formData/formData';
import { stripePromise, stripeAppearance } from '../../lib/stripe';

const stripeOptions = { appearance: stripeAppearance };

export const CheckoutLab = () => {
  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const paymentForm = usePaymentForm();
  const shippingForm = useShippingForm();

  const columnRef = useRef<HTMLDivElement>(null);
  const formStackRef = useRef<HTMLDivElement>(null);
  const shippingWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useLayoutEffect(() => {
    const column = columnRef.current;
    const formStack = formStackRef.current;
    const shippingEl = shippingWrapperRef.current;
    if (!column || !formStack || !shippingEl) return;

    const update = () => {
      formStack.style.marginTop = '0px';
      const colH = column.clientHeight;
      const stackH = formStack.offsetHeight;
      const shippingH = shippingEl.offsetHeight;
      const stableH = stackH - shippingH;
      const margin = Math.max(40, Math.floor((colH - stableH) / 2));
      formStack.style.marginTop = `${margin}px`;
    };

    const ro = new ResizeObserver(update);
    ro.observe(column);
    ro.observe(formStack);
    update();
    return () => ro.disconnect();
  }, [isLoading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={css.grid}>
      <div className={css.columnLeft}>
        <Invoice />
      </div>
      <div className={css.columnRight} ref={columnRef}>
        <div className={css.formStack} ref={formStackRef}>
          <Elements stripe={stripePromise} options={stripeOptions}>
            <CheckoutForm
              checked={checked}
              setChecked={setChecked}
              paymentForm={paymentForm}
              shippingForm={shippingForm}
              shippingWrapperRef={shippingWrapperRef}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};
