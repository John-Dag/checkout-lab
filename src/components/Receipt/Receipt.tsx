import { CheckmarkIcon } from '../../assets/CheckmarkIcon';
import { formatCurrency } from '../../utils/formatCurrency';
import { type ReceiptProps } from '../../types/components/Receipt/ReceiptProps';
import css from './Receipt.module.scss';

const formatDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const formatId = (id: string) => `${id.slice(0, 16)}…`;

export const Receipt = ({ paymentIntent }: ReceiptProps) => (
  <div className={css.receiptWrapper}>
    <CheckmarkIcon size={52} />
    <div className={css.title}>Payment successful</div>
    <div className={css.grid}>
      <span className={css.label}>Payment ID</span>
      <span className={css.value}>{formatId(paymentIntent?.id)}</span>

      <span className={css.label}>Amount</span>
      <span className={css.value}>{formatCurrency(paymentIntent?.amount / 100)}</span>

      <span className={css.label}>Status</span>
      <span className={css.value}>
        {paymentIntent?.status.charAt(0).toUpperCase() + paymentIntent.status.slice(1)}
      </span>

      <span className={css.label}>Date</span>
      <span className={css.value}>{formatDate(paymentIntent?.created)}</span>

      <span className={css.label}>Currency</span>
      <span className={css.value}>{paymentIntent?.currency?.toUpperCase()}</span>
    </div>
  </div>
);
