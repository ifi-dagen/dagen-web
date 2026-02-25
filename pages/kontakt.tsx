import { buttonClasses } from "@/components/buttons/buttonStyles";
import { useMemo, useState } from "react";
import Image from "next/image";
import downArrow from "@/components/icons/downArrow.svg";
import Link from "next/link";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactUsPage() {
    const [contactType, setContactType] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const formId = useMemo(() => {
        if (contactType === "student") return process.env.NEXT_PUBLIC_FORMSPREE_STUDENT_ID;
        if (contactType === "bedrift") return process.env.NEXT_PUBLIC_FORMSPREE_BEDRIFT_ID;
        return "";
    }, [contactType]);

    const formAction = formId ? `https://formspree.io/f/${formId}` : "";

    const fieldClasses = [
        "w-full",
        "h-20",
        "px-[22px] pr-12",
        "text-lg font-normal leading-6",
        "text-text-color",
        "bg-background border border-black",
        "appearance-none",
        "placeholder:text-zinc-500 placeholder:opacity-80",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "disabled:opacity-60 disabled:cursor-not-allowed",
    ].join(" ");


    const textareaExtra = [
        "h-auto",
        "min-h-[160px]",
        "py-5",
    ].join(" ");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formAction) return;

        setStatus("sending");

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const res = await fetch(formAction, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });

            const json = await res.json().catch(() => ({} as any));

            if (res.ok && (json.ok === true || json.success === true || !json.errors)) {
                setStatus("sent");
                form.reset();
                setContactType("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    const submitText =
        status === "sending"
            ? "Sender…"
            : status === "sent"
                ? "Melding sendt!"
                : status === "error"
                    ? "Noe gikk galt. Prøv igjen."
                    : "Send melding";

    const submitDisabled = !contactType || !formId || status === "sending";

    return (
        <main
            className={[
                "max-w-[1000px]",
                "mt-8 md:mt-4",
                "px-4 md:px-6 py-8",
                "text-text-color",
                "mx-auto",
            ].join(" ")}
        >
            <div className="mx-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">

                        {/* Varsling */}
                        <div className="flex font-mono ml-auto items-center gap-4">
                            <label htmlFor="anonymous" className="text-sm">
                                Ønsker du å si ifra om noe eller varsle oss?
                            </label>

                            <Link
                                href={"https://nettskjema.no/a/ifi-dagen-si-ifra"}
                                className={buttonClasses([].join(" "))}
                            >
                                Si fra!
                            </Link>
                        </div>

                        {/* Navn */}
                        <div className="mt-28 w-full">
                            <label
                                className={[
                                    "block",
                                    "mb-2",
                                    "text-lg font-normal font-mono leading-6",
                                ].join(" ")}
                                htmlFor="name"
                            >
                                Navn *
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder={"Navn Etternavn"}
                                required
                                className={fieldClasses}
                            />
                        </div>

                        {/* E-post */}
                        <div className="w-full mt-8">
                            <label
                                className={[
                                    "block",
                                    "mb-2",
                                    "text-lg font-normal font-mono leading-6",
                                ].join(" ")}
                                htmlFor="email"
                            >
                                E-post *
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder={"navn@epost.no"}
                                required
                                className={fieldClasses}
                            />
                        </div>

                        {/* Type */}
                        <div className="w-full mt-8">
                            <label
                                className={[
                                    "block",
                                    "mb-2",
                                    "text-lg font-normal font-mono leading-6",
                                ].join(" ")}
                                htmlFor="contact_type"
                            >
                                Jeg tar kontakt som... *
                            </label>

                            <InlineDropdown
                                value={contactType}
                                onChange={(v) => {
                                    setContactType(v);
                                    if (status !== "idle") setStatus("idle");
                                }}
                                options={[
                                    { value: "student", label: "Student" },
                                    { value: "bedrift", label: "Bedriftsrepresentant" },
                                ]}
                                placeholder="Velg..."
                                fieldClasses={fieldClasses}
                            />

                            <input type="hidden" id="contact_type" name="contact_type" value={contactType} required />
                        </div>


                        {/* Melding */}
                        <div className="w-full mt-8">
                            <label
                                className={[
                                    "block",
                                    "mb-2",
                                    "text-lg font-normal font-mono leading-6",
                                ].join(" ")}
                                htmlFor="message"
                            >
                                Melding *
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                required
                                placeholder="Skriv meldingen din her..."
                                className={[fieldClasses, textareaExtra].join(" ")}
                            />
                        </div>

                        <input type="hidden" name="form_name" value="kontakt_skjema" />

                        {/* Footer */}
                        <span className="mr-auto mb-10 font-extralight">
                            *Obligatoriske felt
                        </span>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitDisabled}
                            className={buttonClasses(
                                [
                                    "px-6 py-5 transition mr-auto",
                                    submitDisabled ? "bg-button-hover cursor-not-allowed" : "",
                                ].join(" ")
                            )}
                        >
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

function InlineDropdown({
    value,
    onChange,
    options,
    placeholder,
    fieldClasses,
}: {
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    fieldClasses: string;
}) {
    const [open, setOpen] = useState(false);

    const selectedLabel =
        options.find((o) => o.value === value)?.label ?? "";

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={[
                    fieldClasses,
                    "text-left",
                    "flex items-center",
                ].join(" ")}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={selectedLabel ? "" : "text-zinc-500 opacity-80"}>
                    {selectedLabel || placeholder}
                </span>

                <span className="ml-auto pointer-events-none">
                    <Image src={downArrow} alt="" width={18} height={18} />
                </span>
            </button>

            {open && (
                <>
                    {/* click-outside catcher */}
                    <button
                        type="button"
                        className="fixed inset-0 cursor-default"
                        aria-hidden="true"
                        onClick={() => setOpen(false)}
                    />

                    <ul
                        role="listbox"
                        className={[
                            "w-full",
                            "mt-2",
                            "p-2",
                            "text-lg font-normal leading-6",
                            "bg-background border border-black",
                            "absolute z-10",
                        ].join(" ")}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setOpen(false);
                        }}
                    >
                        {options.map((opt) => (
                            <li key={opt.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={opt.value === value}
                                    className={[
                                        "w-full",
                                        "px-[22px] py-3",
                                        "text-left",
                                        "hover:opacity-80",
                                    ].join(" ")}
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                >
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
