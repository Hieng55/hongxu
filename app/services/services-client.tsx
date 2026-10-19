"use client";

import { useEffect, useState } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

type ServiceItem = {
  name: string;
  price: string;
  unit?: string;
  ingredients?: string;
  detail?: string;
};

type ServiceTab = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  note?: string;
  items: ServiceItem[];
};

const serviceTabs: ServiceTab[] = [
  {
    id: "weight-loss",
    label: "Weight Loss",
    eyebrow: "Medical wellness",
    title: "Weight Loss",
    description: "Personalized, medically guided support designed around your goals, comfort, and everyday lifestyle.",
    image: "/images/services/weight-loss.webp",
    items: [
      { name: "Semaglutide", price: "$199", unit: "/ month" },
      { name: "Tirzepatide", price: "$299", unit: "/ month" },
    ],
  },
  {
    id: "botox",
    label: "Botox",
    eyebrow: "Aesthetic care",
    title: "Botox",
    description: "A precise, personalized approach to common expression areas, with results designed to feel refreshed and naturally yours.",
    image: "/images/services/botox.webp",
    items: [{ name: "Botox", price: "$10", unit: "/ unit" }],
  },
  {
    id: "dermal-fillers",
    label: "Dermal Fillers",
    eyebrow: "Aesthetic care",
    title: "Dermal Fillers",
    description: "Thoughtful enhancement centered on facial balance, softness, and proportion.",
    image: "/images/services/dermal-fillers.webp",
    items: [{ name: "Dermal Fillers", price: "$400", unit: "/ syringe" }],
  },
  {
    id: "iv-therapy",
    label: "IV Therapy",
    eyebrow: "Intravenous wellness",
    title: "IV Therapy",
    description: "Customized fluids, vitamins, minerals, and antioxidants, selected with your individual wellness goals in mind.",
    image: "/images/services/iv-therapy.webp",
    note: "All IV treatments are provided by appointment following an individual consultation.",
    items: [
      { name: "Immunity IV", price: "$175", ingredients: "Ascorbic acid, vitamin complex, zinc sulfate", detail: "Designed to support immunity and promote overall wellness." },
      { name: "NAD+ IV", price: "$250 / $500", ingredients: "Nicotinamide adenine dinucleotide", detail: "Designed to support energy, mental clarity, focus, mood, and metabolic health." },
      { name: "Myers Cocktail", price: "$175", ingredients: "Magnesium chloride, B-complex, hydroxo B12, calcium gluconate, ascorbic acid", detail: "Designed to support hydration, relaxation, immunity, and healthy muscle and nerve function." },
      { name: "Get Up & Go", price: "$175", ingredients: "Vitamin complex, amino blend", detail: "Designed to support energy levels, mood, metabolism, and athletic performance." },
      { name: "Glutathione IV", price: "From $150", ingredients: "1000mg $150 · 2000mg $175 · 3000mg $195", detail: "Antioxidant support for metabolic detoxification, oxidative balance, and complexion." },
      { name: "Hangover IV", price: "$175", ingredients: "1L NS, Zofran, Toradol", detail: "Designed to hydrate and help alleviate nausea, headache, aches, and fatigue." },
    ],
  },
  {
    id: "injections",
    label: "Injections",
    eyebrow: "À la carte wellness",
    title: "Wellness Injections",
    description: "Simple, focused options selected with your individual wellness needs in mind.",
    image: "/images/services/injections.webp",
    items: [
      { name: "Vitamin D", price: "$25" },
      { name: "Vitamin B12", price: "$25" },
      { name: "Biotin", price: "$25" },
      { name: "NAD+", price: "$50" },
      { name: "MICC", price: "$20" },
    ],
  },
  {
    id: "skincare",
    label: "Skincare",
    eyebrow: "Skin health",
    title: "Skincare",
    description: "Personalized facial care created to support healthy-looking tone, texture, and radiance.",
    image: "/images/services/skincare.webp",
    items: [
      { name: "60 min Facial", price: "$75" },
      { name: "90 min Facial", price: "$90" },
      { name: "Senior 60 min Facial", price: "$65" },
    ],
  },
  {
    id: "massage-therapy",
    label: "Massage",
    eyebrow: "Restorative body care",
    title: "Massage Therapy",
    description: "Restorative bodywork in a quiet private setting, created to release tension and help you reset.",
    image: "/images/services/massage-therapy.webp",
    note: "Add-ons $15 each: Cupping, Hot Stone, Warm Oil Back Scrub, or Hot Oil Scalp Massage.",
    items: [
      { name: "60 min Massage", price: "$75" },
      { name: "90 min Massage", price: "$105" },
      { name: "Senior 60 min Massage", price: "$65" },
    ],
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export default function ServicesClient() {
  const [activeId, setActiveId] = useState(serviceTabs[0].id);
  const activeService = serviceTabs.find((service) => service.id === activeId) ?? serviceTabs[0];

  useEffect(() => {
    const requestedService = decodeURIComponent(window.location.hash.slice(1));
    const scrollFrame = window.requestAnimationFrame(() => {
      if (serviceTabs.some((service) => service.id === requestedService)) {
        setActiveId(requestedService);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(scrollFrame);
  }, []);

  return (
    <main id="top" className="wellness-tabs-page">
      <SiteHeader active="services" />

      <section id="services-menu" className="wm-tabs" aria-labelledby="wm-tabs-title">
        <div className="wm-tabs-heading">
          <p><span /> HONGXU Wellness menu <span /></p>
          <h1 id="wm-tabs-title">Care, chosen <em>for you.</em></h1>
          <div>Explore our treatments and select a service to view details and pricing.</div>
        </div>

        <div className="wm-tab-shell">
          <div className="wm-tab-list-wrap">
            <div className="wm-tab-list" role="tablist" aria-label="Choose a service">
              {serviceTabs.map((service, index) => (
                <button
                  id={`tab-${service.id}`}
                  className={service.id === activeId ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={service.id === activeId}
                  aria-controls={`panel-${service.id}`}
                  onClick={() => setActiveId(service.id)}
                  key={service.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>{service.label}
                </button>
              ))}
            </div>
          </div>

          <article
            id={`panel-${activeService.id}`}
            className={`wm-tab-panel ${activeService.id === "iv-therapy" ? "is-detailed" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            key={activeService.id}
          >
            <div className="wm-tab-image">
              <img src={activeService.image} alt={`${activeService.title} at HONGXU Wellness`} width="1122" height="1402" decoding="async" />
              <span>Private care · By appointment</span>
            </div>

            <div className="wm-tab-content">
              <p className="wm-tab-eyebrow">{activeService.eyebrow}</p>
              <h2>{activeService.title}</h2>
              <p className="wm-tab-description">{activeService.description}</p>

              <div className="wm-tab-prices">
                {activeService.items.map((item) => (
                  <div className="wm-tab-price-item" key={item.name}>
                    <div className="wm-tab-price-line">
                      <h3>{item.name}</h3><i aria-hidden="true" /><strong>{item.price}<small>{item.unit}</small></strong>
                    </div>
                    {item.ingredients && <span>{item.ingredients}</span>}
                    {item.detail && <p>{item.detail}</p>}
                  </div>
                ))}
              </div>

              {activeService.note && <p className="wm-tab-note">{activeService.note}</p>}
              <a className="wm-tab-book" href="https://www.vagaro.com/hongxugong" target="_blank" rel="noreferrer">Book this service <ArrowIcon /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="wm-tabs-closing" aria-labelledby="wm-closing-title">
        <p>Private · Personal · By appointment</p>
        <h2 id="wm-closing-title">Let&apos;s begin <em>with you.</em></h2>
        <div><a href="tel:+12066019801">Call 206-601-9801 <ArrowIcon /></a><span>6101 Summitview Ave, Ste 120<br />Room #17 · Yakima, WA 98908</span></div>
      </section>

      <SiteFooter />
    </main>
  );
}
