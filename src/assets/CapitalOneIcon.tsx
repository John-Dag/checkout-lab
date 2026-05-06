import type { CardIconProps } from '../types/assets/AssetsTypes';

export const CapitalOneIcon = ({ className, size = 38 }: CardIconProps) => (
  <svg
    width={size}
    height={Math.round((size * 24) / 38)}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Capital One"
  >
    <rect width="38" height="24" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1" />
    {/* Swoosh arc */}
    <path
      d="M11 12 A8 8 0 1 1 19 20"
      stroke="#C8102E"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <text
      x="25"
      y="10"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="4.5"
      fill="#004977"
    >
      CAPITAL
    </text>
    <text
      x="25"
      y="16"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="4.5"
      fill="#004977"
    >
      ONE
    </text>
  </svg>
);
