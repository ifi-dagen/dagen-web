import { GridIcon, ListIcon } from "@/components/icons/ButtonIcons";
import JobCard from "@/components/JobCard";
import JobFilter, { ALL_JOB_TYPES } from "@/components/JobFilter";
import { getJobListings, getVisibleJobListings, JobCsvRow } from "@/lib/getJobListings";
import { useState, useLayoutEffect, useMemo, useRef } from "react";

type StillingsannonserProps = {
  jobListings: JobCsvRow[];
};

function useContainerScale(
  containerRef: React.RefObject<HTMLElement | null>,
  designCardWidthPx = 994.91,
  maxScale = 1
) {
  const [scaleFactor, setScaleFactor] = useState(1);

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const updateScaleFromContainerWidth = () => {
      const containerWidthPx = containerEl.getBoundingClientRect().width;

      const calculatedScale =
        containerWidthPx / designCardWidthPx;

      setScaleFactor(Math.min(maxScale, calculatedScale));
    };

    updateScaleFromContainerWidth();

    const resizeObserver = new ResizeObserver(updateScaleFromContainerWidth);
    resizeObserver.observe(containerEl);

    return () => resizeObserver.disconnect();
  }, [containerRef, designCardWidthPx, maxScale]);

  return scaleFactor;
}


export default function JobListingsPage({ jobListings: jobListings }: StillingsannonserProps) {
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<string>(ALL_JOB_TYPES);
  const contentRef = useRef<HTMLDivElement>(null);
  const scale = useContainerScale(contentRef, 994.91, 1);

  const jobTypes = useMemo(
    () =>
      Array.from(new Set(jobListings.map((job) => job.stillingstype)))
        .sort((a, b) => a.localeCompare(b, "nb")),
    [jobListings]
  );

  const visibleJobListings = useMemo(
    () =>
      selectedJobType === ALL_JOB_TYPES
        ? jobListings
        : jobListings.filter((job) => job.stillingstype === selectedJobType),
    [jobListings, selectedJobType]
  );

  const left = visibleJobListings.filter((_, i) => i % 2 === 0);
  const right = visibleJobListings.filter((_, i) => i % 2 === 1);

  return (
    <main className="max-w-[1047px] mx-auto px-4 md:px-6 py-8 mt-12">

      {/* Overskrift */}
      <h2 className="font-mono text-3xl font-bold text-text-color hyphens-auto text-center mb-8">
        STILLINGSANNONSER
      </h2>

      {jobListings.length > 0 && (
        <div className="flex items-start justify-between gap-4 max-w-[1047px] mx-auto mb-10">

          {jobTypes.length > 1 ? (
            <JobFilter
              jobTypes={jobTypes}
              selectedJobType={selectedJobType}
              onSelectJobType={setSelectedJobType}
            />
          ) : (
            <span />
          )}

          {/* View-knapp */}
          {jobListings.length > 1 && (
            <button
              type="button"
              role="switch"
              aria-checked={isGalleryView}
              onClick={() => setIsGalleryView((v) => !v)}
              className={[
                "hidden md:inline-flex",
                "relative h-12 w-48 items-center shrink-0",
                "rounded-full border border-button-outline",
                "bg-background overflow-auto",
                "transition focus:outline-none",
              ].join(" ")}
            >
              {/* Slider */}
              <span
                className={[
                  "absolute left-0 top-0 h-full w-1/2",
                  "bg-button-bg",
                  "transition-transform duration-100 ",
                  isGalleryView ? "translate-x-full" : "translate-x-0",
                ].join(" ")}
              />

              {/* Bilder i slider */}
              {/* List view */}
              <span className="relative z-10 flex w-1/2 items-center justify-center">
                <ListIcon />
              </span>

              {/* Gallery view */}
              <span className="relative z-10 flex w-1/2 items-center justify-center">
                <GridIcon />
              </span>
            </button>
          )}
        </div>
      )}


      {/* Kort */}
      <div ref={contentRef} className="mx-auto">
        {jobListings.length > 0 ? (
          <>

            {/* Mobil - Liste */}
            <div className="flex flex-col items-center gap-6 md:hidden">
              {visibleJobListings.map((job) => (
                <JobCard
                  key={`${job.firma}-${job.url}`}
                  tittel={job.tittel}
                  stillingstype={job.stillingstype}
                  firma={job.firma}
                  frist={job.frist}
                  url={job.url}
                  logo={job.logo}
                  beskrivelse={job.beskrivelse}
                  scale={scale}
                />
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:flex justify-center">

              {/* Gallery view */}
              {isGalleryView && (
                <div className="flex items-start gap-8">

                  {/* Venstre rad først */}
                  <div className="flex flex-col items-start gap-8">
                    {left.map((job) => (
                      <JobCard
                        key={`${job.firma}-${job.url}`}
                        tittel={job.tittel}
                        stillingstype={job.stillingstype}
                        firma={job.firma}
                        frist={job.frist}
                        url={job.url}
                        logo={job.logo}
                        beskrivelse={job.beskrivelse}
                        scale={scale / 2.1}
                        minCardHeightPx={620}
                      />
                    ))}
                  </div>

                  {/* Høre rad */}
                  <div className="flex flex-col items-start gap-8">
                    {right.map((job) => (
                      <JobCard
                        key={`${job.firma}-${job.url}`}
                        tittel={job.tittel}
                        stillingstype={job.stillingstype}
                        firma={job.firma}
                        frist={job.frist}
                        url={job.url}
                        logo={job.logo}
                        beskrivelse={job.beskrivelse}
                        scale={scale / 2.1}
                        minCardHeightPx={620}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Listevisning */}
              {!isGalleryView && (
                <div className="flex flex-col items-start gap-[66px]">
                  {visibleJobListings.map((job) => (
                    <JobCard
                      key={`${job.firma}-${job.url}`}
                      tittel={job.tittel}
                      stillingstype={job.stillingstype}
                      firma={job.firma}
                      frist={job.frist}
                      url={job.url}
                      logo={job.logo}
                      beskrivelse={job.beskrivelse}
                      scale={scale}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">
            Ingen stillingsannonser? - Sjekk igjen senere, det dukker plutselig opp!
          </p>
        )}
      </div>
    </main>
  );
}

// Henter, filtrerer og sorterer annonser fra jobs.ts
export async function getStaticProps() {
  return {
    props: { jobListings: getVisibleJobListings() },
  };
}
