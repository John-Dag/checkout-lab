import css from './App.module.scss';
import { CheckoutLab } from '../CheckoutLab/CheckoutLab';
import { Support } from '../Support/Support';
import { Analytics } from '@vercel/analytics/react';

export const App = () => {
  return (
    <div className={css.wrapper}>
      <CheckoutLab />
      <Support />
      <Analytics />
    </div>
  );
};
