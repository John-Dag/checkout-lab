import { useEffect, useState } from 'react';
import { PaymentForm } from '../PaymentForm/PaymentForm';
import { ShippingForm } from '../ShippingForm/ShippingForm';
import { Button } from '@mantine/core';
import css from './CheckoutLab.module.scss';
import { Invoice } from '../Invoice/Invoice';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export const CheckoutLab = () => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className={css.grid}>
      <div className={css.columnLeft}>
        <Invoice />
      </div>
      <div className={css.columnRight}>
        <PaymentForm checked={checked} setChecked={setChecked} />
        <div className={css.shippingWrapper} data-visible={!checked || undefined}>
          <ShippingForm />
        </div>
        <Button className={css.payButton}>Pay</Button>
      </div>
    </div>
  );
};
