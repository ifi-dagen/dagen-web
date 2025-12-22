import fs from "fs";
import path from "path";
import Papa from "papaparse";

export function getJobListings() {
    const filePath = path.join(process.cwd(), "content/bedrift/stillingsannonser.csv");

    const file = fs.readFileSync(filePath, "utf8");
    const parsed = Papa.parse(file, {
        header: true,
        transform: (value) => value?.trim(),
    }).data;


    // Fjern tomme rader
    return parsed.filter((job: any) => job.URL);
}
