"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

const items = [
  { href: "/", label: "Home", icon: <path d="M3.5 10.5 12 3l8.5 7.5M5.5 9v11h13V9M9 20v-6h6v6" /> },
  { href: "/services", label: "Services", icon: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /> },
  { href: "/about", label: "About", icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21c.5-4.2 3-6.5 7-6.5s6.5 2.3 7 6.5" /></> },
  { href: "/gallery", label: "Gallery", icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m5.5 17 4.2-4.3 3.1 2.8 2.6-2.6 3.1 4.1M16 9h.01" /></> },
  { href: "/contact", label: "Contact", icon: <path d="M7.3 3.8 9.8 8c.3.5.2 1.1-.2 1.5l-1.3 1.3c1 2.1 2.8 3.9 4.9 4.9l1.3-1.3c.4-.4 1-.5 1.5-.2l4.2 2.5c.5.3.7.9.5 1.4l-.7 2c-.2.6-.8.9-1.4.9C10 20.7 3.3 14 3 5.4c0-.6.3-1.2.9-1.4l2-.7c.5-.2 1.1 0 1.4.5Z" /> },
];

export default function MobileAppNav() {
  const pathname = usePathname();
  const activeIndex = Math.max(0, items.findIndex((item) => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)));

  return (
    <nav className="mobile-app-nav" aria-label="Mobile app navigation" style={{ "--active-index": activeIndex } as CSSProperties}>
      <span className="mobile-app-nav-indicator" aria-hidden="true" />
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined} data-no-page-transition key={item.href}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45">{item.icon}</svg>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
