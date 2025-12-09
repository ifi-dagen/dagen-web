import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  tittel: string;
  dato: string;
  sted: string;
  logo?: string | null;
  beskrivelse: string;
};

export default function ArrangementCard({ tittel, dato, sted, logo, beskrivelse }: Props) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
      {logo && (
        <Image
          src={`/logos/${logo}`}
          alt={`${tittel} logo`}
          width={150}
          height={150}
          className="absolute top-4 right-4 h-12 w-auto object-contain"
        />
      )}

      <h2 className="text-2xl font-bold text-(--primary)">{tittel}</h2>
      <p className="text-gray-600 dark:text-gray-300 font-medium italic mt-1">{dato} — {sted}</p>
      <div className="mt-3 text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown>{beskrivelse}</ReactMarkdown>
      </div>
    </div>
  );
}
