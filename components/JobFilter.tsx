// Nedtrekksmeny for å filtrere stillingsannonser på stillingstype

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { buttonClasses } from "./buttons/buttonStyles";
import downArrow from "./icons/downArrow.svg";

// Verdien som betyr "ikke filtrer" - er valgt som standard
export const ALL_JOB_TYPES = "Alle";

type JobFilterProps = {
    stillingstyper: string[];
    valgtStillingstype: string;
    onVelgStillingstype: (stillingstype: string) => void;
};

export default function JobFilter({
    stillingstyper,
    valgtStillingstype,
    onVelgStillingstype,
}: JobFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // useId gir unikt navn på radiogruppen, slik at flere filtre ikke kolliderer
    const radioGroupName = useId();
    const panelId = `${radioGroupName}-panel`;

    // Lukk menyen ved klikk utenfor eller Escape
    useEffect(() => {
        if (!isOpen) return;

        const closeOnOutsideClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    // "Alle" ligger alltid øverst, deretter stillingstypene fra annonsene
    const alternativer = [ALL_JOB_TYPES, ...stillingstyper];
    const erFiltrert = valgtStillingstype !== ALL_JOB_TYPES;

    return (
        <div ref={containerRef} className="relative">

            {/* Knappen som åpner og lukker menyen */}
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls={panelId}
                className={buttonClasses("max-w-full")}
            >
                <span className="truncate">
                    {erFiltrert ? `Filter: ${valgtStillingstype}` : "Filter"}
                </span>

                <Image
                    src={downArrow}
                    alt=""
                    width={20}
                    height={20}
                    className={[
                        "shrink-0 transition-transform",
                        isOpen ? "rotate-180" : "",
                    ].join(" ")}
                />
            </button>

            {/* Selve menyen */}
            {isOpen && (
                <div
                    id={panelId}
                    role="radiogroup"
                    aria-label="Filtrer på stillingstype"
                    className={[
                        "absolute left-0 top-full z-30 mt-2",
                        "min-w-full w-max max-w-[280px]",
                        "flex flex-col",
                        "px-5 py-3",
                        "rounded-3xl border border-card-outline bg-card-bg",
                        "font-mono text-lg tracking-wide text-text-color",
                    ].join(" ")}
                >
                    {alternativer.map((alternativ) => {
                        const isSelected = alternativ === valgtStillingstype;

                        return (
                            <label
                                key={alternativ}
                                className="flex cursor-pointer items-center gap-3 py-2"
                            >
                                {/* Skjult native radio - beholder tastatur og skjermleser */}
                                <input
                                    type="radio"
                                    name={radioGroupName}
                                    value={alternativ}
                                    checked={isSelected}
                                    onChange={() => {
                                        onVelgStillingstype(alternativ);
                                        setIsOpen(false);
                                    }}
                                    className="sr-only peer"
                                />

                                {/* Radioknappen slik den vises */}
                                <span
                                    aria-hidden
                                    className={[
                                        "flex h-5 w-5 shrink-0 items-center justify-center",
                                        "rounded-full border border-button-outline bg-background",
                                        "peer-focus-visible:outline peer-focus-visible:outline-2",
                                        "peer-focus-visible:outline-offset-2",
                                    ].join(" ")}
                                >
                                    {isSelected && (
                                        <span className="h-2.5 w-2.5 rounded-full bg-button-outline" />
                                    )}
                                </span>

                                <span className="truncate">{alternativ}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
