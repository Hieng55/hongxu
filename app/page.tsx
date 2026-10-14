"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

const treatmentInsights = [
  {
    id: "botox",
    title: "Botox",
    area: "Expression areas",
    description: "A precise, personalized approach to common expression areas.",
  },
  {
    id: "skincare",
    title: "Skincare Facial",
    area: "Skin tone & texture",
    description: "Facial care selected around your skin and appointment goals.",
  },
  {
    id: "fillers",
    title: "Dermal Fillers",
    area: "Facial balance",
    description: "Thoughtful treatment planning focused on balance and proportion.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-monogram" aria-hidden="true">
      <span>H</span>
      <i />
    </span>
  );
}

function BeforeAfterPortrait() {
  const [position, setPosition] = useState(6);
  const [isScanning, setIsScanning] = useState(true);
  const [activeInsight, setActiveInsight] = useState("botox");
  const selectedTreatment = treatmentInsights.find((item) => item.id === activeInsight) ?? treatmentInsights[0];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setPosition(56);
      setIsScanning(false);
      return;
    }

    let frame = 0;
    const started = performance.now() + 1850;
    const duration = 3100;
    const animate = (now: number) => {
      const t = Math.max(0, Math.min((now - started) / duration, 1));
      let next: number;
      if (t < 0.78) {
        const sweep = t / 0.78;
        const eased = 1 - Math.pow(1 - sweep, 3);
        next = 5 + 73 * eased;
      } else {
        const settle = (t - 0.78) / 0.22;
        const eased = settle * settle * (3 - 2 * settle);
        next = 78 - 22 * eased;
      }
      setPosition(next);
      if (t < 1) frame = requestAnimationFrame(animate);
      else setIsScanning(false);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handlePosition = (value: number) => {
    setIsScanning(false);
    setPosition(value);
  };

  return (
    <div className={`portrait-composition ${isScanning ? "is-analyzing" : "analysis-ready"}`}>
      <div className="organic-aura" aria-hidden="true">
        <i /><i /><i />
      </div>
      <svg className="silk-ribbon" viewBox="0 0 820 720" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ribbonGold" x1="70" y1="570" x2="730" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0d090" stopOpacity="0" />
            <stop offset=".43" stopColor="#f0d090" stopOpacity=".5" />
            <stop offset=".7" stopColor="#fff0c6" stopOpacity=".22" />
            <stop offset="1" stopColor="#f0d090" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M42 596C182 521 170 272 348 183C487 113 648 172 783 55" stroke="url(#ribbonGold)" strokeWidth="1.2" />
        <path d="M8 631C194 583 232 370 365 305C518 230 680 300 814 181" stroke="url(#ribbonGold)" strokeWidth=".55" opacity=".6" />
      </svg>
      <div className="portrait-frame">
        <div className="portrait-glow" aria-hidden="true" />
        <div className="portrait-crop">
          <img
            src="/images/before.png"
            alt="Before treatment portrait showing natural skin texture"
            className="portrait-image"
            width="760"
            height="760"
            draggable="false"
          />
          <div
            className="after-layer"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src="/images/after.png"
              alt="After treatment portrait showing a refreshed appearance"
              className="portrait-image"
              width="760"
              height="760"
              draggable="false"
            />
            <img
              src="/images/before.png"
              alt=""
              className="portrait-image after-hair-match"
              width="760"
              height="760"
              draggable="false"
              aria-hidden="true"
            />
          </div>

          <span className="image-label image-label-before">Before</span>
          <span className="image-label image-label-after">After</span>

          <div
            className={`scan-divider ${isScanning ? "is-scanning" : ""}`}
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <span className="scan-beam" />
            <span className="scan-handle">
              <i>‹</i><i>›</i>
            </span>
          </div>

          <input
            aria-label="Drag to compare before and after treatment"
            className="comparison-range"
            type="range"
            min="2"
            max="98"
            value={position}
            onChange={(event) => handlePosition(Number(event.target.value))}
          />

          <div className="face-insights" aria-label="Featured treatment points">
            <button
              type="button"
              className={`face-marker marker-botox ${activeInsight === "botox" ? "is-active" : ""}`}
              aria-pressed={activeInsight === "botox"}
              onClick={() => setActiveInsight("botox")}
              onMouseEnter={() => setActiveInsight("botox")}
              onFocus={() => setActiveInsight("botox")}
            >
              <span className="marker-label"><b>Botox</b></span>
              <span className="marker-line" /><span className="treatment-dot" />
            </button>
            <button
              type="button"
              className={`face-marker marker-skincare ${activeInsight === "skincare" ? "is-active" : ""}`}
              aria-pressed={activeInsight === "skincare"}
              onClick={() => setActiveInsight("skincare")}
              onMouseEnter={() => setActiveInsight("skincare")}
              onFocus={() => setActiveInsight("skincare")}
            >
              <span className="treatment-dot" /><span className="marker-line" />
              <span className="marker-label"><b>Skincare</b></span>
            </button>
            <button
              type="button"
              className={`face-marker marker-fillers ${activeInsight === "fillers" ? "is-active" : ""}`}
              aria-pressed={activeInsight === "fillers"}
              onClick={() => setActiveInsight("fillers")}
              onMouseEnter={() => setActiveInsight("fillers")}
              onFocus={() => setActiveInsight("fillers")}
            >
              <span className="marker-label"><b>Dermal Fillers</b></span>
              <span className="marker-line" /><span className="treatment-dot" />
            </button>
          </div>
        </div>

        <div className="treatment-readout" aria-live="polite">
          <span className="readout-number">{String(treatmentInsights.indexOf(selectedTreatment) + 1).padStart(2, "0")}</span>
          <span className="readout-rule" />
          <div>
            <small>{selectedTreatment.area}</small>
            <p><strong>{selectedTreatment.title}</strong> — {selectedTreatment.description}</p>
          </div>
        </div>
        <p className="treatment-note">Drag to compare · Select a glowing point to explore</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const moveLight = (event: PointerEvent<HTMLElement>) => {
    if (!heroRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    const mx = px / 50 - 1;
    const my = py / 50 - 1;
    heroRef.current.style.setProperty("--pointer-x", `${px}%`);
    heroRef.current.style.setProperty("--pointer-y", `${py}%`);
    heroRef.current.style.setProperty("--move-x", `${mx}`);
    heroRef.current.style.setProperty("--move-y", `${my}`);
  };

  return (
    <main className="min-h-svh overflow-hidden bg-[#06162f] text-[#fff8ed]">
      <section ref={heroRef} onPointerMove={moveLight} className="hero-section" aria-labelledby="hero-title">
        <div className="cinematic-intro" aria-hidden="true">
          <div className="intro-panel intro-panel-left" />
          <div className="intro-panel intro-panel-right" />
          <div className="intro-signature">
            <span>HW</span>
            <i />
            <p>Wellness, refined.</p>
          </div>
        </div>
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-radial" aria-hidden="true" />
        <div className="pointer-light" aria-hidden="true" />
        <p className="vertical-signature" aria-hidden="true">Hongxu Wellness · Yakima, Washington</p>

        <header className="hero-header">
          <a href="/" className="brand" aria-label="Hongxu Wellness home">
            <BrandMark />
            <span>
              <b>HONGXU</b>
              <small>WELLNESS</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={item.label === "Home" ? "active" : ""}>
                {item.label}
              </a>
            ))}
          </nav>

          <a href="/contact" className="header-booking">
            <span>Book an appointment</span><ArrowIcon />
          </a>

          <button
            type="button"
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </header>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
        )}

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Yakima&apos;s private wellness destination</p>
            <h1 id="hero-title">
              <span>Wellness,</span>
              <em>beautifully yours.</em>
            </h1>
            <p className="hero-description">
              Personalized weight management, injectables, IV therapy, skincare and massage—thoughtfully curated in one private setting.
            </p>

            <div className="hero-actions">
              <a href="/services" className="primary-button">
                Explore our services <ArrowIcon />
              </a>
              <a href="tel:+12066019801" className="text-link">
                <span>206-601-9801</span><i aria-hidden="true" />
              </a>
            </div>

            <div className="hero-proof">
              <span className="proof-monogram">HW</span>
              <p><strong>By appointment only.</strong><br />Room #17 · Yakima, WA</p>
            </div>
          </div>

          <BeforeAfterPortrait />
        </div>

        <div className="hero-footer">
          <p>6101 Summitview Ave Ste 120 · Yakima, WA 98908</p>
          <div className="footer-values">
            <span>Weight Loss</span><i />
            <span>IV Therapy</span><i />
            <span>Massage Therapy</span>
          </div>
          <a href="https://instagram.com" aria-label="Instagram" className="social-link">
            <img src="/icons/instagram.svg" alt="" width="17" height="17" />
          </a>
        </div>
      </section>
    </main>
  );
}
