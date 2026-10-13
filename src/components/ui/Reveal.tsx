"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals content when it scrolls into view.
 *
 * Progressive enhancement:
 *  - The hidden state is applied only when JavaScript is available (the root
 *    layout sets `data-js="true"` on <html>), so with JS disabled every section
 *    is fully visible and readable.
 *  - Visibility is written to `data-visible` on the element itself rather than
 *    held in React state: no cascading re-renders, and the CSS transition does
 *    the animating.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  /** Pass a stable value to animate the same element only once. */
  once = true,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds of stagger. */
  delay?: number;
  as?: ElementType;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.dataset.visible = "true";
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.dataset.visible = "false";
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("vc-reveal", className)}
    >
      {children}
    </Tag>
  );
}
