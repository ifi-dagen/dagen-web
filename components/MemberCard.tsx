// Lager et "kort" om et styremedlem, bilde, navn, styrerolle/tittel og epost til å vises under "om-oss"

import Image from "next/image";
import { useRouter } from "next/router";

// Props (data) som trengs for å vise ett medlem
type MemberCardProps = {
    memberPicture: string | null;   // Path til bilde som tekst eller null hvis bilde ikke finnes
    memberName: string;             // Navn på medlem som tekst
    memberTitle: string;            // Rolle / tittel som tekst
    roleEmail: string;              // Epost som tekst - "rolle@dagenatifi.no"
}

export default function MemberCard({
    memberPicture,
    memberName,
    memberTitle,
    roleEmail: roleEmail
}: MemberCardProps) {
    const router = useRouter();

    return (
        <div className=" w-[200px] h-[305px] text-center">
            {/* Bilde, white space lik bildestørrelse hvis ikke bilde */}
            {memberPicture ? (
                <div className="w-40 h-40 mx-auto mb-4 relative">
                <Image
                    src={`${router.basePath}/${memberPicture}`}
                    alt={memberName}
                    fill
                    sizes="160px"
                    quality={95}
                    className="rounded-full object-cover"
                />
                </div>
            ) : (
                <div className="w-40 h-40 mx-auto mb-4" />
            )}

            {/* Navn høyde satt til md:min-h-14 slik at kortet ikke skalerer forskjellig med korte og lange navn. min-h-24 for liten skjerm */}
            <h2 className="text-[24px] font-normal font-heading leading-7 text-text-heading min-h-24 md:min-h-14 flex items-center justify-center">
                {memberName}
            </h2>

            {/* Rolle / tittel */}
            <p className="text-gray-700 font-medium wrap-break-word">
                {memberTitle}
            </p>

            {/* Epost, denne kan gjøres klikkbar (mailto), men var ikke det på den gamle siden */}
            <p className="text-gray-500 mt-2 text-sm wrap-break-word">
                {roleEmail}
            </p>
        </div>
    );
}