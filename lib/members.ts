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

// Denne funksjonen leser CSV-filen og lager listen av medlemmer
export function getMembers(): Member[] {
    // Path til CSV-filen fra roten til prosjektet (process.cwd())
    const csvPath = path.join(process.cwd(), "content/om-oss/members.csv");

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
    // Hver rad er en liste med string (string[])
    // "navn","rolle","epost","bilde.png" blir til:
    // ["navn", "rolle", "epost", "bilde.png"]
    const { data } = Papa.parse<string[]>(fileContent, {
        skipEmptyLines: true,
    });

    // Tom liste som skal inneholde objekter av typen Member (dataklassen over)
    const members: Member[] = [];

    // Looper alle radene / listene fra CSV-filen
    for (const row of data as string[][]) {
        // Sjekker at det er minst fire kolonner / ikke mangler noe
        if (row.length < 4) {
            console.warn("Ignoring row with too few columns - members.csv", row);
            continue;
        }

        // Bruker "raw" for å skille mellom variablene vi skal bruke og det som er ubehandlet fra fil
        const [rawName, rawTitle, rawEmail, rawPictureFileName] = row;

        // trim() = .strip() i Python, " Ola " blir: "Ola"
        // (rawName || "") betyr:
        //  - hvis rawName har en verdi, bruk den
        //  - ellers bruk tom string
        // På den måten unngår vi feil hvis en verdi skulle være undefined, null eller noe annet rart med CSV-filen.
        const name = (rawName || "").trim();
        const title = (rawTitle || "").trim();
        const email = (rawEmail || "").trim();

        // Bilde kan være tomt; settes til null hvis det er tomt etter trim()
        const pictureFileName = (rawPictureFileName || "").trim() || null;

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
