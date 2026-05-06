import type { CardIconProps } from '../types/assets/AssetsTypes';

export const AmexIcon = ({ className, size = 38 }: CardIconProps) => (
  <svg
    width={size}
    height={Math.round((size * 24) / 38)}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="American Express"
  >
    <rect width="38" height="24" rx="4" fill="#2E77BC" />
    <text
      x="19"
      y="10.5"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="6"
      fill="white"
      letterSpacing="0.5"
    >
      AMERICAN
    </text>
    <text
      x="19"
      y="17"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="7"
      fill="white"
      letterSpacing="1"
    >
      EXPRESS
    </text>
  </svg>
);
