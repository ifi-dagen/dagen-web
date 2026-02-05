import ReactMarkdown from "react-markdown";
import ApplyButton from "./buttons/ApplyButton";
import ReadMoreButton from "./buttons/ReadMoreButton";

type JoinUsCardProps = {
    title: string;
    infoText: string;
    onOpen: () => void;
    applyLink: string | null;
    widthClass: string;
};

export default function PageCard({ title, infoText, onOpen, applyLink, widthClass }: JoinUsCardProps) {
    return (
        <div
            className={[
                //"w-[360px] md:w-96",
                widthClass, "flex flex-col",    
                "bg-card-bg outline outline-card-outline overflow-hidden",
                "px-6 py-6 text-text-color mx-auto justify-items-center",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    "flex justify-center",
                    "w-full min-w-0",
                    "text-4xl font-normal font-mono leading-8 tracking-widest",
                    "md:mt-[34px]",
                    "text-center",
                    "hyphens-auto wrap-anywhere",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Tekst */}
            <div
                className={[
                    "flex justify-center flex-1",
                    "mt-8 text-lg font-normal font-mono leading-8 tracking-wide",
                    "[&>p]:m-0 hyphens-auto",
                    "md:min-h-96 md:mt-[86px] px-4",
                ].join(" ")}
            >
                <div className="leading-loose prose">
                    <ReactMarkdown>{infoText}</ReactMarkdown>
                </div>
            </div>

            {/* Knapper */}
            <div className="mt-10 mb-8 flex flex-wrap gap-4 md:gap-2 w-full items-center px-6">

                {/* Les mer */}
                <ReadMoreButton onClick={onOpen} />
                
                {/* Søk */}
                <div className="lg:ml-auto w-full md:w-auto">
                    {applyLink && <ApplyButton href={applyLink} />}
                </div>
            </div>
        </div>
    );
}
