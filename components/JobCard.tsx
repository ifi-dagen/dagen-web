import Link from "next/link";
import { useRouter } from "next/router";

type JobCardProps = {
    tittel: string;
    firma: string;
    frist: string;
    url: string;
    logo?: string;
};

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

export default function JobCard({ tittel, firma, frist, url, logo }: JobCardProps) {
    const formatDate = (date: string) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    };

    const router = useRouter();

    return (
        <Link
            href={url}
            target="_blank"
            className={`relative block bg-white dark:bg-gray-400 shadow-xl border-t-8 rounded-xl p-6 hover:scale-[1.02] transition-transform cursor-pointer ${getCategoryColor(
                tittel
            )}`}
        >
            {/* Logo, no alt to leave blank space if logo is missing / not added */}
            {logo && (
                <img
                    src={`${router.basePath}/logos/${logo}`}
                    className="absolute top-4 right-4 h-20 w-30 object-contain"
                />
            )}

            <h2 className="text-xl font-semibold text-(--primary)">{tittel}</h2>
            <p className="text-gray-700 dark:text-gray-300 font-medium">{firma}</p>
            <p className="text-gray-500 dark:text-gray-700 mt-2 text-sm">
                <strong className="text-(--primary)">Frist:</strong> {formatDate(frist)}
            </p>
        </Link>
    );
}
