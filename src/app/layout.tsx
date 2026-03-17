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
  title: {
    default: 'OpenClaw Wiki – The Ultimate Guide to OpenClaw AI Agents',
    template: '%s | OpenClaw Wiki',
  },
  description: 'Tutorials, Tools, Agents, Templates, and Automation Guides for OpenClaw. Learn how to build AI agents with OpenClaw.',
  keywords: ['OpenClaw', 'AI agents', 'automation', 'tutorials', 'tools', 'templates'],
  authors: [{ name: 'OpenClaw Team' }],
  creator: 'OpenClaw Wiki',
  metadataBase: new URL('https://openclawwiki.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'OpenClaw Wiki',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
