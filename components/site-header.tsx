"use client";

import { useEffect, useState } from "react";
import FullscreenMenu from "@/components/fullscreen-menu";

const links = [
  { id: "home", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services" },
  { id: "about", label: "About us", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "contact", label: "Contact us", href: "/contact" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

export default function SiteHeader({ active }: { active: string }) {
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsFixed(window.scrollY > 110);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="site-header-space">
      <header className={`site-header${isFixed ? " is-fixed" : ""}`}>
        <a className="site-header-brand" href="/" aria-label="HONGXU Wellness home">
          <img src="/images/hongxu-logo.png" alt="HONGXU Wellness" width="730" height="728" />
        </a>

        <nav className="site-header-nav" aria-label="Primary navigation">
          {links.map((link) => <a className={link.id === active ? "is-active" : ""} href={link.href} key={link.id}>{link.label}</a>)}
        </nav>

        <a className="site-header-book" href="tel:+12066019801">Book an appointment <ArrowIcon /></a>

        <button className={`site-header-menu-button${menuOpen ? " is-open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>

      </header>
      <FullscreenMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
