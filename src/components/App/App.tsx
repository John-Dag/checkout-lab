import css from './App.module.scss';
import { CheckoutLab } from '../CheckoutLab/CheckoutLab';
import { Analytics } from '@vercel/analytics/react';

export const App = () => {
  return (
    <div className={css.wrapper}>
      <CheckoutLab />
      <Analytics />
    </div>
  );
};
