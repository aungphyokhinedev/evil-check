import type { Metadata } from "next";
import { DM_Sans, Fraunces, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoMyanmar = Noto_Sans_Myanmar({
  variable: "--font-noto-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "How Evil Are You?",
  description:
    "A playful Dark Triad quiz — Machiavellianism, Narcissism, and Psychopathy. For entertainment only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${notoMyanmar.variable} h-full antialiased`}
    >
      <body className="noir-bg noir-grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
