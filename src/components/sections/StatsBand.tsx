import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Layout";

/**
 * Company facts band + sector marquee.
 *
 * ⚠️ Every figure comes from `site.facts` in src/lib/site.ts and is marked
 * PLACEHOLDER there — replace with verified company numbers before launch.
 */
const sectors = [
  "Retail & E-commerce",
  "Professional Services",
  "Manufacturing & Export",
  "Healthcare",
  "Logistics & Transport",
  "Hospitality",
  "Real Estate",
  "Education",
  "SaaS & Technology",
  "FMCG & Distribution",
  "Construction",
  "Financial Services",
];

export function SectorMarquee({ className }: { className?: string }) {
  const items = [...sectors, ...sectors];

  return (
    <div
      className={cn(
        "vc-mask-fade-x relative flex overflow-hidden border-y border-white/6 bg-ink-900/40 py-5",
        className,
      )}
      aria-hidden="true"
    >
      <div className="animate-[marquee_46s_linear_infinite] flex w-max shrink-0 items-center gap-3 whitespace-nowrap will-change-transform">
        {items.map((sector, index) => (
          <span
            key={`${sector}-${index}`}
            className="flex items-center gap-3 font-display text-sm tracking-wide text-slate-400"
          >
            {sector}
            <span className="h-1 w-1 rounded-full bg-brand-400/60" />
          </span>
        ))}
      </div>
      {/* A concise, screen-reader-friendly version of the same information. */}
      <p className="vc-sr-only">
        Sectors VENTRICON works with: {sectors.join(", ")}.
      </p>
    </div>
  );
}

export function StatsBand({ className }: { className?: string }) {
  const stats = [
    { value: site.facts.clientsServed, label: "Businesses served" },
    { value: site.facts.countriesServed, label: "Countries delivered into" },
    { value: "5", label: "Capabilities under one roof" },
    { value: "1 business day", label: "Enquiry response commitment" },
  ];

  return (
    <div className={cn("border-b border-white/6 bg-ink-950/60", className)}>
      <Container className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <span className="font-display text-3xl font-semibold text-white">
              {stat.value}
            </span>
            <span className="text-sm text-slate-400">{stat.label}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
