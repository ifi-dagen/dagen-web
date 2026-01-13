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

// Funksjon for å ikke få bilde - tekst - tekst - bilde på mobil
// 2 elementer i raden bilde - tekst
// 3 elementer i raden bilde - tekst - bilde
// Flere / færre, behold original
function getMobileRowOrder(row: ContentRow): ContentRow {
    const images = row.filter((item) => item.type === "image");
    const texts = row.filter((item) => item.type === "markdown");

    // 2 elementer
    if (row.length === 2 && images.length === 1 && texts.length === 1) {
        const image = images[0];
        const text = texts[0];
        return [image, text]; // <========== REVERSER DENNE FOR Å BYTTE REKKEFØLGE
    }

    if (row.length === 3 && images.length === 2 && texts.length === 1) {
        const text = texts[0];
        const [imageOne, imageTwo] = images;
        return [imageOne, text, imageTwo]; // ==== REKKEFØLGE KAN ENDRES HER
    }

    return row;
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

                // Rekkefølge for mobil / liten skjerm
                const mobileRow = getMobileRowOrder(row);

                return (
                    <div
                        key={rowIndex}
                        id={rowId}
                        className={`
                        scroll-mt-24
                        max-w-full mx-auto
                        `}
                    >
                        {/* Mobil-layout: egen rekkefølge */}
                        <div className="flex flex-col gap-6 items-center md:hidden">
                            {mobileRow.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="w-full flex flex-col items-center min-w-0 wrap-break-word"
                                >
                                    {item.type === "image" ? (
                                        <ContentImage
                                            imagePath={item.content}
                                            rowNumber={rowIndex}
                                        />

                                    ) : (
                                        <ContentMarkdown
                                            markdownText={item.content}
                                            isCentered={mobileRow.length === 1}
                                        />
                                    )}
                                    {item.buttonHref && (
                                        <ContentButton
                                            href={item.buttonHref}
                                            label={item.buttonLabel}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop-layout, original rekkefølge + size */}
                        <div
                            className="hidden md:flex md:justify-center gap-6 items-start w-full">
                            {row.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="flex flex-col items-center min-w-0 wrap-break-word"
                                    style={
                                        columnCount > 1
                                            ? {
                                                maxWidth: `${(sizes[itemIndex] / 10) * 100}%`,
                                                flexShrink: 1,
                                                flexGrow: 0,
                                            }
                                            : {
                                                width: '100%',
                                            }
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
                    </div>
                );
            })}
        </>
    );
}
