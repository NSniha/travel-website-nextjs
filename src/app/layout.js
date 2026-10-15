import { DM_Sans, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: {
    default: "WAYLUME | Go Further. Feel More.",
    template: "%s | WAYLUME",
  },
  description: "Discover extraordinary destinations, curated adventures, and unforgettable travel experiences with WAYLUME.",
  keywords: ["WAYLUME", "Travel", "Adventure", "Destinations", "Travel Experiences"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${manrope.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}