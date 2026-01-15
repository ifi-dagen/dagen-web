// Side for bedrift informasjon
// Bygget opp med info (tekst og bilder) øverst, så FAQ og kontaktinfo til bedrift nederst
// Egen CSV-fil for info (content)
// Egen CSV-fil for FAQ

import { getFAQs } from "../lib/getFaqs";
import FaqAccordion from "@/components/FaqAccordion";
import { getContentRowLayout } from "@/lib/getContentRowLayout";
import { ContentRow, FaqItem } from "@/types";
import ContentRowBuilder from "@/components/ContentRowBuilder";

type BedriftPageProps = {
  contentRows: ContentRow[];
  faqs: FaqItem[];
}


export default function Page({ contentRows, faqs }: BedriftPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      
      {/* Tekst/bilder (content) øverst */}
      <ContentRowBuilder rows={contentRows} />
      
      {/* FAQ under content */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-(--primary)">
          FAQs
          </h2>
        <FaqAccordion 
        faqs={faqs} 
        />
      </div>
      
      {/* Kontaktinfo til bedrift nederst */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-(--primary) mb-4">
          Kontakt
        </h2>
        <p className="text-lg">
          Ved spørsmål, kontakt bedrift@dagenatifi.no
        </p>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const contentRows = getContentRowLayout("bedrift/bedriftside.csv");
  const faqs = getFAQs("bedrift/FAQ");
  return { props: { contentRows, faqs } };
}
