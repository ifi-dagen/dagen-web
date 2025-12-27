// Klikkbart "kort" for å vise stillingsannonser 

import Link from "next/link";

// Props som forventes for å lage et kort (logo kan mangle)
type JobCardProps = {
    tittel: string;
    firma: string;
    frist: string;
    url: string;
    logo?: string;
};

// Setter farge på kant (border) etter type stilling
const getCategoryColor = (title: string) => {
    switch (title?.toLowerCase()) {
        case "sommerjobb":
            return "border-pink-400";
        case "graduate":
            return "border-cyan-400";
        case "fulltid":
            return "border-yellow-400";
        default:
            return "border-gray-300";
    }
};

// Hovedfunksjon
export default function JobCard({ tittel, firma, frist, url, logo }: JobCardProps) {
    // Formaterer dato fra YYYY-MM-DD til DD.MM.YYYY
    const formatDate = (date: string) => {
        // Hvis dato mangler
        if (!date) return "";

        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    };

    return (
        <Link
            href={url}
            target="_blank"
            className={`relative block bg-white dark:bg-gray-400 shadow-xl border-t-8 rounded-xl p-6 hover:scale-[1.02] transition-transform cursor-pointer ${getCategoryColor(
                tittel
            )}`}
        >
            {/* Logo, alt="", siden logo er dekorativ og teksten gir info */}
            {logo && (
                <img
                    src={`/logos/${logo}`}
                    alt=""
                    className="absolute top-4 right-4 h-20 w-30 object-contain"
                />
            )}

            {/* Tittel (Type jobb per nå) */}
            <h2 className="text-xl font-semibold text-(--primary)">
                {tittel}
            </h2>

            {/* Firma navn */}
            <p className="text-gray-700 dark:text-gray-300 font-medium">
                {firma}
            </p>

            {/* Frist som "Frist: DD.MM.YY", "Frist:" er bold (strong) og primary color */}
            <p className="text-gray-500 dark:text-gray-700 mt-2 text-sm">
                <strong className="text-(--primary)">
                    Frist:
                    </strong> {formatDate(frist)} {/* Dato må stå her med space fra "Frist:" */}
            </p>
        </Link>
    );
}
