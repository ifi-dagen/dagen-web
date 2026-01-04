// Denne filen leser inn medlemmer fra members.csv 
// og returnerer en liste til å bruke på om-oss-siden

import fs from "fs";
import path from "path";
import Papa from "papaparse";

// Dataklasse for innhold til et medlem
// Tenk klasse uten funksjoner (dataclass eller dict i Python)
export type Member = {
    name: string;               // Navn på medlem
    title: string;              // Rolle / styretittel
    email: string;              // Epost; rolle@dagenatifi.no
    picturePath: string | null; // Path til bilde av medlem eller null
};

// Type for å lese rader i CSV-filen etter header
type MemberCsvRow = {
    name: string;
    title: string;
    email: string;
    picture?: string;
};

// Denne funksjonen leser CSV-filen og lager listen av medlemmer
export function getMembers(): Member[] {
    // Path til CSV-filen fra roten til prosjektet (process.cwd())
    const csvPath = path.join(process.cwd(), "content/hjem/members.csv");

    // Path til bildemappen fra root
    const picturesDir = path.join(process.cwd(), "public/members");

    // Hvis CSV-filen ikke finnes, logges en error og returnerer en tom liste
    // På siden vil det da bare være tomt under "Styret" isteden for at den kræsjer
    if (!fs.existsSync(csvPath)) {
        console.error("Members CSV file not found");
        return [];
    }

    // Leser hele filen som tekst (utf8)
    const fileContent = fs.readFileSync(csvPath, "utf8");

    // Bruker Papa parse til å lese innholdet
    // header: true, gjør at første linje brukes som navn på kolonner (Name,Title,Email,Picture)
    // Gjøres til lower case med transformHeader (name,title,email,picture), så det matcher typen
    // Hver rad etter header blir et objekt av typen MemberCsvRow
    const { data } = Papa.parse<MemberCsvRow>(fileContent, {
        header: true,
        transformHeader: (header) => header.toLowerCase().trim(),   // trim() = .strip() i Python
        skipEmptyLines: true,
    });

    // Tom liste som skal inneholde objekter av typen Member (dataklassen over)
    const members: Member[] = [];

    // Looper alle radene / objektene fra CSV-filen
    for (const row of data) {
        // Sjekker at raden har navn, tittel og epost
        if (!row.name || !row.title || !row.email) {
            console.warn("Ignoring invalid row - members.csv", row);
            continue;
        }

        // trim() = .strip() i Python, " Ola " blir: "Ola"
        const name = row.name.trim();
        const title = row.title.trim();
        const email = row.email.trim();

        // Bilde kan være tomt; settes til null hvis det er tomt etter trim()
        const pictureFileName = row.picture?.trim() || null;

        // Path til bilde settes først null
        let picturePath: string | null = null;

        // Hvis kolonnen ikke var tom, kan vi prøve å finne bildet
        if (pictureFileName) {
            // Bygger en fullstendig path til bildet
            const absPicturePath = path.join(picturesDir, pictureFileName);

            // Sjekker at bildet finnes
            if (fs.existsSync(absPicturePath)) {
                // Lager en path som vi bruker i objektet
                picturePath = `members/${pictureFileName}`;
            } else {
                // Hvis bildet ikke finnes, logger en warning
                console.warn(`Picture for ${name}: ${absPicturePath} (from members.csv: ${pictureFileName}) not found`);
            }
        }

        // Lager et objekt av Member og legger til i listen
        const member: Member = {
            name,
            title,
            email,
            picturePath,
        };

        members.push(member);
    }

    // Returnerer listen av Member-objekter
    return members;
}
