import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { getMarkdownContent, getCsvContent } from "@/lib/getFileContent";
import type { PriceRow } from "@/types/domain";
import PageOverlay from "@/components/PageOverlay";
import PageCard from "@/components/PageCard";
import OverlayCard from "@/components/OverlayCard";
import Checklist from "@/components/Checklist";

type BedriftPageProps = {
    bedriftPageInfo: string;
    standInfo: string;
    hspInfo: string;

    standardStand: { checked: string; text: string }[];
    sponsorStand: { checked: string; text: string }[];
    standPrices: PriceRow[];
    standFaq: string;

    hspExtended: string;
    hspSponsor: { checked: string; text: string }[];
    hspHsp: { checked: string; text: string }[];
    hspInfoText: string;
};

type OverlayType = "stand" | "hsp" | null;

function formatKr(value: string) {
    const digits = value.replace(/\s/g, "");
    const n = Number(digits);
    if (!Number.isFinite(n)) return value;
    return `${n.toLocaleString("nb-NO")},-`;
}

function PriceRow({ label, price }: { label: string; price: string }) {
    return (
        <>
            <div
                className={[
                    "min-h-[62px] md:min-h-[84px]",
                    "px-4 md:px-[25px]",
                    "text-left text-sm md:text-lg font-bold font-mono hyphens-auto wrap-break-word",
                    "bg-background outline-1 outline-black",
                    "flex items-center",
                ].join(" ")}
            >
                <div>{label}</div>
            </div>

            <div
                className={[
                    "h-auto md:min-h-[84px]",
                    "text-sm md:text-lg font-bold font-mono",
                    "bg-background outline-1 outline-black",
                    "flex items-center justify-center",
                ].join(" ")}
            >
                <div>{formatKr(price)}</div>
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
            <a className="underline hover:opacity-80 text-[#007C91]" {...props} />
        ),
    };

    const overlayTitle =
        overlay === "stand"
            ? "Les mer om å stå på stand"
            : overlay === "hsp"
                ? "Les mer om å være hovedsponsor"
                : "";

    return (
        <main
            className={[
                "md:max-w-[1360px]",
                "mt-[205px] md:mb-[116px]",
                "px-4 md:px-2",
                "text-justify text-lg font-normal font-mono leading-8 tracking-wide",
                "text-text-color",
                "mx-auto pb-64 md:pb-0 justify-items-center",
            ].join(" ")}
        >
            {/* Bedriftside info (topptekst) */}
            <div
                className={[
                    "w-full md:max-w-[1107px]",
                    "text-justify text-lg font-normal font-mono leading-8",
                    "tracking-wide prose justify-center",
                ].join(" ")}
            >
                <ReactMarkdown>{bedriftPageInfo}</ReactMarkdown>
            </div>

            {/* Infokort */}
            <div
                className={[
                    "w-full md:min-h-[787px]",
                    "mt-16 mb-16 md:mt-40 md:mb-[118px]",
                    "gap-10 md:gap-[41px]",
                    "flex flex-col md:flex-row justify-center",
                ].join(" ")}
            >
                <PageCard
                    title="Stå på stand"
                    infoText={standInfo}
                    onOpen={() => openOverlay("stand")}
                    applyLink={null}
                    widthClass="w-full md:w-[659px]"
                />

                <PageCard
                    title="Hovedsponsor"
                    infoText={hspInfo}
                    onOpen={() => openOverlay("hsp")}
                    applyLink={null}
                    widthClass="w-full md:w-[659px]"
                />
            </div>

            {/* Overlay */}
            <PageOverlay open={overlay !== null} onClose={closeOverlay} maxWidthClass="max-w-[1107px]" historyKey="__bedriftOverlay">
                <div className="max-w-[1107px] mx-auto px-4 md:px-0">
                    <div className="text-center text-4xl font-bold font-mono uppercase leading-10 tracking-widest mb-16 wrap-break-word">
                        {overlayTitle}
                    </div>

                    {/* STAND overlay */}
                    {overlay === "stand" && (
                        <div className="md:max-w-[1002px] mx-auto justify-items-center">
                            {/* Infotekst */}
                            <div className="text-left md:text-justify mr-auto">
                                <div className="md:min-h-[156px]">
                                    <span className="text-lg font-bold font-mono leading-8 tracking-wide">
                                        STANDPLASSTYPER
                                        <br />
                                    </span>
                                    <span className="text-lg font-normal font-mono leading-8 tracking-wide">
                                        På Ettermiddagen@ifi har vi kun standard plasser.
                                        <br />
                                        På Dagen@ifi tilbyr vi standard standplasser og sponsorplasser.
                                    </span>
                                </div>
                            </div>

                            {/* Kort */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-[64.6px] justify-items-center mt-10">

                                {/* Standard */}
                                <div className="max-w-[360px] flex flex-col items-start">
                                    <OverlayCard
                                        title="Standard"
                                        frameClass="md:min-h-[474px]"
                                        bodyClass="px-4 pb-5 text-sm tracking-wide leading-7 justify-start"
                                        children={<Checklist items={standardStand} />}
                                    />
                                    <div className="px-1 text-[10px] font-mono leading-5 tracking-wide">
                                        *Rom for speedintervju kan legges til mot et tillegg
                                    </div>
                                </div>

                                {/* Sponsor */}
                                <div className="max-w-[360px]">
                                    <OverlayCard
                                        title="Sponsor"
                                        frameClass="md:min-h-[474px]"
                                        bodyClass="px-4 pb-5 text-sm tracking-wide leading-7 justify-start"
                                        children={<Checklist items={sponsorStand} />}
                                    />
                                </div>
                            </div>

                            {/* Priser - liste */}
                            <div className="mt-16 w-full">
                                {/* Tittel */}
                                <div
                                    className={[
                                        "mx-auto",
                                        "px-4 md:px-0 md:py-[7px]",
                                        "text-left text-lg font-bold font-mono",
                                    ].join(" ")}
                                >
                                    PRISER*
                                </div>

                                {/* Ettermiddagen */}
                                {first && (
                                    <div className="mb-[31px] w-full mx-auto px-4 md:px-0">
                                        <div className="grid grid-cols-[2fr_1fr]">
                                            <PriceRow label={first.label} price={first.price} />
                                        </div>
                                    </div>
                                )}

                                {/* Dagen */}
                                <div className="w-full mx-auto px-4 md:px-0">
                                    {rest.map((row) => (
                                        <div key={row.label} className="grid grid-cols-[2fr_1fr]">
                                            <PriceRow label={row.label} price={row.price} />
                                        </div>
                                    ))}
                                </div>

                                {/* Fotnote */}
                                <div className="mt-[31px] w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-auto md:px-0 text-left text-xs md:text-lg font-mono">
                                    *Priser kan variere fra år til år, eller etter avtale.
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="mt-16 max-w-[979px] mr-auto text-left md:text-justify text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide prose">
                                <ReactMarkdown
                                    components={{
                                        h3: ({ node, ...props }) => (
                                            <h3 className="m-0 font-bold tracking-widest uppercase" {...props} />
                                        ),
                                        p: ({ node, ...props }) => <p className="m-0 mb-10" {...props} />,
                                        a: ({ node, ...props }) => (
                                            <a className="underline hover:opacity-80 text-text-link" {...props} />
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
                        <div className="max-w-[1002px] mx-auto justify-items-center">
                            {/* hsp_extended */}
                            <div className="mr-auto text-left md:text-justify text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide word-break prose">
                                <ReactMarkdown components={mdComponents}>{hspExtended}</ReactMarkdown>
                            </div>

                            {/* kort */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-[64.6px] justify-items-center mt-10">
                                <OverlayCard
                                    title="Sponsor"
                                    frameClass="max-w-[360px]"
                                    bodyClass="px-4 pb-5 text-sm tracking-wide leading-7 justify-start"
                                    children={<Checklist items={hspSponsor} />}
                                />
                                <OverlayCard
                                    title="Hovedsponsor"
                                    frameClass="max-w-[360px]"
                                    bodyClass="px-4 pb-5 text-sm tracking-wide leading-7 justify-start"
                                    children={<Checklist items={hspHsp} />}
                                    />

                            </div>

                            {/* info-tekst */}
                            <div className="mt-16 mr-auto text-left md:text-justify text-sm md:text-lg font-mono leading-6 md:leading-8 tracking-wide prose">
                                <ReactMarkdown components={mdComponents}>{hspInfoText}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </PageOverlay>

        </main>
    );
}

export function getStaticProps() {
    const bedriftPageInfo = getMarkdownContent("bedrift/bedrift_page_info");
    const standInfo = getMarkdownContent("bedrift/stand_info");
    const hspInfo = getMarkdownContent("bedrift/hsp_info");

    const standardStand = getCsvContent<{ checked: string; text: string }>("bedrift/stand/standard_stand_card");
    const sponsorStand = getCsvContent<{ checked: string; text: string }>("bedrift/stand/sponsor_stand_card");
    const standPrices = getCsvContent<PriceRow>("bedrift/stand/stand_prices_list");
    const standFaq = getMarkdownContent("bedrift/stand/stand_faq");

    const hspExtended = getMarkdownContent("bedrift/hsp/hsp_extended");
    const hspSponsor = getCsvContent<{ checked: string; text: string }>("bedrift/hsp/hsp_sponsor_card");
    const hspHsp = getCsvContent<{ checked: string; text: string }>("bedrift/hsp/hsp_hsp_card");
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
