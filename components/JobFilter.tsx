import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { buttonClasses } from "./buttons/buttonStyles";
import downArrow from "./icons/downArrow.svg";

export const ALL_JOB_TYPES = "Alle";

type JobFilterProps = {
    jobTypes: string[];
    selectedJobType: string;
    onSelectJobType: (jobType: string) => void;
};

function useDismissOnOutsideInteraction(
    containerRef: React.RefObject<HTMLElement | null>,
    isActive: boolean,
    onDismiss: () => void
) {
    useEffect(() => {
        if (!isActive) return;

        const onMouseDown = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) onDismiss();
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onDismiss();
        };

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [containerRef, isActive, onDismiss]);
}

export default function JobFilter({
    jobTypes,
    selectedJobType,
    onSelectJobType,
}: JobFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const radioGroupName = useId();
    const panelId = `${radioGroupName}-panel`;

    const close = useCallback(() => setIsOpen(false), []);
    useDismissOnOutsideInteraction(containerRef, isOpen, close);

    const options = [ALL_JOB_TYPES, ...jobTypes];
    const isFiltered = selectedJobType !== ALL_JOB_TYPES;

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls={panelId}
                className={buttonClasses("max-w-full")}
            >
                <span className="truncate">
                    {isFiltered ? `Filter: ${selectedJobType}` : "Filter"}
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
                    {options.map((option) => {
                        const isSelected = option === selectedJobType;

                        return (
                            <label
                                key={option}
                                className="flex cursor-pointer items-center gap-3 py-2"
                            >
                                <input
                                    type="radio"
                                    name={radioGroupName}
                                    value={option}
                                    checked={isSelected}
                                    onChange={() => {
                                        onSelectJobType(option);
                                        setIsOpen(false);
                                    }}
                                    className="sr-only peer"
                                />

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

                                <span className="truncate">{option}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
