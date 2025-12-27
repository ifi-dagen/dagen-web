// Leser fra CSV-fil og lager rader basert på indeksering fra filen

import fs from "fs";
import path from "path";
import Papa from "papaparse";
import matter from "gray-matter";
import { ContentItem, ContentRow } from "../types";

// Props som forventes fra CSV-filen
type HomeCsvRow = {
    index: string;
    file: string;
}

export function getHomePageLayout(csvPath: string): ContentRow[] {
    // Path til CSV-filen  
    const fullPath = path.join(process.cwd(), `content/${csvPath}`);

    // Hvis filen ikke finnes
    if (!fs.existsSync(fullPath)) {
        console.error(`CSV file not found: ${fullPath}`);
        return [];
    }

    // Leser filen til tekst
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Hver linje leses som indeks etterfulgt av filnavn
    const { data } = Papa.parse<HomeCsvRow>(fileContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.toLowerCase().trim(),
        transform: (v) => v?.trim(),
    });

    // Ordbok med lister og indeks som key
    const grouped: { [key: number]: ContentItem[] } = {};

    for (const row of data as HomeCsvRow[]) {
        const indexStr = row.index;
        const contentPath = row.file;

        // Hopper over tomme, eller ugyldige rader
        if (!indexStr || !contentPath) {
            continue;
        }

        // Konverter index fra string til int (10 definer decimal)
        const index = parseInt(indexStr, 10);

        // Hopper over rader hvor index ikke er int
        if (isNaN(index)) {
            continue;
        }

        // Lager indeksen i ordboken hvis den ikke finnes
        if (!grouped[index]) {
            grouped[index] = [];
        }

        // Sjekker om det er en markdown-fil (.md), hvis ikke antas bilde
        const isMarkdown = contentPath.toLowerCase().endsWith('.md');

        if (isMarkdown) {
            // Det er en markdown fil, lager path til den fra content-mappen
            const mdPath = path.join(process.cwd(), `content/${contentPath}`);

            // Hvis filen finnes leses den til tekst
            if (fs.existsSync(mdPath)) {
                const mdContent = fs.readFileSync(mdPath, "utf8");
                // matter ignorer metadata fra filen
                const { content } = matter(mdContent);

                // Og legges til i ordboken med riktig type
                grouped[index].push({
                    type: "markdown",
                    content,
                });

                // Hvis filen ikke finnes
            } else {
                console.error(`Markdown file not found: ${mdPath}`);
            }

        } else {
            // Filen er ikke markdown, da skal det være et bilde
            // Legger til i ordboken og merkes med "image"
            grouped[index].push({
                type: "image",
                content: contentPath,
            });
        }
    }

    // Konverterer ordboken til en sortert liste etter indeks
    return Object.keys(grouped)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // 10 for decimal
        .map((key) => grouped[parseInt(key, 10)]);
}
