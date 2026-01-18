import React, { useEffect, useRef, useState } from "react";
import { buttonClasses } from "./buttons/buttonStyles";

type OverlayShellProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass: string;
  historyKey: string;
};

export default function OverlayShell({
  open,
  onClose,
  children,
  maxWidthClass,
  historyKey,
}: OverlayShellProps) {
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
      window.history.pushState({ [historyKey]: true }, "");
      pushedRef.current = true;
      return;
    }

    if (mounted) setAnim("out");
  }, [open, mounted, historyKey]);

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

      window.setTimeout(() => {
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
      <div
        onAnimationEnd={onPanelAnimationEnd}
        className={[
          "absolute inset-0 bg-card-bg flex flex-col",
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
                className={buttonClasses([
                  "pointer-events-auto",
                  "w-20",
                ].join(" "))}
              >
                X
              </button>
            </div>
          </div>
        </div>

        {/* Innhold */}
        <div className="flex-1 overflow-y-auto">
          <div className={[maxWidthClass, "mx-auto px-6 pt-32 pb-20"].join(" ")}>
            {latchedChildren}
          </div>
        </div>
      </div>
    </div>
  );
}
