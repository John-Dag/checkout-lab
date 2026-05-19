interface CheckoutLabIconProps {
  className?: string;
  size?: number;
}

export const CheckoutLabIcon = ({ className, size = 120 }: CheckoutLabIconProps) => (
  <svg
    width={size}
    height={Math.round(size * 0.4)}
    viewBox="0 0 120 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Checkout Lab"
  >
    {/* Mark: rounded square with cut corner */}
    <rect x="0" y="4" width="40" height="40" rx="8" fill="#12b886" fillOpacity="0.25" />
    <rect x="4" y="8" width="32" height="32" rx="6" fill="#12b886" fillOpacity="0.35" />
    {/* CL monogram */}
    <text
      x="20"
      y="30"
      textAnchor="middle"
      fontFamily="'Segoe UI', system-ui, sans-serif"
      fontWeight="700"
      fontSize="16"
      fill="white"
      letterSpacing="-0.5"
    >
      CL
    </text>
    {/* Wordmark */}
    <text
      x="52"
      y="22"
      fontFamily="'Segoe UI', system-ui, sans-serif"
      fontWeight="600"
      fontSize="11"
      fill="white"
      letterSpacing="0.2"
    >
      CHECKOUT
    </text>
    <text
      x="52"
      y="36"
      fontFamily="'Segoe UI', system-ui, sans-serif"
      fontWeight="300"
      fontSize="11"
      fill="white"
      fillOpacity="0.75"
      letterSpacing="2"
    >
      LAB
    </text>
  </svg>
);
