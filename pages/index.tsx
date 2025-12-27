// Forsiden (hjem)
// Leser fra CSV-fil som definerer rekkefølge på bilder og tekst

import ReactMarkdown from "react-markdown";
import { getHomePageLayout } from "../lib/homepage";
import { ContentRow } from "../types";

// Props for siden er en liste av rader indeksert i CSV-filen
type HomePageProps = {
  rows: ContentRow[];
}

// Hovedfunksjon
export default function Home({ rows }: HomePageProps) {  
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      {rows?.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          // Definerer antall kolonner per rad
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          {row.map((item, itemIndex) => (
            // Hvis objekter er bilde
            item.type === "image" ? (
              <img
                key={itemIndex}
                // OBS!
                // Nå antas bildene å ligge i public
                // Må endres her (eller i CSV) hvis egen subfolder skal brukes
                src={`/${item.content}`}
                alt={`Bilde ${rowIndex + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              // Hvis det ikke er bilde, antar vi at det er markdown
              <div key={itemIndex} className="prose">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            )
          ))}
        </div>
      ))}
    </main>
  );
}

// Henter layout fra CSV-fil og gjør de til props som hovedfunksjonen bruker
export function getStaticProps() {
  const rows = getHomePageLayout("arrangementer/hjemside.csv");
  return { props: { rows } };
}
