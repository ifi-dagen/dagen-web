import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const links = [
        { href: "/stillingsannonser", label: "Stillingsannonser" },
        { href: "/bedrift", label: "Bedrift" },
        { href: "/intern", label: "Intern" },
        { href: "/om-oss", label: "Om oss" },
        { href: "/kontakt", label: "Kontakt" },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between md:justify-center py-6 relative">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-16">
                    <Image src={`${router.basePath}/dagen-logo-black-teal.svg`} alt="dagen@ifi logo" width={132} height={132} className="block dark:hidden" />
                    <Image src={`${router.basePath}/dagen-logo-white-teal.svg`} alt="dagen@ifi logo" width={132} height={132} className="hidden dark:block" />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-8 font-medium">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors whitespace-nowrap ${router.pathname === link.href
                                ? "text-(--primary) border-b-2 border-(--primary) pb-1"
                                : "hover:text-(--primary)"
                                }`}
                        >
                            {link.label}
                        </Link>

                    ))}
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1 ml-auto z-10"
                    onClick={() => setOpen(!open)}
                >
                    <span className="w-6 h-0.5 bg-current"></span>
                    <span className="w-6 h-0.5 bg-current"></span>
                    <span className="w-6 h-0.5 bg-current"></span>
                </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <nav className="md:hidden flex flex-col gap-3 p-4 border-t border-gray-200 dark:border-gray-800 font-medium bg-white dark:bg-gray-900">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors ${router.pathname === link.href
                                    ? "text-(--primary) font-semibold"
                                    : "hover:text-(--primary)"
                                }`}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>

                    ))}
                </nav>
            )}
        </header>
    );
}
