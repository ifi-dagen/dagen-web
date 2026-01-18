import ReactMarkdown from "react-markdown";
import ReadMoreButton from "@/components/buttons/ReadMoreButton";

type BedriftCardProps = {
    title: string;
    bodyMd: string;
    onOpen: () => void;
};

export default function BedriftCard({ title, bodyMd, onOpen }: BedriftCardProps) {
    return (
        <div
            className={[
                "w-full md:w-[659px] h-auto md:h-[787px] relative bg-card-bg",
                "outline-1 -outline-offset-1 outline-black",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    "md:w-[659px] md:left-0 md:top-[66px] md:absolute",
                    "text-center text-text-heading text-4xl font-normal font-mono",
                    "leading-[50px] tracking-widest wrap-break-word",
                    "py-8 md:py-0"
                ].join(" ")}
            >
                {title}
            </div>

            {/* Tekst */}
            <div
                className={[
                    "md:w-[581px] md:h-[491px] md:left-[39px] md:top-[148px] md:absolute",
                    "text-justify text-text-color text-lg font-normal font-mono",
                    "leading-8 tracking-wide mt-4 md:mt-0 px-4 md:px-0",
                    "[&>p]:m-0",
                ].join(" ")}
            >
                <div className="whitespace-pre-line">
                    <ReactMarkdown>{bodyMd}</ReactMarkdown>
                </div>
            </div>

            {/* Les mer */}
            <div className={[
                "md:absolute md:left-[39px] md:top-[692px]",
                "px-4 py-8 md:px-0 md:py-0",
            ].join(" ")}
            >
                <ReadMoreButton onClick={onOpen} />
            </div>
        </div>
    );
}
