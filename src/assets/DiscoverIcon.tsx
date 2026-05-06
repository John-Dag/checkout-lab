import type { CardIconProps } from '../types/assets/AssetsTypes';

export const DiscoverIcon = ({ className, size = 38 }: CardIconProps) => (
  <svg
    width={size}
    height={Math.round((size * 24) / 38)}
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Discover"
  >
    <rect width="38" height="24" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="32" cy="12" r="9" fill="#F76F20" />
    <text
      x="13"
      y="14"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="5.5"
      fill="#231F20"
      letterSpacing="0.3"
    >
      DISCOVER
    </text>
  </svg>
);
