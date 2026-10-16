"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="relative z-40 w-full bg-white transition-colors duration-300 dark:bg-[#101112]">
        <Container>
          <div className="relative flex h-[72px] items-center justify-between sm:h-[82px] lg:h-[92px]">
            <Link
              href="/"
              aria-label="WAYLUME Home"
              className="font-heading inline-flex items-center text-[23px] leading-none font-bold tracking-[-0.075em] text-[#202020] transition-opacity duration-300 hover:opacity-75 dark:text-white sm:text-[26px] lg:text-[28px]"
            >
              {siteConfig.name}
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[34px] lg:flex xl:gap-[42px]" aria-label="Main navigation">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-flex items-center py-2 text-[14px] tracking-[-0.01em] transition-colors duration-300 xl:text-[15px] ${isActive ? "font-semibold text-[#202020] dark:text-white" : "font-normal text-[#858585] hover:text-[#202020] dark:text-[#a0a0a0] dark:hover:text-white"}`}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[6px] left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-[10px]">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#e5e7eb] text-[#242424] transition-all duration-300 hover:border-[#c9cdd3] hover:bg-[#f7f7f7] active:scale-95 dark:border-white/15 dark:text-white dark:hover:bg-white/10 lg:hidden"
              >
                <IoMenuOutline className="text-[23px]" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}