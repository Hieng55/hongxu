"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const slides = [
  {
    src: "/images/about-treatment-room.jpg",
    alt: "HONGXU Wellness aesthetics treatment room in Yakima",
    room: "Aesthetics Treatment Room",
    detail: "Private studio · Room #17",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/aesthetics-treatment-room.webp",
    alt: "HONGXU Wellness aesthetics treatment room with treatment chair and skincare equipment",
    room: "Aesthetics Treatment Room",
    detail: "Treatment chair & skincare equipment",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/massage-therapy-room.webp",
    alt: "HONGXU Wellness massage therapy room with massage table and warm lighting",
    room: "Massage Therapy Room",
    detail: "Quiet space for restorative care",
    width: 1448,
    height: 1086,
  },
];

export default function AboutStudioSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || lightboxOpen || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") setActive((current) => (current - 1 + slides.length) % slides.length);
      if (event.key === "ArrowRight") setActive((current) => (current + 1) % slides.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      openButtonRef.current?.focus();
    };
  }, [lightboxOpen]);

  const showPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActive((current) => (current + 1) % slides.length);

  return (
    <>
      <div
        className="about-image-shell about-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="about-image-frame about-slider-frame" aria-roledescription="carousel" aria-label="Inside HONGXU Wellness">
          {slides.map((slide, index) => (
            <img
              key={slide.src}
              className={`about-slider-image${index === active ? " is-active" : ""}`}
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              aria-hidden={index !== active}
            />
          ))}

          <button
            ref={openButtonRef}
            type="button"
            className="about-slider-open"
            onClick={() => setLightboxOpen(true)}
            aria-label={`View larger: ${slides[active].room}`}
          >
            <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4M11 8v6M8 11h6" /></svg> View photo</span>
          </button>

          <div className="about-slider-controls">
            <button type="button" onClick={showPrevious} aria-label="Previous studio photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6" /></svg>
            </button>
            <div className="about-slider-dots" aria-label="Choose a studio photo">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={index === active ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  aria-label={`Show photo ${index + 1}: ${slide.room}`}
                  aria-current={index === active ? "true" : undefined}
                />
              ))}
            </div>
            <button type="button" onClick={showNext} aria-label="Next studio photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <div className="studio-plaque about-slider-plaque" key={active}>
          <span>{slides[active].room}</span>
          <strong>{slides[active].detail}</strong>
        </div>
      </div>

      {lightboxOpen && typeof document !== "undefined" && createPortal(
        <div
          className="studio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Studio photo viewer"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setLightboxOpen(false);
          }}
        >
          <button ref={closeButtonRef} type="button" className="studio-lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Close photo viewer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          <button type="button" className="studio-lightbox-arrow is-previous" onClick={showPrevious} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </button>

          <figure className="studio-lightbox-content">
            <img src={slides[active].src} alt={slides[active].alt} width={slides[active].width} height={slides[active].height} />
            <figcaption>
              <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <strong>{slides[active].room}</strong>
              <small>{slides[active].detail}</small>
            </figcaption>
          </figure>

          <button type="button" className="studio-lightbox-arrow is-next" onClick={showNext} aria-label="Next photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>,
        document.body,
      )}
    </>
  );
}
