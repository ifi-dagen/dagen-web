import MemberCard from "@/components/MemberCard";
import GridSection from "@/components/GridSection";
import PageLayout from "@/components/PageLayout";
import { getMarkdownContent } from "../lib/markdown";
import { getMembers, Member } from "../lib/members";

export default function Page({ content, members }: { content: string; members: Member[] }) {
  return (
    <PageLayout content={content}>
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
    </PageLayout>
  );
}

export async function getStaticProps() {
  const content = await getMarkdownContent("om-oss/om-oss");
  const members = await getMembers();
  return { props: { content, members } };
}
