import { KeyboardEvent } from "react";

import { StandDefinition } from "./standMapData";

type StandMarkerProps = {
  stand: StandDefinition;
  name: string;
  logoPath?: string;
  jobCount: number;
  isActive: boolean;
  isPinned: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onToggle: () => void;
};

export default function StandMarker({
  stand,
  name,
  logoPath,
  jobCount,
  isActive,
  isPinned,
  onHoverStart,
  onHoverEnd,
  onToggle,
}: StandMarkerProps) {
  const logoPadding = Math.min(stand.width, stand.height) * 0.12;
  const availableTextWidth = stand.width - 8;
  const textLength = name.length * 4.6 > availableTextWidth
    ? availableTextWidth
    : undefined;
  const jobText = jobCount
    ? ` Har ${jobCount} aktiv${jobCount === 1 ? "" : "e"} stillingsannonse${jobCount === 1 ? "" : "r"}.`
    : "";

  const handleKeyDown = (event: KeyboardEvent<SVGRectElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <g>
      <rect
        x={stand.x}
        y={stand.y}
        width={stand.width}
        height={stand.height}
        rx={10.5}
        fill="var(--white)"
        stroke="var(--dagen-color)"
        strokeWidth={1.25}
        pointerEvents="none"
      />

      {logoPath ? (
        <image
          href={logoPath}
          x={stand.x + logoPadding}
          y={stand.y + logoPadding}
          width={stand.width - logoPadding * 2}
          height={stand.height - logoPadding * 2}
          preserveAspectRatio="xMidYMid meet"
          pointerEvents="none"
        />
      ) : (
        <text
          x={stand.x + stand.width / 2}
          y={stand.y + stand.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-sans), sans-serif"
          fontSize={8}
          fontWeight={700}
          textLength={textLength}
          lengthAdjust={textLength ? "spacingAndGlyphs" : undefined}
          fill="var(--dagen-color)"
          pointerEvents="none"
        >
          {name}
        </text>
      )}

      <rect
        x={stand.x}
        y={stand.y}
        width={stand.width}
        height={stand.height}
        rx={10.5}
        role="button"
        tabIndex={0}
        aria-label={`${name}.${jobText} Trykk for å se detaljer.`}
        aria-pressed={isPinned}
        fill={isActive ? "rgba(0, 128, 128, 0.24)" : "transparent"}
        stroke={isActive ? "var(--dagen-color)" : "transparent"}
        strokeWidth={isActive ? 7 : 0}
        vectorEffect="non-scaling-stroke"
        className="cursor-pointer outline-none transition-colors focus-visible:stroke-[7px] focus-visible:stroke-dagen-color"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
      />
    </g>
  );
}
