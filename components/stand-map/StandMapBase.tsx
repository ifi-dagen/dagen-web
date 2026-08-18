import { getFirstFloorHallStartX } from "./standMapData";
import { StandMapLayout } from "./standMapLayout";

type StandMapBaseProps = {
  layout: StandMapLayout;
};

const labelProps = {
  fill: "var(--dagen-color)",
  fontFamily: "var(--font-heading), monospace",
  fontWeight: 700,
  textAnchor: "middle" as const,
};

const secondFloorZoneSplitX = 1662.5;
const secondFloorBackgroundRight = 2030.375;

export default function StandMapBase({ layout }: StandMapBaseProps) {
  const showCanteen = layout.visibleZoneIds.has("1200");
  const showLibrary = layout.visibleZoneIds.has("1300");
  const showMezzanine = layout.visibleZoneIds.has("2000");
  const showSecondFloorHall = layout.visibleZoneIds.has("2100");
  const firstFloorHallStartX = getFirstFloorHallStartX(
    layout.firstFloorHallVisibleThrough
  );

  return (
    <g aria-label="Områder i standkartet" pointerEvents="none">
      {showSecondFloorHall && (
        <rect
          x={766}
          y={646.75}
          width={secondFloorZoneSplitX - 766}
          height={162.25}
          fill="var(--primary)"
        />
      )}

      {showMezzanine && (
        <>
          <rect
            x={secondFloorZoneSplitX}
            y={646.75}
            width={secondFloorBackgroundRight - secondFloorZoneSplitX}
            height={162.25}
            fill="var(--primary)"
          />
          <rect
            x={1820.875}
            y={349}
            width={209.5}
            height={307.75}
            fill="var(--primary)"
          />
        </>
      )}

      {showLibrary && (
        <rect
          x={300}
          y={970}
          width={360}
          height={400}
          fill="var(--primary)"
        />
      )}

      <rect
        x={firstFloorHallStartX}
        y={1325.5}
        width={1607 - firstFloorHallStartX}
        height={147.625}
        fill="var(--primary)"
      />

      {showCanteen && (
        <>
          <rect
            x={1497.25}
            y={1325.5}
            width={870.625}
            height={147.625}
            fill="var(--primary)"
          />
          <rect
            x={2034.625}
            y={1063.375}
            width={333.25}
            height={282.25}
            fill="var(--primary)"
          />
        </>
      )}

      <rect
        x={1147.375}
        y={970}
        width={359.875}
        height={400}
        fill="var(--primary)"
      />

      {layout.hasSecondFloor && (
        <>
          <text x={480} y={590} fontSize={104} {...labelProps}>
            2. Etasje
          </text>
          <text
            x={showLibrary ? 870 : 500}
            y={1265}
            fontSize={104}
            {...labelProps}
          >
            1. Etasje
          </text>
        </>
      )}

      {showMezzanine && (
        <text x={1925} y={328} fontSize={82} {...labelProps}>
          Mesaninen
        </text>
      )}

      <text
        x={1327.3125}
        y={950}
        fontSize={72}
        {...labelProps}
      >
        Foajéen
      </text>

      {showLibrary && (
        <text x={480} y={950} fontSize={54} {...labelProps}>
          Biblioteket
        </text>
      )}

      {showCanteen && (
        <text x={2201} y={1043} fontSize={72} {...labelProps}>
          Kantina
        </text>
      )}
    </g>
  );
}
