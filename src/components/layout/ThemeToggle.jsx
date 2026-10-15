"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@wrksz/themes/client";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Change color theme"}
      className="flex h-[44px] w-[44px] items-center justify-center gap-2 rounded-[11px] border border-[#e3e7ed] bg-white text-[#202020] transition-all duration-300 hover:border-[#b8bec7] hover:bg-[#f7f7f7] active:scale-95 disabled:cursor-wait dark:border-white/15 dark:bg-[#1b1d1f] dark:text-white dark:hover:bg-[#282b2e] sm:h-[50px] sm:w-[105px]"
    >
      {mounted && isDark ? <IoSunnyOutline className="text-[22px]" /> : <IoMoonOutline className="text-[22px]" />}
      <span className="hidden text-[15px] font-semibold sm:inline">{mounted && isDark ? "Light" : "Dark"}</span>
    </button>
  );
}