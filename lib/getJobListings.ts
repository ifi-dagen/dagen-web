// Henter fra stillingsannonser.csv

import fs from "fs";
import path from "path";
import Papa from "papaparse";

// Header i CSV-filen må matche (Tittel,Firma,Frist,URL,Logo)
export type JobCsvRow = {
    tittel: string;
    stillingstype: string;
    firma: string;
    frist: string; // YYYY-MM-DD format
    url: string;
    logo?: string; // Navn på fil
    beskrivelse: string;
}

// Funksjonen leser fra CSV-filen og returnerer en liste objekter av JobCsvRow
export function getJobListings(): JobCsvRow[] {
    // Path til CSV-filen
    const filePath = path.join(process.cwd(), "content/stillingsannonser/stillingsannonser.csv");

    // Hvis ikke filen eksisterer 
    if (!fs.existsSync(filePath)) {
        console.error("Job listings CSV not found", filePath);
        return [];
    }
    // Leser filen til tekst
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parser teksten fra filen til JobCsvRow-objekter
    const { data } = Papa.parse<JobCsvRow>(fileContent, {
        header: true,
        skipEmptyLines: true,
        // trim() = .strip() i Python
        // Gjør header lowercase i tilfelle noe endres i CSV-filen
        transformHeader: (h) => h.toLowerCase().trim(),
        transform: (value) => value?.trim(),
    });


    // Filtrer bort rader som mangler tittel,firmanavn,frist eller URL
    return (data as JobCsvRow[]).filter((job) => 
        job.tittel && job.stillingstype && job.firma && job.frist && job.url && job.beskrivelse
    );
}

export function getVisibleJobListings(now = new Date()): JobCsvRow[] {
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const septemberFirst = new Date(today.getFullYear(), 8, 1);
    const juneFirst = new Date(today.getFullYear(), 5, 1);

    return getJobListings()
        .filter((job) => {
            const deadline = new Date(job.frist);

            if (deadline < today) return false;

            return !(
                job.stillingstype === "Sommerjobb" &&
                deadline > juneFirst &&
                today < septemberFirst
            );
        })
        .sort(
            (a, b) =>
                new Date(a.frist).getTime() - new Date(b.frist).getTime()
        );
}
