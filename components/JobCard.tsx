
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { buttonClasses } from "./buttons/buttonStyles";
import downArrow from "./icons/downArrow.svg";
import rightArrow from "./icons/rightArrow.svg";

type JobCardProps = {
    tittel: string;
    stillingstype: string;
    firma: string;
    frist: string;
    url: string;
    logo?: string;
    beskrivelse: string;
    scale?: number;
    minCardHeightPx?: number;
};

function formatDate(date: string) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

export default function JobCard({
    tittel,
    stillingstype,
    firma,
    frist,
    url,
    logo,
    beskrivelse,
    scale = 1,
    minCardHeightPx,
}: JobCardProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isClamped, setIsClamped] = useState(false);
    const inline = !isOpen && isClamped;

    const innerRef = useRef<HTMLDivElement>(null);
    const [scaledSize, setScaledSize] = useState<{ w: number; h: number; } | null>(null);

    useEffect(() => {
        if (!innerRef.current) return;

        const scaledContentEl = innerRef.current;

        const updateScaledLayoutSize = () => {
            setScaledSize({
                w: scaledContentEl.offsetWidth * scale,
                h: scaledContentEl.offsetHeight * scale,
            });
        };

        const resizeObserver = new ResizeObserver(updateScaledLayoutSize);
        resizeObserver.observe(scaledContentEl);
        updateScaledLayoutSize();

        return () => resizeObserver.disconnect();
    }, [scale, isOpen, beskrivelse]);

    useEffect(() => {
        if (!textRef.current) return;
        const el = textRef.current;

        if (!isOpen) {
            setIsClamped(el.scrollHeight > el.clientHeight + 1);
        }
    }, [beskrivelse, isOpen, scale]);


    const aria = `${stillingstype}, ${tittel} hos ${firma}, søknadsfrist ${formatDate(frist)}. ${beskrivelse}`;

    return (
        <div
            className="relative"
            style={{
                width: scaledSize?.w ?? "auto",
                height: scaledSize?.h ?? "auto",
            }}
        >
            <div
                ref={innerRef}
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `scale(${scale})` }}
            >
                <article
                    className={[
                        "bg-card-bg",
                        "border border-card-outline",
                        "overflow-hidden",
                        "w-[994.91px]",
                    ].join(" ")}
                    style={minCardHeightPx ? { minHeight: `${minCardHeightPx}px` } : undefined}
                >
                    {/* TOPPDEL */}
                    <div className="px-16 pt-10 pb-8">
                        <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
                            {/* Venstre: type + info */}
                            <div>
                                {/* Url-knapp, viser stillingstype i tekst */}
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={aria}
                                    className={buttonClasses([
                                        "gap-3.5",
                                        "h-[77px] px-7",
                                        "text-[44.6px] leading-[1.2]",
                                    ].join(" "))}
                                >
                                    <span>{stillingstype}</span>

                                    <Image src={rightArrow} alt="" width={22} height={22} />
                                </Link>

                                {/* Info */}
                                <div className="mt-[18px] space-y-2.5 font-mono text-text-color">
                                    <p className="text-[23.14px] leading-[43.7px] m-0">
                                        {"Stilling: " + tittel}
                                    </p>
                                    <p className="text-[23.14px] leading-[43.7px] m-0">
                                        {"Bedrift: " + firma}
                                    </p>
                                    <p className="text-[23.14px] leading-[43.7px] m-0">
                                        {"Frist: " + formatDate(frist)}
                                    </p>
                                </div>
                            </div>

                            {/* Høyre: logo-boks */}
                            <div className="w-[267.08px] h-[267.08px]  bg-transparent p-4 flex items-center justify-center">
                                {logo ? (
                                    <Image
                                        src={`${router.basePath}/logos/${logo}`}
                                        alt=""
                                        width={257}
                                        height={257}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full" aria-hidden />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BUNNDEL */}
                    <div className="px-6 pt-6 pb-[22px] border-t border-card-outline">
                        <div className="flex flex-col items-end">
                            <div className="relative w-full">
                                <p
                                    ref={textRef}
                                    className={[
                                        "text-text-color",
                                        "text-[23.14px] leading-[43.7px]",
                                        "m-0",
                                        "text-justify",
                                        isOpen ? "" : "line-clamp-4",
                                        inline ? "pb-[43.7px]" : "",
                                    ].join(" ")}
                                >
                                    {beskrivelse}
                                </p>

                                {/* Mask clampet og lukket */}
                                {inline && (
                                    <>
                                        {/* Dekker hele nederste linje */}
                                        <div className="absolute left-0 right-0 bottom-0 h-[52px] bg-card-bg pointer-events-none z-0" />
                                        {/* Dekker over / bak knappen - solid */}
                                        <div className="absolute right-0 bottom-0 h-20 w-[230px] pointer-events-none z-0">
                                            <div className="absolute inset-0 bg-card-bg" />
                                            {/* Gradient fra bak knappen mot venstre */}
                                            <div className="absolute right-[220px] top-0 h-full w-[500px] bg-linear-to-l from-card-bg to-transparent" />
                                        </div>

                                    </>
                                )}

                                {/* Plassering: inline (absolute) ellers høyrejustert under */}
                                <div className={inline ? "" : "mt-3 flex justify-end"}>
                                    {(isOpen || isClamped) && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsOpen((v) => !v);
                                            }}
                                            className={buttonClasses([
                                                "h-[63.99px] px-[26px] w-[220px]",
                                                "font-normal text-[23.14px] leading-[43.7px]",
                                                "transition",

                                                inline ? "absolute right-0 bottom-0 z-20" : "",
                                            ].join(" "))}
                                            aria-label={isOpen ? "Vis mindre" : "Vis mer"}
                                        >
                                            <span>{isOpen ? "Vis mindre" : "Vis mer"}</span>
                                            <Image src={downArrow} alt="" width={20} height={20}
                                                className={[
                                                    "text-button-text transition-transform",
                                                    isOpen ? "rotate-180" : "",
                                                ].join(" ")}
                                            />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
