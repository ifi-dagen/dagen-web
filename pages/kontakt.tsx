import { buttonClasses } from "@/components/buttons/buttonStyles";
import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Kontakt() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactType, setContactType] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const formId = useMemo(() => {
    if (contactType === "student") return process.env.NEXT_PUBLIC_FORMSPREE_STUDENT_ID;
    if (contactType === "bedrift") return process.env.NEXT_PUBLIC_FORMSPREE_BEDRIFT_ID;
    if (contactType === "si_fra") return process.env.NEXT_PUBLIC_FORMSPREE_SIFRA_ID;
    return "";
  }, [contactType]);

  const formAction = formId ? `https://formspree.io/f/${formId}` : "";

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
        setIsAnonymous(false);
        setContactType("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-6 py-8 mt-8 md:mt-[150px]">
      <div className="mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">

            {/* Anonym */}
            <div className="flex items-center gap-4">
              <label htmlFor="anonymous" className="text-sm">
                Anonym tilbakemelding?
              </label>

              <button
                type="button"
                role="switch"
                aria-checked={isAnonymous}
                onClick={() => setIsAnonymous((v) => !v)}
                className={[
                  "relative inline-flex h-7 w-12 items-center rounded-full transition outline",
                  isAnonymous ? "bg-primary" : "bg-background",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-block h-5 w-5 transform rounded-full bg-background shadow transition",
                    "outline outline-black",
                    isAnonymous ? "translate-x-6" : "translate-x-1",
                  ].join(" ")}
                />
              </button>

              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                value="true"
                checked={isAnonymous}
                readOnly
                className="hidden"
              />
            </div>

            {/* Navn */}
            <div className="mt-16 md:mt-20 w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Navn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={isAnonymous ? "Anonym" : "Ola Nordmann"}
                disabled={isAnonymous}
                required={!isAnonymous}
                className={`w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              />
            </div>

            {/* E-post */}
            <div className=" w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={isAnonymous ? "Anonym" : "ola@epost.no"}
                disabled={isAnonymous}
                required={!isAnonymous}
                className={`w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              />
            </div>

            {/* Type */}
            <div className=" w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="contact_type">
                Jeg tar kontakt som...
              </label>
              <select
                id="contact_type"
                name="contact_type"
                required
                value={contactType}
                onChange={(e) => {
                  setContactType(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Velg...</option>
                <option value="student">Student</option>
                <option value="bedrift">Bedriftsrepresentant</option>
                <option value="si_fra">Si fra!</option>
              </select>
            </div>

            {/* Melding */}
            <div className=" w-full">
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Skriv meldingen din her..."
                className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <input type="hidden" name="form_name" value="kontakt_skjema" />

            {/* Submit */}
            <button
              type="submit"
              disabled={!contactType || !formId || status === "sending"}
              className={buttonClasses([
                "px-6 py-5 transition",
                (!contactType || !formId || status === "sending")
                  ? "bg-button-hover cursor-not-allowed"
                  : "",
              ].join(" "))}
            >
              {status === "sending" ? "Sender…" : "Send melding"}
              {status === "sent" ? "Melding sendt!" : ""}
              {status === "error" ? "Noe gikk galt. Prøv igjen." : ""}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}
