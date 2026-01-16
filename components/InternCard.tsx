import ReactMarkdown from "react-markdown";

type InternCardProps = {
    title: string;
    cardText: string;
}

export default function InternCard({ title, cardText }: InternCardProps) {
    return (
        <div className={[
            "w-96 h-[512px] relative bg-(--primary) outline-1 -outline-offset-1",
            "outline-black overflow-hidden",
        ].join(" ")}
        >
            <div className={[
                "w-96 left-0 top-[23px] absolute text-center justify-start",
                "text-black text-3xl font-bold font-['Roboto_Mono']",
                "leading-8 tracking-wider",
            ].join(" ")}
            >
                {title}
            </div>
            <div className={[
                "w-72 h-96 left-[29px] top-24 absolute justify-start",
                "text-black text-lg font-normal font-['Roboto_Mono']",
                "leading-8 tracking-wide",
            ].join(" ")}
            >
                {cardText}
            </div>
        </div>
    )
}








