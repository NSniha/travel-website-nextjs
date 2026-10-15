"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoArrowForwardOutline, IoCloseOutline } from "react-icons/io5";
import { siteConfig } from "@/data/site";

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-[100] lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close navigation"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/45 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        id="mobile-navigation"
        inert={!isOpen}
        aria-label="Mobile navigation"
        className={`absolute top-0 right-0 flex h-full w-[min(360px,88vw)] flex-col bg-white px-7 py-7 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-[#181a1c] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="font-heading text-[25px] font-extrabold tracking-[-0.065em]">
            {siteConfig.name}
          </Link>

          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">
            <IoCloseOutline className="text-[26px]" />
          </button>
        </div>

        <nav className="mt-16 flex flex-col" aria-label="Mobile menu">
          {siteConfig.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className={`group flex items-center justify-between border-b border-black/10 py-5 text-[24px] font-medium tracking-[-0.035em] transition-colors dark:border-white/10 ${pathname === item.href ? "text-[#191919] dark:text-white" : "text-[#858585] hover:text-[#191919] dark:hover:text-white"}`}
            >
              <span className="flex items-center gap-4">
                <span className="text-[12px] font-normal text-[#aaaaaa]">0{index + 1}</span>
                {item.label}
              </span>
              <IoArrowForwardOutline className="text-[19px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-black/10 pt-7 dark:border-white/10">
          <p className="text-[13px] text-[#888888]">Explore more. Experience more.</p>
          <p className="font-heading mt-2 text-[18px] font-semibold">Go Further. Feel More.</p>
        </div>
      </aside>
    </div>
  );
}