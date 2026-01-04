// Forsiden (hjem)
// Leser fra CSV-fil som definerer rekkefølge på bilder og tekst
// Viser "om-oss" fra markdown og styremedlemmer fra CSV-fil

import ReactMarkdown from "react-markdown";
import { ContentRow } from "../types";
import { getContentRowLayout } from "@/lib/contentLayout"
import { getMarkdownContent } from "@/lib/markdown";
import { getMembers, Member } from "@/lib/members";
import ContentRowBuilder from "@/components/ContentRowBuilder";
import GridSection from "@/components/GridSection";
import MemberCard from "@/components/MemberCard";

// Props for siden er en liste av rader indeksert i CSV-filen
type HomePageProps = {
  rows: ContentRow[];
  aboutText: string;
  members: Member[];
};

// Hovedfunksjon
export default function Home({ rows, aboutText, members }: HomePageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      {/* Arrangementer */}
      <ContentRowBuilder rows={rows} />

      {/* "om oss", tekstlig informasjon om foreningen  */}
      <div className="prose max-w-4xl mx-auto text-center">
        <ReactMarkdown>{aboutText}</ReactMarkdown>
      </div>

      {/* Bilder og kort info om alle i styret */}
      <GridSection
        title="Styret" // Overskrift til grid
        columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <MemberCard
            key={`${member.name}-${member.title}`} // Sammensatt, tilfelle like navn
            memberName={member.name}
            memberTitle={member.title}
            titleMail={member.email}
            memberPicture={member.picturePath}
          />
        ))}
      </GridSection>
    </main>
  );
}

// Henter layout fra CSV-fil og gjør de til props som hovedfunksjonen bruker
export function getStaticProps() {
  const rows = getContentRowLayout("hjem/hjemside.csv");
  const aboutText = getMarkdownContent("hjem/om-oss");
  const members = getMembers();
  return {
    props: {
      rows,
      aboutText,
      members
    },
  };
}
