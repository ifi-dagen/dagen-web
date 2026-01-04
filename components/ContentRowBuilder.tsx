// Denne lager rader med bilder og / eller tekst 
// Tar inn en liste med ContentRow - type fil og filnavn

import ReactMarkdown from "react-markdown";
import { ContentRow } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// Props som definerer hva komponenten lager
// Liste av ContentRow
type ContentRowBuilderProps = {
    rows: ContentRow[];
};

// Bygger rader
export default function ContentRowBuilder({ rows }: ContentRowBuilderProps) {
    const router = useRouter();

    return (
        <>
            {rows?.map((row, rowIndex) => {
                // Radlengde, brukes for å velge antall kolonner
                const columnCount = row.length;

                // Kun en i raden, brukes for å sentrere tekst
                const isSingle = columnCount === 1;

                // Setter id på raden for å bruke knapp med index
                const rowId = row[0]?.rowId;

                return (
                    <div
                        key={rowIndex}
                        id={rowId}  // Id som knapper kan bruke
                        className={`
                        scroll-mt-24
                        grid gap-6 items-center
                        grid-cols-1
                        md:grid-cols-${columnCount}
                        `}  // scroll-mt-24 så knappetrykk ikke starter under header
                            // grid-cols-${columnCount} - setter ant kolonner
                    >       
                        {row.map((item, itemIndex) => {
                            const content =
                                item.type === "image" ? (
                                    // Hvis filen er et bilde
                                    <Image
                                        src={`${router.basePath}/${item.content}`}
                                        alt={`Bilde ${rowIndex + 1}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto rounded-lg"
                                    />
                                ) : (
                                    // Hvis ikke bilde, antar vi markdown
                                    <div
                                        key={itemIndex}
                                        className={`
                                    prose wrap-break-word max-w-full
                                    ${isSingle ? "text-center mx-auto" : ""}
                                    `}
                                    >
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </div>
                                );

                                // Knapp for link, legger seg under teksten eller bildet den hører til
                            return (
                                <div
                                    key={itemIndex}
                                    className="flex flex-col items-center text-center min-w-0"
                                >
                                    {content}

                                    {item.buttonHref && (
                                        <Link 
                                        href={item.buttonHref} 
                                        className="mt-4"
                                        onClick={(event) => {
                                            // Hvis href er ankerpunkt på samme side fjernes #anker fra url (så det ikke hopper ned ved oppdatering av siden)
                                            if (item.buttonHref?.startsWith("#")) {
                                                event.preventDefault();
                                                const targetElement = document.querySelector(item.buttonHref);
                                                targetElement?.scrollIntoView({ behavior: "smooth" });
                                            }
                                        }}
                                        >
                                            <button className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition">
                                                {item.buttonLabel ?? "Les mer"}
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}