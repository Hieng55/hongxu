import type { Metadata } from "next";
import ServicesClient from "./services-client";
import { SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "View pricing for weight management, Botox, dermal fillers, IV therapy, wellness injections, skincare, and massage at HONGXU Wellness in Yakima.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HONGXU Wellness",
    url: "/services",
    title: "Services & Pricing at HONGXU Wellness",
    description: "Explore personalized aesthetics and wellness services at our private Yakima studio.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing at HONGXU Wellness",
    description: "Explore personalized aesthetics and wellness services at our private Yakima studio.",
    images: [SOCIAL_IMAGE.url],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
