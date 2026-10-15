import type { Metadata, Viewport } from "next";
import { Forum, Jost } from "next/font/google";
import FloatingActions from "@/components/floating-actions";
import MobileAppNav from "@/components/mobile-app-nav";
import PwaRegister from "@/components/pwa-register";
import PageTransition from "@/components/page-transition";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const forum = Forum({
  variable: "--font-forum",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hongxu Wellness — Yakima, Washington",
  description: "Weight management, injectables, IV therapy, skincare and massage in Yakima, Washington.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "HONGXU" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/images/hongxu-logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06162f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hongxu-logo-loading.png" fetchPriority="high" />
      </head>
      <body className={`${jost.variable} ${forum.variable}`}>
        {children}
        <FloatingActions />
        <MobileAppNav />
        <PageTransition />
        <PwaRegister />
      </body>
    </html>
  );
}
