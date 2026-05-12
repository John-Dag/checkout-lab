import { useState } from 'react';
import { PaymentForm } from '../PaymentForm/PaymentForm';
import { ShippingForm } from '../ShippingForm/ShippingForm';
import { Button } from '@mantine/core';
import css from './CheckoutLab.module.scss';

export const CheckoutLab = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={css.grid}>
      <div className={css.columnLeft}></div>
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
