import { Fragment } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import css from './Invoice.module.scss';
import { formatCurrency } from '../../utils/formatCurrency';
import { InvoiceHeader } from '../InvoiceHeader/InvoiceHeader';
import { getTotal } from '../../utils/getTotal';

export const Invoice = () => {
  const { data } = useMerchant();
  const products = data?.products ?? [];

  return (
    <div className={css.invoiceWrap}>
      <div className={css.invoiceInner}>
        <InvoiceHeader
          merchantLabel={data?.merchant?.business_profile?.name ?? ''}
          total={getTotal(products)}
        />
        <div className={css.invoiceItemGrid}>
          {products.map((item) => {
            const price = item.default_price;
            const unitAmount = price && typeof price !== 'string' ? (price.unit_amount ?? 0) : 0;
            return (
              <Fragment key={item.id}>
                <div className={css.invoiceLeft}>
                  {item.metadata?.quantity || 1}x {item.name}
                </div>
                <div className={css.invoiceRight}>{formatCurrency(unitAmount / 100)}</div>
              </Fragment>
            );
          })}
        </div>
        <hr className={css.divider} />
        <div className={css.invoiceTotalGrid}>
          <>
            <div className={css.invoiceLeft}>Subtotal</div>
            <div className={css.invoiceRight}>{formatCurrency(getTotal(products))}</div>
          </>
          <>
            <div className={`${css.invoiceLeft} ${css.totalText}`}>Total</div>
            <div className={`${css.invoiceRight} ${css.totalText}`}>
              {formatCurrency(getTotal(products))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
