import type { Metadata } from "next";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery | HONGXU Wellness",
  description: "Explore before and after results from HONGXU Wellness in Yakima, Washington.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
