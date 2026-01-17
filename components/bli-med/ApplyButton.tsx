import Link from "next/link";
import Image from "next/image";
import rightArrow from "@/components/icons/rightArrow.svg";

export default function ApplyButton({ href }: { href: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex">
            <div
                className={[
                    "w-28 h-14",
                    "bg-(--primary)",
                    "rounded-[53.41px]",
                    "outline-[1px] outline-offset-[-0.53px] outline-black",
                    "overflow-hidden",
                    "flex items-center justify-center",
                    "text-black text-lg font-normal font-mono leading-8 tracking-wide",
                    "gap-4",
                ].join(" ")}
            >
                <span className="leading-none">Søk</span>
                <Image
                    src={rightArrow}
                    alt=""
                    width={10}
                    height={10}
                    priority />
            </div>
        </Link>
    );
}
