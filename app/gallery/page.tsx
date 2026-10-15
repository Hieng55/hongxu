import type { Metadata } from "next";
import GalleryClient from "./gallery-client";
import { SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description: "Explore before and after results from personalized treatments at HONGXU Wellness in Yakima, Washington. Individual results may vary.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HONGXU Wellness",
    url: "/gallery",
    title: "HONGXU Wellness Before & After Gallery",
    description: "Explore treatment results from our private aesthetics and wellness studio in Yakima.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "HONGXU Wellness Before & After Gallery",
    description: "Explore treatment results from our private aesthetics and wellness studio in Yakima.",
    images: [SOCIAL_IMAGE.url],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
