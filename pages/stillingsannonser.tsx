// "Stillingsannonser"-siden, viser alle gyldige stillingsannonser, sortert på frist

import JobCard from "@/components/JobCard";
import { getJobListings, JobCsvRow } from "@/lib/getJobListings";

// Props som definer hva siden skal jobbe med (liste av objekter fra jobs.ts)
type StillingsannonserProps = {
  jobs: JobCsvRow[];
};

// Lager og viser et JobCard for hver annonse 
export default function Stillingsannonser({ jobs }: StillingsannonserProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-96 md:max-w-[832px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={`${job.firma}-${job.url}`}
          tittel={job.tittel}
          firma={job.firma}
          frist={job.frist}
          url={job.url}
          logo={job.logo}
        />
      ))}
      </div>
    </div>
  );
}

// Henter, filtrerer og sorterer annonser fra jobs.ts
export async function getStaticProps() {
  const jobs = getJobListings();

  // Definerer "i dag" som dagens dato kl 00:00
  const today = new Date();
  today.setHours(0,0,0,0);
  
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
    props: { jobs: validJobs },
  };
}
