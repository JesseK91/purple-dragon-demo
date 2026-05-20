import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Purple Dragon | Lawton Dispensary, Patient Specials & Coffee Bar",
  description: "Browse The Purple Dragon in Lawton, Oklahoma for first-visit specials, Happy Hour, loyalty points, coffee bar access, curbside pickup, directions, and the live menu.",
  keywords: [
    "Lawton dispensary",
    "Lawton head shop",
    "medical cannabis Lawton OK",
    "Purple Dragon Lawton",
    "dispensary deals Lawton",
    "patient specials Lawton",
    "Happy Hour Lawton dispensary",
    "OMMA medical cards Oklahoma",
    "curbside weed pickup Lawton",
    "coffee bar Lawton dispensary",
    "dispensaries in Lawton OK"
  ],
  authors: [{ name: "The Purple Dragon" }],
  openGraph: {
    title: "The Purple Dragon | Lawton Dispensary, Patient Specials & Coffee Bar",
    description: "Medical cannabis deals, first-visit rewards, loyalty points, coffee bar access, and curbside pickup on Gore Blvd for licensed Oklahoma patients.",
    url: "https://purple-dragon-demo.pages.dev",
    siteName: "The Purple Dragon",
    images: [
      {
        url: "https://purple-dragon-demo.pages.dev/strain-purple.webp",
        width: 1200,
        height: 630,
        alt: "The Purple Dragon Lawton dispensary and patient specials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.position": "34.606707;-98.421409",
    "ICBM": "34.606707, -98.421409",
    "geo.region": "US-OK",
    "geo.placename": "Lawton",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <LocalBusinessSchema />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-[#F8F6FC]`}
      >
        {children}
      </body>
    </html>
  );
}
