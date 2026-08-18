import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import { JobCsvRow } from "@/lib/getJobListings";
import { BedriftItem } from "@/types";

import StandDetails from "./StandDetails";
import StandMapBase from "./StandMapBase";
import StandMapVenueMarkers from "./StandMapVenueMarkers";
import StandMapZoomControls from "./StandMapZoomControls";
import StandMarker from "./StandMarker";
import {
  getFirstFloorHallStartX,
  getStandMapViewBox,
  StandDefinition,
} from "./standMapData";
import {
  createStandMapLayout,
  isStandInVisibleZone,
} from "./standMapLayout";
import { createStandDefinitions } from "./standMapStandLayout";
import {
  companyNameKey,
  indexCompaniesByStand,
  indexJobs,
  mobileCardPosition,
  tooltipPosition,
} from "./standMapUtils";
import { useMobileStandCard } from "./useMobileStandCard";
import { useStandMapZoom } from "./useStandMapZoom";

type InteractiveStandMapProps = {
  companies: BedriftItem[];
  jobListings: JobCsvRow[];
};

export default function InteractiveStandMap({
  companies,
  jobListings,
}: InteractiveStandMapProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const companiesByStand = useMemo(
    () => indexCompaniesByStand(companies),
    [companies]
  );
  const layout = useMemo(() => createStandMapLayout(companies), [companies]);
  const stands = useMemo(() => createStandDefinitions(companies), [companies]);
  const firstFloorHallStartX = getFirstFloorHallStartX(
    layout.firstFloorHallVisibleThrough
  );
  const viewBox = getStandMapViewBox(
    layout.hasSecondFloor,
    firstFloorHallStartX,
    layout.visibleZoneIds.has("1300"),
    layout.visibleZoneIds.has("1200")
  );
  const visibleStands = useMemo(
    () => stands.filter((stand) => isStandInVisibleZone(stand.id, layout)),
    [layout, stands]
  );
  const jobsByKey = useMemo(() => indexJobs(jobListings), [jobListings]);

  const activeId = pinnedId ?? hoveredId;
  const activeStand = activeId
    ? visibleStands.find((stand) => stand.id === activeId)
    : undefined;
  const activeCompany = activeId ? companiesByStand.get(activeId) : undefined;
  const activeName = activeCompany?.name ?? "";
  const activeJobs = activeCompany
    ? jobsByKey.get(companyNameKey(activeCompany.name)) ?? []
    : [];
  const activeLogo = activeCompany?.logo || activeJobs.find((job) => job.logo)?.logo;
  const activeLogoPath = activeLogo
    ? `${router.basePath}/logos/${activeLogo}`
    : undefined;

  const { cardRef, mapAreaRef, paddingBottom } = useMobileStandCard(
    pinnedId,
    activeStand
  );
  const {
    zoom,
    zoomIn,
    zoomOut,
    canZoomIn,
    canZoomOut,
    contentStyle,
    scrollerRef,
  } = useStandMapZoom();

  const cancelHoverClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const scheduleHoverClose = () => {
    cancelHoverClose();
    hoverTimer.current = setTimeout(() => setHoveredId(null), 120);
  };

  const toggleStand = (stand: StandDefinition) => {
    const isClosing = pinnedId === stand.id;
    setPinnedId(isClosing ? null : stand.id);
    setHoveredId(isClosing ? null : stand.id);
  };

  const closeDetails = () => {
    setPinnedId(null);
    setHoveredId(null);
  };

  const renderDetails = (isPinned: boolean) =>
    activeStand && activeCompany && (
      <StandDetails
        stand={activeStand}
        name={activeName}
        logoPath={activeLogoPath}
        jobs={activeJobs}
        isPinned={isPinned}
        onClose={closeDetails}
      />
    );

  return (
    <section
      aria-label="Interaktivt standkart"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeDetails();
      }}
      className="w-full"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="m-0 font-sans">
          Hold over eller trykk på en stand for å se mer informasjon.
        </p>
        <p className="m-0 font-mono text-xs md:hidden">
          Dra kartet sidelengs for å utforske.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-3 top-3 z-30">
          <StandMapZoomControls
            zoom={zoom}
            canZoomIn={canZoomIn}
            canZoomOut={canZoomOut}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
          />
        </div>

        <div
          ref={scrollerRef}
          className="w-full overflow-x-auto rounded-2xl border border-card-outline bg-white shadow-sm"
        >
          <div
            className="relative"
            style={{ ...contentStyle, paddingBottom }}
          >
            <div ref={mapAreaRef} className="relative">
            <svg
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
              role="img"
              aria-label="Standkart for Dagen@IFI 2026"
              className="block h-auto w-full"
            >
              <StandMapBase layout={layout} />

              <StandMapVenueMarkers />

              <g aria-label="Bedriftsstander">
                {visibleStands.map((stand) => {
                  const company = companiesByStand.get(stand.id);
                  if (!company) return null;

                  const name = company.name;
                  const jobs = jobsByKey.get(companyNameKey(name)) ?? [];
                  const logo = company?.logo || jobs.find((job) => job.logo)?.logo;
                  const logoPath = logo
                    ? `${router.basePath}/logos/${logo}`
                    : undefined;

                  return (
                    <StandMarker
                      key={stand.id}
                      stand={stand}
                      name={name}
                      logoPath={logoPath}
                      jobCount={jobs.length}
                      isActive={stand.id === activeId}
                      isPinned={stand.id === pinnedId}
                      onHoverStart={() => {
                        cancelHoverClose();
                        setHoveredId(stand.id);
                      }}
                      onHoverEnd={scheduleHoverClose}
                      onToggle={() => toggleStand(stand)}
                    />
                  );
                })}
              </g>
            </svg>

            {activeStand && (
              <div
                className="absolute z-20 hidden w-80 md:block"
                style={tooltipPosition(activeStand, viewBox)}
                onMouseEnter={cancelHoverClose}
                onMouseLeave={scheduleHoverClose}
              >
                {renderDetails(pinnedId === activeStand.id)}
              </div>
            )}

            {pinnedId && activeStand && (
              <div
                ref={cardRef}
                className="absolute z-20 w-80 md:hidden"
                style={mobileCardPosition(activeStand, viewBox)}
                aria-live="polite"
              >
                {renderDetails(true)}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
