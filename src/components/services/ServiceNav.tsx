"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";

/**
 * Service navigation.
 *
 * Two modes:
 *  - `anchor` — sticky chip bar on /services that highlights the section
 *               currently in view (IntersectionObserver, no scroll math).
 *  - `links`  — compact link list used in the sidebar of a service page.
 */
export function ServiceNav({
  variant = "anchor",
  currentSlug,
  className,
}: {
  variant?: "anchor" | "links";
  currentSlug?: string;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>(services[0].slug);

  useEffect(() => {
    if (variant !== "anchor") return;

    const sections = services
      .map((service) => document.getElementById(service.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [variant]);

  if (variant === "links") {
    return (
      <nav
        aria-label="Service navigation"
        className={cn("flex flex-col gap-1.5", className)}
      >
        <p className="mb-1 font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
          All services
        </p>
        {services.map((service) => {
          const active = service.slug === currentSlug;

          return (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-colors",
                active
                  ? "border-brand-300/40 bg-brand-500/12 text-white"
                  : "border-white/8 bg-white/3 text-slate-300 hover:border-white/18 hover:text-white",
              )}
            >
              <Icon
                name={service.icon}
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-brand-200" : "text-slate-400",
                )}
              />
              <span className="flex-1">{service.name}</span>
              {active ? (
                <span className="font-mono text-[0.5625rem] tracking-wider text-brand-200 uppercase">
                  here
                </span>
              ) : (
                <Icon
                  name="chevronRight"
                  className="h-3.5 w-3.5 text-slate-600 transition-transform group-hover:translate-x-0.5"
                />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Jump to a service"
      className={cn(
        "sticky top-[4.75rem] z-30 border-y border-white/8 bg-ink-950/85 py-3 backdrop-blur-lg",
        className,
      )}
    >
      <ul className="flex items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0 pr-1 font-mono text-[0.625rem] tracking-[0.16em] whitespace-nowrap text-slate-500 uppercase">
          Jump to
        </li>
        {services.map((service) => {
          const active = service.slug === activeId;

          return (
            <li key={service.id} className="shrink-0">
              <a
                href={`#${service.slug}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors",
                  active
                    ? "border-brand-300/45 bg-brand-500/15 text-white"
                    : "border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:text-white",
                )}
              >
                <Icon name={service.icon} className="h-3.5 w-3.5" />
                {service.shortName}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
