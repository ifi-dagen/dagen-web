// "Stillingsannonser"-siden, viser alle gyldige stillingsannonser, sortert på frist

import JobCard from "@/components/JobCard";
import { getJobListings, JobCsvRow } from "@/lib/getJobListings";

// Props som definer hva siden skal jobbe med (liste av objekter fra getJobListings.ts)
type StillingsannonserProps = {
  jobListings: JobCsvRow[];
};

// Lager og viser et JobCard for hver annonse 
export default function Stillingsannonser({ jobListings: jobListings }: StillingsannonserProps) {
  const left = jobListings.filter((_, i) => i % 2 === 0);
  const right = jobListings.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-96 md:max-w-[832px] mx-auto">
        {/* Mobil: 1 kolonne */}
        <div className="flex flex-col gap-6 md:hidden">
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
            />
          ))}
        </div>

        {/* Desktop: 2 uavhengige kolonner, så extend ikke flytter på kolonner */}
        {/* Kolonne 1 */}
        <div className="hidden md:flex gap-6 items-start">
          <div className="flex-1 flex flex-col gap-6">
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
              />
            ))}
          </div>

          {/* Kolonne 2 */}
          <div className="flex-1 flex flex-col gap-6">
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
              />
            ))}
          </div>
        </div>
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
