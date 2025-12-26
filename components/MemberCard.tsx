// Lager et "kort" om et styremedlem, bilde, navn, styrerolle/tittel og epost til å vises under "om-oss"

import Image from "next/image";

// Props (data) som trengs for å vise ett medlem
type MemberCardProps = {
    memberPicture: string | null;   // Path til bilde som tekst eller null hvis bilde ikke finnes
    memberName: string;             // Navn på medlem som tekst
    memberTitle: string;            // Rolle / tittel som tekst
    titleMail: string;              // Epost som tekst - "rolle@dagenatifi.no"
}

export default function MemberCard({
    memberPicture,
    memberName,
    memberTitle,
    titleMail
}: MemberCardProps) {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            {/* Bilde, white space lik bildestørrelse hvis ikke bilde */}
            {memberPicture ? (
                <Image
                    src={`/${memberPicture}`}
                    alt={memberName}
                    width={256}
                    height={256}
                    quality={95}
                    className="w-40 h-40 mx-auto mb-4 rounded-full object-cover"
                />
            ) : (
                <div className="w-40 h-40 mx-auto mb-4" />
            )}

            {/* Navn høyde satt til h-14 slik at kortet ikke skalerer forskjellig med korte og lange navn */}
            <h2 className="text-xl font-semibold text-(--primary) h-14 flex items-center justify-center">
                {memberName}
            </h2>

            {/* Rolle / tittel */}
            <p className="text-gray-700 dark:text-gray-300 font-medium">
                {memberTitle}
            </p>

            {/* Epost, denne kan gjøres klikkbar (mailto), men var ikke det på den gamle siden */}
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                {titleMail}
            </p>
        </div>
    );
}