import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Container, Eyebrow, Glow } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Page not found (404)",
  description:
    "That page doesn't exist on the VENTRICON site. Here are the most useful places to go instead.",
  path: "/404",
  noIndex: true,
});

const destinations = [
  {
    href: "/services",
    label: "Services",
    description: "The five capabilities, with deliverables and timelines.",
    icon: "layers" as const,
  },
  {
    href: "/solutions",
    label: "Solutions",
    description: "Packaged programmes that map services to business outcomes.",
    icon: "compass" as const,
  },
  {
    href: "/work",
    label: "Work",
    description: "Engagement blueprints across nine sectors.",
    icon: "briefcase" as const,
  },
  {
    href: "/about",
    label: "About",
    description: "How we're organised, how we work and what we commit to.",
    icon: "users" as const,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Send a brief and get an answer within one business day.",
    icon: "mail" as const,
  },
  {
    href: "/",
    label: "Home",
    description: "Start again from the top.",
    icon: "globe" as const,
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div
        className="vc-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <Glow className="-top-32 left-0 opacity-60" color="rgba(47,116,245,0.34)" />
      <Glow className="top-20 right-0 opacity-40" color="rgba(124,83,245,0.28)" />

      <Container className="relative">
        <div className="flex max-w-3xl flex-col gap-6">
          <Eyebrow icon="search">Error 404</Eyebrow>

          <p className="font-display text-6xl leading-none font-bold vc-gradient-text sm:text-8xl">
            404
          </p>

          <h1 className="text-[2rem] leading-[1.1] font-semibold sm:text-[2.75rem]">
            This page has been moved, renamed, or never existed.
          </h1>

          <p className="max-w-xl text-[1.0625rem] leading-relaxed text-slate-400">
            The link may be out of date, or there may be a typo in the address.
            Nothing is broken on your side — and {site.name} is still here.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button href="/" size="lg" icon="arrowLeft">
              Back to home
            </Button>
            <Button href="/contact" variant="outline" size="lg" icon="mail">
              Report a broken link
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[0.6875rem] tracking-[0.18em] text-slate-500 uppercase">
            Popular destinations
          </h2>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((item, index) => (
              <Reveal key={item.href} delay={index * 40} as="li">
                <Link
                  href={item.href}
                  className="vc-panel vc-panel-hover group flex h-full items-start gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold text-white">
                      {item.label}
                      <Icon
                        name="arrowUpRight"
                        className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
              Looking for a service?
            </h2>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-300/35 hover:text-white"
                  >
                    <Icon name={service.icon} className="h-3.5 w-3.5" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-500 uppercase">
              Looking for a programme?
            </h2>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions#${solution.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-300/35 hover:text-white"
                  >
                    <Icon name={solution.icon} className="h-3.5 w-3.5" />
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
