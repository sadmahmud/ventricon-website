import Link from "next/link";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/lib/types";

const accentRing: Record<string, string> = {
  aqua: "border-aqua-400/30 bg-aqua-400/10 text-aqua-300",
  brand: "border-brand-400/30 bg-brand-500/10 text-brand-300",
  grape: "border-grape-400/30 bg-grape-500/10 text-grape-300",
  pulse: "border-pulse-400/30 bg-pulse-400/10 text-pulse-400",
  amber: "border-[#f5a524]/30 bg-[#f5a524]/10 text-[#f5a524]",
};

export function ServiceCard({
  service,
  index,
  className,
}: {
  service: Service;
  index: number;
  className?: string;
}) {
  return (
    <Reveal delay={index * 60} className={cn("h-full", className)}>
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "vc-panel vc-panel-hover group flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-7",
          "hover:-translate-y-1",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl border",
              accentRing[service.accent],
            )}
          >
            <Icon name={service.icon} className="h-6 w-6" />
          </span>
          <span className="font-mono text-xs tracking-[0.2em] text-slate-600">
            {String(service.order).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <p className="text-sm leading-relaxed text-brand-200/90">
            {service.tagline}
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-slate-400">
            {service.summary}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-2">
          {service.capabilities.slice(0, 3).map((capability) => (
            <li
              key={capability.title}
              className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[0.6875rem] text-slate-400"
            >
              {capability.title}
            </li>
          ))}
          <li className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 text-[0.6875rem] text-slate-400">
            +{service.capabilities.length - 3} more
          </li>
        </ul>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition-colors group-hover:text-white">
          Explore {service.shortName}
          <Icon
            name="arrowRight"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  );
}

export function ServiceGrid({
  heading = "Five capabilities. One accountable partner.",
  eyebrow = "What we do",
  lede = "Build the brand, build the platform, drive demand, automate the work, and run it all on systems that hold. Use one service or several — they're designed to work together.",
  showCta = true,
  className,
  id,
}: {
  heading?: string;
  eyebrow?: string;
  lede?: string;
  showCta?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Section id={id} className={className}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowIcon="layers"
          title={heading}
          lede={lede}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              /* Last card spans wide on the 3-column grid for visual rhythm. */
              className={cn(
                index === services.length - 1 && "lg:col-span-1",
                index === 0 && "sm:col-span-2 lg:col-span-1",
              )}
            />
          ))}

          <Reveal delay={services.length * 60} className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-brand-300/25 bg-[linear-gradient(150deg,rgba(47,116,245,0.16),rgba(124,83,245,0.10))] p-6 sm:p-7">
              <div className="flex flex-col gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/8 text-white">
                  <Icon name="sparkles" className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-semibold">
                  Not sure where to start?
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-slate-300">
                  Most clients arrive with a symptom — flat enquiries, manual
                  admin, scattered data. Book a 30-minute discovery call and
                  we&apos;ll tell you which of the five actually solves it,
                  including when the honest answer is &ldquo;none of them
                  yet&rdquo;.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button href="/contact" icon="arrowRight" fullWidth>
                  Book a discovery call
                </Button>
                <Button
                  href="/solutions"
                  variant="outline"
                  icon="compass"
                  fullWidth
                >
                  Browse packaged solutions
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {showCta ? (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="/services" variant="outline" icon="arrowRight">
              Compare all services
            </Button>
            <Button href="/contact" variant="ghost" icon="calendar">
              Talk to a strategist
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
