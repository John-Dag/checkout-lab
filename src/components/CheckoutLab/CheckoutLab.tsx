import { PaymentForm } from '../PaymentForm/PaymentForm';
import css from './CheckoutLab.module.scss';

export const CheckoutLab = () => {
  return (
    <div className={css.grid}>
      <div className={css.columnLeft}></div>
      <div className={css.columnRight}>
        <PaymentForm />
      </div>
    </div>
  );
};
