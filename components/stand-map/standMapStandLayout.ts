import type { BedriftItem } from "@/types";

import { STANDS } from "./standMapData";
import type { StandDefinition } from "./standMapData";

type StandGeometry = Omit<StandDefinition, "id">;

const FOYER_OVERFLOW_STANDS: StandDefinition[] = [
  { id: "1010", x: 1252, y: 1025.25, width: 62, height: 62.625 },
  { id: "1011", x: 1187, y: 1025.25, width: 62, height: 62.625 },
];

const FOYER_REGULAR_GEOMETRY: Record<string, StandGeometry> = {
  "1002": { x: 1252, y: 1155, width: 62, height: 62.25 },
  "1003": { x: 1187, y: 1155, width: 62, height: 62.25 },
  "1004": { x: 1252, y: 1090.125, width: 62, height: 62.25 },
  "1005": { x: 1187, y: 1090.125, width: 62, height: 62.25 },
};

const CANTEEN_SPONSOR_GEOMETRY: Record<string, StandGeometry> = {
  "1203": { x: 2089.125, y: 1232.25, width: 62.25, height: 94.875 },
  "1204": { x: 2155.5, y: 1232.25, width: 62.25, height: 94.875 },
  "1205": { x: 2089.125, y: 1134.375, width: 62.25, height: 94.875 },
  "1206": { x: 2155.5, y: 1134.375, width: 62.25, height: 94.875 },
};

function isSponsor(company?: BedriftItem): boolean {
  const sponsorType = company?.spons.trim().toLowerCase();
  return sponsorType === "sponsor" || sponsorType === "hsp";
}

export function createStandDefinitions(
  companies: BedriftItem[]
): StandDefinition[] {
  const companiesByStand = new Map(
    companies.map((company) => [company.stand, company])
  );
  const stands = [...STANDS, ...FOYER_OVERFLOW_STANDS];
  const geometryByStand = new Map<string, StandGeometry>();
  const hiddenStandIds = new Set<string>();

  const applyFoyerColumn = (
    firstStandId: string,
    secondStandId: string,
    overflowStandId: string
  ) => {
    if (
      isSponsor(companiesByStand.get(firstStandId)) ||
      isSponsor(companiesByStand.get(secondStandId))
    ) {
      hiddenStandIds.add(overflowStandId);
      return;
    }

    geometryByStand.set(firstStandId, FOYER_REGULAR_GEOMETRY[firstStandId]);
    geometryByStand.set(secondStandId, FOYER_REGULAR_GEOMETRY[secondStandId]);
  };

  const applyCanteenColumn = (
    lowerStandId: string,
    upperStandId: string,
    overflowStandId: string
  ) => {
    if (
      !isSponsor(companiesByStand.get(lowerStandId)) &&
      !isSponsor(companiesByStand.get(upperStandId))
    ) {
      return;
    }

    geometryByStand.set(lowerStandId, CANTEEN_SPONSOR_GEOMETRY[lowerStandId]);
    geometryByStand.set(upperStandId, CANTEEN_SPONSOR_GEOMETRY[upperStandId]);
    hiddenStandIds.add(overflowStandId);
  };

  applyFoyerColumn("1002", "1004", "1010");
  applyFoyerColumn("1003", "1005", "1011");
  applyCanteenColumn("1203", "1205", "1207");
  applyCanteenColumn("1204", "1206", "1208");

  return stands
    .filter((stand) => !hiddenStandIds.has(stand.id))
    .map((stand) => ({
      ...stand,
      ...geometryByStand.get(stand.id),
    }));
}
