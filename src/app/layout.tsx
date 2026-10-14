import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Md. Nasimur Rahman | Software Engineer",
  description:
    "Full-stack developer skilled in React, Next.js, Node.js, and Express with expertise in SSR, client-side optimization, and seamless API integration.",
  keywords: ["portfolio", "software engineer", "full-stack", "React", "Next.js", "Node.js"],
  icons: {
    icon: "/assets/profile.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
    { media: "(prefers-color-scheme: light)", color: "#efe9df" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bodoni.variable} ${instrument.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
