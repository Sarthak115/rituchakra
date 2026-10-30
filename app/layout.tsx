import { LanguageBoundary } from '@/components/layout/LanguageBoundary';
import { MotionProvider } from '@/components/motion/MotionProvider';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RituChakra — Dadi Ki Rasoi",
  description: "An interactive illustrated story about curiosity and conversation.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><LanguageBoundary><MotionProvider>{children}</MotionProvider></LanguageBoundary></body>
    </html>
  );
}


