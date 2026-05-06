import css from './PaymentForm.module.scss';
import { TextInput } from '@mantine/core';
import { useState } from 'react';

export const PaymentForm = () => {
      const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const floating = value.trim().length !== 0 || focused || undefined;
  return ( 
  <div className={css.paymentForm}>
    <TextInput
      label="Floating label"
      placeholder="OMG, it also has a placeholder"
      required
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  </div>
  );
};
