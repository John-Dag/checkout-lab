import { useLayoutEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import { Button } from '@mantine/core';
import { PaymentForm } from '../PaymentForm/PaymentForm';
import { ShippingForm } from '../ShippingForm/ShippingForm';
import css from './CheckoutForm.module.scss';
import { createPaymentIntent } from '../../api/payment';
import { type CheckoutFormProps } from '../../types/components/CheckoutLab/CheckoutFormProps';

export const CheckoutForm = ({
  checked,
  setChecked,
  paymentForm,
  shippingForm,
  shippingWrapperRef,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitted, setSubmitted] = useState(false);
  const [stripeValid, setStripeValid] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const shippingContentRef = useRef<HTMLDivElement>(null);
  const [shippingHeight, setShippingHeight] = useState(0);

  useLayoutEffect(() => {
    const el = shippingContentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setShippingHeight(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { mutateAsync: fetchClientSecret, isPending } = useMutation({
    mutationFn: createPaymentIntent,
  });

  const handleSubmit = async () => {
    setSubmitted(true);
    const paymentResult = paymentForm.validate();
    const shippingResult = !checked ? shippingForm.validate() : { hasErrors: false };

    if (paymentResult.hasErrors || shippingResult.hasErrors || !stripeValid) return;
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return;

    setPaymentError(null);

    const { clientSecret } = await fetchClientSecret();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: paymentForm.values.name,
          email: paymentForm.values.email,
        },
      },
    });

    if (error) {
      setPaymentError(error.message ?? 'Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      console.log('Payment succeeded!', paymentIntent);
    }
  };

  return (
    <>
      <PaymentForm
        checked={checked}
        setChecked={setChecked}
        form={paymentForm}
        submitted={submitted}
        onStripeValidityChange={setStripeValid}
      />
      <div
        className={css.shippingWrapper}
        ref={shippingWrapperRef}
        style={{ height: checked ? 0 : shippingHeight }}
      >
        <div ref={shippingContentRef}>
          <ShippingForm form={shippingForm} />
        </div>
      </div>
      {paymentError && <p className={css.paymentError}>{paymentError}</p>}
      <Button className={css.payButton} onClick={handleSubmit} loading={isPending}>
        Pay
      </Button>
    </>
  );
};
