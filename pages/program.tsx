import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { BedriftItem, ProgramItem } from "@/types";
import { getBedrifter } from "@/lib/getBedrifter";
import { getCsvContent } from "@/lib/getFileContent";
import { getVisibleJobListings, JobCsvRow } from "@/lib/getJobListings";
import InteractiveStandMap from "@/components/stand-map/InteractiveStandMap";

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

const isTab = (x: unknown): x is Tab =>
    x === "program" || x === "bedrifter" || x === "standkart";

type ProgramPageProps = {
    programItems: ProgramItem[];
    bedrifterItems: BedriftItem[];
    jobListings: JobCsvRow[];
};

export default function ProgramPage({
    programItems,
    bedrifterItems,
    jobListings,
}: ProgramPageProps) {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("program");

    useEffect(() => {
        const syncFromHash = () => {
            const raw = window.location.hash.replace("#", "");
            const next = isTab(raw) ? raw : "program";
            setTab(next);
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);
        return () => window.removeEventListener("hashchange", syncFromHash);
    }, []);

    const setTabHash = (next: Tab) => {
        window.location.hash = next;
        setTab(next);
    };

    const isProgram = tab === "program";
    const isBedrifter = tab === "bedrifter";
    const isStandkart = tab === "standkart";

    const date = new Date();

    const hsp = bedrifterItems.find((b) => b.spons === "hsp") ?? null;
    const spons = bedrifterItems
        .filter((b) => b.spons === "sponsor")
        .sort((a, b) => a.name.localeCompare(b.name))?? null;
    const restBedrifer = bedrifterItems.filter((b) => b.spons !== "hsp" && b.spons !== "sponsor")
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <main className="max-w-[1304px] mx-auto px-6 justify-items-center">
            {/* Toggle */}
            <div className="sticky top-40 z-30 flex justify-center">
                <div className="w-64 h-12 relative inline-flex font-mono text-sm tracking-tight">

                    {/* Programknapp */}
                    <button
                        type="button"
                        onClick={() => setTabHash("program")}
                        aria-pressed={isProgram}
                        className={[
                            "flex-1 h-12 -mr-px",
                            "inline-flex items-center justify-center",
                            "rounded-l-full",
                            "outline-1 -outline-offset-1 outline-button-outline",
                            isProgram ? "bg-button-bg" : "bg-background",
                        ].join(" ")}
                    >
                        Program
                    </button>

                    {/* Bedrifter-knapp */}
                    <button
                        type="button"
                        onClick={() => setTabHash("bedrifter")}
                        aria-pressed={isBedrifter}
                        className={[
                            "flex-1 h-12",
                            "inline-flex items-center justify-center",
                            "outline-1 -outline-offset-1 outline-button-outline",
                            isBedrifter ? "bg-button-bg" : "bg-background",
                        ].join(" ")}
                    >
                        Bedrifter
                    </button>

                    {/* Standkartknapp */}
                    <button
                        type="button"
                        onClick={() => setTabHash("standkart")}
                        aria-pressed={isStandkart}
                        className={[
                            "flex-1 h-12 -ml-px",
                            "inline-flex items-center justify-center",
                            "rounded-r-full",
                            "outline-1 -outline-offset-1 outline-button-outline",
                            isStandkart ? "bg-button-bg" : "bg-background",
                        ].join(" ")}
                    >
                        Standkart
                    </button>
                </div>
            </div>

            {/* Program */}
            {isProgram && (
                <div className="w-full flex flex-col items-center mt-22 mb-24 md:mt-[88px]">
                    <div className="w-full max-w-[1041px]">
                        <div className="mt-12 text-center font-mono text-lg">
                            Program for {nextEventUp}@ifi {date.getFullYear()}
                        </div>
                        {/* Logo */}
                        <div
                            className={[
                                "w-full",
                                "px-6 py-4 md:px-16 lg:px-44",
                                "flex flex-col items-center justify-center gap-2.5",
                                "bg-background outline-1 -outline-offset-1 outline-black",
                            ].join(" ")}
                        >
                            <Image
                                src={`${router.basePath}/program/${nextEventUp}_logo.svg`}
                                alt="Dagen at ifi logo"
                                width={700}
                                height={176}
                                className="w-full max-w-[700px] h-auto object-contain"
                            />
                        </div>

                        {/* Rader */}
                        {programItems.length > 0 ? (
                            <div className="w-full">
                                {programItems.map((item) => (
                                    <div
                                        key={`${item.time}-${item.what}-${item.where}`}
                                        className="grid grid-cols-[126px_1fr_1fr] md:grid-cols-[224px_1fr_1fr]"
                                    >
                                        {/* Tid */}
                                        <div
                                            className={[
                                                "w-32 md:w-full px-2 md:px-6 py-2 md:py-5",
                                                "flex items-center wrap-break-word",
                                                "bg-background",
                                                "border-l border-b border-black",
                                            ].join(" ")}
                                        >
                                            <div className="font-mono text-xs md:text-base font-normal leading-8 tracking-wide">
                                                Kl.{item.time}
                                            </div>
                                        </div>

                                        {/* What */}
                                        <div
                                            className={[
                                                "w-full px-2 md:px-6 py-2 md:py-4",
                                                "flex items-center",
                                                "bg-background",
                                                "border-l border-b border-black",
                                            ].join(" ")}
                                        >
                                            <div className="font-mono text-xs md:text-base font-normal leading-8 tracking-wide">
                                                {item.what}
                                            </div>
                                        </div>
                                        {/* Where */}
                                        <div
                                            className={[
                                                "w-full px-2 md:px-6 py-2 md:py-4",
                                                "flex items-center",
                                                "bg-background",
                                                "border-l border-r border-b border-black",
                                            ].join(" ")}
                                        >
                                            <div className="font-mono text-xs md:text-base font-normal leading-8 tracking-wide">
                                                {item.where}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-12 text-center font-mono text-lg">
                                Program for {nextEventUp}@ifi kommer
                            </div>
                        )}
                        <div>
                            {programItems.map((item) => (
                                item.asterisk ? (
                                    <div key={item.asterisk}
                                         className="font-mono text-shadow-background">
                                        *{item.asterisk}
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bedrifter */}
            {isBedrifter && (
                <div className="flex flex-col items-center mt-24 mb-24">
                    {/* Grid av logoer */}
                    {bedrifterItems.length > 0 ? (
                        <div className="relative w-full">

                            {/* Tittel */}
                            <h2 className="font-mono text-4xl font-bold text-center my-16">
                                Disse kommer til {nextEventUp}@ifi!<br />
                            </h2>

                            {/* HSP */}
                            {hsp && (
                                <div className="w-full p-3 flex items-center justify-center">
                                    <Image
                                        src={`${router.basePath}/logos/${hsp.logo}`}
                                        alt={`Hovedsamarbeidspartner for dagen - ${hsp.name}`}
                                        width={340}
                                        height={340}
                                        className="h-auto w-full max-w-[360px] object-contain"
                                    />
                                </div>
                            )}

                            {/* Sponsorer */}
                            {spons.length > 0 && (
                                <div className="w-full mt-24 md:mt-48 px-2 md:px-0 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 items-center justify-items-center">
                                    {spons.map((b) => (
                                        <div key={b.name} className="w-full p-3 flex items-center justify-center">
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
                                <div className="w-full mt-24 md:mt-48 px-2 md:px-0 grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 items-center justify-items-center">
                                    {restBedrifer.map((b) => (
                                        <div key={b.name} className="w-full p-3 flex items-center justify-center">
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
                            Bedrifter for {nextEventUp}@ifi kommer snart
                        </div>
                    )}
                </div>
            )}

            {/* Standkart */}
            {isStandkart && (
                <div className="flex w-full flex-col items-center mt-6 mb-14 font-mono">
                    <h2 className="mb-12 pt-24 text-3xl font-bold uppercase tracking-widest text-text-heading md:text-5xl">
                        STANDKART
                    </h2>
                    <InteractiveStandMap
                        companies={bedrifterItems}
                        jobListings={jobListings}
                    />
                </div>
            )}
        </main>
    );
}

export function getStaticProps() {
    const programItems = getCsvContent("program/program");
    const bedrifterItems = getBedrifter("program/bedrifter");
    const jobListings = getVisibleJobListings();
    return {
        props: {
            programItems,
            bedrifterItems,
            jobListings,
        },
    };
}
