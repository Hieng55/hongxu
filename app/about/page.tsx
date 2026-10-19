import type { Metadata } from "next";
import AboutStudioSlider from "@/components/about-studio-slider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Our Private Wellness Studio",
  description: "Meet HONGXU Wellness, a private Yakima studio offering thoughtful, personalized aesthetics and whole-body wellness care.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HONGXU Wellness",
    url: "/about",
    title: "About HONGXU Wellness in Yakima",
    description: "Private, personalized aesthetics and wellness care shaped around your comfort and goals.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About HONGXU Wellness in Yakima",
    description: "Private, personalized aesthetics and wellness care shaped around your comfort and goals.",
    images: [SOCIAL_IMAGE.url],
  },
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export default function AboutPage() {
  return (
    <main id="top" className="about-page about-page-single">
      <SiteHeader active="about" />

      <section id="about-story" className="about-section about-page-home-style" aria-labelledby="about-page-title">
        <div className="about-ambient" aria-hidden="true" />
        <div className="about-number" aria-hidden="true">About</div>

        <div className="about-layout">
          <div className="about-visual">
            <AboutStudioSlider />
            <div className="about-image-caption">
              <span>A space to exhale</span><i /><span>Care that listens</span>
            </div>
          </div>

          <div className="about-content">
            <p className="section-kicker"><span /> Care built around what you need</p>
            <h2 id="about-page-title">You don&apos;t need more options. <em>You need the right care.</em></h2>

            <div className="about-story">
              <p className="about-lead">Maybe you feel tired, less confident, or unsure which treatment is actually right for you.</p>
              <p className="about-copy">At HONGXU Wellness, we simplify the next step. We listen first, understand what matters to you, and create a thoughtful plan that supports how you want to look and feel—without pressure or a one-size-fits-all approach.</p>
            </div>

            <div className="about-cta-row">
              <a href="https://www.vagaro.com/hongxugong" target="_blank" rel="noreferrer" className="about-consultation-button"><span>Start a conversation</span><ArrowIcon /></a>
              <span className="about-cta-note">Private · Personal · By appointment</span>
            </div>

            <div className="about-details about-page-details">
              <div className="hours-card about-pain-card">
                <div className="hours-heading"><span>What you may be feeling</span><small>We understand</small></div>
                <div className="hours-list">
                  <div className="hours-row"><span>Overwhelmed</span><i aria-hidden="true" /><strong>Too many choices</strong></div>
                  <div className="hours-row"><span>Unheard</span><i aria-hidden="true" /><strong>Rushed appointments</strong></div>
                  <div className="hours-row"><span>Unsure</span><i aria-hidden="true" /><strong>Where to begin</strong></div>
                </div>
              </div>

              <div className="visit-card about-answer-card">
                <span className="visit-label">How we help</span>
                <p>One private destination.<br />A plan shaped around you.<br />Care that feels natural.</p>
                <span className="visit-action">Explore services <ArrowIcon /></span>
              </div>
            </div>

            <div className="platform-dock about-promise-dock" aria-label="The HONGXU Wellness promise">
              <div className="platform-intro"><span>Our promise</span><small>Your comfort comes first</small></div>
              <div className="platform-link"><span className="about-promise-number">01</span><span><strong>Listen first</strong><small>Your goals guide us</small></span></div>
              <div className="platform-link"><span className="about-promise-number">02</span><span><strong>Keep it personal</strong><small>Never one-size-fits-all</small></span></div>
              <div className="platform-link"><span className="about-promise-number">03</span><span><strong>Stay thoughtful</strong><small>Natural, balanced care</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
