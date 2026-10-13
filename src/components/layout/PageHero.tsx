import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, Glow } from "@/components/ui/Layout";
import { Breadcrumbs } from "@/components/ui/Layout";
import type { IconName } from "@/components/ui/Icon";

/**
 * Shared interior-page hero: breadcrumbs, eyebrow, title, lede and actions,
 * with the brand's grid + glow backdrop. Server-rendered, so it costs no JS.
 */
export function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  titleAccent,
  lede,
  actions,
  breadcrumbs,
  aside,
  className,
  size = "default",
}: {
  eyebrow?: string;
  eyebrowIcon?: IconName;
  title: string;
  /** Word or phrase at the start of `title` rendered as a gradient. */
  titleAccent?: string;
  lede?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  aside?: ReactNode;
  className?: string;
  size?: "default" | "compact";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/6",
        size === "compact" ? "pt-32 pb-14 sm:pt-36 sm:pb-16" : "pt-36 pb-20 sm:pt-44 sm:pb-24",
        className,
      )}
    >
      <div className="vc-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Glow className="-top-40 -left-24 opacity-60" color="rgba(47,116,245,0.34)" />
      <Glow className="-top-28 right-0 opacity-45" color="rgba(124,83,245,0.28)" />

      <Container className="relative">
        {breadcrumbs?.length ? (
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
        ) : null}

        <div
          className={cn(
            "flex flex-col gap-10",
            aside ? "lg:flex-row lg:items-end lg:justify-between lg:gap-16" : "",
          )}
        >
          <div className="flex max-w-3xl flex-col gap-6">
            {eyebrow ? <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow> : null}

            <h1
              className={cn(
                "font-semibold",
                size === "compact"
                  ? "text-[2rem] leading-[1.12] sm:text-[2.6rem]"
                  : "text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
              )}
            >
              {titleAccent ? (
                <>
                  <span className="vc-gradient-text">{titleAccent}</span>
                  {title}
                </>
              ) : (
                title
              )}
            </h1>

            {lede ? (
              <div className="max-w-2xl text-[1.0625rem] leading-relaxed text-slate-400 sm:text-lg">
                {lede}
              </div>
            ) : null}

            {actions ? (
              <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>
            ) : null}
          </div>

          {aside ? <div className="w-full lg:max-w-md">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
