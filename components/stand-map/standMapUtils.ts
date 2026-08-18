import { JobCsvRow } from "@/lib/getJobListings";
import { BedriftItem } from "@/types";

import { STAND_MAP_VIEW_BOX, StandDefinition } from "./standMapData";

export function companyNameKey(name: string): string {
  return name.trim().toLowerCase();
}

export function indexCompaniesByStand(companies: BedriftItem[]) {
  return new Map(companies.map((company) => [company.stand, company]));
}

export function indexJobs(jobListings: JobCsvRow[]) {
  const jobsByCompany = new Map<string, JobCsvRow[]>();

  for (const job of jobListings) {
    const key = companyNameKey(job.firma);
    jobsByCompany.set(key, [...(jobsByCompany.get(key) ?? []), job]);
  }

  return jobsByCompany;
}

export function formatDeadline(value: string): string {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}.${month}.${year}` : value;
}

export function tooltipPosition(stand: StandDefinition) {
  const centerX = stand.x + stand.width / 2;
  const relativeX = centerX / STAND_MAP_VIEW_BOX.width;
  const relativeY =
    (stand.y + stand.height / 2 - STAND_MAP_VIEW_BOX.y) /
    STAND_MAP_VIEW_BOX.height;
  const left = `${relativeX * 100}%`;
  const translateX = relativeX > 0.65 ? "calc(-100% - 12px)" : "12px";

  if (relativeY < 0.24) {
    const top = `${
      ((stand.y + stand.height - STAND_MAP_VIEW_BOX.y) /
        STAND_MAP_VIEW_BOX.height) *
      100
    }%`;
    return { left, top, transform: `translate(${translateX}, 12px)` };
  }

  if (relativeY > 0.76) {
    const top = `${
      ((stand.y - STAND_MAP_VIEW_BOX.y) / STAND_MAP_VIEW_BOX.height) * 100
    }%`;
    return { left, top, transform: `translate(${translateX}, calc(-100% - 12px))` };
  }

  return {
    left,
    top: `${relativeY * 100}%`,
    transform: `translate(${translateX}, -50%)`,
  };
}

export function mobileCardPosition(stand: StandDefinition) {
  const centerX = stand.x + stand.width / 2;
  const relativeX = centerX / STAND_MAP_VIEW_BOX.width;
  const relativeBottom =
    (stand.y + stand.height - STAND_MAP_VIEW_BOX.y) /
    STAND_MAP_VIEW_BOX.height;

  return {
    left: `clamp(12px, calc(${relativeX * 100}% - 160px), calc(100% - 332px))`,
    top: `calc(${relativeBottom * 100}% + 10px)`,
  };
}
