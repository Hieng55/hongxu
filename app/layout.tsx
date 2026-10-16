import type { Metadata, Viewport } from "next";
import { Forum, Jost } from "next/font/google";
import FloatingActions from "@/components/floating-actions";
import MobileAppNav from "@/components/mobile-app-nav";
import PwaRegister from "@/components/pwa-register";
import PageTransition from "@/components/page-transition";
import { BUSINESS_NAME, DEFAULT_DESCRIPTION, SITE_URL, SOCIAL_IMAGE, localBusinessSchema } from "@/lib/seo";
import "./globals.css";
import "./theme.css";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HONGXU Wellness | Medical Spa & Wellness in Yakima, WA",
    template: "%s | HONGXU Wellness",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: BUSINESS_NAME,
  keywords: [
    "medical spa Yakima", "wellness Yakima WA", "Botox Yakima", "dermal fillers Yakima",
    "IV therapy Yakima", "weight loss Yakima", "facial Yakima", "massage therapy Yakima",
  ],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  category: "Health and wellness",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: BUSINESS_NAME,
    title: "HONGXU Wellness | Medical Spa & Wellness in Yakima, WA",
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "HONGXU Wellness | Yakima, Washington",
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "HONGXU" },
  icons: {
    icon: [{ url: "/images/hongxu-logo-loading.png?v=2", type: "image/png" }],
    shortcut: "/images/hongxu-logo-loading.png?v=2",
    apple: "/images/hongxu-logo.png?v=2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${forum.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }}
        />
        {children}
        <FloatingActions />
        <MobileAppNav />
        <PageTransition />
        <PwaRegister />
      </body>
    </html>
  );
}
