import Image from "next/image";
import checkedIcon from "@/components/icons/checked_icon.svg";
import uncheckedIcon from "@/components/icons/unchecked_icon.svg";

type CardLayout = "fixed" | "fluid";

type BedriftOverlayCardProps = {
    title: string;
    bodyList: string;
    isStandard?: boolean;
    layout?: CardLayout;
};

function parseDashList(md: string): string[] {
    return md
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^-+\s*/, ""));
}

export default function BedriftOverlayCard({
    title,
    bodyList,
    isStandard = false,
    layout = "fixed",
}: BedriftOverlayCardProps) {
    const items = parseDashList(bodyList);
    const isFixed = layout === "fixed";

    return (
        <div
            className={[
                "w-full md:w-[360px] relative bg-background",
                "outline-1 -outline-offset-1 outline-black",
                "font-mono font-normal text-text-color",
                isFixed ? "md:h-[474px]" : "md:h-auto",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    isFixed ? "md:w-[322px] md:left-[18.75px] md:top-[16.5px] md:absolute" : "md:pt-[16.5px]",
                    "text-center text-3xl tracking-wider leading-6",
                    "pt-6 md:pt-0",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Liste */}
            <div
                className={[
                    isFixed
                        ? "md:w-[325.75px] md:h-[388.25px] md:top-[69.5px] md:absolute"
                        : "md:w-[325.75px] md:mt-8",
                    "text-sm tracking-wide leading-6",
                    "px-4 pb-4 mt-6 md:mt-0",
                ].join(" ")}
            >
                <ul className="m-0 list-none p-0 space-y-2">
                    {items.map((text, idx) => {
                        const checked = !isStandard || idx < 5; 

                        return (
                            <li key={`${idx}-${text}`} className="flex items-start gap-6">
                                <Image
                                    src={checked ? checkedIcon : uncheckedIcon}
                                    alt={checked ? "Valgt" : "Ikke valgt"}
                                    width={14}
                                    height={14}
                                    className="mt-1 shrink-0"
                                />
                                <span className="text-left wrap-break-word">{text}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
