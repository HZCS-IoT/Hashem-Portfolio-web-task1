import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hashem Alhamed — Full-Stack Developer & IoT Engineer",
  description:
    "Portfolio of Hashem Zaid Aidaroos Alhamed — full-stack web apps, Flutter mobile, IoT robotics, and AI projects.",
  openGraph: {
    title: "Hashem Alhamed — Portfolio",
    description: "Full-Stack Developer & IoT Engineer based in Makkah, Saudi Arabia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
