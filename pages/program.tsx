import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { getProgramText } from "@/lib/program/getProgramText";
import { BedriftItem, ProgramItem } from "@/types";
import { getBedrifter } from "@/lib/program/getBedrifter";

function getEventNameOnDate(date = new Date()): string {
    const year = date.getFullYear();

    const mayFirst = new Date(year, 4, 1);
    const janFirst = new Date(year, 0, 1);

    return date >= janFirst && date < mayFirst
        ? "ettermiddagen"
        : "dagen";
}

const nextEventUp = getEventNameOnDate();


type Tab = "program" | "bedrifter" | "standkart";

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
    const isStandkart = tab === "standkart";

    const hsp = bedrifterItems.find((b) => b.spons === "hsp") ?? null;
    const spons = bedrifterItems.filter((b) => b.spons === "sponsor") ?? null;
    const restBedrifer = bedrifterItems.filter((b) => b.spons !== "hsp" && b.spons !== "sponsor");

    return (
        <main className="max-w-[1304px] mx-auto px-6 justify-items-center">
            {/* Toggle */}
            <div className="sticky top-40">
                <div className="w-64 h-12 relative inline-flex">
                    <button
                        type="button"
                        onClick={() => setTab("program")}
                        aria-pressed={isProgram}
                        className={[
                            "flex-1 h-12 -mr-px",
                            "outline-1 -outline-offset-1 outline-button-outline",
                            "rounded-l-full",
                            "inline-flex items-center justify-center",
                            "font-mono text-sm tracking-tight",
                            isProgram ? "bg-button-bg" : "bg-button-hover",
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
                            "outline-1 -outline-offset-1 outline-button-outline",
                            "inline-flex items-center justify-center",
                            "font-mono text-sm tracking-tight",
                            isBedrifter ? "bg-button-bg" : "bg-button-hover",
                        ].join(" ")}
                    >
                        Bedrifter
                    </button>

                    <button
                        type="button"
                        onClick={() => setTab("standkart")}
                        aria-pressed={isStandkart}
                        className={[
                            "flex-1 h-12 -ml-px",
                            "outline-1 -outline-offset-1 outline-button-outline",
                            "rounded-r-full",
                            "inline-flex items-center justify-center",
                            "font-mono text-sm tracking-tight",
                            isStandkart ? "bg-button-bg" : "bg-button-hover",
                        ].join(" ")}
                    >
                        Standkart
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
                <div className="flex flex-col items-center mb-24 mt-24">
                    
                    {/* Grid av logoer */}
                    {bedrifterItems.length > 0 ? (
                        <div className="relative">



                            <p className="font-mono text-xs font-extralight text-center">
                                OBS! KUN FOR DEMO! - bedrifter til ettermiddagen er ikke bekreftet enda
                            </p>


                            {/* TODO ^ FJERNE DEMO DISCLAIMER ^ !!!! ----- !!! */}




                            <h2 className="font-mono text-4xl font-bold text-center my-16">
                                Disse kommer til {nextEventUp}@ifi!<br />
                            </h2>

                            {/* HSP */}
                            {hsp && (
                                <div className="w-full flex items-center justify-icenter p-3">
                                    <Image
                                        src={`${router.basePath}/logos/${hsp.logo}`}
                                        alt={`Hovedsponsor for dagen - ${hsp.name}`}
                                        width={340}
                                        height={340}
                                        className="h-auto w-full max-w-h-[360px] object-contain"
                                    />
                                </div>
                            )}

                            {/* Sponsorer */}
                            {spons.length > 0 && (
                                <div className={[
                                    "w-full mt-24 md:mt-48",
                                    "grid gap-2 md:gap-6 px-2 md:px-0",
                                    "grid-cols-2 md:grid-cols-3",
                                    "items-center justify-items-center",
                                    "flex flex-wrap",
                                ].join(" ")}
                                >
                                    {spons
                                        .map((b) => (
                                            <div
                                                key={b.name}
                                                className="w-full flex items-center justify-center p-3"
                                            >
                                                <Image
                                                    src={`${router.basePath}/logos/${b.logo}`}
                                                    alt={b.name}
                                                    width={340}
                                                    height={340}
                                                    className="h-auto w-full max-w-[280px] object-contain"
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Resten */}
                            {restBedrifer.length > 0 && (
                                <div
                                    className={[
                                        "w-full mt-24 md:mt-48",
                                        "grid gap-2 md:gap-6 px-2 md:px-0",
                                        "grid-cols-3 md:grid-cols-5",
                                        "items-center justify-items-center",
                                    ].join(" ")}
                                >
                                    {restBedrifer
                                        .map((b) => (
                                            <div
                                                key={b.name}
                                                className="w-full flex items-center justify-center p-3"
                                            >
                                                <Image
                                                    src={`${router.basePath}/logos/${b.logo}`}
                                                    alt={b.name}
                                                    width={340}
                                                    height={340}
                                                    className="h-auto w-full max-w-[220px] object-contain"
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center font-mono text-lg">
                            Bedrifter kommer snart
                        </div>
                    )}
                </div>
            )}

            {/* Standkart */}
            {isStandkart && (
                <div className="flex flex-col items-center mb-24 mt-24">
                    <p className="font-mono text-sm">
                        OBS! Standkartet under er for Dagen 2024, og er kun ment for demonstrasjon. Oppdatert standkart kommer snart.
                    </p>
                    <h2 className="text-text-heading text-5xl font-bold font-mono uppercase leading-8 tracking-widest pt-40">
                        STANDKART
                    </h2>
                    <Image
                        src={`${router.basePath}/program/standkart.png`}
                        alt="standkart"
                        width={1000}
                        height={4000}
                        className="h-auto w-full object-contain pt-16" 
                        />
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
