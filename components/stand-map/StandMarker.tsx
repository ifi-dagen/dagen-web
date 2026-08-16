import { KeyboardEvent } from "react";

import { StandDefinition } from "./standMapData";

type StandMarkerProps = {
  stand: StandDefinition;
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
  logoPath,
  jobCount,
  isActive,
  isPinned,
  onHoverStart,
  onHoverEnd,
  onToggle,
}: StandMarkerProps) {
  const logoPadding = Math.min(stand.width, stand.height) * 0.12;
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
      {logoPath && (
        <>
          <rect
            x={stand.x}
            y={stand.y}
            width={stand.width}
            height={stand.height}
            rx={10.5}
            fill="#d5e3ff"
            pointerEvents="none"
          />
          <image
            href={logoPath}
            x={stand.x + logoPadding}
            y={stand.y + logoPadding}
            width={stand.width - logoPadding * 2}
            height={stand.height - logoPadding * 2}
            preserveAspectRatio="xMidYMid meet"
            pointerEvents="none"
          />
        </>
      )}

      <rect
        x={stand.x}
        y={stand.y}
        width={stand.width}
        height={stand.height}
        rx={10.5}
        role="button"
        tabIndex={0}
        aria-label={`${stand.name}.${jobText} Trykk for å se detaljer.`}
        aria-pressed={isPinned}
        fill={isActive ? "rgba(0, 128, 128, 0.24)" : "transparent"}
        stroke={isActive ? "#005f5f" : "transparent"}
        strokeWidth={isActive ? 7 : 0}
        vectorEffect="non-scaling-stroke"
        className="cursor-pointer outline-none transition-colors focus-visible:stroke-[7px] focus-visible:stroke-[#005f5f]"
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
