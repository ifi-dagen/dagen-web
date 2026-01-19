import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import BedriftOverlay from "@/components/BedriftOverlay";
import BedriftCard from "@/components/BedriftCard";
import BedriftOverlayCard from "@/components/BedriftOverlayCard";

import { getMarkdownContent, getCsvContent } from "@/lib/getFileContent";
import type { PriceRow } from "@/types/domain";

type BedriftPageProps = {
    bedriftPageInfo: string;
    standInfo: string;
    hspInfo: string;

    standardStand: string;
    sponsorStand: string;
    standPrices: PriceRow[];
    standFaq: string;

    hspExtended: string;
    hspSponsor: string;
    hspHsp: string;
    hspInfoText: string;
};

type OverlayType = "stand" | "hsp" | null;

function formatKr(value: string) {
    const digits = value.replace(/\s/g, "");
    const n = Number(digits);
    if (!Number.isFinite(n)) return value;
    return `${n.toLocaleString("nb-NO")} KR`;
}

function PriceRow({ label, price }: { label: string; price: string }) {
    return (
        <>
            <div className="h-[62px] md:min-h-[84px] px-4 md:px-[25px] bg-background outline-1 outline-black flex items-center">
                <div className="text-sm md:text-lg font-bold font-mono wrap-break-word text-left">
                    {label}
                </div>
            </div>

            <div className="h-auto md:min-h-[84px] bg-background outline-1 outline-black flex items-center justify-center">
                <div className="text-sm md:text-lg font-bold font-mono">
                    {formatKr(price)}
                </div>
            </div>
        </>
    );
}

export default function Bedrift({
    bedriftPageInfo,
    standInfo,
    hspInfo,
    standardStand,
    sponsorStand,
    standPrices,
    standFaq,
    hspExtended,
    hspSponsor,
    hspHsp,
    hspInfoText,
}: BedriftPageProps) {
    const [overlay, setOverlay] = useState<OverlayType>(null);
    const scrollYRef = useRef(0);

    const [first, ...rest] = standPrices;

    const openOverlay = (type: Exclude<OverlayType, null>) => {
        scrollYRef.current = window.scrollY || 0;
        setOverlay(type);
    };

    const closeOverlay = () => {
        setOverlay(null);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollYRef.current);
        });

        if (typeof window !== "undefined" && window.history.state?.bedriftOverlay) {
            window.history.back();
        }
    };

    const mdComponents = {
        h3: ({ node, ...props }: any) => (
            <h3 className="m-0 font-bold tracking-widest uppercase" {...props} />
        ),
        p: ({ node, ...props }: any) => <p className="m-0 mb-10" {...props} />,
        a: ({ node, ...props }: any) => (
            <a className="underline text-[#007C91] hover:opacity-80" {...props} />
        ),
    };


    const overlayTitle =
        overlay === "stand"
            ? "Les mer om å stå på stand"
            : overlay === "hsp"
                ? "Les mer om å være hovedsamarbeidspartner"
                : "";

    return (
        <main className="w-full md:max-w-[1360px] mx-auto px-4 md:px-0 mt-[205px] pb-64 md:pb-0 md:mb-[116px]">

            {/* Bedriftside info (top tekst) */}
            <div className="w-full md:max-w[1107px] h-auto md:h-40 text-black text-justify text-lg font-normal font-mono leading-8 tracking-wide">
                <ReactMarkdown>{bedriftPageInfo}</ReactMarkdown>
            </div>

            {/* Infokort */}
            <div className="w-full md:h-[787px] mt-16 mb-16 md:mb-[118px] gap-10 md:gap-[41px] flex flex-col md:flex-row items-center">
                <BedriftCard
                    title="Stå på stand"
                    bodyMd={standInfo}
                    onOpen={() => openOverlay("stand")}
                />

                <BedriftCard
                    title="Hovedsamarbeidspartner"
                    bodyMd={hspInfo}
                    onOpen={() => openOverlay("hsp")}
                />
            </div>

            {/* Overlay */}
            <BedriftOverlay open={overlay !== null} onClose={closeOverlay}>
                <div className="max-w-[1107px] mx-auto">
                    <div className="text-black text-4xl font-bold font-mono uppercase leading-10 tracking-widest text-center mb-16 wrap-break-word">
                        {overlayTitle}
                    </div>

                    {/* STAND overlay */}
                    {overlay === "stand" && (
                        <div className="md:max-w-[1002px] mx-auto md:text-justify justify-start">
                            <div className="md:min-h-[156px]">
                                <span className="text-black text-lg font-bold font-mono leading-8 tracking-wide">
                                    STANDPLASSTYPER
                                    <br />
                                </span>
                                <span className="text-black text-lg font-normal font-mono leading-8 tracking-wide">
                                    På Ettermiddagen@ifi har vi kun standard plasser.
                                    <br />
                                    På Dagen@ifi tilbyr vi standard standplasser og sponsorplasser.
                                </span>
                            </div>

                            {/* Kort */}
                            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 gap-x-[64.6px] justify-items-center mt-10">
                                <div className="flex flex-col items-start">
                                    <BedriftOverlayCard
                                        title="Standard"
                                        isStandard={true}
                                        bodyList={standardStand}
                                        layout="fixed"
                                    />
                                    <div className="px-1 text-black text-[10px] font-mono leading-5 tracking-wide">
                                        *Rom for speedintervju kan legges til mot et tillegg
                                    </div>
                                </div>

                                <BedriftOverlayCard
                                    title="Sponsor"
                                    bodyList={sponsorStand}
                                    layout="fixed"
                                />
                            </div>

                            {/* Priser */}
                            <div className="mt-16 w-full">

                                {/* Tittel */}
                                <div className="w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-[979px] md:mx-0 md:px-0 md:ml-[11px] text-black text-lg font-bold font-mono md:py-[7px]">
                                    PRISER*
                                </div>

                                {/* Ettermiddagen */}
                                {first && (
                                    <div className="mb-[31px] w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-[1002px] md:mx-0 md:px-0">
                                        <div className="grid grid-cols-2 md:grid-cols-[660px_342px]">
                                            <PriceRow label={first.label} price={first.price} />
                                        </div>
                                    </div>
                                )}

                                {/* Dagen */}
                                <div className="w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-[1002px] md:mx-0 md:px-0">
                                    {rest.map((row) => (
                                        <div
                                            key={row.label}
                                            className="grid grid-cols-2 md:grid-cols-[660px_342px]"
                                        >
                                            <PriceRow label={row.label} price={row.price} />
                                        </div>
                                    ))}
                                </div>

                                {/* Fotnote */}
                                <div className="mt-[31px] w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-auto md:mx-0 md:px-0 md:ml-[11px] text-black text-xs md:text-lg font-mono">
                                    *Priser kan variere fra år til år, eller etter avtale.
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="mt-16 max-w-[979px] mx-auto md:text-justify text-black text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide">
                                <ReactMarkdown
                                    components={{
                                        h3: ({ node, ...props }) => (
                                            <h3
                                                className="m-0 font-bold tracking-widest uppercase"
                                                {...props}
                                            />
                                        ),
                                        p: ({ node, ...props }) => (
                                            <p className="m-0 mb-10" {...props} />
                                        ),
                                        a: ({ node, ...props }) => (
                                            <a
                                                className="underline text-text-link hover:opacity-80"
                                                {...props}
                                            />
                                        ),
                                    }}
                                >
                                    {standFaq}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}

                    {/* HSP overlay */}
                    {overlay === "hsp" && (
                        <div className="max-w-[1002px] mx-auto md:text-justify justify-start">
                            {/* 1) hsp_extended først */}
                            <div className="max-w-[979px] mx-auto text-black text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide word-break">
                                <ReactMarkdown components={mdComponents}>{hspExtended}</ReactMarkdown>
                            </div>

                            {/* 2) to kort */}
                            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 md:gap-x-[64.6px] justify-items-center mt-10">
                                <BedriftOverlayCard title="Sponsor" bodyList={hspSponsor} layout="fluid" />
                                <BedriftOverlayCard title="Hovedsponsor" bodyList={hspHsp} layout="fluid" />
                            </div>

                            {/* 3) info-tekst til slutt */}
                            <div className="mt-16 max-w-[979px] mx-auto text-black text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide">
                                <ReactMarkdown components={mdComponents}>{hspInfoText}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                </div>
            </BedriftOverlay>
        </main>
    );
}

export function getStaticProps() {
    const bedriftPageInfo = getMarkdownContent("bedrift/bedrift_page_info");
    const standInfo = getMarkdownContent("bedrift/stand_info");
    const hspInfo = getMarkdownContent("bedrift/hsp_info");

    const standardStand = getMarkdownContent("bedrift/stand/standard_stand_card");
    const sponsorStand = getMarkdownContent("bedrift/stand/sponsor_stand_card");
    const standPrices = getCsvContent<PriceRow>("bedrift/stand/stand_prices_list");
    const standFaq = getMarkdownContent("bedrift/stand/stand_faq");

    const hspExtended = getMarkdownContent("bedrift/hsp/hsp_extended");
    const hspSponsor = getMarkdownContent("bedrift/hsp/hsp_sponsor_card");
    const hspHsp = getMarkdownContent("bedrift/hsp/hsp_hsp_card");
    const hspInfoText = getMarkdownContent("bedrift/hsp/hsp_info_text");

    return {
        props: {
            bedriftPageInfo,
            standInfo,
            hspInfo,
            standardStand,
            sponsorStand,
            standPrices,
            standFaq,
            hspExtended,
            hspSponsor,
            hspHsp,
            hspInfoText,
        },
    };
}
