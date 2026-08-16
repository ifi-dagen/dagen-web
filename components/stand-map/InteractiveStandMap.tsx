import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

import standMapAsset from "@/assets/standkart-2026.svg";
import { JobCsvRow } from "@/lib/getJobListings";
import { BedriftItem } from "@/types";

import StandDetails from "./StandDetails";
import StandMapZoomControls from "./StandMapZoomControls";
import StandMarker from "./StandMarker";
import { STANDS, STAND_MAP_VIEW_BOX, StandDefinition } from "./standMapData";
import {
  companyKey,
  indexCompanies,
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

  const companiesByKey = useMemo(() => indexCompanies(companies), [companies]);
  const jobsByKey = useMemo(() => indexJobs(jobListings), [jobListings]);

  const activeId = pinnedId ?? hoveredId;
  const activeStand = STANDS.find((stand) => stand.id === activeId);
  const activeCompany = activeStand
    ? companiesByKey.get(companyKey(activeStand.name))
    : undefined;
  const activeJobs = activeStand
    ? jobsByKey.get(companyKey(activeStand.name)) ?? []
    : [];
  const activeLogo = activeCompany?.logo ?? activeJobs.find((job) => job.logo)?.logo;
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
    activeStand && (
      <StandDetails
        stand={activeStand}
        name={activeCompany?.name ?? activeStand.name}
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
              viewBox={`${STAND_MAP_VIEW_BOX.x} ${STAND_MAP_VIEW_BOX.y} ${STAND_MAP_VIEW_BOX.width} ${STAND_MAP_VIEW_BOX.height}`}
              role="img"
              aria-label="Standkart for Dagen@IFI 2026"
              className="block h-auto w-full"
            >
              <image
                href={standMapAsset.src}
                x={STAND_MAP_VIEW_BOX.x}
                y={STAND_MAP_VIEW_BOX.y}
                width={STAND_MAP_VIEW_BOX.width}
                height={STAND_MAP_VIEW_BOX.height}
                preserveAspectRatio="xMidYMid meet"
                pointerEvents="none"
              />

              <g aria-label="Bedriftsstander">
                {STANDS.map((stand) => {
                  const key = companyKey(stand.name);
                  const company = companiesByKey.get(key);
                  const jobs = jobsByKey.get(key) ?? [];
                  const logoPath = company?.logo
                    ? `${router.basePath}/logos/${company.logo}`
                    : undefined;

                  return (
                    <StandMarker
                      key={stand.id}
                      stand={stand}
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
                style={tooltipPosition(activeStand)}
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
                style={mobileCardPosition(activeStand)}
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
