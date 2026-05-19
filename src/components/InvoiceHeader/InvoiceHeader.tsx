import css from './InvoiceHeader.module.scss';
import { formatCurrency } from '../../utils/formatCurrency';
import { CheckoutLabIcon } from '../../assets/CheckoutLabIcon';
import { type InvoiceHeaderProps } from '../../types/components/Invoice/InvoiceHeaderProps';

export const InvoiceHeader = ({ merchantLabel, total, className }: InvoiceHeaderProps) => (
  <div className={className}>
    <div className={css.left}>
      <CheckoutLabIcon />
      <div className={css.merchant}>{merchantLabel}</div>
      <div className={css.total}>{formatCurrency(total)}</div>
    </div>
    <div className={css.right} />
  </div>
);
