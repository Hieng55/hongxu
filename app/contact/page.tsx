import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact Us | HONGXU Wellness",
  description: "Contact HONGXU Wellness or plan your private visit in Yakima, Washington.",
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export default function ContactPage() {
  return (
    <main id="top" className="contact-page">
      <SiteHeader active="contact" />

      <section id="contact-details" className="contact-section contact-page-section" aria-labelledby="contact-page-title">
        <div className="contact-watermark" aria-hidden="true">Contact</div>
        <div className="contact-layout">
          <div className="contact-intro">
            <p className="section-kicker"><span /> Get in touch</p>
            <h2 id="contact-page-title">Let&apos;s begin <em>with you.</em></h2>
            <p>Not sure which service is right for you? Start with a conversation. We&apos;ll listen to what you need and help make your next step feel clear.</p>
            <div className="contact-actions"><a className="contact-primary" href="tel:+12066019801">Call 206-601-9801 <ArrowIcon /></a><a className="contact-secondary" href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer">Get directions <ArrowIcon /></a></div>
          </div>

          <div className="contact-details">
            <article className="contact-card contact-location"><span>Visit our studio</span><h3>HONGXU Wellness</h3><p>6101 Summitview Ave<br />Ste 120, Room #17<br />Yakima, WA 98908</p><small>Private studio · By appointment</small></article>
            <article className="contact-card"><span>Studio hours</span><div className="contact-hours"><p>Monday–Friday</p><strong>9:30 AM–8 PM</strong></div><div className="contact-hours"><p>Saturday–Sunday</p><strong>Closed</strong></div></article>
            <article className="contact-card contact-connect"><span>Follow along</span><div>
              <a href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer"><span><img src="/icons/google.svg" alt="" />Google</span><ArrowIcon /></a>
              <a href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer"><span><img src="/icons/facebook.svg" alt="" />Facebook</span><ArrowIcon /></a>
              <a href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer"><span><img src="/icons/instagram.svg" alt="" />Instagram</span><ArrowIcon /></a>
            </div></article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
