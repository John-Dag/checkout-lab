interface CheckmarkIconProps {
  size?: number;
  color?: string;
}

export const CheckmarkIcon = ({ size = 48, color = '#2f9e44' }: CheckmarkIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Success"
  >
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2.5" fill="none" />
    <polyline
      points="14,24 21,31 34,17"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
