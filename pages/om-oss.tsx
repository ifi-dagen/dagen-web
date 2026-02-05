import { buttonClasses } from "@/components/buttons/buttonStyles";
import MemberCard from "@/components/MemberCard";
import { getMarkdownContent } from "@/lib/getFileContent";
import { getMembers } from "@/lib/members";
import { Member } from "@/types";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PageOverlay from "@/components/PageOverlay";


type AboutUsProps = {
    members: Member[];
    vedtekter: string;
    varsling: string;
    thisYear: string;
}

type OverlayType = "vedtekter" | "varsling" | null;

const isOverlayType = (x: unknown): x is Exclude<OverlayType, null> =>
    x === "vedtekter" || x === "varsling";

export default function AboutUsPage({ members, vedtekter, varsling, thisYear }: AboutUsProps) {
    const [overlay, setOverlay] = useState<OverlayType>(null);
    const scrollYRef = useRef(0);

    useEffect(() => {
        const syncFromHash = () => {
            const raw = window.location.hash.replace("#", "");
            const next: OverlayType = isOverlayType(raw) ? raw : null;
            setOverlay(next);
        };

        syncFromHash();

        window.addEventListener("hashchange", syncFromHash);
        return () => window.removeEventListener("hashchange", syncFromHash);
    }, []);

    const openOverlay = (type: Exclude<OverlayType, null>) => {
        scrollYRef.current = window.scrollY || 0;
        window.location.hash = type;
    };


    const closeOverlay = () => {
        if (window.location.hash) {
            history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
            );
        }

        setOverlay(null);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollYRef.current);
        });
    };

    return (
        <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 space-y-20 
                        mt-24 md:mt-36 md:mb-[187px] justify-items-center">

            {/* Knapper for vedtekter og varlsing */}
            <div className="flex flex-row gap-2 justify-center">
                <button
                    onClick={() => openOverlay("vedtekter")}
                    className={buttonClasses("w-38")}
                >
                    Vedtekter
                </button>
                <button
                    onClick={() => openOverlay("varsling")}
                    className={buttonClasses("w-38")}
                >
                    Varsling
                </button>
            </div>

            <div className="max-w-[1116.41px] min-h-[1180px] mx-auto">
                <h1 className="text-center justify-center text-text-heading 
                                text-5xl font-bold  leading-[57.60px]">
                    Hils på styret {thisYear}!
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
                                "justify-center text-text-color text-2xl "
                            ].join(" ")}
                            >
                                deg?
                            </div>

                            <Link
                                href="/bli-med"
                                className={buttonClasses([
                                    "px-6 py-4 h-18",
                                    "mt-10 whitespace-pre-line"
                                ].join(" "))}
                            >
                                Bli med i Dagen!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <PageOverlay open={overlay !== null} onClose={closeOverlay} maxWidthClass="max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    <div className="text-text-color">

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
            </PageOverlay>
        </main>
    )
}


export function getStaticProps() {
    const members = getMembers();
    const vedtekter = getMarkdownContent("om-oss/vedtekter");
    const varsling = getMarkdownContent("om-oss/varslingsplakat");

    const thisYear = new Date().getFullYear();

    return {
        props: {
            members,
            vedtekter,
            varsling,
            thisYear,
        },
    };
}
