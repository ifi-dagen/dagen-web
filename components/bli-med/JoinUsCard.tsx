import Image from "next/image";
import ReactMarkdown from "react-markdown";
import downArrow from "@/components/icons/downArrow.svg";
import ApplyButton from "./ApplyButton";

type JoinUsCardProps = {
    title: string;
    infoText: string;
    onOpen: () => void;
    applyLink: string | null;
};

export default function JoinUsCard({ title, infoText, onOpen, applyLink }: JoinUsCardProps) {
    return (
        <div
            className={[
                "w-[360px] md:w-96 h-auto md:h-[602px]",
                "relative bg-(--card-bg) outline-1 -outline-offset-1 outline-black overflow-hidden",
                "px-6 py-6 md:px-0 md:py-0",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    "text-center text-black text-4xl font-normal font-mono leading-8 tracking-widest",
                    "md:absolute md:left-0 md:top-[34px] md:w-96",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Tekst */}
            <div
                className={[
                    "mt-8 text-justify text-black text-lg font-normal font-mono leading-8 tracking-wide",
                    "[&>p]:m-0",
                    "md:absolute md:top-[86px] md:left-[39px] md:right-[39px] md:h-96 md:mt-0",
                ].join(" ")}
            >
                <div className="whitespace-pre-line leading-loose">
                    <ReactMarkdown>{infoText}</ReactMarkdown>
                </div>
            </div>

            {/* Knapper */}
            <div className="mt-10 flex items-center justify-between md:mt-0 md:static">
                {/* Les mer */}
                <button
                    onClick={onOpen}
                    type="button"
                    className="md:absolute md:left-[35px] md:top-[506px]"
                >
                    <div className={[
                        "w-40 h-14 bg-(--primary) rounded-[53.41px]",
                        "outline-[1px] outline-offset-[-0.53px] outline-black",
                        "overflow-hidden flex items-center justify-center gap-3 font-mono",
                        "text-lg text-black tracking-wide",
                    ].join(" ")}>
                        <span className="leading-none">Les mer</span>
                        <Image src={downArrow} alt="" width={16} height={8} priority />
                    </div>
                </button>

                {/* Søk */}
                {applyLink && (
                    <div className="md:absolute md:right-[35px] md:top-[506px]">
                        <ApplyButton href={applyLink} />
                    </div>
                )}
            </div>

        </div>
    );
}
