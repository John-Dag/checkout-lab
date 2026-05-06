import type { CardIconProps } from '../types/assets/AssetsTypes';

export const VisaIcon = ({ className, size = 38 }: CardIconProps) => (
  <svg
    width={size}
    height={Math.round((size * 24) / 38)}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Visa"
  >
    <rect width="38" height="24" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1" />
    <rect width="38" height="5" rx="0" fill="#1A1F71" />
    <rect y="19" width="38" height="5" fill="#F7A823" />
    <rect y="4" width="38" height="1" fill="#1A1F71" />
    <text
      x="19"
      y="15.5"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontStyle="italic"
      fontSize="10"
      fill="#1A1F71"
    >
      VISA
    </text>
  </svg>
);
