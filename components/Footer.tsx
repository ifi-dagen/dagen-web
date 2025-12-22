import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router"
import { SOCIAL_LINKS, CONTACT_INFO } from "../lib/config";

export default function Footer() {
    const router = useRouter();
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                    
                    {/* SOME-linker */}
                    <div className="flex gap-4 justify-center md:justify-start">
                        <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src={`${router.basePath}/linkedin.png`} alt="LinkedIn" width={24} height={24} className="dark:invert" />
                        </Link>
                        <Link href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src={`${router.basePath}/facebook.png`} alt="Facebook" width={24} height={24} className="dark:invert" />
                        </Link>
                        <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src={`${router.basePath}/instagram.png`} alt="Instagram" width={24} height={24} className="dark:invert" />
                        </Link>
                    </div>

                    {/* Foreningsnavnet */}
                    <div className="text-center">
                        <p className="font-semibold text-lg text-(--primary)">{CONTACT_INFO.organizationName}</p>
                    </div>

                    {/* Addresse */}
                    <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                        <p>{CONTACT_INFO.address}</p>
                        <p>{CONTACT_INFO.postalCode}</p>
                    </div>

                </div>
            </div>
        </footer>
    );
}