import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Motion from "@/components/kit/Motion";

const display = localFont({ src: "../public/fonts/geist-latin-wght-normal.woff2", variable: "--f-display", weight: "100 900", display: "swap" });
const sans = localFont({ src: "../public/fonts/geist-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../public/fonts/geist-mono-latin-wght-normal.woff2", variable: "--f-mono", weight: "100 900", display: "swap", preload: false });

export const metadata: Metadata = { title: "Oktave H1 — Sound, reduced to a line", description: "Oktave H1 over-ear headphones. Prelaunch. A concept by Anorix.", openGraph: { title: "Oktave H1 — Sound, reduced to a line", description: "Oktave H1 over-ear headphones. Prelaunch. A concept by Anorix.", type: "website" } };
export const viewport: Viewport = { themeColor: "#efefec", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body><Motion />{children}</body>
    </html>
  );
}
