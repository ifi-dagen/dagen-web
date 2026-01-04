// Lager og returnerer ContentRow - rader med bilder og / eller tekst
// til å brukes på flere sider
// Bruker readLayoutCsv fra contentLayoutRowReader.ts
//
// Kan brukes til alle sider som trenger tekst og bilder på samme rad

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentItem, ContentRow, LayoutCsvRow } from "@/types";
import { readLayoutCsv } from "./layoutCsvReader";

// Hjelpefunksjon for å sjekke om en href er til en index (int) eller path (side) / #anker
function checkNumberOrHref(ref?: string | null): string | null {
    if (!ref) return null;

    // Tall: tolk som referanse til index
    if (/^\d+$/.test(ref)) {
        return `#row-${ref}`;
    }

    // Ikke tall, vanlig href (path eller #anker)
    return ref;
}

// Tar inn path til CSV som argument
// OBS!
// Markdown-filer forventes å ligge innenfor content-mappe
// Bilder forventes å ligge innenfor public
// Videre path fra disse må tilpasses sidene denne brukes på
export function getContentRowLayout(csvPath: string): ContentRow[] {
    // Leser fil med hjelpemetoden nevt øverst
    const rows: LayoutCsvRow[] = readLayoutCsv(csvPath)

    // Ordbok med key = index fra CSV, value = liste av filnavn (bilder og/eller tekst)
    const grouped: { [key: number]: ContentItem[] } = {};

    // Looper igjennom alle objektene
    for (const row of rows) {

        // Hopper over ugyldige objekter (linjer i CSV-filen)
        if (!row.index || !row.file) {
            continue;
        }

        // Parser index til int (10 = decimal)
        const index = parseInt(row.index, 10);

        // Hopper over ugyldige indekser (ikke tall)
        if (isNaN(index)) {
            continue;
        }

        // Lager ny ordbokindeks hvis den ikke finnes
        if (!grouped[index]) {
            grouped[index] = [];
        }

        
        // Sjekker om filen er markdown (.md), hvis ikke antar vi at det er et bilde
        const isMarkdown = row.file.toLowerCase().endsWith(".md");

        // Index til raden
        const rowId = `row-${index}`;

        // Href for knapp (sjekker tall eller string) og label
        const buttonHref = checkNumberOrHref(row.buttonhref ?? null);
        const buttonLabel = row.buttonlabel && row.buttonlabel.length > 0 ? row.buttonlabel : null;


        if (isMarkdown) {
            // Det er en markdown fil, lager full path
            const mdPath = path.join(process.cwd(), "content", row.file);

            // Hvis filen eksisterer
            if (fs.existsSync(mdPath)) {
                // Leser filen til tekst
                const mdContent = fs.readFileSync(mdPath, "utf8");
                // Gray-matter for å fjerne metadata og bare hente teksten 
                const { content } = matter(mdContent);

                // Legger filreferansen til i ordboken med type
                grouped[index].push({
                    type: "markdown",
                    content,
                    buttonHref,
                    buttonLabel,
                    rowId,
                });
            } else {
                console.error(`Markdown file not found: ${mdPath}`);
            }
        } else {
            // Filen er ikke markdown, behandler som bilde
            grouped[index].push({
                type: "image",
                content: row.file,
                buttonHref,
                buttonLabel,
                rowId,
            });
        }

    }

    // Returnerer en sortert liste etter indekseringen til ordboken
    return Object.keys(grouped)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .map((key) => grouped[parseInt(key, 10)]);
}