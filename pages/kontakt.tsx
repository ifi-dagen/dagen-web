export default function Kontakt() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-(--primary) mb-8">
        Kontakt oss
      </h1>

      <form className="space-y-6">
        {/* Navn */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Navn
          </label>
          <input
            type="text"
            placeholder="Ola Nordmann"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
        </div>

        {/* E-post */}
        <div>
          <label className="block text-sm font-medium mb-1">
            E-post
          </label>
          <input
            type="email"
            placeholder="ola@eksempel.no"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
        </div>

        {/* Type henvendelse */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Jeg tar kontakt som
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
          >
            <option value="">Velg...</option>
            <option value="bedrift">Bedrift</option>
            <option value="student">Student</option>
            <option value="annet">Annet</option>
          </select>
        </div>

        {/* Melding */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Melding
          </label>
          <textarea
            rows={6}
            placeholder="Skriv meldingen din her..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
        </div>

        {/* Send-knapp (kun visuell nå) */}
        <button
          type="button"
          className="bg-(--primary) text-white font-semibold px-6 py-3 rounded-lg opacity-70 cursor-not-allowed"
        >
          Send melding
        </button>

        <p className="text-sm text-gray-500 mt-2">
          * Skjemaet er kun en demo – innsending er ikke aktivert ennå.
        </p>
      </form>
      </div>
    </div>
  );
}
