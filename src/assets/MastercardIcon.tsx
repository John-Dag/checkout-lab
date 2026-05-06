import type { CardIconProps } from '../types/assets/AssetsTypes';

export const MastercardIcon = ({ className, size = 38 }: CardIconProps) => (
  <svg
    width={size}
    height={Math.round((size * 24) / 38)}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Mastercard"
  >
    <rect width="38" height="24" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="14" cy="12" r="7" fill="#EB001B" />
    <circle cx="24" cy="12" r="7" fill="#F79E1B" />
    {/* Orange overlap lens */}
    <path d="M19 7.1 A7 7 0 0 0 19 16.9 A7 7 0 0 0 19 7.1 Z" fill="#FF5F00" />
  </svg>
);
