"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "#about" },
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

function BeforeAfterPortrait() {
  const [position, setPosition] = useState(6);
  const [isScanning, setIsScanning] = useState(true);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const selectedTreatment = activeInsight
    ? treatmentInsights.find((item) => item.id === activeInsight) ?? null
    : null;

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
              aria-expanded={activeInsight === "botox"}
              onClick={() => setActiveInsight(activeInsight === "botox" ? null : "botox")}
              onMouseEnter={() => setActiveInsight("botox")}
              onMouseLeave={() => setActiveInsight(null)}
              onFocus={() => setActiveInsight("botox")}
              onBlur={() => setActiveInsight(null)}
            >
              <span className="marker-label"><b>Botox</b></span>
              <span className="marker-line" /><span className="treatment-dot" />
            </button>
            <button
              type="button"
              className={`face-marker marker-skincare ${activeInsight === "skincare" ? "is-active" : ""}`}
              aria-expanded={activeInsight === "skincare"}
              onClick={() => setActiveInsight(activeInsight === "skincare" ? null : "skincare")}
              onMouseEnter={() => setActiveInsight("skincare")}
              onMouseLeave={() => setActiveInsight(null)}
              onFocus={() => setActiveInsight("skincare")}
              onBlur={() => setActiveInsight(null)}
            >
              <span className="treatment-dot" /><span className="marker-line" />
              <span className="marker-label"><b>Skincare</b></span>
            </button>
            <button
              type="button"
              className={`face-marker marker-fillers ${activeInsight === "fillers" ? "is-active" : ""}`}
              aria-expanded={activeInsight === "fillers"}
              onClick={() => setActiveInsight(activeInsight === "fillers" ? null : "fillers")}
              onMouseEnter={() => setActiveInsight("fillers")}
              onMouseLeave={() => setActiveInsight(null)}
              onFocus={() => setActiveInsight("fillers")}
              onBlur={() => setActiveInsight(null)}
            >
              <span className="marker-label"><b>Dermal Fillers</b></span>
              <span className="marker-line" /><span className="treatment-dot" />
            </button>
          </div>
        </div>

        <div
          className={`treatment-callout ${selectedTreatment ? "is-visible" : ""} ${activeInsight ? `insight-${activeInsight}` : ""}`}
          aria-live="polite"
        >
          <span className="callout-elbow" aria-hidden="true" />
          {selectedTreatment && (
            <div className="callout-card">
              <small>{selectedTreatment.area}</small>
              <strong>{selectedTreatment.title}</strong>
              <p>{selectedTreatment.description}</p>
            </div>
          )}
        </div>

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
            <img className="brand-logo" src="/images/hongxu-logo.png" alt="Hongxu Wellness" width="730" height="728" />
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
            <p className="eyebrow"><span /> HONGXU Wellness · Yakima, Washington</p>
            <h1 id="hero-title">
              <span>Wellness,</span>
              <em>beautifully yours.</em>
            </h1>
            <p className="hero-description">
              At <strong>HONGXU Wellness</strong>, every visit is thoughtfully tailored to you—from weight management and injectables to IV therapy, skincare and massage, all in one discreet private setting.
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
              <span className="proof-logo-wrap">
                <img src="/images/hongxu-logo.png" alt="HONGXU Wellness" className="proof-logo" width="730" height="728" />
              </span>
              <p><strong>Your private wellness destination.</strong><br />By appointment only · Room #17</p>
            </div>
          </div>

          <BeforeAfterPortrait />
        </div>

        <div className="hero-footer">
          <a className="footer-address" href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer">6101 Summitview Ave Ste 120 · Yakima, WA 98908</a>
          <div className="footer-values">
            <span>Weight Loss</span><i />
            <span>IV Therapy</span><i />
            <span>Massage Therapy</span>
          </div>
          <div className="social-links" aria-label="HONGXU Wellness social media">
            <a href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="HONGXU Wellness on Facebook" className="social-link">
              <img src="/icons/facebook.svg" alt="" width="18" height="18" />
            </a>
            <a href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="HONGXU Wellness on Instagram" className="social-link">
              <img src="/icons/instagram.svg" alt="" width="18" height="18" />
            </a>
          </div>
        </div>
        <div className="hero-transition" aria-hidden="true" />
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-ambient" aria-hidden="true" />
        <div className="about-number" aria-hidden="true">02</div>

        <div className="about-layout">
          <div className="about-visual">
            <div className="about-image-shell">
              <div className="about-image-frame">
                <img src="/images/about-treatment-room.png" alt="Warm and private HONGXU Wellness treatment room in Yakima" width="1086" height="1448" />
                <span className="about-image-line" aria-hidden="true" />
              </div>
              <div className="studio-plaque">
                <span>Private studio</span>
                <strong>Room #17 · Yakima</strong>
              </div>
            </div>
            <div className="about-image-caption">
              <span>Modern aesthetics</span>
              <i />
              <span>Whole-body care</span>
            </div>
          </div>

          <div className="about-content">
            <p className="section-kicker"><span /> The HONGXU approach</p>
            <h2 id="about-title">Care that feels <em>entirely yours.</em></h2>
            <div className="about-story">
              <p className="about-lead">
                HONGXU Wellness is Yakima&apos;s private destination for thoughtful aesthetics and whole-body wellness.
              </p>
              <p className="about-copy">
                Every appointment begins with listening. From weight management and injectables to IV therapy, skincare and massage, your care is shaped around your goals, comfort and natural sense of self.
              </p>
            </div>

            <div className="about-details">
              <div className="hours-card">
                <div className="hours-heading">
                  <span>Studio hours</span>
                  <small>By appointment only</small>
                </div>
                <div className="hours-list">
                  <div className="hours-row"><span>Mon–Fri</span><i aria-hidden="true" /><strong>9:30 AM–8 PM</strong></div>
                  <div className="hours-row is-closed"><span>Sat–Sun</span><i aria-hidden="true" /><strong>Closed</strong></div>
                </div>
              </div>

              <a className="visit-card" href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer">
                <span className="visit-label">Visit our studio</span>
                <p>6101 Summitview Ave<br />Ste 120, Room #17 · Yakima, WA</p>
                <span className="visit-action">Directions <ArrowIcon /></span>
              </a>
            </div>

            <div className="platform-dock" aria-label="Find and follow HONGXU Wellness">
              <div className="platform-intro">
                <span>Find &amp; follow</span>
                <small>HONGXU Wellness</small>
              </div>
              <a className="platform-link platform-google" href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer" aria-label="Find HONGXU Wellness on Google Maps">
                <span className="platform-icon"><img src="/icons/google.svg" alt="" /></span>
                <span><strong>Google</strong><small>Directions</small></span>
              </a>
              <a className="platform-link" href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="Follow HONGXU Wellness on Facebook">
                <span className="platform-icon"><img src="/icons/facebook.svg" alt="" /></span>
                <span><strong>Facebook</strong><small>Follow us</small></span>
              </a>
              <a className="platform-link" href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="Follow HONGXU Wellness on Instagram">
                <span className="platform-icon"><img src="/icons/instagram.svg" alt="" /></span>
                <span><strong>Instagram</strong><small>@hongxuwellness</small></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
