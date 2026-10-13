import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Glow } from "@/components/ui/Layout";
import { Artwork, ServiceGlyph } from "@/components/ui/Artwork";

/**
 * Home hero.
 *
 * Copy is fixed by the brand brief: BUILD. GROW. TRANSFORM. as the headline,
 * the positioning line beneath, and the two primary calls to action.
 */
export function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24",
        className,
      )}
    >
      <div
        className="vc-grid pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,var(--color-ink-950),transparent)]"
        aria-hidden="true"
      />
      <Glow className="-top-32 -left-32 opacity-70" color="rgba(47,116,245,0.38)" />
      <Glow className="top-10 right-0 opacity-50" color="rgba(124,83,245,0.30)" />
      <Glow className="bottom-0 left-1/3 opacity-40" color="rgba(18,181,207,0.28)" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          {/* ------------------------------------------------------- copy */}
          <div className="flex flex-col gap-8">
            <Eyebrow icon="sparkles">
              {site.category} — for growth-focused companies
            </Eyebrow>

            <h1 className="font-display text-[2.5rem] leading-[0.98] font-bold tracking-[-0.03em] sm:text-[3.6rem] lg:text-[4.25rem]">
              <span className="block text-white">BUILD.</span>
              <span className="block vc-gradient-text">GROW.</span>
              <span className="block text-white">TRANSFORM.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              {site.tagline}
            </p>

            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-slate-400">
              We build the brand, the platform, the demand engine and the internal
              systems — then keep improving them against numbers you can see.
              One senior team, accountable for the outcome, not just the
              deliverables.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" icon="arrowRight">
                Get Started
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                icon="compass"
              >
                Explore Services
              </Button>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {[
                "Reply within 1 business day",
                "Fixed scope & price",
                "You own everything we build",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.8125rem] text-slate-400"
                >
                  <Icon
                    name="check"
                    className="h-4 w-4 shrink-0 text-pulse-400"
                    strokeWidth={2.4}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------------------------------------------- visual */}
          <div className="relative">
            <div className="vc-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
              <div
                className="vc-dots pointer-events-none absolute inset-0 opacity-25"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-2.5 w-2.5 place-items-center">
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-pulse-400/50" />
                    <span className="h-2 w-2 rounded-full bg-pulse-400" />
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate-400 uppercase">
                    Engagement dashboard
                  </span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[0.625rem] text-slate-400">
                  live view
                </span>
              </div>

              {/* Five capability tiles, the actual service list. */}
              <ul className="relative mt-5 grid grid-cols-5 gap-2">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-ink-900/70 p-2.5 text-center transition-colors hover:border-brand-300/35"
                  >
                    <span className="h-8 w-8">
                      <ServiceGlyph
                        id={`hero-${service.slug}`}
                        accent={service.accent}
                      />
                    </span>
                    <span className="text-[0.5625rem] leading-tight text-slate-400">
                      {service.shortName}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/8">
                <Artwork
                  id="hero-artwork"
                  accent="brand"
                  variant={1}
                  rounded="rounded-none"
                />
              </div>

              <dl className="relative mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Discovery", value: "Week 1" },
                  { label: "First release", value: "Week 4–8" },
                  { label: "Measurement", value: "From day one" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/8 bg-ink-900/70 p-3"
                  >
                    <dt className="text-[0.625rem] tracking-wide text-slate-500 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-sm font-semibold text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="relative mt-4 text-[0.6875rem] leading-relaxed text-slate-500">
                Every engagement runs through the same five stages — Discover,
                Strategize, Build, Launch, Grow — with a weekly written update.
              </p>
            </div>

            {/* Floating proof chip */}
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-ink-900/90 p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur sm:block lg:-left-8">
              <p className="font-mono text-[0.625rem] tracking-[0.14em] text-slate-500 uppercase">
                Response commitment
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold text-white">
                1 business day
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
