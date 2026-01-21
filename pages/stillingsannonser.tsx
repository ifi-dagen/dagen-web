import JobCard from "@/components/JobCard";
import { getJobListings, JobCsvRow } from "@/lib/getJobListings";
import { useState, useLayoutEffect, useRef } from "react";

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


export default function Stillingsannonser({ jobListings: jobListings }: StillingsannonserProps) {
  const [isGalleryView, setIsGalleryView] = useState(false);
  const left = jobListings.filter((_, i) => i % 2 === 0);
  const right = jobListings.filter((_, i) => i % 2 === 1);
  const contentRef = useRef<HTMLDivElement>(null);
  const scale = useContainerScale(contentRef, 994.91, 1);

  return (
    <div className="max-w-[1047px] mx-auto px-4 md:px-6 py-8 mt-12">

      {/* Overskrift */}
      <h2 className="font-mono text-3xl font-bold text-text-color hyphens-auto text-center mb-8">
        STILLINGSANNONSER
      </h2>

      {/* View-knapp */}
      <div className="hidden md:flex justify-end max-w-[1047px] mx-auto mb-10">
        <button
          type="button"
          role="switch"
          aria-checked={isGalleryView}
          onClick={() => setIsGalleryView((v) => !v)}
          className={[
            "relative inline-flex h-12 w-48 items-center",
            "rounded-full border border-black",
            "bg-background overflow-auto",
            "transition focus:outline-none",
          ].join(" ")}
        >
          {/* Slider */}
          <span
            className={[
              "absolute left-0 top-0 h-full w-1/2",
              "bg-primary",
              "transition-transform duration-300 ease-out",
              isGalleryView ? "translate-x-full" : "translate-x-0",
            ].join(" ")}
          />

          {/* Bilder i slider */}
          {/* List view */}
          <span className="relative z-10 flex w-1/2 items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" stroke="black" strokeWidth="1" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="1" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="black" strokeWidth="1" />
            </svg>
          </span>

          {/* Gallery view */}
          <span className="relative z-10 flex w-1/2 items-center justify-center">
            <svg width="36" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="8" height="7" stroke="black" strokeWidth="1" />
              <rect x="14" y="4" width="8" height="7" stroke="black" strokeWidth="1" />
              <rect x="3" y="14" width="8" height="7" stroke="black" strokeWidth="1" />
              <rect x="14" y="14" width="8" height="7" stroke="black" strokeWidth="1" />
            </svg>
          </span>
        </button>
      </div>

      {/* Kort */}
      <div ref={contentRef} className="mx-auto">

        {/* Mobil: 1 kolonne */}
        <div className="flex flex-col items-center gap-6 md:hidden">
          {jobListings.map((job) => (
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

        {/* Venstre rad først */}
        {isGalleryView && (
          <div className="hidden md:flex justify-center">
            <div className="flex items-start gap-8">
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
          </div>
        )}

        {!isGalleryView && (
          <div className="hidden md:flex justify-center">
            <div className="flex flex-col items-start gap-[66px]">
              {jobListings.map((job) => (
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
          </div>
        )}
      </div>
    </div>
  );
}

// Henter, filtrerer og sorterer annonser fra jobs.ts
export async function getStaticProps() {
  const jobs = getJobListings();

  // Definerer "i dag" som dagens dato kl 00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtrer bort utgåtte frister
  const validJobs = jobs.filter((job) => {
    const deadlineDate = new Date(job.frist);
    return deadlineDate >= today;
  });

  // Sorter etter frister, FEFO (First Expired First Out)
  validJobs.sort((a: JobCsvRow, b: JobCsvRow) => {
    return new Date(a.frist).getTime() - new Date(b.frist).getTime();
  });

  return {
    props: { jobListings: validJobs },
  };
}
