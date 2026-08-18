import { BedriftItem } from "@/types";

export const STAND_ZONE_IDS = [
  "1000",
  "1100",
  "1200",
  "1300",
  "2000",
  "2100",
  "2200",
] as const;

export type StandZoneId = (typeof STAND_ZONE_IDS)[number];

export type StandMapLayout = {
  occupiedStandIds: ReadonlySet<string>;
  occupiedZoneIds: ReadonlySet<StandZoneId>;
  visibleZoneIds: ReadonlySet<StandZoneId>;
  hasSecondFloor: boolean;
};

const standZoneIds = new Set<string>(STAND_ZONE_IDS);

export function getStandZoneId(standId: string): StandZoneId | null {
  const standNumber = Number(standId.trim());
  if (!Number.isInteger(standNumber)) return null;

  const zoneId = String(Math.floor(standNumber / 100) * 100);
  return standZoneIds.has(zoneId) ? (zoneId as StandZoneId) : null;
}

export function createStandMapLayout(
  companies: BedriftItem[]
): StandMapLayout {
  const occupiedStandIds = new Set<string>();
  const occupiedZoneIds = new Set<StandZoneId>();

  for (const company of companies) {
    const standId = company.stand.trim();
    const zoneId = getStandZoneId(standId);

    if (!company.name.trim() || !zoneId) continue;

    occupiedStandIds.add(standId);
    occupiedZoneIds.add(zoneId);
  }

  const visibleZoneIds = new Set<StandZoneId>();

  if (occupiedStandIds.size > 0) {
    visibleZoneIds.add("1000");
    visibleZoneIds.add("1100");
  }

  for (const zoneId of ["1200", "1300", "2000", "2100"] as const) {
    if (occupiedZoneIds.has(zoneId)) visibleZoneIds.add(zoneId);
  }

  if (occupiedZoneIds.has("2200")) {
    visibleZoneIds.add("2000");
    visibleZoneIds.add("2100");
    visibleZoneIds.add("2200");
  }

  return {
    occupiedStandIds,
    occupiedZoneIds,
    visibleZoneIds,
    hasSecondFloor:
      occupiedZoneIds.has("2000") ||
      occupiedZoneIds.has("2100") ||
      occupiedZoneIds.has("2200"),
  };
}

export function isStandInVisibleZone(
  standId: string,
  layout: StandMapLayout
): boolean {
  const zoneId = getStandZoneId(standId);
  return zoneId ? layout.visibleZoneIds.has(zoneId) : false;
}
