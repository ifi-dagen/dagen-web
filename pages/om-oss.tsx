import MemberCard from "@/components/MemberCard";
import GridSection from "@/components/GridSection";
import ReactMarkdown from "react-markdown";
import { getMarkdownContent } from "../lib/markdown";
import { getMembers, Member } from "../lib/members";

export default function Page({ content, members }: { content: string; members: Member[] }) {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      <div className="prose max-w-4xl mx-auto text-center">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      <GridSection title="Styret" columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard
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

export async function getStaticProps() {
  const content = await getMarkdownContent("om-oss/om-oss");
  const members = await getMembers();
  return { props: { content, members } };
}
