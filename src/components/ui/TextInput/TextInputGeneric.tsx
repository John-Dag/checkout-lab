import { useState } from 'react';
import { TextInput } from '@mantine/core';
import css from './TextInputGeneric.module.scss';
import type { TextInputGenericProps } from '../../../types/components/ui/TextInputGeneric/TextInputGenericProps';
import { validateEmail } from '../../../utils/validation/validateEmail';

export const TextInputGeneric = ({
  name,
  label,
  placeholder,
  className,
  rightSection,
}: TextInputGenericProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const floating = value.trim().length !== 0 || focused || undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.currentTarget.value;
    setValue(next);
    setError(validateEmail(next));
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
      error={error}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating, 'data-error': error ? true : undefined }}
    />
  );
};
