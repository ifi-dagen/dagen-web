type IconProps = {
  className?: string;
};

export default function InstagramLogoIcon({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded outer frame */}
      <rect
        x={2.5}
        y={2.5}
        width={19}
        height={19}
        rx={5.5}
        ry={5.5}
      />

      {/* Lens */}
      <circle cx={12} cy={12} r={4} />

      {/* Small camera dot */}
      <circle cx={17.5} cy={6.5} r={1.2} />
    </svg>
  );
}
