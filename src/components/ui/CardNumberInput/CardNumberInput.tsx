import { useState } from 'react';
import { TextInput } from '@mantine/core';
import css from './CardNumberInput.module.scss';
import type { TextInputGenericProps } from '../../../types/components/ui/TextInputGeneric/TextInputGenericProps';
import { detectCardType } from '../../../utils/validation/detectCardType';
import { VisaIcon, MastercardIcon, AmexIcon, DiscoverIcon } from '../icons/cards';

const ICON_SIZE = 30;

const cardIcons = {
  visa: <VisaIcon size={ICON_SIZE} />,
  mastercard: <MastercardIcon size={ICON_SIZE} />,
  amex: <AmexIcon size={ICON_SIZE} />,
  discover: <DiscoverIcon size={ICON_SIZE} />,
};

export const CardNumberInput = ({ name, label, placeholder, className }: TextInputGenericProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const floating = value.trim().length !== 0 || focused || undefined;

  const cardType = detectCardType(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <TextInput
      name={name}
      label={label}
      placeholder={placeholder}
      required
      className={className}
      classNames={css}
      value={value}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="cc-number"
      inputMode="numeric"
      maxLength={19}
      data-floating={floating}
      rightSection={cardType ? cardIcons[cardType] : null}
      labelProps={{ 'data-floating': floating }}
    />
  );
};
