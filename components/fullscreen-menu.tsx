"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";

const links = [
  { id: "home", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/services" },
  { id: "about", label: "About us", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "contact", label: "Contact us", href: "/contact" },
];

export default function FullscreenMenu({ open, active, onClose }: { open: boolean; active: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const navigationTimer = useRef<number | null>(null);

  useEffect(() => {
    const mountFrame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(mountFrame);
  }, []);

  useEffect(() => {
    let unlockTimer: number | null = null;
    if (open) {
      document.documentElement.classList.add("is-menu-open");
    } else {
      unlockTimer = window.setTimeout(() => document.documentElement.classList.remove("is-menu-open"), 780);
    }
    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
    };
  }, [open]);

  useEffect(() => () => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    document.documentElement.classList.remove("is-menu-open");
  }, []);

  const closeThenNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onClose();
    if (href === window.location.pathname) return;

    navigationTimer.current = window.setTimeout(() => router.push(href), 760);
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`fullscreen-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="fullscreen-menu-disc" aria-hidden="true" />
      <button type="button" className={`fullscreen-menu-toggle${open ? " is-open" : ""}`} aria-label="Close navigation" aria-expanded={open} onClick={onClose}><span /><span /></button>
      <div className="fullscreen-menu-content">
        <div className="fullscreen-menu-top">
          <Link href="/" className="fullscreen-menu-brand" aria-label="HONGXU Wellness home" data-no-page-transition onClick={(event) => closeThenNavigate(event, "/")}>
            <img src="/images/hongxu-logo-loading.png" alt="" width="128" height="129" />
            <span>HONGXU <small>Wellness</small></span>
          </Link>
        </div>

        <nav className="fullscreen-menu-links" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              className={link.id === active ? "is-active" : ""}
              href={link.href}
              aria-current={link.id === active ? "page" : undefined}
              data-no-page-transition
              onClick={(event) => closeThenNavigate(event, link.href)}
              style={{ "--menu-order": index } as React.CSSProperties}
              key={link.id}
            >
              <small>0{index + 1}</small><span>{link.label}</span><i aria-hidden="true">↗</i>
            </Link>
          ))}
        </nav>

        <div className="fullscreen-menu-bottom">
          <span>Private care · Personal attention</span>
          <a href="tel:+12066019801">206-601-9801</a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
