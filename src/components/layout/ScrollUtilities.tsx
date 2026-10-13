"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Cross-page anchor support.
 *
 * Next.js handles same-page hash links natively. This fills the gaps:
 * navigating from /services to /about#how-we-work needs the target element to
 * exist after hydration, so we resolve it here and scroll it into view
 * (respecting the sticky header via CSS `scroll-padding-top`).
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;

    const tryScroll = () => {
      const target = document.getElementById(id);

      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        return;
      }

      attempts += 1;
      if (attempts < 12) window.setTimeout(tryScroll, 100);
    };

    // Defer a frame so the destination page has painted.
    const frame = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

/** Thin reading-progress bar pinned under the header. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-60 h-0.5 w-full bg-transparent"
    >
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--color-aqua-400),var(--color-brand-500),var(--color-grape-500))] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/** Appears after the first screen and returns the visitor to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      className={cn(
        "fixed right-5 bottom-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/12",
        "vc-glass text-slate-200 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300",
        "hover:border-brand-300/50 hover:text-white",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrowRight" className="h-4.5 w-4.5 -rotate-90" />
    </button>
  );
}
