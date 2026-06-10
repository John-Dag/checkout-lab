import css from './StripeInput.module.scss';
import { type StripeInputProps } from '../../../types/components/ui/StripeInput/StripeInputProps';

export const StripeInput = ({
  label,
  state,
  className,
  children,
  rightSection,
  helperText,
}: StripeInputProps) => (
  <div className={`${css.root}${className ? ` ${className}` : ''}`}>
    <label
      className={css.label}
      data-floating={state.hasValue || state.focused || undefined}
      data-error={state.error ? true : undefined}
    >
      {label}
    </label>
    <div
      className={css.field}
      data-focused={state.focused || undefined}
      data-error={state.error ? true : undefined}
    >
      {children}
      {rightSection && <div className={css.rightSection}>{rightSection}</div>}
    </div>
    {state.error ? (
      <p className={css.error}>{state.error}</p>
    ) : helperText ? (
      <p className={css.helperText}>{helperText}</p>
    ) : null}
  </div>
);
