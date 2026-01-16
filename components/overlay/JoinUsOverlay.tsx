import { useEffect } from "react";

type OverlayProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    overlayText: string;
    children: React.ReactNode;
};

export default function JoinUsOverlay({ open, onClose, title, overlayText, children }: OverlayProps) {
    useEffect(() => {
        if (!open) return;

        // ESC lukker
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);

        // Lås scroll på siden bak (overlay scroller fortsatt)
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-9999">
            {/* backdrop (klikk utenfor lukker) */}
            <button
                className="absolute inset-0 bg-(--primary)"
                onClick={onClose}
                aria-label="Lukk"
                type="button"
            />

            {/* overlay-flate */}
            <div className="absolute inset-0 bg-background flex flex-col">
                {/* sticky header med kun tilbake/close */}
                <div className="sticky top-0 z-10 bg-slate-50">
                    <div className="max-w-[1304px] mx-auto px-6 h-16 flex items-center">
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Tilbake"
                            className={[
                                "h-11 w-11 rounded-full bg-black/70 text-white",
                                "flex items-center justify-center",
                            ].join(" ")}
                        >
                            X
                        </button>
                    </div>
                </div>

                {/* scrollbart innhold */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-[1304px] mx-auto px-6 py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}