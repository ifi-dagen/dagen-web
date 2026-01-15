// Klikkbart "kort" for å vise stillingsannonser 

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import ArrowDownIcon from "./icons/ArrowDownIcon";

// Props som forventes for å lage et kort (logo kan mangle)
type JobCardProps = {
    tittel: string;
    stillingstype: string;
    firma: string;
    frist: string;
    url: string;
    logo?: string;
    beskrivelse: string;
};

// Setter farge på kant (border) etter type stilling
const getJobTypeBorderColor = (stillingstype: string) => {
    switch (stillingstype?.toLowerCase()) {
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
export default function JobCard({ tittel, stillingstype, firma, frist, url, logo, beskrivelse }: JobCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isClamped, setIsClamped] = useState(false);

    // Formaterer dato fra YYYY-MM-DD til DD.MM.YYYY
    const formatDate = (date: string) => {
        // Hvis dato mangler
        if (!date) return "";

        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        if (!textRef.current) return;

        const el = textRef.current;
        if (!isOpen) {
            setIsClamped(el.scrollHeight > el.clientHeight);
        }
    }, [beskrivelse, isOpen]);

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${stillingstype}, ${tittel} hos ${firma}, søknadsfrist ${formatDate(frist)} (åpnes i ny fane). Beskrivelse: ${beskrivelse}`}
            className={`relative block bg-white dark:bg-gray-400 shadow-xl border-t-8 rounded-xl p-6 min-h-67 hover:scale-[1.02] transition-transform cursor-pointer ${getJobTypeBorderColor(
                stillingstype
            )}`}
        >
            {/* Logo, alt="", siden logo er dekorativ og teksten gir info */}
            {logo && (
                <Image
                    src={`${router.basePath}/logos/${logo}`}
                    alt=""
                    width={120}
                    height={80}
                    className="absolute top-4 right-4 h-20 w-30 object-contain"
                />
            )}

            {/* Tittel */}
            <h2 className="text-xl font-semibold text-(--primary)">
                {tittel}
            </h2>

            {/* Stillingstype */}
            <h3 className="text-lg font-normal text-gray-800 dark:text-gray-200">
                {stillingstype}
            </h3>

            {/* Firmanavn */}
            <p className="text-gray-700 dark:text-gray-300 font-medium">
                {firma}
            </p>

            {/* Frist som "Frist: DD.MM.YY", "Frist:" er bold (strong) og primary color */}
            <p className="text-gray-500 dark:text-gray-700 mt-2 text-sm">
                <strong className="text-(--primary)">
                    Frist:
                </strong> {formatDate(frist)} {/* Dato må stå her med space fra "Frist:" */}
            </p>

            <div className="mt-2">
                <p
                    ref={textRef}
                    className={`text-gray-700 dark:text-gray-300 font-normal transition-all ${isOpen ? "line-clamp-none" : "line-clamp-3"
                        }`}
                >
                    {beskrivelse}
                </p>

                {(isOpen || isClamped) && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                        className="mt-1 flex items-center gap-1 text-(--primary) text-sm hover:underline"
                    >
                        <ArrowDownIcon
                            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                        {isOpen ? "Vis mindre" : "Vis mer"}
                    </button>
                )}
            </div>
        </Link>
    );
}
