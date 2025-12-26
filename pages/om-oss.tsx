// "Om oss"-siden
// Henter tekst fra en markdown-fil og liste med styremedlemmer

import MemberCard from "@/components/MemberCard";
import GridSection from "@/components/GridSection";
import ReactMarkdown from "react-markdown";
import { getMarkdownContent } from "../lib/markdown";
import { getMembers, Member } from "../lib/members";

// Props som siden forventer for å bygge:
// content: tekst fra markdown-fil
// members: liste med Member-objekter fra members.csv via members.ts
type OmOssPageProps = {
  content: string;
  members: Member[];
};

export default function Page({ content, members }: OmOssPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">

      {/* 
        Øverst / først på siden - teksten fra markdown-filen 
        ReactMarkdown konverterer til HTML(/JSX)
        */}
      <div className="prose max-w-4xl mx-auto text-center">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      {/*
        Styret
        - Overskrift "Styret"
        - Grid med "kort" av styremedlemmer
      */}
      <GridSection title="Styret" columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard
          // OBS, fordi siden bygges hver gang en fil oppdateres, så er index greit,
          // men anbefales ikke ved dynamisk oppdatering fra typ API.
          // Bytt da til en annen unik key (navn+rolle eller lignende)
            key={index}
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

// Kjører når siden bygges
// Leser content (markdown-fil) og members (CSV-fil)
// Brukes videre i hovedkomponenten over
export async function getStaticProps() {
  const content = await getMarkdownContent("om-oss/om-oss");
  const members = getMembers();
  
  return { 
    props: { 
      content, 
      members, 
    }, 
  };
}
