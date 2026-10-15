const footerNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-orbit" aria-hidden="true"><span>HW</span></div>
      <div className="footer-topline" aria-hidden="true"><span /></div>

      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="footer-brand" href="#top" aria-label="Back to top">
            <img src="/images/hongxu-logo.png" alt="" width="730" height="728" />
            <span><strong id="footer-heading">HONGXU</strong><small>Wellness</small></span>
          </a>
          <p>Thoughtful aesthetics and whole-body wellness, personalized for the way you want to look and feel.</p>
          <a className="footer-booking" href="tel:+12066019801"><span>Book an appointment</span><ArrowIcon /></a>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <p>Explore</p>
          {footerNav.map((item) => <a href={item.href} key={item.label}>{item.label}<span aria-hidden="true">↗</span></a>)}
        </nav>

        <div className="footer-column footer-visit">
          <p>Visit</p>
          <a href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer">6101 Summitview Ave<br />Ste 120, Room #17<br />Yakima, WA 98908</a>
          <a href="tel:+12066019801">206-601-9801</a>
          <span>Monday–Friday<br /><strong>9:30 AM–8 PM</strong></span>
        </div>

        <div className="footer-column footer-socials">
          <p>Connect</p>
          <a href="https://www.instagram.com/hongxuwellness/" target="_blank" rel="noreferrer"><span>Instagram</span><ArrowIcon /></a>
          <a href="https://www.facebook.com/hongxuwellness/" target="_blank" rel="noreferrer"><span>Facebook</span><ArrowIcon /></a>
          <a href="https://share.google/Bcqw7UswswmfnbVus" target="_blank" rel="noreferrer"><span>Google</span><ArrowIcon /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 HONGXU Wellness. All rights reserved.</p>
        <p>Private care <i /> Personal attention <i /> Yakima, Washington</p>
        <a href="#top" aria-label="Back to top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
