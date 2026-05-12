import { useEffect, Fragment } from 'react';
import { fakeOrder } from '../../api/fakeData/fakeData';
import css from './Invoice.module.scss';
import { formatCurrency } from '../../utils/formatCurrency';
import { CompanyLogo } from '../../assets/CompanyLogo';

export const Invoice = () => {
  const data = fakeOrder;
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={css.invoiceWrap}>
      <div className={css.invoiceInner}>
        <div className={css.invoiceGrid}>
          <div className={css.invoiceLeft}>
            <CompanyLogo />
            <div className={css.invoiceMerchant}>{data?.merchantLabel}</div>
            <div className={css.invoiceTotal}>{formatCurrency(data?.total)}</div>
          </div>
          <div className={css.invoiceRight}></div>
        </div>
        <div className={css.invoiceItemGrid}>
          {data.items.map((item) => (
            <Fragment key={item.id}>
              <div className={css.invoiceLeft}>
                {item.quantity}x {item.name}
              </div>
              <div className={css.invoiceRight}>{formatCurrency(item.unitPrice)}</div>
            </Fragment>
          ))}
        </div>
        <hr className={css.divider} />
        <div className={css.invoiceItemGrid}>
          <>
            <div className={css.invoiceLeft}>Tax</div>
            <div className={css.invoiceRight}>{formatCurrency(data.tax)}</div>
          </>
          <>
            <div className={css.invoiceLeft}>Total</div>
            <div className={css.invoiceRight}>{formatCurrency(data.total)}</div>
          </>
        </div>
      </div>
    </div>
  );
};
