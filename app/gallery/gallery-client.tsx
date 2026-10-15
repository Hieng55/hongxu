"use client";

import { useState } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const galleryCases = [
  { title: "Glutathione IV", before: "/image/gallery/glutathione-iv-before.webp", after: "/image/gallery/glutathione-iv-after.webp" },
  { title: "Immunity IV", before: "/image/gallery/immunity-iv-before.webp", after: "/image/gallery/immunity-iv-after.webp" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

function Comparison({ item, index }: { item: (typeof galleryCases)[number]; index: number }) {
  const [position, setPosition] = useState(50);
  return (
    <article className="gallery-result-card">
      <div className="gallery-comparison">
        <img className="gallery-comparison-image" src={item.before} alt={`Before ${item.title} treatment`} width="1400" height="1400" loading="lazy" decoding="async" draggable="false" />
        <div className="gallery-after-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img className="gallery-comparison-image" src={item.after} alt={`After ${item.title} treatment`} width="1400" height="1400" loading="lazy" decoding="async" draggable="false" />
        </div>
        <span className="gallery-image-label gallery-label-before">Before</span><span className="gallery-image-label gallery-label-after">After</span>
        <div className="gallery-divider" style={{ left: `${position}%` }} aria-hidden="true"><span><i>‹</i><i>›</i></span></div>
        <input className="gallery-range" type="range" min="2" max="98" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label={`Drag to compare before and after ${item.title}`} />
      </div>
      <footer className="gallery-service-note"><span>{String(index + 1).padStart(2, "0")}</span><div><small>Service</small><h3>{item.title}</h3></div><p>Drag to compare</p></footer>
    </article>
  );
}

export default function GalleryClient() {
  return (
    <main id="top" className="gallery-page">
      <SiteHeader active="gallery" />

      <section id="results" className="gallery-section gallery-page-section" aria-labelledby="gallery-page-title">
        <div className="gallery-number" aria-hidden="true">Gallery</div>
        <div className="gallery-heading">
          <p className="section-kicker"><span /> Before &amp; after</p>
          <h2 id="gallery-page-title">See the <em>difference.</em></h2>
          <p>Explore our work up close. Drag the slider across each image to compare the before and after result.</p>
        </div>
        <div className="gallery-results-grid">{galleryCases.map((item, index) => <Comparison item={item} index={index} key={item.title} />)}</div>
        <p className="gallery-results-note">Individual results may vary.</p>
        <div className="gallery-action-row"><p><strong>Wondering what may be right for you?</strong><span>Begin with a private, personalized conversation.</span></p><a className="gallery-action" href="/contact">Book a consultation <ArrowIcon /></a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
