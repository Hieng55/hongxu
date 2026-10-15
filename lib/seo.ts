export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hongxuwellness.com").replace(/\/$/, "");

export const BUSINESS_NAME = "HONGXU Wellness";
export const DEFAULT_DESCRIPTION =
  "Private wellness and aesthetics studio in Yakima offering personalized weight management, Botox, dermal fillers, IV therapy, skincare, massage, and wellness injections.";

export const SOCIAL_IMAGE = {
  url: "/images/about-treatment-room.jpg",
  width: 1086,
  height: 1448,
  alt: "Private treatment room at HONGXU Wellness in Yakima, Washington",
};

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  image: absoluteUrl(SOCIAL_IMAGE.url),
  logo: absoluteUrl("/images/hongxu-logo.png"),
  telephone: "+1-206-601-9801",
  priceRange: "$$",
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6101 Summitview Ave, Suite 120, Room 17",
    addressLocality: "Yakima",
    addressRegion: "WA",
    postalCode: "98908",
    addressCountry: "US",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "20:00",
  }],
  sameAs: [
    "https://www.instagram.com/hongxuwellness/",
    "https://www.facebook.com/hongxuwellness/",
    "https://www.vagaro.com/hongxugong",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wellness and aesthetic services",
    itemListElement: [
      "Weight management", "Botox", "Dermal fillers", "IV therapy",
      "Wellness injections", "Skincare facials", "Massage therapy",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};
