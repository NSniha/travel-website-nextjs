"use client";

import { useTheme } from "@wrksz/themes/client";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch color theme"
      title="Change color theme"
      className="group inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#e5e7eb] bg-white text-[#242424] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#c9cdd3] hover:shadow-[0_7px_20px_rgba(0,0,0,0.07)] active:translate-y-0 dark:border-white/15 dark:bg-[#1b1d20] dark:text-white dark:hover:border-white/30 sm:w-[98px]"
    >
      <IoMoonOutline aria-hidden="true" className="text-[19px] transition-transform duration-300 group-hover:-rotate-12 dark:hidden" />
      <IoSunnyOutline aria-hidden="true" className="hidden text-[20px] transition-transform duration-300 group-hover:rotate-45 dark:block" />

      <span className="hidden text-[13px] font-medium sm:inline dark:hidden">Dark</span>
      <span className="hidden text-[13px] font-medium sm:dark:inline">Light</span>
    </button>
  );
}