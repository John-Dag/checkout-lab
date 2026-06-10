import type React from 'react';

export interface StripeFieldState {
  focused: boolean;
  hasValue: boolean;
  complete: boolean;
  error?: string;
}

export interface StripeInputProps {
  label: string;
  state: StripeFieldState;
  className?: string;
  children: React.ReactNode;
  rightSection?: React.ReactNode;
  helperText?: string;
}
