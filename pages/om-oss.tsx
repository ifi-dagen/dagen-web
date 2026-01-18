import GridSection from "@/components/GridSection";
import MemberCard from "@/components/MemberCard";
import { getMarkdownContent } from "@/lib/getFileContent"
import { getMembers } from "@/lib/members";
import { Member } from "@/types";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type AboutUsProps = {
    aboutText: string;
    members: Member[];
}

export default function AboutUs({ aboutText, members }: AboutUsProps) {
    return (
        <main className="max-w-[1107px] mx-auto px-4 md:px-6 py-8 space-y-20 mt-44 md:mb-[187px]">
            <div className="space-y-8">
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
                        <div className="w-40 h-40 mx-auto mb-4 rounded-full border-2 border-current flex items-center justify-center text-text-color text-2xl">
                            deg?
                        </div>

                        <Link href="/bli-med" className="bg-primary rounded-4xl px-6 py-4 text-button-text outline outline-black inline-block mt-10">
                            Bli med i Dagen!
                        </Link>
                    </div>
                </GridSection>
            </div>
        </main>
    )
}


export function getStaticProps() {
    const aboutText = getMarkdownContent("om-oss/om-oss");
    const members = getMembers();
    return {
        props: {
            aboutText,
            members,
        },
    };
}