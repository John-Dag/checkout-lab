import React from 'react';
import css from './ShippingForm.module.scss';
import { TextInputGeneric } from '../ui/TextInput/TextInputGeneric';
import { type ShippingFormProps } from '../../types/components/ShippingForm/ShippingFormProps';

export const ShippingForm = ({ form }: ShippingFormProps) => {
  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 2)
      .toUpperCase();
    form.setFieldValue('state', val);
  };

  return (
    <div className={css.shippingForm}>
      <div className={css.inner}>
        <div className={css.title}>Shipping Info</div>
        <TextInputGeneric
          name="name"
          placeholder="Full name"
          label="Full name"
          className={css.textInputName}
          {...form.getInputProps('name')}
        />
        <TextInputGeneric
          name="address"
          placeholder="Street address"
          label="Address"
          className={css.textInputName}
          {...form.getInputProps('address')}
        />
        <div className={css.cityStateZip}>
          <TextInputGeneric
            name="city"
            placeholder="City"
            label="City"
            className={css.city}
            {...form.getInputProps('city')}
          />
          <TextInputGeneric
            name="state"
            placeholder="State"
            label="State"
            className={css.state}
            value={form.values.state}
            onChange={handleStateChange}
            onBlur={() => form.validateField('state')}
            error={form.errors.state}
          />
          <TextInputGeneric
            name="zip"
            placeholder="ZIP"
            label="ZIP"
            className={css.zip}
            {...form.getInputProps('zip')}
          />
        </div>
      </div>
    </div>
  );
};
