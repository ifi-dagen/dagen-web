import Image from "next/image";

import { JobCsvRow } from "@/lib/getJobListings";

import { StandDefinition } from "./standMapData";
import { formatDeadline } from "./standMapUtils";

type StandDetailsProps = {
  stand: StandDefinition;
  name: string;
  logoPath?: string;
  jobs: JobCsvRow[];
  isPinned: boolean;
  onClose: () => void;
};

export default function StandDetails({
  stand,
  name,
  logoPath,
  jobs,
  isPinned,
  onClose,
}: StandDetailsProps) {
  return (
    <article className="w-full rounded-2xl border border-button-outline bg-background p-5 font-sans shadow-xl">
      <div className="flex items-start gap-4">
        {logoPath && (
          <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2">
            <Image
              src={logoPath}
              alt=""
              width={80}
              height={64}
              className="max-h-full w-full object-contain"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-text-link">
            {stand.id.replace("stand-", "Stand ")}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-tight text-text-heading">
            {name}
          </h3>
        </div>

        {isPinned && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-button-outline bg-background text-xl leading-none hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Lukk informasjon om ${name}`}
          >
            ×
          </button>
        )}
      </div>

      {jobs.length > 0 && (
        <div className="mt-4 border-t border-card-outline pt-4">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wide">
            {jobs.length === 1 ? "Aktiv stillingsannonse" : "Aktive stillingsannonser"}
          </p>
          <ul className="m-0! space-y-2 p-0!">
            {jobs.slice(0, 3).map((job) => (
              <li key={`${job.tittel}-${job.url}`} className="list-none">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-card-outline px-3 py-2 text-sm transition hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="block font-semibold leading-snug">{job.tittel}</span>
                  <span className="mt-1 block text-xs">
                    {job.stillingstype} · frist {formatDeadline(job.frist)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
