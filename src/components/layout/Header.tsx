"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { Icon, LogoMark } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/** Top-level nav, with Services carrying a richer dropdown. */
const nav = [
  { label: "Services", href: "/services", dropdown: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /**
   * Overlay state records the route it belongs to. Adjusting state during
   * render when the route changes (the React-documented alternative to a
   * "close on navigation" effect) keeps back/forward navigation from leaving a
   * menu open, without any cascading effect.
   */
  const [overlay, setOverlay] = useState({
    path: pathname,
    mobile: false,
    services: false,
  });

  if (overlay.path !== pathname) {
    setOverlay({ path: pathname, mobile: false, services: false });
  }

  const mobileOpen = overlay.mobile;
  const servicesOpen = overlay.services;

  const setMobileOpen = (value: boolean) =>
    setOverlay((previous) => ({ ...previous, mobile: value }));

  const setServicesOpen = (value: boolean) =>
    setOverlay((previous) => ({ ...previous, services: value }));

  /* Elevate the header once the page has scrolled (rAF-throttled). */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /* Escape closes either overlay; outside clicks close the dropdown. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        triggerRef.current?.focus();
      }
      if (mobileOpen) setMobileOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!servicesOpen) return;
      const target = event.target as Node;
      if (
        !dropdownRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen, servicesOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "vc-glass border-b border-white/8 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.9)]"
          : "border-b border-transparent",
      )}
    >
      <div className="vc-hairline h-px w-full opacity-70" aria-hidden="true" />

      <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        {/* ------------------------------------------------------- brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl"
          aria-label={`${site.name} — home`}
        >
          <LogoMark
            gradientId="vc-mark-header"
            className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[18deg] lg:h-10 lg:w-10"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.0625rem] font-bold tracking-[0.16em] text-white">
              {site.name}
            </span>
            <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-brand-200/75 uppercase">
              Business Solutions
            </span>
          </span>
        </Link>

        {/* -------------------------------------------------- desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="relative flex items-center">
                {/* The label navigates; the chevron reveals the menu. */}
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full py-2 pr-1 pl-3.5 text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "text-white"
                      : "text-slate-300 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive(pathname, item.href) ? (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-[linear-gradient(90deg,transparent,var(--color-aqua-400),transparent)]" />
                  ) : null}
                </Link>

                <button
                  ref={triggerRef}
                  type="button"
                  aria-label={
                    servicesOpen ? "Hide service menu" : "Show service menu"
                  }
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={cn(
                    "grid h-8 w-7 place-items-center rounded-full transition-colors",
                    servicesOpen
                      ? "bg-white/6 text-white"
                      : "text-slate-400 hover:text-white",
                  )}
                >
                  <Icon
                    name="chevronDown"
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                {servicesOpen ? (
                  <div
                    id="services-menu"
                    ref={dropdownRef}
                    className="vc-sheet animate-[pop_0.2s_ease-out] absolute top-[calc(100%+0.75rem)] left-0 w-[38rem] rounded-3xl border border-white/10 p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)]"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-white/6"
                        >
                          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-300/20 bg-brand-500/10 text-brand-200">
                            <Icon name={service.icon} className="h-4.5 w-4.5" />
                          </span>
                          <span className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                              {service.name}
                              <Icon
                                name="arrowUpRight"
                                className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                              />
                            </span>
                            <span className="text-xs leading-relaxed text-slate-400">
                              {service.tagline}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-ink-900/70 px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-300">
                          Not sure which one you need?
                        </span>
                        <span className="text-[0.6875rem] text-slate-500">
                          {solutions.length} packaged programmes map services to
                          outcomes.
                        </span>
                      </div>
                      <Link
                        href="/solutions"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white"
                      >
                        Browse solutions
                        <Icon name="arrowRight" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-white/6 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
                {isActive(pathname, item.href) ? (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-[linear-gradient(90deg,transparent,var(--color-aqua-400),transparent)]" />
                ) : null}
              </Link>
            ),
          )}
        </nav>

        {/* ------------------------------------------------------- actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/bn"
            className="hidden rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-brand-300/40 hover:text-white sm:inline-flex"
            lang="bn"
          >
            বাংলা
          </Link>
          <a
            href={`tel:${site.contact.phoneE164}`}
            className="hidden rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-brand-300/40 hover:text-white xl:inline-flex"
          >
            {site.contact.phoneDisplay}
          </a>

          <Button
            href="/contact"
            size="sm"
            icon="arrowRight"
            className="hidden sm:inline-flex"
          >
            Start a project
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 text-slate-200 transition-colors hover:border-brand-300/40 hover:text-white lg:hidden"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* ------------------------------------------------------ mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className={cn(
          "vc-sheet border-t border-white/8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] lg:hidden",
          "max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain",
        )}
      >
        <Container className="flex flex-col gap-6 py-6">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between border-b border-white/6 py-3.5 font-display text-lg font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "text-brand-200"
                    : "text-slate-200 hover:text-white",
                )}
              >
                {item.label}
                <Icon name="chevronRight" className="h-4 w-4 opacity-50" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-slate-500 uppercase">
              Services
            </p>
            <div className="grid gap-1.5">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-3.5 py-3 transition-colors hover:border-brand-300/30"
                >
                  <Icon
                    name={service.icon}
                    className="h-4.5 w-4.5 text-brand-200"
                  />
                  <span className="text-sm font-medium text-slate-200">
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pb-2">
            <Link href="/bn" lang="bn" className="flex items-center justify-center rounded-xl border border-white/10 py-3 text-sm font-semibold text-slate-300 hover:border-brand-300/40 hover:text-white">বাংলা সংস্করণ</Link>
            <Button href="/contact" icon="arrowRight" fullWidth size="lg">
              Start a project
            </Button>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <Icon name="mail" className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
