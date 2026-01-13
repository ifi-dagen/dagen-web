// Forsiden (hjem)
// Leser fra CSV-fil som definerer rekkefølge på bilder og tekst
// Viser "om-oss" fra markdown og styremedlemmer fra CSV-fil

import ReactMarkdown from "react-markdown";
import { ContentRow, Member } from "../types";
import { getContentRowLayout } from "@/lib/getContentRowLayout"
import { getMarkdownContent } from "@/lib/getMarkdownContent";
import { getMembers } from "@/lib/members";
import ContentRowBuilder from "@/components/ContentRowBuilder";
import GridSection from "@/components/GridSection";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";

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
      <div className="prose max-w-4xl mx-auto">
        <ReactMarkdown>{aboutText}</ReactMarkdown>
      </div>

      {/* Bilder og kort info om alle i styret */}
      <GridSection
        title="Styret" // Overskrift til grid
        columns="auto"
      >
        {members.map((member) => (
          <MemberCard
            key={`${member.name}-${member.title}`} // Sammensatt, tilfelle like navn
            memberName={member.name}
            memberTitle={member.title}
            roleEmail={member.email}
            memberPicture={member.picturePath}
          />
        ))}

        {/* Bli med i dagen "profil" */}
        <div className="p-6 rounded-lg text-center">
          <div className="w-40 h-40 mx-auto mb-4 rounded-full border-2 border-current flex items-center justify-center text-(--primary) text-8xl">
            ?
          </div>
          <h2 className="text-xl font-semibold text-(--primary) min-h-24 md:min-h-14 flex items-center justify-center">
            Deg?
          </h2>

          <Link href="/bli-med" className="bg-(--primary) rounded-4xl px-6 py-4 text-white inline-block">
            Bli med i Dagen!
          </Link>
        </div>
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
