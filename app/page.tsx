"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AboutStudioSlider from "@/components/about-studio-slider";
import SiteFooter from "@/components/site-footer";
import FullscreenMenu from "@/components/fullscreen-menu";

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

const services = [
  { title: "Weight Loss", image: "/images/services/weight-loss.webp", detail: "Personalized, medically guided support shaped around your goals and lifestyle." },
  { title: "Botox", image: "/images/services/botox.webp", detail: "Precise treatment planning for a refreshed look that still feels naturally you." },
  { title: "Dermal Fillers", image: "/images/services/dermal-fillers.webp", detail: "Thoughtful enhancement designed to restore balance, softness and proportion." },
  { title: "IV Therapy", image: "/images/services/iv-therapy.webp", detail: "Hydration and nutrient support selected around how you want to feel." },
  { title: "Injections", image: "/images/services/injections.webp", detail: "Wellness-focused injectable options offered in a discreet private setting." },
  { title: "Skincare", image: "/images/services/skincare.webp", detail: "Personalized facial care for tone, texture and healthy-looking radiance." },
  { title: "Massage Therapy", image: "/images/services/massage-therapy.webp", detail: "Restorative bodywork created to release tension and help you reset." },
];

const galleryCases = [
  {
    title: "Glutathione IV",
    before: "/image/gallery/glutathione-iv-before.webp",
    after: "/image/gallery/glutathione-iv-after.webp",
  },
  {
    title: "Immunity IV",
    before: "/image/gallery/immunity-iv-before.webp",
    after: "/image/gallery/immunity-iv-after.webp",
  },
];

// Sample copy for layout preview only. Replace with verified customer reviews before publishing.
const sampleReviews = [
  {
    name: "Sophia R.",
    service: "Skincare Facial",
    review: "The whole experience felt calm, thoughtful, and completely personalized. My skin looked refreshed, and I left feeling genuinely cared for.",
  },
  {
    name: "Maya T.",
    service: "Massage Therapy",
    review: "Such a beautiful, relaxing space. The treatment was attentive from start to finish, and I felt a noticeable difference afterward.",
  },
  {
    name: "Olivia C.",
    service: "Wellness Consultation",
    review: "Everything was explained clearly and never felt rushed. The team listened to what I wanted and made the entire visit feel effortless.",
  },
  {
    name: "Emma L.",
    service: "IV Therapy",
    review: "A peaceful, polished experience from arrival to finish. I felt comfortable, informed, and wonderfully refreshed afterward.",
  },
  {
    name: "Ava N.",
    service: "Botox",
    review: "The result looks soft and natural, exactly as I hoped. I especially appreciated the careful consultation and attention to detail.",
  },
  {
    name: "Isabella M.",
    service: "Dermal Fillers",
    review: "I felt listened to throughout my appointment. The approach was subtle, thoughtful, and beautifully suited to my features.",
  },
  {
    name: "Chloe P.",
    service: "Skincare",
    review: "My skin felt smooth and radiant, and the recommendations were easy to understand. I cannot wait for my next visit.",
  },
  {
    name: "Amelia J.",
    service: "Massage Therapy",
    review: "One of the most relaxing treatments I have had. Every detail of the room and service made the visit feel special.",
  },
  {
    name: "Lily K.",
    service: "Weight Loss",
    review: "The plan felt realistic and personal to me. I left every visit feeling encouraged, supported, and confident about my progress.",
  },
  {
    name: "Grace H.",
    service: "Wellness Injection",
    review: "Professional, warm, and efficient. All my questions were answered and the appointment felt completely comfortable.",
  },
  {
    name: "Mia D.",
    service: "Facial Treatment",
    review: "The care was exceptional and never rushed. My complexion looked brighter, calmer, and noticeably more refreshed.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="arrow-icon">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ReviewsCarousel() {
  const [activeReview, setActiveReview] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(5);

  const maxStart = Math.max(0, sampleReviews.length - visibleReviews);
  const slideStep = visibleReviews === 1 ? 1 : 2;
  const slideStarts = useMemo(
    () => Array.from({ length: Math.ceil(maxStart / slideStep) + 1 }, (_, index) => Math.min(index * slideStep, maxStart))
      .filter((start, index, starts) => index === 0 || start !== starts[index - 1]),
    [maxStart, slideStep],
  );

  useEffect(() => {
    const updateVisibleReviews = () => {
      const nextVisible = window.innerWidth <= 680 ? 1 : window.innerWidth <= 1180 ? 2 : 5;
      setVisibleReviews(nextVisible);
      setActiveReview((current) => Math.min(current, sampleReviews.length - nextVisible));
    };

    const frame = window.requestAnimationFrame(updateVisibleReviews);
    window.addEventListener("resize", updateVisibleReviews);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateVisibleReviews);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveReview((current) => {
        const currentSlide = slideStarts.indexOf(current);
        return slideStarts[(currentSlide + 1) % slideStarts.length] ?? 0;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slideStarts]);

  const showPrevious = () => {
    setActiveReview((current) => {
      const currentSlide = slideStarts.indexOf(current);
      return slideStarts[(currentSlide - 1 + slideStarts.length) % slideStarts.length] ?? 0;
    });
  };

  const showNext = () => {
    setActiveReview((current) => {
      const currentSlide = slideStarts.indexOf(current);
      return slideStarts[(currentSlide + 1) % slideStarts.length] ?? 0;
    });
  };

  return (
    <div className="reviews-carousel" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="reviews-viewport">
        <div
          className="reviews-track"
          style={{ transform: `translateX(calc(-${activeReview} * ((100% - ${(visibleReviews - 1) * 20}px) / ${visibleReviews} + 20px)))` }}
        >
          {sampleReviews.map((item, index) => (
            <article
              className="review-card"
              key={item.name}
              aria-hidden={index < activeReview || index >= activeReview + visibleReviews}
              style={{ flexBasis: `calc((100% - ${(visibleReviews - 1) * 20}px) / ${visibleReviews})` }}
            >
              <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{item.review}”</blockquote>
              <footer>
                <span className="review-avatar" aria-hidden="true">{item.name.charAt(0)}</span>
                <span><strong>{item.name}</strong><small>{item.service}</small></span>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className="reviews-controls">
        <button className="review-arrow review-arrow-previous" type="button" onClick={showPrevious} aria-label="Previous review"><ArrowIcon /></button>
        <div className="review-dots" aria-label="Choose a review">
          {slideStarts.map((start, index) => (
            <button
              className={start === activeReview ? "is-active" : ""}
              type="button"
              onClick={() => setActiveReview(start)}
              aria-label={`Show review group ${index + 1}`}
              aria-current={start === activeReview ? "true" : undefined}
              key={start}
            />
          ))}
        </div>
        <button className="review-arrow" type="button" onClick={showNext} aria-label="Next review"><ArrowIcon /></button>
      </div>
    </div>
  );
}

function GalleryComparison({ item, index }: { item: (typeof galleryCases)[number]; index: number }) {
  const [position, setPosition] = useState(50);
  const activePointer = useRef<number | null>(null);

  const updatePositionFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextPosition = ((event.clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(98, Math.max(2, nextPosition)));
  };

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePositionFromPointer(event);
  };

  const continueDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current === event.pointerId) updatePositionFromPointer(event);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <article className="gallery-result-card">
      <div
        className="gallery-comparison"
        onPointerDown={startDragging}
        onPointerMove={continueDragging}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <img
          className="gallery-comparison-image"
          src={item.before}
          alt={`Before ${item.title} treatment`}
          width="1600"
          height="1600"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <div className="gallery-after-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            className="gallery-comparison-image"
            src={item.after}
            alt={`After ${item.title} treatment`}
            width="1600"
            height="1600"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>

        <span className="gallery-image-label gallery-label-before">Before</span>
        <span className="gallery-image-label gallery-label-after">After</span>
        <div className="gallery-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span><i>&lsaquo;</i><i>&rsaquo;</i></span>
        </div>
        <input
          className="gallery-range"
          type="range"
          min="2"
          max="98"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Drag to compare before and after ${item.title}`}
        />
      </div>

      <footer className="gallery-service-note">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><small>Service</small><h3>{item.title}</h3></div>
        <p>Drag to compare</p>
      </footer>
    </article>
  );
}

function BeforeAfterPortrait() {
  const [position, setPosition] = useState(6);
  const [isScanning, setIsScanning] = useState(true);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const activePointer = useRef<number | null>(null);
  const scanAnimationFrame = useRef<number | null>(null);
  const selectedTreatment = activeInsight
    ? treatmentInsights.find((item) => item.id === activeInsight) ?? null
    : null;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const settleFrame = window.requestAnimationFrame(() => {
        setPosition(56);
        setIsScanning(false);
      });
      return () => window.cancelAnimationFrame(settleFrame);
    }

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
      if (t < 1) scanAnimationFrame.current = requestAnimationFrame(animate);
      else {
        scanAnimationFrame.current = null;
        setIsScanning(false);
      }
    };
    scanAnimationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (scanAnimationFrame.current !== null) cancelAnimationFrame(scanAnimationFrame.current);
      scanAnimationFrame.current = null;
    };
  }, []);

  const handlePosition = (value: number) => {
    if (scanAnimationFrame.current !== null) {
      cancelAnimationFrame(scanAnimationFrame.current);
      scanAnimationFrame.current = null;
    }
    setIsScanning(false);
    setPosition(value);
  };

  const updatePositionFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextPosition = ((event.clientX - bounds.left) / bounds.width) * 100;
    handlePosition(Math.min(98, Math.max(2, nextPosition)));
  };

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest("button")) return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePositionFromPointer(event);
  };

  const continueDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current === event.pointerId) updatePositionFromPointer(event);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={`portrait-composition ${isScanning ? "is-analyzing" : "analysis-ready"}`}>
      <div className="organic-aura" aria-hidden="true">
        <i /><i /><i />
      </div>
      <svg className="silk-ribbon" viewBox="0 0 820 720" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ribbonGold" x1="70" y1="570" x2="730" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".43" stopColor="#ffffff" stopOpacity=".5" />
            <stop offset=".7" stopColor="#fff0c6" stopOpacity=".22" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M42 596C182 521 170 272 348 183C487 113 648 172 783 55" stroke="url(#ribbonGold)" strokeWidth="1.2" />
        <path d="M8 631C194 583 232 370 365 305C518 230 680 300 814 181" stroke="url(#ribbonGold)" strokeWidth=".55" opacity=".6" />
      </svg>
      <div className="portrait-frame">
        <div className="portrait-glow" aria-hidden="true" />
        <div
          className="portrait-crop"
          onPointerDown={startDragging}
          onPointerMove={continueDragging}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <img
            src="/image/gallery/before.webp"
            alt="Before treatment portrait showing natural skin texture"
            className="portrait-image"
            width="760"
            height="760"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <div
            className="after-layer"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src="/image/gallery/after.webp"
              alt="After treatment portrait showing a refreshed appearance"
              className="portrait-image"
              width="760"
              height="760"
              loading="lazy"
              decoding="async"
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

  return (
    <main id="top" className="site-shell">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-radial" aria-hidden="true" />
        <p className="vertical-signature" aria-hidden="true">Hongxu Wellness · Yakima, Washington</p>

        <header className="hero-header">
          <Link href="/" className="brand" aria-label="Hongxu Wellness home">
            <img className="brand-logo" src="/images/hongxu-logo.png" alt="Hongxu Wellness" width="730" height="728" />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={item.label === "Home" ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>

          <a href="#contact" className="header-booking">
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

        <FullscreenMenu open={menuOpen} active="home" onClose={() => setMenuOpen(false)} />

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              HONGXU Wellness · Yakima, Washington
              <span aria-hidden="true" />
            </p>
            <h1 id="hero-title">
              <span>Wellness,</span>
              <em>beautifully yours.</em>
            </h1>
            <p className="hero-description">
              At <strong>HONGXU Wellness</strong>, every visit is thoughtfully tailored to you—from weight management and injectables to IV therapy, skincare and massage, all in one discreet private setting.
            </p>

            <div className="hero-actions">
              <a href="#services" className="primary-button">
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
          <div className="social-links" aria-label="HONGXU Wellness online profiles">
            <a href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer" aria-label="Find HONGXU Wellness on Google Maps" className="social-link">
              <img src="/icons/google.svg" alt="" width="18" height="18" />
            </a>
            <a href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="HONGXU Wellness on Facebook" className="social-link">
              <img src="/icons/facebook.svg" alt="" width="18" height="18" />
            </a>
            <a href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer" aria-label="HONGXU Wellness on Instagram" className="social-link">
              <img src="/icons/instagram.svg" alt="" width="18" height="18" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-ambient" aria-hidden="true" />
        <div className="about-number" aria-hidden="true">About</div>

        <div className="about-layout">
          <div className="about-visual">
            <AboutStudioSlider />
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

            <div className="about-cta-row">
              <a href="#contact" className="about-consultation-button">
                <span>Book a consultation</span><ArrowIcon />
              </a>
              <span className="about-cta-note">Private · Personal · By appointment</span>
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

      <section id="services" className="services-section" aria-labelledby="services-title">
        <div className="services-number" aria-hidden="true">Services</div>
        <div className="services-heading">
          <p className="section-kicker"><span /> Our services</p>
          <h2 id="services-title">Wellness, in <em>every detail.</em></h2>
          <p className="services-description">
            A considered collection of aesthetic and wellness services, personalized for where you are and how you want to feel.
          </p>
          <a href="#contact" className="services-consultation">
            Find your treatment <ArrowIcon />
          </a>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Link className={`service-card service-card-${index + 1}`} href={`/services#${service.title.toLowerCase().replace(/ /g, "-")}`} key={service.title}>
              <img src={service.image} alt={`${service.title} service at HONGXU Wellness`} width="1122" height="1402" loading="lazy" decoding="async" />
              <div className="service-card-shade" aria-hidden="true" />
              <span className="service-card-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="service-card-content">
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                </div>
                <span className="service-card-arrow" aria-hidden="true"><ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-number" aria-hidden="true">Gallery</div>
        <div className="gallery-heading">
          <p className="section-kicker"><span /> Before &amp; after</p>
          <h2 id="gallery-title">See the <em>difference.</em></h2>
          <p>Explore our work up close. Drag the slider across the image to compare the before and after result.</p>
        </div>

        <div className="gallery-results-grid">
          {galleryCases.map((item, index) => <GalleryComparison item={item} index={index} key={item.title} />)}
        </div>
        <p className="gallery-results-note">Individual results may vary.</p>
        <div className="gallery-action-row">
          <p><strong>Ready for your next step?</strong><span>Let&apos;s create a treatment plan shaped around you.</span></p>
          <a className="gallery-action" href="#contact">Book a consultation <ArrowIcon /></a>
        </div>
      </section>

      <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="reviews-number" aria-hidden="true">Reviews</div>
        <div className="reviews-heading">
          <p className="section-kicker"><span /> Kind words</p>
          <h2 id="reviews-title">Loved by <em>our clients.</em></h2>
          <p>Thoughtful care, personal attention, and experiences designed around every client.</p>
        </div>

        <ReviewsCarousel />
        <p className="reviews-demo-note">Sample testimonials for design preview — replace with verified customer feedback before publishing.</p>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-watermark" aria-hidden="true">Contact</div>
        <div className="contact-layout">
          <div className="contact-intro">
            <p className="section-kicker"><span /> Get in touch</p>
            <h2 id="contact-title">Let&apos;s begin <em>with you.</em></h2>
            <p>Have a question or ready to plan your visit? Connect with HONGXU Wellness to find the care that feels right for you.</p>
            <div className="contact-actions">
              <a className="contact-primary" href="tel:+12066019801">Call 206-601-9801 <ArrowIcon /></a>
              <a className="contact-secondary" href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer">Get directions <ArrowIcon /></a>
            </div>
          </div>

          <div className="contact-details">
            <article className="contact-card contact-location">
              <span>Visit our studio</span>
              <h3>HONGXU Wellness</h3>
              <p>6101 Summitview Ave<br />Ste 120, Room #17<br />Yakima, WA 98908</p>
              <small>Private studio · By appointment</small>
            </article>
            <article className="contact-card">
              <span>Studio hours</span>
              <div className="contact-hours"><p>Monday–Friday</p><strong>9:30 AM–8 PM</strong></div>
              <div className="contact-hours"><p>Saturday–Sunday</p><strong>Closed</strong></div>
            </article>
            <article className="contact-card contact-connect">
              <span>Follow along</span>
              <div>
                <a href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer"><span><img src="/icons/google.svg" alt="" />Google</span><ArrowIcon /></a>
                <a href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer"><span><img src="/icons/facebook.svg" alt="" />Facebook</span><ArrowIcon /></a>
                <a href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer"><span><img src="/icons/instagram.svg" alt="" />Instagram</span><ArrowIcon /></a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
