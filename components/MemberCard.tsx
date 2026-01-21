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
        <div className="max-w60 min-h-80 top-1 text-center">
            {/* Bilde, white space lik bildestørrelse hvis ikke bilde */}
            {memberPicture ? (
                <div className="w-48 h-48 mx-auto mb-2.5 relative">
                    <Image
                        src={`${router.basePath}/${memberPicture}`}
                        alt={memberName}
                        fill
                        sizes="200px"
                        quality={95}
                        className="rounded-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-48 h-48 mx-auto mb-2.5 relative" />
            )}

            {/* Navn */}
            <h2 className="text-xl md:text-xl font-normal font-mono
                            leading-7 text-text-color min-h-16 md:min-h-14 
                            flex items-center justify-center md:mb-[13px]">
                {memberName}
            </h2>

            {/* Rolle / tittel */}
            <p className="text-text-color text-md md:text-md font-mono font-normal md:leading-6 mb-2.5">
                {memberTitle}
            </p>

            {/* Epost, denne kan gjøres klikkbar (mailto), men var ikke det på den gamle siden */}
            <p className="text-text-color text-xs md:text-sm font-mono font-normal md:leading-5">
                {roleEmail}
            </p>
        </div>
    );
}