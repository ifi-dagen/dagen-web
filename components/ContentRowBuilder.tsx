// Denne lager rader med bilder og / eller tekst 
// Tar inn en liste med ContentRow - type fil og filnavn

import ReactMarkdown from "react-markdown";
import { ContentRow } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";

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
                const columnCount = row.length;
                const isSingle = columnCount === 1;

                return (
                    <div
                        key={rowIndex}
                        className={`
                        grid gap-6 items-center"
                        grid-cols-1
                        md:grid-cols-${columnCount}
                        `}
                    >
                        {row.map((item, itemIndex) =>
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
                                    prose
                                    ${isSingle ? "text-center mx-auto" : ""}
                                    `}
                                >
                                    <ReactMarkdown>{item.content}</ReactMarkdown>
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </>
    );
}