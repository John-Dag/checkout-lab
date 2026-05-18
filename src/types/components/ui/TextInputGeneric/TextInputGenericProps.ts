import type React from 'react';

export interface TextInputGenericProps {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rightSection?: React.ReactNode;
  maxLength?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: React.ReactNode;
}
