import { useState } from 'react';
import { TextInput } from '@mantine/core';
import css from './TextInputGeneric.module.scss';
import type { TextInputGenericProps } from '../../../types/components/ui/TextInputGeneric/TextInputGenericProps';

export const TextInputGeneric = ({
  name,
  label,
  placeholder,
  className,
  rightSection,
  value = '',
  maxLength,
  onChange,
  onBlur,
  error,
}: TextInputGenericProps) => {
  const [focused, setFocused] = useState(false);
  const floating = value.trim().length !== 0 || focused || undefined;

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
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      mt="md"
      size="md"
      autoComplete="nope"
      maxLength={maxLength}
      data-floating={floating}
      rightSection={rightSection}
      labelProps={{ 'data-floating': floating, 'data-error': error ? true : undefined }}
    />
  );
};
