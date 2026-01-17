import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

import { getMarkdownContent } from "@/lib/getFileContent";
import { getProgramText } from "@/lib/program/getProgramText";
import { BedriftItem, ProgramItem } from "@/types";
import { getBedrifter } from "@/lib/program/getBedrifter";
import StandkartOverlay from "@/components/StandkartOverlay";

function getEventNameOnDate(date = new Date()): string {
    const year = date.getFullYear();

    const mayFirst = new Date(year, 4, 1);
    const janFirst = new Date(year, 0, 1);

    return date >= janFirst && date < mayFirst
        ? "ettermiddagen"
        : "dagen";
}

const nextEventUp = getEventNameOnDate();


type Tab = "program" | "bedrifter";

type ProgramPageProps = {
    programItems: ProgramItem[];
    bedrifterItems: BedriftItem[];
};

export default function ProgramPage({
    programItems,
    bedrifterItems,
}: ProgramPageProps) {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("program");
    const [standkartOpen, setStandkartOpen] = useState(false);

    const isProgram = tab === "program";
    const isBedrifter = tab === "bedrifter";

    return (
        <main className="max-w-[1304px] mx-auto px-6">
            {/* Toggle */}
            <div className="flex justify-center mt-16">
                <div className="w-64 h-12 inline-flex">
                    <button
                        type="button"
                        onClick={() => setTab("program")}
                        aria-pressed={isProgram}
                        className={[
                            "flex-1 h-12 -mr-px",
                            "outline-1 -outline-offset-1 outline-black",
                            "rounded-l-[100px]",
                            "inline-flex items-center justify-center",
                            "font-mono text-sm tracking-tight",
                            isProgram ? "bg-(--primary)" : "bg-background",
                        ].join(" ")}
                    >
                        Program
                    </button>

                    <button
                        type="button"
                        onClick={() => setTab("bedrifter")}
                        aria-pressed={isBedrifter}
                        className={[
                            "flex-1 h-12",
                            "outline-1 -outline-offset-1 outline-black",
                            "rounded-r-[100px]",
                            "inline-flex items-center justify-center",
                            "font-mono text-sm tracking-tight",
                            isBedrifter ? "bg-(--primary)" : "bg-background",
                        ].join(" ")}
                    >
                        Bedrifter
                    </button>
                </div>
            </div>

            {/* Program */}
            {isProgram && (
                <div className="flex flex-col items-center mb-24 mt-11 md:mt-[88px]">
                    <Image
                        src={`${router.basePath}/program/${nextEventUp}_logo.svg`}
                        alt="Dagen at ifi logo"
                        width={500}
                        height={300}
                    />
                    <h2 className="text-3xl py-12 px-12 font-heading">
                        Årets program
                    </h2>

                    {programItems.length > 0 ? (
                        <div className="space-y-6">
                            {programItems.map((item) => (
                                <div key={`${item.time}-${item.text}`}>
                                    <div className="font-mono text-sm uppercase tracking-wide">
                                        kl.{item.time}
                                    </div>
                                    <div className="font-mono text-lg">
                                        {item.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center font-mono text-lg">
                            Program for {nextEventUp} kommer
                        </div>
                    )}
                </div>
            )}

            {/* Bedrifter */}
            {isBedrifter && (
                <div className="flex flex-col items-center mb-24 mt-11">
                    {/* Knapp øverst */}
                    <button
                        type="button"
                        onClick={() => setStandkartOpen(true)}
                        className={[
                            "mb-10",
                            "px-6 py-3",
                            "border border-black",
                            "rounded-full",
                            "font-mono text-sm tracking-tight",
                            "hover:bg-(--primary)",
                        ].join(" ")}
                    >
                        Standkart
                    </button>

                    <StandkartOverlay
                        open={standkartOpen}
                        onClose={() => setStandkartOpen(false)}
                        imageSrc={`${router.basePath}/program/standkart.png`}
                        alt="Standkart"
                    />

                    {/* Grid av logoer */}
                    {bedrifterItems.length > 0 ? (
                        <div className="relative">
                            <h2 className="font-mono text-4xl font-bold text-center my-16">
                                Disse kommer til {nextEventUp}@ifi!
                            </h2>
                            <div
                                className={[
                                    "w-full",
                                    "grid gap-6",
                                    "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7",
                                    "items-center justify-items-center",
                                ].join(" ")}
                            >
                                {bedrifterItems.map((b) => (
                                    <div
                                        key={b.name}
                                        className="w-full flex items-center justify-center p-3"
                                    >
                                        <Image
                                            src={`${router.basePath}/logos/${b.logo}`}
                                            alt={b.name}
                                            width={240}
                                            height={140}
                                            className="h-auto w-full max-w-[120px] object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center font-mono text-lg">
                            Bedrifter kommer snart
                        </div>
                    )}
                </div>
            )}


        </main>
    );
}

export function getStaticProps() {
    const programItems = getProgramText("program/program.csv");
    const bedrifterItems = getBedrifter("program/bedrifter.csv");
    return {
        props: {
            programItems,
            bedrifterItems,
        },
    };
}
