import css from './PaymentForm.module.scss';
import { TextInputGeneric } from '../ui/TextInput/TextInputGeneric';
import { CardNumberInput } from '../ui/CardNumberInput/CardNumberInput';
import { Checkbox } from '@mantine/core';

export const PaymentForm = ({ checked, setChecked }: any) => {
  return (
    <div className={css.paymentForm}>
      <div className={css.inner}>
        <div className={css.title}>Payment Info</div>
        <TextInputGeneric
          name={'nameInput'}
          placeholder={'Name'}
          label={'Name'}
          className={css.textInputName}
        />
        <TextInputGeneric
          name={'emailInput'}
          placeholder={'Email'}
          label={'Email'}
          className={css.textInputEmail}
        />
        <CardNumberInput
          name={'cardInput'}
          placeholder={'Card number'}
          label={'Card number'}
          className={css.textInputName}
        />
        <div className={css.expiryInputs}>
          <TextInputGeneric className={css.expiryCvv} name={'CVV'} placeholder="CVV" label="CVV" />
          <TextInputGeneric
            className={css.expiryDate}
            name={'expiryInput'}
            placeholder={'MM/YY'}
            label="Expiration"
          />
        </div>
        <Checkbox
          className={css.shippingCheckbox}
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="Billing address is same as shipping"
          defaultChecked
        />
      </div>
    </div>
  );
};
