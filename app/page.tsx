"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
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
    <span className="relative grid h-11 w-11 place-items-center" aria-hidden="true">
      <span className="absolute h-9 w-[19px] rotate-45 rounded-[100%] border border-[#f0d090]/80" />
      <span className="absolute h-9 w-[19px] -rotate-45 rounded-[100%] border border-[#f0d090]/45" />
      <span className="font-forum text-[17px] text-[#f0d090]">M</span>
    </span>
  );
}

function BeforeAfterPortrait() {
  const [position, setPosition] = useState(6);
  const [isScanning, setIsScanning] = useState(true);

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
      <div className="gold-orbit" aria-hidden="true" />
      <div className="orbit-sparkles" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
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

          <div className="face-insights" aria-hidden="true">
            <span className="face-marker marker-radiance"><i />Radiance</span>
            <span className="face-marker marker-texture"><i />Texture</span>
            <span className="face-marker marker-balance"><i />Balance</span>
          </div>
        </div>

        <div className="portrait-caption">
          <span>01</span>
          <p>Drag to reveal</p>
          <span className="h-px flex-1 bg-[#f0d090]/25" />
          <p>Signature skin renewal</p>
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
            <span>ME</span>
            <i />
            <p>Beauty, considered.</p>
          </div>
        </div>
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-radial" aria-hidden="true" />
        <div className="pointer-light" aria-hidden="true" />
        <p className="vertical-signature" aria-hidden="true">The art of subtle transformation</p>

        <header className="hero-header">
          <a href="/" className="brand" aria-label="Maison Éclat home">
            <BrandMark />
            <span>
              <b>MAISON ÉCLAT</b>
              <small>AESTHETIC ATELIER</small>
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
            <span>Book a consultation</span><ArrowIcon />
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
            <p className="eyebrow"><span /> Bespoke beauty, thoughtfully refined</p>
            <h1 id="hero-title">
              <span>Reveal your</span>
              <em>radiance.</em>
            </h1>
            <p className="hero-description">
              A considered approach to modern aesthetics—where clinical precision, artistry and your natural beauty exist in perfect balance.
            </p>

            <div className="hero-actions">
              <a href="/services" className="primary-button">
                Explore our treatments <ArrowIcon />
              </a>
              <a href="/about" className="text-link">
                <span>Our philosophy</span><i aria-hidden="true" />
              </a>
            </div>

            <div className="hero-proof">
              <span className="proof-monogram">ME</span>
              <p><strong>Elevated results.</strong><br />Never an altered you.</p>
            </div>
          </div>

          <BeforeAfterPortrait />
        </div>

        <div className="hero-footer">
          <p>Private consultations · Bangkok</p>
          <div className="footer-values">
            <span>Physician-led care</span><i />
            <span>Tailored protocols</span><i />
            <span>Beautifully subtle results</span>
          </div>
          <a href="https://instagram.com" aria-label="Instagram" className="social-link">
            <img src="/icons/instagram.svg" alt="" width="17" height="17" />
          </a>
        </div>
      </section>
    </main>
  );
}
