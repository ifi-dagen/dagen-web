// Henter FAQ fra CSV-fil
// CSV innholder spørsmål som string, og svar som filreferanse (markdown)
// Question,File
// "spørsmål"."filnavn.md"(henter fil i undermappe)

import fs from "fs";
import path from "path";
import Papa from "papaparse";
import matter from "gray-matter";
import { FaqProps } from "@/types";

// Typen vi forventer fra hver rad i CSV-fil
type FaqCsvRow = {
  question: string;
  file: string; // navn på fil
}

export function getFAQs(faqDirectory: string): FaqProps[] {
  const csvPath = path.join(process.cwd(), "content", faqDirectory, "faq.csv");
  const answerDir = path.join(process.cwd(), "content", faqDirectory, "answers");

  // Hvis CSV-fil ikke finnes / feil path
  if (!fs.existsSync(csvPath)) {
    console.error(`FAQ CSV file not found at ${csvPath}`);
    return [];
  }

  // Leser filen til tekst (utf8)
  const csvFileContent = fs.readFileSync(csvPath, "utf8");

  // Parser tekst til objekter
  const { data } = Papa.parse<FaqCsvRow>(csvFileContent, {
    header: true,           // Buker header til kolonnenavn
    skipEmptyLines: true,   // Hopper over tomme linjer
    transformHeader: (h) => h.toLowerCase().trim(), // Best å jobbe med lower case
    transform: (v) => v?.trim(), // .trim() = .strip() i Python
  });

  // Tom liste til å returnere
  const result: FaqProps[] = [];

  // Looper alle objektene
  for (const row of data as FaqCsvRow[]) {
    // Hopper over ugyldige rader
    if (!row?.question || !row?.file) {
      console.warn("Ignoring invalid FAQ row:", row);
      continue;
    }

    // Lager path til markdown-fil
    const mdPath = path.join(answerDir, `${row.file}`);

    // Hvis vi ikke finner filen, setter vi svaret til ""
    if (!fs.existsSync(mdPath)) {
      console.error(`FAQ markdown file not found: ${mdPath}`);
      result.push({
        question: row.question,
        answer: "",
      });
      continue;
    }

    // Leser markdown-filen
    const mdFile = fs.readFileSync(mdPath, "utf8");
    // Matter fjerner metadata og tar bare vare på innholdet
    const { content } = matter(mdFile);

    // Legger markdown-teksten til i listen
    result.push({
      question: row.question,
      answer: content,
    });
  }

  return result;
}
