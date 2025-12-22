import JobCard from "@/components/JobCard";
import { getJobListings } from "@/lib/jobs";

export default function Stillingsannonser({ jobs }: { jobs: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-96 md:max-w-[832px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job, i) => (
        <JobCard
          key={i}
          tittel={job.Tittel}
          firma={job.Firma}
          frist={job.Frist}
          url={job.URL}
          logo={job.Logo}
        />
      ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const jobs = getJobListings();

  // ---- Filtrer etter dato og tar bort utgåtte ----
  const today = new Date();
  const validJobs = jobs.filter((job: any) => {
    const fristDate = new Date(job.Frist);
    return fristDate >= today;
  });

  // ---- Sorter etter frister ----
  validJobs.sort((a: any, b: any) => {
    return new Date(a.Frist).getTime() - new Date(b.Frist).getTime();
  });

  return {
    props: { jobs: validJobs },
  };
}
