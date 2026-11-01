import { LanguageBoundary } from '@/components/layout/LanguageBoundary';
import { MotionProvider } from '@/components/motion/MotionProvider';
import type { Metadata } from "next";
// Self-hosted Hindi/Odia fonts so text renders the same on school laptops and phones.
import '@fontsource/noto-sans-devanagari/400.css';
import '@fontsource/noto-sans-devanagari/600.css';
import '@fontsource/noto-sans-oriya/400.css';
import '@fontsource/noto-sans-oriya/600.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "RituChakra",
  description: "Interactive menstrual-health stories: change the story, change the conversation.",
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


