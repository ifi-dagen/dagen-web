// pages/kontakt.tsx
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
      console.log("contactType:", contactType);
      console.log("formId:", formId);
      console.log("formAction:", formAction);

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
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-(--primary) mb-8">
          Kontakt oss
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                "relative inline-flex h-7 w-12 items-center rounded-full transition",
                "focus:outline-none focus:ring-2 focus:ring-(--primary) focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
                isAnonymous ? "bg-(--primary)" : "bg-gray-300 dark:bg-gray-700",
              ].join(" ")}
            >
              <span
                className={[
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
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
          <div>
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
              className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary) ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                }`}
            />
          </div>

          {/* E-post */}
          <div>
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
              className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary) ${isAnonymous ? "opacity-60 cursor-not-allowed" : ""
                }`}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="contact_type">
              Jeg tar kontakt som
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
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
            >
              <option value="">Velg...</option>
              <option value="student">Student</option>
              <option value="bedrift">Bedriftsrepresentant</option>
              <option value="si_fra">Si fra!</option>
            </select>
          </div>

          {/* Melding */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Melding
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Skriv meldingen din her..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
            />
          </div>

          <input type="hidden" name="form_name" value="kontakt_skjema" />

          {/* Submit */}
          <button
            type="submit"
            disabled={!contactType || !formId || status === "sending"}
            className={[
              "bg-(--primary) text-white font-semibold px-6 py-3 rounded-lg transition",
              (!contactType || !formId || status === "sending")
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90",
            ].join(" ")}
          >
            {status === "sending" ? "Sender…" : "Send melding"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-green-700 dark:text-green-400">
              Melding sendt
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-700 dark:text-red-400">
              Noe gikk galt. Prøv igjen.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
