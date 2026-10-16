"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoArrowForwardOutline, IoCloseOutline } from "react-icons/io5";
import { siteConfig } from "@/data/site";

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    drawerRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
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
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Mobile navigation"
        tabIndex={-1}
        inert={!isOpen}
        className={`absolute top-0 right-0 flex h-full w-[min(340px,88vw)] flex-col bg-white px-6 py-6 shadow-2xl outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-[#181a1c] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="font-heading text-[23px] font-bold tracking-[-0.075em]">
            {siteConfig.name}
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-black/10 transition-all duration-300 hover:rotate-90 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            <IoCloseOutline className="text-[23px]" />
          </button>
        </div>

        <nav className="mt-14 flex flex-col" aria-label="Mobile menu">
          {siteConfig.navigation.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                style={{ transitionDelay: isOpen ? `${index * 65 + 120}ms` : "0ms" }}
                className={`group flex items-center justify-between border-b border-black/10 py-[19px] transition-all duration-500 dark:border-white/10 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${isActive ? "text-[#202020] dark:text-white" : "text-[#858585] hover:text-[#202020] dark:text-[#a0a0a0] dark:hover:text-white"}`}
              >
                <span className="flex items-center gap-4">
                  <span className="text-[11px] font-normal text-[#aaaaaa]">0{index + 1}</span>
                  <span className="text-[19px] font-medium tracking-[-0.025em]">{item.label}</span>
                </span>

                <IoArrowForwardOutline className="text-[17px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-[12px] text-[#888888]">Explore beyond the ordinary.</p>
          <p className="font-heading mt-2 text-[17px] font-semibold tracking-[-0.025em]">Go Further. Feel More.</p>
        </div>
      </aside>
    </div>
  );
}