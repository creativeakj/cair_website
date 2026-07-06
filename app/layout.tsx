import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CAIR — Center for African International Relations",
    template: "%s — CAIR",
  },
  description:
    "CAIR fosters strong, mutually beneficial relations between Africa and America through diplomacy, research, advocacy, and partnerships.",
  openGraph: {
    title: "CAIR — Center for African International Relations",
    description:
      "CAIR fosters strong, mutually beneficial relations between Africa and America through diplomacy, research, advocacy, and partnerships.",
    type: "website",
    siteName: "CAIR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAIR — Center for African International Relations",
    description:
      "CAIR fosters strong, mutually beneficial relations between Africa and America through diplomacy, research, advocacy, and partnerships.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
