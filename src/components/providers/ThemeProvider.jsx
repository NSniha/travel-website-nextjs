import { ThemeProvider as NextThemeProvider } from "@wrksz/themes/next";

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="waylume-theme" disableTransitionOnChange={false}>
      {children}
    </NextThemeProvider>
  );
}