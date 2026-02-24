// Lager et "kort" om et styremedlem, bilde, navn, styrerolle/tittel og epost til å vises under "om-oss"

import Image from "next/image";
import { Member } from "@/types";
import { useRouter } from "next/router";

export default function MemberCard({
    picturePath, name, title, email
}: Member) {
    const router = useRouter();

    return (
        <div className="max-w60 min-h-80 top-1 text-center text-text-color">
            {/* Bilde, white space lik bildestørrelse hvis ikke bilde */}
            {picturePath ? (
                <div className="w-48 h-48 mx-auto mb-2.5 relative">
                    <Image
                        src={`${router.basePath}/${picturePath}`}
                        alt={name}
                        fill
                        sizes="200px"
                        quality={95}
                        className="rounded-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-48 h-48 mx-auto mb-2.5 relative border rounded-full" />
            )}

            {/* Navn */}
            <h2 className="text-xl md:text-xl font-normal font-mono
                            leading-7 min-h-16 md:min-h-14 
                            flex items-center justify-center md:mb-[13px]">
                {name}
            </h2>

            {/* Rolle / tittel */}
            <p className="text-md md:text-md font-mono font-normal md:leading-6 mb-2.5">
                {title}
            </p>

            {/* Epost, denne kan gjøres klikkbar (mailto), men var ikke det på den gamle siden */}
            <p className="text-xs md:text-sm font-mono font-normal md:leading-5">
                {email}
            </p>
        </div>
    );
}