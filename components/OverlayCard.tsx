import React from "react";

type OverlayCardProps = {
    title: string;
    children: React.ReactNode;
    frameClass?: string;
    titleClass?: string;
    bodyClass?: string;
};

export default function OverlayCard({
    title,
    children,
    frameClass,
    bodyClass,
}: OverlayCardProps) {
    if (!children) return;

    return (
        <div
            className={[
                "relative bg-overlay-card outline outline-card-outline overflow-hidden",
                "text-text-color font-normal",
                frameClass,
            ].join(" ")}
        >
            <div
                className={[
                    "px-6 py-6",
                    "text-center text-3xl font-mono font-bold leading-8 tracking-wider",
                ].join(" ")}
            >
                {title}
            </div>

            <div className={[bodyClass].join(" ")}>{children}</div>
        </div>
    );
}