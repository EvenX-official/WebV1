import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/site/CookieBanner";
import { JsonLd, ORG_SCHEMA, pageMeta } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = pageMeta(
  "EvenX — The Event Operations Platform for Professional Teams",
  "EvenX is the event operations platform built for in-house event teams. Coordinate vendors, track budgets, manage tasks and let Eva AI work ahead of your team.",
  "/"
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-content">
        {children}
        <CookieBanner />
        <JsonLd data={ORG_SCHEMA} />
      </body>
    </html>
  );
}
