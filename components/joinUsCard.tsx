import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import downArrow from "@/components/icons/downArrow.svg"
import rightArrow from "@/components/icons/rightArrow.svg"


type JoinUsCardProps = {
    title: string;
    infoText: string;
    popupLink: string;
    applyLink?: string;
};

export default function JoinUsCard({ title, infoText, popupLink, applyLink }: JoinUsCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={[
            "w-96 h-[602px] relative bg-(--card-bg) outline-1 -outline-offset-1",
            "outline-black overflow-hidden",
        ].join(" ")}
        >
            <div className={[
                "w-96 left-0 top-[34px] absolute text-center justify-center",
                "text-black text-4xl font-normal font-['Roboto_Mono']",
                "leading-8 tracking-widest",
            ].join(" ")}
            >
                {title}
            </div>
            <div className={[
                "w-80 h-96 left-[39px] top-[86px] absolute text-justify",
                "justify-start text-black text-lg font-normal",
                "font-['Roboto_Mono'] leading-8 tracking-wide"
            ].join(" ")}
            >
                <div className="whitespace-pre-line leading-loose">
                    <ReactMarkdown>
                        {infoText}
                    </ReactMarkdown>
                </div>

            </div>
            <Link href={popupLink} className="absolute left-[35px] top-[506px]">
                <div
                    className={[
                        "w-40 h-14",
                        "bg-(--primary)",
                        "rounded-full",
                        "border border-black",
                        "flex items-center justify-center gap-3",
                        "font-['Roboto_Mono'] text-lg text-black",
                        "tracking-wide",
                    ].join(" ")}
                >
                    <span className="leading-none">Les mer</span>

                    <Image
                        src={downArrow}
                        alt=""
                        width={16}
                        height={8}
                        className="block"
                        priority
                    />
                </div>
            </Link>
            {applyLink && (
                <Link href={applyLink} className="absolute left-[246px] top-[506px]">
                    <div
                        className={[
                            "w-28 h-14",
                            "bg-(--primary)",
                            "rounded-full",
                            "border border-black",
                            "flex items-center justify-center gap-4",
                            "font-['Roboto_Mono'] text-lg text-black",
                            "tracking-wide",
                        ].join(" ")}
                    >
                        <span className="leading-none">Søk</span>

                        <Image
                            src={rightArrow}
                            alt=""
                            width={10}
                            height={10}
                            className="block"
                            priority
                        />
                    </div>
                </Link>

            )}
        </div>
    )
}