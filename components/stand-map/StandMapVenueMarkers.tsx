export default function StandMapVenueMarkers() {
  return (
    <g pointerEvents="none">
      <rect
        x={1466.25}
        y={1404.75}
        width={120.375}
        height={66}
        rx={10.5}
        fill="var(--white)"
        stroke="var(--dagen-color)"
        strokeWidth={1.25}
      />
      <text
        x={1526.438}
        y={1438.1}
        fontFamily="var(--font-sans), sans-serif"
        fontSize={20}
        fontWeight={700}
        fill="var(--dagen-color)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Dagen@IFI
      </text>
      <circle
        cx={1373.625}
        cy={1461.375}
        r={54.375}
        fill="var(--primary)"
        stroke="var(--dagen-color)"
        strokeWidth={0.5}
      />
      <text
        x={1374}
        y={1460}
        fontFamily="var(--font-sans), sans-serif"
        fontSize={14}
        fontWeight={700}
        fill="var(--dagen-color)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Hovedinngang
      </text>
    </g>
  );
}
