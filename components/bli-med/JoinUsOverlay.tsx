import React, { useEffect, useRef, useState } from "react";

type OverlayProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const DURATION_MS = 500;

export default function JoinUsOverlay({ open, onClose, children }: OverlayProps) {
    const [mounted, setMounted] = useState(open);
    const [anim, setAnim] = useState<"in" | "out">(open ? "in" : "out");
    const [latchedChildren, setLatchedChildren] = useState<React.ReactNode>(children);
    const pushedRef = useRef(false);
    const closingViaHistory = useRef(false);

    useEffect(() => {
        if (open) setLatchedChildren(children);
    }, [open, children]);

    // Animert inn - lagrer til historikk for "back"-knapp
    useEffect(() => {
        if (open) {
            setMounted(true);
            setAnim("in");
            window.history.pushState({ __joinUsOverlay: true }, "");
            pushedRef.current = true;
            return;
        }

        if (mounted) setAnim("out");
    }, [open, mounted]);

    // Lukker overlay når "back"-knapp brukes
    useEffect(() => {
        if (!mounted) return;

        const onPopState = () => {
            if (!pushedRef.current) return;

            closingViaHistory.current = true;
            pushedRef.current = false;
            onClose();

            setTimeout(() => (closingViaHistory.current = false), 0);
        };

        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, [mounted, onClose]);

    // ESC + scroll-lock for siden bak overlay
    useEffect(() => {
        if (!mounted) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", onKeyDown);

        const html = document.documentElement;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyPaddingRight = document.body.style.paddingRight;

        // Kompenser for scrollbar som forsvinner (hindrer “hopp”)
        const scrollbarWidth = window.innerWidth - html.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        html.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            html.style.overflow = prevHtmlOverflow;
            document.body.style.paddingRight = prevBodyPaddingRight;
        };
    }, [mounted]);


    const handleClose = () => {
        if (pushedRef.current && !closingViaHistory.current) {
            closingViaHistory.current = true;

            const t = window.setTimeout(() => {
                if (pushedRef.current) {
                    pushedRef.current = false;
                    closingViaHistory.current = false;
                    onClose();
                }
            }, 50);

            window.history.back();
            return;
        }

        onClose();
    };

    const onPanelAnimationEnd = () => {
        if (anim === "out") setMounted(false);
    };

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                onAnimationEnd={onPanelAnimationEnd}
                className={[
                    "absolute inset-0 bg-(--card-bg) flex flex-col",
                    "transform-gpu will-change-transform",
                    anim === "in" ? "slide-in" : "slide-out",
                ].join(" ")}
            >
                {/* Header med close-knapp */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
                    <div className="max-w-[1304px] mx-auto px-6 pt-16">
                        <div className="flex justify-end">
                            <button
                                onClick={handleClose}
                                type="button"
                                aria-label="Lukk"
                                className={[
                                    "pointer-events-auto",
                                    "w-20 h-14 rounded-[53.41px] bg-(--primary)",
                                    "border border-black",
                                    "flex items-center justify-center",
                                    "text-black text-lg font-normal font-mono tracking-wide",
                                ].join(" ")}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>

                {/* Title og tekst (+ søk-knapp når aktiv og kort for styret/interne) */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-[1304px] mx-auto px-6 pt-32 pb-20">
                        {latchedChildren}
                    </div>
                </div>
            </div>
        </div>
    );
}