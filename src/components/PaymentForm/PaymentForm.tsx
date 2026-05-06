import css from './PaymentForm.module.scss';
import { TextInputGeneric } from '../ui/TextInput/TextInputGeneric';
import { CardNumberInput } from '../ui/CardNumberInput/CardNumberInput';

export const PaymentForm = () => {
  return (
    <div className={css.paymentForm}>
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
    </div>
  );
};
