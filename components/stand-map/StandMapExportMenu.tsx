import { RefObject, useEffect, useRef, useState } from "react";

import { StandMapViewBox } from "./standMapData";
import {
  downloadStandMapPng,
  downloadStandMapSvg,
  printStandMapOnThreeA3Pages,
} from "./standMapExport";

type ExportType = "svg" | "png" | "print";

type StandMapExportMenuProps = {
  svgRef: RefObject<SVGSVGElement | null>;
  viewBox: StandMapViewBox;
  eventName: string;
  eventYear: number;
};

const options: Array<{
  type: ExportType;
  title: string;
  description: string;
}> = [
  {
    type: "svg",
    title: "SVG",
    description: "Vektorfil for design og fri skalering",
  },
  {
    type: "png",
    title: "PNG",
    description: "Høy oppløsning for mobil og deling",
  },
  {
    type: "print",
    title: "PDF / utskrift · 3 × A3",
    description: "Skriv ut tre ark eller velg «Lagre som PDF»",
  },
];

export default function StandMapExportMenu({
  svgRef,
  viewBox,
  eventName,
  eventYear,
}: StandMapExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState<ExportType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const filenameBase = `${eventName.toLowerCase()}-ifi-standkart-${eventYear}`;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const exportMap = async (type: ExportType) => {
    const svg = svgRef.current;
    if (!svg || busy) return;

    setBusy(type);
    setError(null);
    try {
      if (type === "svg") {
        await downloadStandMapSvg(svg, viewBox, `${filenameBase}.svg`);
      } else if (type === "png") {
        await downloadStandMapPng(svg, viewBox, `${filenameBase}.png`);
      } else {
        await printStandMapOnThreeA3Pages(
          svg,
          viewBox,
          `${eventName}@IFI ${eventYear}`
        );
      }
      setIsOpen(false);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Eksporten mislyktes. Prøv igjen."
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setError(null);
          setIsOpen((open) => !open);
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-button-outline bg-background px-4 font-mono text-sm transition-colors hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dagen-color"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
        </svg>
        Eksporter
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Velg eksportformat"
          className="absolute left-0 top-full z-40 mt-2 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-card-outline bg-background p-2 shadow-lg sm:left-auto sm:right-0"
        >
          {options.map((option) => (
            <button
              key={option.type}
              type="button"
              role="menuitem"
              disabled={busy !== null}
              onClick={() => exportMap(option.type)}
              className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-dagen-color disabled:cursor-wait disabled:opacity-60"
            >
              <span className="min-w-12 rounded-md bg-primary px-2 py-1 text-center font-mono text-xs font-bold text-dagen-color">
                {option.type === "print" ? "A3" : option.title}
              </span>
              <span>
                <span className="block font-mono text-sm font-bold">
                  {busy === option.type ? "Forbereder …" : option.title}
                </span>
                <span className="mt-0.5 block font-sans text-xs leading-5 text-text-color">
                  {option.description}
                </span>
              </span>
            </button>
          ))}
          {error && (
            <p role="alert" className="m-2 font-sans text-xs text-red-700">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
