"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "cover" | "reveal";

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const phaseRef = useRef<Phase>("idle");
  const pendingPath = useRef<string | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePhase = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.hasAttribute("data-no-page-transition")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol !== window.location.protocol || url.pathname === window.location.pathname) return;
      if (phaseRef.current !== "idle") {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      setOrigin({ x: event.clientX, y: event.clientY });
      pendingPath.current = `${url.pathname}${url.search}${url.hash}`;
      document.documentElement.classList.add("is-page-transitioning");
      updatePhase("cover");

      navigationTimer.current = window.setTimeout(() => {
        if (pendingPath.current) router.push(pendingPath.current);
      }, 620);
    };

    document.addEventListener("click", handleNavigation, true);
    return () => document.removeEventListener("click", handleNavigation, true);
  }, [router]);

  useEffect(() => {
    if (!pendingPath.current || phaseRef.current !== "cover") return;
    const destination = new URL(pendingPath.current, window.location.origin);
    if (destination.pathname !== pathname) return;

    const revealFrame = window.requestAnimationFrame(() => updatePhase("reveal"));
    finishTimer.current = window.setTimeout(() => {
      pendingPath.current = null;
      document.documentElement.classList.remove("is-page-transitioning");
      updatePhase("idle");
    }, 720);

    return () => window.cancelAnimationFrame(revealFrame);
  }, [pathname]);

  useEffect(() => () => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    if (finishTimer.current) window.clearTimeout(finishTimer.current);
    document.documentElement.classList.remove("is-page-transitioning");
  }, []);

  return (
    <div
      className={`page-circle-transition is-${phase}`}
      style={{ "--transition-x": `${origin.x}px`, "--transition-y": `${origin.y}px` } as React.CSSProperties}
      aria-hidden="true"
    ><span /></div>
  );
}
