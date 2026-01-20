import AboutUsOverlay from "@/components/AboutUsOverlay";
import { buttonClasses } from "@/components/buttons/buttonStyles";
import MemberCard from "@/components/MemberCard";
import { getMarkdownContent } from "@/lib/getFileContent";
import { getMembers } from "@/lib/members";
import { Member } from "@/types";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";


type AboutUsProps = {
    members: Member[];
    vedtekter: string;
    varsling: string;
}

type OverlayType = "vedtekter" | "varsling" | null;

export default function AboutUs({ members, vedtekter, varsling }: AboutUsProps) {
    const [overlay, setOverlay] = useState<OverlayType>(null);
    const scrollYRef = useRef(0);

    const openOverlay = (type: Exclude<OverlayType, null>) => {
        scrollYRef.current = window.screenY || 0;
        setOverlay(type);
    };

    const closeOverlay = () => {
        setOverlay(null);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollYRef.current);
        });

        if (typeof window !== "undefined" && window.history.state?.aboutUsOverlay) {
            window.history.back();
        }
    };

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 space-y-20 
                        mt-24 md:mt-36 md:mb-[187px] justify-items-center">
            <div className="flex flex-row gap-2">
                <button
                    onClick={() => openOverlay("vedtekter")}
                    className={buttonClasses()}
                >
                    Vedtekter
                </button>
                <button
                    onClick={() => openOverlay("varsling")}
                    className={buttonClasses()}
                >
                    Varsling
                </button>
            </div>

            <div className="max-w-[1116.41px] min-h-[1180px] mx-auto">
                <h1 className="text-center justify-center text-text-heading 
                                text-5xl font-bold leading-[57.60px]">
                    Hils på styret 2026!
                </h1>

                <div className="max-w-[1107px] min-h-[1041px relative pt-[85px]">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] 
                                    md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-16">


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
                        <div className=" rounded-lg text-center mx-auto">
                            <div className={[
                                "w-48 h-48 mx-auto mb-4 rounded-full",
                                "border border-current flex items-center",
                                "justify-center text-text-color text-2xl"
                            ].join(" ")}
                            >
                                deg?
                            </div>

                            <Link
                                href="/bli-med"
                                className={[
                                    "bg-button-bg rounded-4xl px-6 py-4",
                                    "text-button-text outline outline-button-outline",
                                    "hover:bg-button-hover",
                                    "inline-block mt-12 md:mt-14 mx-auto"
                                ].join(" ")}
                            >
                                Bli med i Dagen!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <AboutUsOverlay open={overlay !== null} onClose={closeOverlay}>
                <div className="max-w-4xl mx-auto">
                    <div className="text-text-color font-mono text-justify whitespace-pre-line">
                        
                        {/* Vedtekter */}
                        {overlay === "vedtekter" && (
                            <div className="leading-8 tracking-wide prose">
                                <ReactMarkdown>{vedtekter}</ReactMarkdown>
                            </div>
                        )}

                        {/* Varsling */}
                        {overlay === "varsling" && (
                            <div className="leading-8 tracking-wide prose">
                                <ReactMarkdown>{varsling}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </AboutUsOverlay>

        </main>
    )
}


export function getStaticProps() {
    const members = getMembers();
    const vedtekter = getMarkdownContent("om-oss/vedtekter");
    const varsling = getMarkdownContent("om-oss/varslingsplakat");
    return {
        props: {
            members,
            vedtekter,
            varsling,
        },
    };
}
