import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Md. Nasimur Rahman | Software Engineer",
  description:
    "Full-stack developer skilled in React, Next.js, Node.js, and Express with expertise in SSR, client-side optimization, and seamless API integration.",
  keywords: ["portfolio", "software engineer", "full-stack", "React", "Next.js", "Node.js"],
  icons: {
    icon: "/assets/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
