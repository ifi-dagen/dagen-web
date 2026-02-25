import { useRef, useState, useEffect } from "react";
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

type OverlayType = "stand" | "hovedsamarbeidspartner" | null;

const isOverlayType = (x: unknown): x is Exclude<OverlayType, null> =>
    x === "stand" || x === "hovedsamarbeidspartner";

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
                    "text-left text-sm md:text-lg font-bold hyphens-auto wrap-break-word",
                    "bg-background outline-1 outline-black",
                    "flex items-center",
                ].join(" ")}
            >
                <div>{label}</div>
            </div>

            <div
                className={[
                    "h-auto md:min-h-[84px]",
                    "text-sm md:text-lg font-bold",
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
            : overlay === "hovedsamarbeidspartner"
                ? "Les mer om å være hoved\u00ADsamarbeids\u00ADpartner"
                : "";

    return (
        <main
            className={[
                "md:max-w-[1360px]",
                "mt-[205px] md:mb-[116px]",
                "px-4 md:px-2",
                "text-lg font-normal leading-8 tracking-wide",
                "text-text-color",
                "mx-auto pb-64 md:pb-0 justify-items-center",
            ].join(" ")}
        >
            {/* Bedriftside info (topptekst) */}
            <div
                className={[
                    "w-full md:max-w-[1107px]",
                    "text-lg font-normal leading-8",
                    "tracking-wide prose justify-center",
                ].join(" ")}
            >
                <p>
                    Vil din bedrift være med på laget? Velkommen til en av Oslos største karrieredag innen IT - den beste mulighetene for å rekruttere informatikere fra UiO!
                </p>
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
                    infoText={
                        <div>
                            <p>Besøk oss på Ole-Johan Dahls hus, og hils på studentene! </p>
                            <p>Bedriften din vil få en standplass med bord og plass til deres egen roll-up mm.
                                Utover det er det opp til dere hva dere gjør med standen - slipp kreativiten
                                løs! Tidligere har vi hatt soft-is, mini kafé med espressomaskin og donuts,
                                lykkehjul med premier, et program der studentene kunne tegne et bilde som ble
                                til en figur i et dataspill, og mer!</p>
                            <p>Velkommen til stand på Ettermiddagen@ifi, Dagen@ifi eller begge!</p>
                        </div>
                    }
                    onOpen={() => openOverlay("stand")}
                    applyLink={null}
                    widthClass="w-full md:w-[659px]"
                />

                <PageCard
                    title={"Hoved\u00ADsamarbeids\u00ADpartner"}
                    infoText={
                    <div>
                        <p>AKA “HSP”</p>
                        <p>Som hovedsamarbeidspartner vil dere få en unik mulighet til å komme tett på
                            engasjerte informatikkstudenter gjennom hele året, både under karrieredagene og
                            gjennom andre arrangementer på Institutt for Informatikk.
                        </p>
                        <p>Bli studentenes snakkis, for vi vet at samarbeidspartneren blir den bedriften
                            som får mest synlighet for våre studenter.</p>
                        <p>Søknaden for HSP 2027 åpner i høst.</p>
                    </div>
                    }
                    onOpen={() => openOverlay("hovedsamarbeidspartner")}
                    applyLink={null}
                    widthClass="w-full md:w-[659px]"
                />
            </div>

            {/* Overlay */}
            <PageOverlay open={overlay !== null} onClose={closeOverlay} maxWidthClass="max-w-[1107px]">
                <div className="max-w-[1107px] mx-auto px-4 md:px-0">
                    <div className="text-center text-4xl font-bold uppercase leading-10 tracking-widest mb-16 wrap-break-word">
                        {overlayTitle}
                    </div>

                    {/* STAND overlay */}
                    {overlay === "stand" && (
                        <div className="md:max-w-[1002px] mx-auto justify-items-center">
                            {/* Infotekst */}
                            <div className="text-left mr-auto">
                                <div className="md:min-h-[156px]">
                                    <span className="text-lg font-bold leading-8 tracking-wide">
                                        STANDPLASSTYPER
                                        <br />
                                    </span>
                                    <span className="text-lg font-normal leading-8 tracking-wide">
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
                                    <div className="px-1 text-[10px] leading-5 tracking-wide">
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
                                        "text-left text-lg font-bold",
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
                                <div className="mt-[31px] w-full max-w-[400px] mx-auto px-4 md:max-w-none md:w-auto md:px-0 text-left text-xs md:text-lg">
                                    *Priser kan variere fra år til år, eller etter avtale.
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="mt-16 max-w-[979px] mr-auto text-sm md:text-lg leading-6 md:leading-8 tracking-wide prose">
                                <ReactMarkdown
                                    components={{
                                        h3: ({ node, ...props }) => (
                                            <h3 className="m-0 font-bold tracking-widest text-left! uppercase" {...props} />
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
                    {overlay === "hovedsamarbeidspartner" && (
                        <div className="max-w-[1002px] mx-auto justify-items-center">
                            {/* hsp_extended */}
                            <div className="mr-auto text-left text-sm md:text-lg leading-6 md:leading-8 tracking-wide word-break prose">
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
                                    title={"Hoved\u00ADsamarbeids\u00ADpartner"}
                                    frameClass="max-w-[360px]"
                                    bodyClass="px-4 pb-5 text-sm tracking-wide leading-7 justify-start"
                                    children={<Checklist items={hspHsp} />}
                                />

                            </div>

                            {/* info-tekst */}
                            <div className="mt-16 mr-auto text-left text-sm md:text-lg leading-6 md:leading-8 tracking-wide prose">
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
