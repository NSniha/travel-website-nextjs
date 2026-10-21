"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  IoArrowForwardOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { siteConfig } from "@/data/site";

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousPathRef = useRef(pathname);

  const [mounted, setMounted] = useState(false);

  // Mount the drawer outside the header stacking context.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the drawer when the route changes.
  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;

      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Manage focus, keyboard navigation, and background scrolling.
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const drawer = drawerRef.current;

      if (!drawer) return;

      const focusableElements = Array.from(
        drawer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (!focusableElements.length) {
        event.preventDefault();
        drawer.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement;

      if (!drawer.contains(activeElement)) {
        event.preventDefault();

        if (event.shiftKey) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }

        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const desktopMedia = window.matchMedia(
      "(min-width: 1024px)"
    );

    const handleDesktopChange = (event) => {
      if (event.matches) {
        onClose();
      }
    };

    if (desktopMedia.matches) {
      onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    desktopMedia.addEventListener(
      "change",
      handleDesktopChange
    );

    return () => {
      window.cancelAnimationFrame(focusFrame);

      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      desktopMedia.removeEventListener(
        "change",
        handleDesktopChange
      );

      if (previousFocus?.isConnected) {
        previousFocus.focus?.();
      }
    };
  }, [mounted, isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-100 lg:hidden ${
        isOpen
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Background Overlay */}

      <button
        type="button"
        tabIndex={-1}
        aria-label="Close navigation"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-black/50 backdrop-blur-[2px] transition-[opacity,backdrop-filter] duration-500 ease-out ${
          isOpen
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* Mobile Drawer */}

      <aside
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Mobile navigation"
        tabIndex={-1}
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex h-dvh w-[min(340px,88vw)] flex-col overflow-hidden bg-white px-6 pt-6 pb-6 text-[#242424] shadow-[-15px_0_55px_rgba(0,0,0,0.12)] outline-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-[#181a1c] dark:text-white ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/8 pb-6 dark:border-white/10">
          <Link
            href="/"
            onClick={onClose}
            aria-label="WAYLUME Home"
            className="font-heading inline-flex items-center text-[23px] leading-none font-bold tracking-[-0.075em] text-[#202020] transition-opacity duration-300 hover:opacity-70 dark:text-white"
          >
            {siteConfig.name}
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-black/10 text-[#242424] outline-none transition-all duration-300 hover:rotate-90 hover:border-black/20 hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#242424] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 dark:focus-visible:ring-white"
          >
            <IoCloseOutline
              aria-hidden="true"
              className="text-[23px]"
            />
          </button>
        </div>

        {/* Mobile Navigation */}

        <nav
          aria-label="Mobile menu"
          className="mt-7 min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="flex flex-col">
            {siteConfig.navigation.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    transitionDelay: isOpen
                      ? `${index * 65 + 120}ms`
                      : "0ms",
                  }}
                  className={`group relative flex items-center justify-between gap-4 border-b border-black/10 py-4.5 outline-none transition-[opacity,transform,color] duration-500 ease-out focus-visible:text-[#242424] dark:border-white/10 dark:focus-visible:text-white ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${
                    isActive
                      ? "text-[#202020] dark:text-white"
                      : "text-[#858585] hover:text-[#202020] dark:text-[#a0a0a0] dark:hover:text-white"
                  }`}
                >
                  {/* Navigation Label */}

                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className={`w-5 shrink-0 text-[11px] font-normal ${
                        isActive
                          ? "text-[#555555] dark:text-[#dddddd]"
                          : "text-[#aaaaaa] dark:text-[#777777]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`font-heading text-[17px] leading-normal tracking-[-0.035em] sm:text-[18px] ${
                        isActive
                          ? "font-semibold"
                          : "font-medium"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>

                  {/* Arrow */}

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className={`shrink-0 text-[17px] transition-transform duration-300 group-hover:translate-x-1 ${
                      isActive
                        ? "text-[#242424] dark:text-white"
                        : "text-[#aaaaaa] dark:text-[#858585]"
                    }`}
                  />

                  {/* Active Indicator */}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full bg-[#242424] dark:bg-white"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Drawer Footer */}

        <div className="mt-6 shrink-0 border-t border-black/10 pt-6 pb-[env(safe-area-inset-bottom)] dark:border-white/10">
          <p className="text-[12px] leading-[1.7] text-[#888888] dark:text-[#999999]">
            Explore beyond the ordinary.
          </p>

          <p className="font-heading mt-2 text-[17px] leading-normal font-semibold tracking-[-0.045em] text-[#242424] dark:text-white">
            Go Further. Feel More.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#242424] dark:bg-white" />

            <span className="text-[10px] font-medium tracking-[0.08em] text-[#999999] uppercase dark:text-[#888888]">
              WAYLUME TRAVEL
            </span>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}