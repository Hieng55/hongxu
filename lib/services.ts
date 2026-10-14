export type ServiceItem = {
  name: string;
  price: string;
  detail?: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  items: ServiceItem[];
};

// Source: current Hongxu Wellness service menu supplied by the business.
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "weight-loss",
    name: "Weight Loss",
    items: [
      { name: "Semaglutide", price: "$199 / month" },
      { name: "Tirzepatide", price: "$299 / month" },
    ],
  },
  {
    slug: "botox",
    name: "Botox",
    items: [{ name: "Botox", price: "$10 / unit" }],
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    items: [{ name: "Dermal Fillers", price: "$400 / syringe" }],
  },
  {
    slug: "iv-therapy",
    name: "IV Therapy",
    items: [
      { name: "Immunity IV", price: "$175" },
      { name: "NAD+ IV", price: "$250 / $500" },
      { name: "Myers' Cocktail", price: "$175" },
      { name: "Get Up & Go", price: "$175" },
      { name: "Glutathione IV", detail: "1000 mg", price: "$150" },
      { name: "Glutathione IV", detail: "2000 mg", price: "$175" },
      { name: "Glutathione IV", detail: "3000 mg", price: "$195" },
      { name: "Hangover IV", price: "$175" },
    ],
  },
  {
    slug: "skincare",
    name: "Skincare",
    items: [
      { name: "Facial", detail: "60 min", price: "$75" },
      { name: "Facial", detail: "90 min", price: "$90" },
      { name: "Senior Facial", detail: "60 min", price: "$65" },
    ],
  },
  {
    slug: "massage-therapy",
    name: "Massage Therapy",
    items: [
      { name: "Massage", detail: "60 min", price: "$75" },
      { name: "Massage", detail: "90 min", price: "$105" },
      { name: "Senior Massage", detail: "60 min", price: "$65" },
    ],
  },
];

export const massageAddOns: ServiceItem[] = [
  { name: "Cupping", price: "$15" },
  { name: "Hot Stone", price: "$15" },
  { name: "Warm Oil Back Scrub", price: "$15" },
  { name: "Hot Oil Scalp Massage", price: "$15" },
];

export const businessDetails = {
  name: "Hongxu Wellness",
  phone: "206-601-9801",
  phoneHref: "tel:+12066019801",
  address: "6101 Summitview Ave Ste 120, Yakima, WA 98908",
  room: "Room #17",
  availability: "By Appointment Only",
};
