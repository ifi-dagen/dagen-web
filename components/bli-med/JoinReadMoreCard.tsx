import ReactMarkdown from "react-markdown";

type CardVariant = "intern" | "styret";

type InternCardProps = {
    variant: CardVariant;
    title: string;
    cardText: string;
}

export default function JoinReadMoreCard({ variant, title, cardText }: InternCardProps) {
    // OBS! Må utvides hvis Funk skal ha egne kort!
    const container =
        variant === "intern"
            ? "w-[360px] h-auto md:h-[512px]"
            : "w-full md:w-[599px] h-auto md:h-[404px]";

    const titleBox =
        variant === "intern"
            ? "w-full px-6 py-6 md:px-0 md:py-0 md:w-[360px] md:left-0 md:top-[23px] relative md:absolute"
            : "w-full px-6 py-6 md:px-0 md:py-0 md:w-[599px] md:left-0 md:top-[23px] relative md:absolute";

    const bodyBox =
        variant === "intern"
            ? "w-full px-6 py-6 md:px-0 md:py-0 md:left-[29px] md:top-[96px] md:right-[29px] md:w-auto md:h-[386px] relative md:absolute"
            : "w-full px-6 py-6 md:px-0 md:py-0 md:left-[31px] md:top-[98px] md:w-[537px] md:h-[267px] relative md:absolute";

    if (!cardText) return;

    return (
        <div
            className={[
                container,
                "relative bg-overlay-card outline-1 -outline-offset-1 outline-black overflow-hidden",
            ].join(" ")}
        >
            <div
                className={[
                    titleBox,
                    "text-center justify-start text-black text-3xl font-bold",
                    "font-mono leading-8 tracking-wider",
                ].join(" ")}
            >
                {title}
            </div>

            <div
                className={[
                    bodyBox,
                    "justify-start text-black text-lg font-normal font-mono",
                    "leading-8 tracking-wide whitespace-pre-line",
                ].join(" ")}
            >
                <ReactMarkdown>{cardText}</ReactMarkdown>
            </div>
        </div>
    );
}