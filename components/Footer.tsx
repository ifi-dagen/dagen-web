import Link from "next/link";
import { SOCIAL_LINKS, CONTACT_INFO } from "../lib/config";
import FacebookLogoIcon from "./icons/FacebookLogoIcon";
import InstagramLogoIcon from "./icons/InstagramLogoIcon";
import LinkedInLogoIcon from "./icons/LinkedInLogoIcon";

export default function Footer() {
    return (
        <footer className="bg-primary border-t border-black">
            <div className="mx-auto max-w-[1440px] px-4 md:px-[51px]">

                {/* MOBIL */}
                <div className="md:hidden py-8 flex flex-col items-center gap-6">
                    {/* Øverst - SoMe-ikoner */}
                    <div className="flex gap-6 text-text-color">
                        <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="active:opacity-70 transition-opacity">
                            <span className="sr-only">LinkedIn</span>
                            <LinkedInLogoIcon className="w-6 h-6" />
                        </Link>
                        <Link href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="active:opacity-70 transition-opacity">
                            <span className="sr-only">Facebook</span>
                            <FacebookLogoIcon className="w-6 h-6" />
                        </Link>
                        <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="active:opacity-70 transition-opacity">
                            <span className="sr-only">Instagram</span>
                            <InstagramLogoIcon className="w-6 h-6" />
                        </Link>
                    </div>

                    {/* Midten - orgnavn + adresse */}
                    <div className="text-center">
                        <div className="font-mono font-normal text-[16px] leading-[34px] tracking-[0.05em] text-text-color">
                            <p>{CONTACT_INFO.address}</p>
                            <p>{CONTACT_INFO.postalCode}</p>
                        </div>
                        <br />
                        <p className="font-semibold text-text-color">
                            {CONTACT_INFO.organizationName}
                        </p>
                    </div>

                    {/* Nederst - kontakt-button */}
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center
                                    w-[242px] h-[73px]
                                    rounded-[65.77px]
                                    border-[0.66px] border-black
                                    bg-background active:bg-primary
                                    font-mono font-normal text-[16px] leading-[34px] tracking-[0.05em] text-text-color
                                    hover:bg-primary transition"
                    >
                        Kontakt oss
                    </Link>
                </div>

                {/* DESKTOP */}
                <div className="hidden md:block h-[178px] pt-[31px]">
                    <div className="grid grid-cols-3 items-start">

                        {/* Venstre - SoMe-text */}
                        <div className="justify-self-start">
                            <div className={[
                                "flex flex-col",
                                "text-left",
                                "text-text-color",
                                "font-mono font-normal",
                                "text-[16px] leading-[25px]",
                                "tracking-[0.05em]",
                            ].join(" ")}
                            >
                                <Link
                                    href={SOCIAL_LINKS.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2 hover:opacity-70 transition"
                                >
                                    Instagram
                                </Link>
                                <Link
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2 hover:opacity-70 transition"
                                >
                                    LinkedIn
                                </Link>
                                <Link
                                    href={SOCIAL_LINKS.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2 hover:opacity-70 transition"
                                >
                                    Facebook
                                </Link>
                            </div>
                        </div>

                        {/* Midten - orgnavn + adresse */}
                        <div className="justify-self-center text-center">
                            <div className="font-mono font-normal text-[16px] leading-[34px] tracking-[0.05em] text-text-color">
                                <p>{CONTACT_INFO.address}</p>
                                <p>{CONTACT_INFO.postalCode}</p>
                            </div>
                            <br />
                            <p className="font-semibold text-text-color">
                                {CONTACT_INFO.organizationName}
                            </p>
                        </div>

                        {/* Høyre - kontakt-button */}
                        <div className="justify-self-end">
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center justify-center
                                            w-[242px] h-[73px]
                                            rounded-[65.77px]
                                            border-[0.66px] border-black
                                            bg-background hover:bg-primary
                                            font-mono font-normal text-[16px] leading-[34px] tracking-[0.05em] text-black
                                            transition"
                            >
                                Kontakt oss
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
