// Header som vises på alle sider

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

// Knappene som vises i header og hvor de linker hen
const links = [
    { href: "/program", label: "Program" },
    { href: "/bli-med", label: "Bli med i Dagen!" },
    { href: "/stillingsannonser", label: "Stillingsannonser" },
    { href: "/bedrift", label: "For bedrifter" },
    { href: "/om-oss", label: "Om oss" },
    { href: "/kontakt", label: "Kontakt oss" },
];

export default function Header() {
    const [isMobilMenuOpen, setMobileMenuOpen] = useState(false);
    const { pathname, basePath } = useRouter();

    return (
        <header
            className={[
                "sticky top-0 z-50",
                "pt-[35px] pb-4 bg-[linear-gradient(to_bottom,white,transparent)]",
            ].join(" ")}
        >
            <div
                className={[
                    "max-w-[1304px] mx-auto",
                    "px-4 lg:px-6",
                ].join(" ")}
            >
                <div className="relative h-[61px]">

                    {/* Logo */}
                    <Link
                        href="/"
                        className={[
                            "absolute inset-y-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0",
                            "flex items-center shrink-0",
                        ].join(" ")}
                    >
                        <Image
                            src={`${basePath}/web-design/dagen-logo/dagen_at.svg`} // <-------- PATH - logo i header
                            alt="dagen@ifi logo - Hjem knapp"
                            width={64.27}
                            height={58.93}
                        />
                    </Link>

                    {/* Desktop Menu med "knapper" (Linker med design som knapper) */}
                    <nav
                        className={[
                            "hidden lg:flex",
                            "absolute right-0 inset-y-0",
                            "gap-3 xl:gap-4",
                            "items-center min-w-0",
                        ].join(" ")}
                    >
                        {links.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={[
                                        "inline-flex items-center justify-center min-w-0",
                                        "h-[59px] px-3 xl:px-4 py-2",
                                        "rounded-[53.4px] border-[0.53px] border-button-outline",
                                        "hover:bg-background active:bg-background",
                                        "text-[16px] xl:text-[18px] leading-[34px]",
                                        "font-mono font-normal whitespace-nowrap",
                                        "transition text-button-text",
                                        isActive ? "bg-background" : "bg-button-bg",
                                    ].join(" ")}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobil Hamburger-menyknapp */}
                    <button
                        type="button"
                        className={[
                            "lg:hidden",
                            "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                            "flex flex-col gap-[5px]",
                        ].join(" ")}
                        onClick={() => setMobileMenuOpen(!isMobilMenuOpen)}
                        aria-label={isMobilMenuOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={isMobilMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="block w-8 h-1 bg-current"></span>
                        <span className="block w-8 h-1 bg-current"></span>
                        <span className="block w-8 h-1 bg-current"></span>
                    </button>

                </div>
            </div>

            {/* Mobil Meny */}
            {isMobilMenuOpen && (
                <>
                    {/* Klikk utenfor for å lukke */}
                    <button
                        type="button"
                        aria-label="Lukk meny"
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 z-40 cursor-default"
                    />

                    {/* Selve menyen */}
                    <nav
                        id="mobile-menu"
                        className={[
                            "lg:hidden",
                            "absolute right-0 top-full z-50",
                            "p-1",
                            "flex flex-col gap-1",
                            "font-mono",
                        ].join(" ")}
                    >
                        {links.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={[
                                        "inline-flex items-center justify-center",
                                        "px-2 py-1",
                                        "rounded-full border border-button-outline",
                                        "hover:bg-background active:bg-background",
                                        "text-[18px] leading-[34px]",
                                        "font-mono font-normal whitespace-nowrap tracking-wide",
                                        "transition text-button-text",
                                        isActive ? "bg-background" : "bg-button-bg",
                                    ].join(" ")}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </>
            )}
        </header>
    );
}
