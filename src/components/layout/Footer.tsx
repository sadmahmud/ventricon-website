import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Icon, LogoMark } from "@/components/ui/Icon";
import { site, fullAddress, mapsUrl, whatsappLink, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  youtube: "YouTube",
  github: "GitHub",
};

export function Footer() {
  const wa = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);
  const activeSocials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/8 bg-ink-950">
      <div
        className="vc-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        className="vc-glow h-[24rem] w-[24rem] -bottom-40 left-1/2 -translate-x-1/2 opacity-40"
        style={{ background: "rgba(47,116,245,0.30)" }}
        aria-hidden="true"
      />

      <Container className="relative">
        {/* ------------------------------------------------------- top row */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
              <LogoMark gradientId="vc-mark-footer" className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-[0.16em] text-white">
                  {site.name}
                </span>
                <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-brand-200/75 uppercase">
                  {site.category}
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {site.description}
            </p>

            <p className="font-display text-sm font-semibold tracking-[0.14em] text-brand-200 uppercase">
              {site.promise}
            </p>

            {activeSocials.length ? (
              <ul className="flex flex-wrap gap-2">
                {activeSocials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-300/40 hover:text-white"
                    >
                      {socialLabels[key as keyof typeof site.social]}
                      <Icon name="external" className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Services" className="flex flex-col gap-4">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-slate-500 uppercase">
              Services
            </h2>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-300 transition-colors hover:text-brand-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-brand-200 transition-colors hover:text-white"
                >
                  All services →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Solutions" className="flex flex-col gap-4">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-slate-500 uppercase">
              Solutions
            </h2>
            <ul className="flex flex-col gap-2.5">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions#${solution.slug}`}
                    className="text-sm text-slate-300 transition-colors hover:text-brand-200"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-slate-500 uppercase">
              Company
            </h2>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/work", label: "Our work" },
                { href: "/about", label: "About VENTRICON" },
                { href: "/about#how-we-work", label: "How we work" },
                { href: "/about#faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-brand-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-white/8 bg-ink-900/60 p-4">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <span className="break-all">{site.contact.email}</span>
              </a>
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <span>{fullAddress}</span>
              </a>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-pulse-400" />
                  Message on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- bottom row */}
        <div className="flex flex-col gap-4 border-t border-white/8 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © <CopyrightYear fallback={site.facts.copyrightYear} /> {site.legalName}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-300">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-slate-300">
              Sitemap
            </Link>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-pulse-400" aria-hidden="true" />
              {site.contact.responseTime}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
