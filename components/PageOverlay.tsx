import React, { useEffect, useState } from "react";
import { buttonClasses } from "./buttons/buttonStyles";

type OverlayShellProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass: string;
};

export default function PageOverlay({
  open,
  onClose,
  children,
  maxWidthClass,
}: OverlayShellProps) {
  const [mounted, setMounted] = useState(open);
  const [anim, setAnim] = useState<"in" | "out">(open ? "in" : "out");
  const [latchedChildren, setLatchedChildren] = useState<React.ReactNode>(children);

  useEffect(() => {
    if (open) setLatchedChildren(children);
  }, [open, children]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnim("in");
    } else if (mounted) {
      setAnim("out");
    }
  }, [open, mounted]);

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

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [mounted]);

  const handleClose = () => {
    onClose();
  };


  const onPanelAnimationEnd = () => {
    if (anim === "out") setMounted(false);
  };

  if (!mounted) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 backdrop-blur-[2px] bg-slate-800/30"
      onMouseDown={handleClose}
    >
      {/* Panel */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onAnimationEnd={onPanelAnimationEnd}
        className={[
          "absolute inset-0 max-w-5xl mx-auto mt-36",
          "bg-card-bg flex flex-col",
          "transform-gpu will-change-transform",
          anim === "in" ? "slide-in" : "slide-out",
        ].join(" ")}
      >
        {/* Header med close-knapp */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className={[maxWidthClass, "mx-auto px-6 pt-16"].join(" ")}>
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                type="button"
                aria-label="Lukk"
                className={buttonClasses(["pointer-events-auto", "w-20"].join(" "))}
              >
                X
              </button>
            </div>
          </div>
        </div>

        {/* Innhold */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className={[maxWidthClass, "mx-auto px-6 pt-32 pb-20"].join(" ")}>
            {latchedChildren}
          </div>
        </div>
      </div>
    </div>
  );
}
