"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import ThemeToggle from "@/components/layout/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import { siteConfig } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-40 w-full bg-white transition-colors duration-300 dark:bg-[#101112]">
        <Container>
          <div className="relative flex h-[86px] items-center justify-between sm:h-[100px] lg:h-[127px]">
            <Link href="/" aria-label="WAYLUME Home" className="font-heading text-[27px] font-extrabold tracking-[-0.075em] text-[#202020] transition-opacity duration-300 hover:opacity-70 dark:text-white sm:text-[31px] lg:text-[36px]">
              {siteConfig.name}
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[45px] lg:flex" aria-label="Main navigation">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`whitespace-nowrap text-[18px] tracking-[-0.015em] transition-colors duration-300 ${pathname === item.href ? "font-semibold text-[#202020] dark:text-white" : "font-normal text-[#858585] hover:text-[#202020] dark:text-[#a0a0a0] dark:hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="flex h-[44px] w-[44px] items-center justify-center rounded-[11px] border border-[#e3e7ed] text-[#202020] transition-colors hover:bg-[#f7f7f7] dark:border-white/15 dark:text-white dark:hover:bg-white/10 lg:hidden"
              >
                <IoMenuOutline className="text-[27px]" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}