// ContentRowBuilder viser innhold på nettsiden i rader.
// Hver rad kan inneholde markdown-tekst(er) og/eller bilder ved siden av hverandre.
// Og en knapp under bilde eller tekst (optional)
//   * ContentImage - viser bilder
//   * ContentMarkdown - viser tekst
//   * ContentButton - viser knapper

import { ContentRow } from "@/types";
import ContentImage from "./ContentImage";
import ContentMarkdown from "./ContentMarkdown";
import ContentButton from "./ContentButton";

// rows: Liste av rader som skal vises
type ContentRowBuilderProps = {
    rows: ContentRow[];
};

// Holder size innenfor 2 og 8 - 1 = 2, 0 = 2, osv..
const normalizeSize = (n: number) => Math.min(8, Math.max(2, n));

// Hjelpefunksjon for størrelsesforhold til elementer (sette size i csv)
// 1 element = full bredde, 2 elementer 5/5 default eller X / (10-X)
// 3+ elementer = alle likt, eller fordeler
function computeSizes(row: ContentRow): number[] {
    const count = row.length;
    if (count === 0) return [];
    if (count === 1) return [10];

    const hasSetSize = row.some((item) => item.size != null);

    // For to i raden
    if (count === 2) {
        const [a, b] = row;
        const defaultSize = 5;

        if (!hasSetSize) {
            return [defaultSize, defaultSize];
        }

        const aSizeRaw =
            a.size != null
                ? a.size
                : b.size != null
                    ? 10 - b.size
                    : defaultSize;

        const aSize = normalizeSize(aSizeRaw);
        const bSizeRaw = b.size != null ? b.size : 10 - aSize;
        const bSize = normalizeSize(bSizeRaw);

        return [aSize, bSize]
    }

    // For tre eller flere
    if (!hasSetSize) {
        return row.map(() => 1);
    }

    return row.map((item) =>
        item.size != null ? normalizeSize(item.size) : 2
    );
}

// Hovedfunksjon
export default function ContentRowBuilder({ rows }: ContentRowBuilderProps) {
    return (
        <>
            {/* ? betyr: hvis rows er null/undefined, ikke krasj            */}
            {rows?.map((row, rowIndex) => {

                // Antall elementer i raden
                const columnCount = row.length;

                // Hvis bare ett element, sentrerer tekst lenger ned
                const isSingle = columnCount === 1;

                // Hent id for raden (f.eks. "row-0", "row-1")
                // Brukes av knapper for å kunne scrolle hit
                const rowId = row[0]?.rowId;

                // Størrelse i forhold til naboelementer (2-8)
                const sizes = computeSizes(row);

                return (
                    <div
                        key={rowIndex}
                        id={rowId}
                        className={`
                        scroll-mt-24
                        max-w-full mx-auto
                        flex flex-col md:flex-row
                        md:justify-center
                        gap-6 
                        items-start
                        `}
                    >
                        {row.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="flex flex-col items-center text-center min-w-0"
                                style={
                                    columnCount > 1
                                        ? {
                                            maxWidth: `${(sizes[itemIndex] / 10) * 100}%`,
                                            flexShrink: 1,
                                            flexGrow: 0,
                                        }
                                        : undefined
                                }
                            >
                                {/* Viser bilde eller tekst */}
                                {item.type === "image" ? (
                                    // Hvis det er et bilde
                                    <ContentImage
                                        imagePath={item.content}
                                        rowNumber={rowIndex}
                                    />
                                ) : (
                                    // Hvis det er tekst
                                    <ContentMarkdown
                                        markdownText={item.content}
                                        isCentered={isSingle}  // Sentrer hvis bare ett element i raden
                                    />
                                )}

                                {/* Hvis det er en knapp */}
                                {/* && betyr: hvis item.buttonHref finnes, vis det som kommer etter */}
                                {item.buttonHref && (
                                    <ContentButton
                                        href={item.buttonHref}
                                        label={item.buttonLabel}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
}
