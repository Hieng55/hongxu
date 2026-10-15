import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services & Pricing | HONGXU Wellness",
  description: "Explore weight loss, injectables, IV therapy, skincare, and massage services at HONGXU Wellness in Yakima.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
