// Header som vises på alle sider

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const links = [
    { href: "/stillingsannonser", label: "Stillingsannonser" },
    { href: "/bli-med", label: "Bli med i Dagen!"},
    { href: "/bedrift", label: "For bedrifter" },
    { href: "/om-oss", label: "Om oss"},
    { href: "/kontakt", label: "Kontakt oss" },
];

export default function Header() {
    const [isMobilMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between md:justify-center py-6 relative min-h-[88px]">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-16"
                    >
                        <Image
                            src= {`${router.basePath}/web-design/dagen-logo/at-black.svg`}
                            alt="dagen@ifi logo"
                            width={132}
                            height={132}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-8 font-medium items-center">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors whitespace-nowrap border rounded-4xl px-6 py-4 border-(--primary) ${router.pathname === link.href
                                        ? "bg-(--primary) text-white"
                                        : "hover:text-(--primary)"
                                    }`}
                            >
                                {link.label}
                            </Link>

                        ))}
                    </nav>

                    {/* Mobil Hamburger-menyknapp */}
                    <button
                        type="button"
                        className="md:hidden flex flex-col gap-1 ml-auto z-10"
                        onClick={() => setMobileMenuOpen(!isMobilMenuOpen)}
                        aria-label={isMobilMenuOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={isMobilMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="w-6 h-0.5 bg-current"></span>
                        <span className="w-6 h-0.5 bg-current"></span>
                        <span className="w-6 h-0.5 bg-current"></span>
                    </button>
                </div>
            </div>

            {/* Mobil Meny */}
            {isMobilMenuOpen && (
                <nav
                    id="mobile-menu"
                    className="md:hidden flex flex-col gap-3 p-4 border-t border-gray-200 dark:border-gray-800 font-medium bg-white dark:bg-gray-900"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors ${router.pathname === link.href
                                    ? "text-(--primary) font-semibold"
                                    : "hover:text-(--primary)"
                                }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>

                    ))}
                </nav>
            )}
        </header>
    );
}
