import css from './ShippingForm.module.scss';
import { TextInputGeneric } from '../ui/TextInput/TextInputGeneric';
import { CardNumberInput } from '../ui/CardNumberInput/CardNumberInput';

export const ShippingForm = () => {
  return (
    <div className={css.shippingForm}>
      <div className={css.inner}>
        <div className={css.title}>Shipping Info</div>
        <TextInputGeneric
          name={'nameInput'}
          placeholder={'Shipping name'}
          label={'Shipping name'}
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
    </div>
  );
};
