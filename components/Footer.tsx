// Footer som vises på alle sider

import Link from "next/link";
import { SOCIAL_LINKS, CONTACT_INFO } from "../lib/config";
import FacebookLogoIcon from "./icons/FacebookLogoIcon";
import InstagramLogoIcon from "./icons/InstagramLogoIcon";
import LinkedInLogoIcon from "./icons/LinkedInLogoIcon";

// <span className="sr-only">SoMe-type</span>, sr = screen reader, altså er disse for skjermlesere

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">

                    {/* SOME-linker */}
                    <div className="flex gap-4 justify-center md:justify-start">

                        {/* LinkedIn */}
                        <Link
                            href={SOCIAL_LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <LinkedInLogoIcon className="w-6 h-6 text-black dark:text-white" />
                        </Link>

                        {/* Facebook */}
                        <Link
                            href={SOCIAL_LINKS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <span className="sr-only">Facebook</span>
                            <FacebookLogoIcon className="w-6 h-6 text-black dark:text-white" />
                        </Link>

                        {/* Instagram */}
                        <Link
                            href={SOCIAL_LINKS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <span className="sr-only">Instagram</span>
                            <InstagramLogoIcon className="w-6 h-6 text-black dark:text-white" />
                        </Link>
                    </div>

                    {/* Foreningsnavnet og adresse */}
                    <div className="text-center">
                        <p className="font-semibold text-lg text-(--primary)">
                            {CONTACT_INFO.organizationName}
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>{CONTACT_INFO.address}</p>
                            <p>{CONTACT_INFO.postalCode}</p>
                        </div>

                    </div>

                    {/* Kontakt oss knapp */}
                    <div className="flex gap-4 justify-center md:justify-end">
                        <Link
                            href="/kontakt"
                            className="bg-(--primary) rounded-4xl px-8 py-4 inline-block text-white">
                            Kontakt oss
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
