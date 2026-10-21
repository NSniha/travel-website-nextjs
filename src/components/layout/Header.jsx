"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

import Container from "@/components/shared/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/site";

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 w-full bg-white transition-[background-color,border-color,box-shadow] duration-300 dark:bg-[#101112] ${
          isScrolled
            ? "border-b border-[#e9e9e9] shadow-[0_6px_30px_rgba(0,0,0,0.045)] dark:border-white/10 dark:shadow-[0_6px_30px_rgba(0,0,0,0.2)]"
            : "border-b border-transparent shadow-none"
        }`}
      >
        <Container>
          <div className="relative flex h-18 items-center justify-between sm:h-20.5 lg:h-21">
            {/* Logo */}

            <Link
              href="/"
              aria-label="WAYLUME Home"
              className="font-heading inline-flex items-center text-[23px] leading-none font-bold tracking-[-0.075em] text-[#202020] transition-opacity duration-300 hover:opacity-75 dark:text-white sm:text-[26px] lg:text-[28px]"
            >
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8.5 lg:flex xl:gap-10.5"
              aria-label="Main navigation"
            >
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-flex items-center py-2 text-[14px] tracking-[-0.01em] transition-colors duration-300 xl:text-[15px] ${
                      isActive
                        ? "font-semibold text-[#202020] dark:text-white"
                        : "font-normal text-[#858585] hover:text-[#202020] dark:text-[#a0a0a0] dark:hover:text-white"
                    }`}
                  >
                    <span className="relative">
                      {item.label}

                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle & Mobile Menu */}

            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="flex h-10.5 w-10.5 items-center justify-center rounded-[10px] border border-[#e5e7eb] text-[#242424] transition-all duration-300 hover:border-[#c9cdd3] hover:bg-[#f7f7f7] active:scale-95 dark:border-white/15 dark:text-white dark:hover:bg-white/10 lg:hidden"
              >
                <IoMenuOutline
                  aria-hidden="true"
                  className="text-[23px]"
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Prevent content from hiding behind the fixed header */}

      <div
        aria-hidden="true"
        className="h-18 w-full shrink-0 sm:h-20.5 lg:h-23"
      />

      {/* Mobile Navigation */}

      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
      />
    </>
  );
}