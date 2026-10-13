import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

/* ------------------------------------------------------------------ layout */

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  /** Tighter vertical rhythm for stacked sections. */
  spacing = "default",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  spacing?: "default" | "compact" | "loose";
} & Record<string, unknown>) {
  const pad = {
    compact: "py-14 sm:py-16",
    default: "py-18 sm:py-24",
    loose: "py-24 sm:py-32",
  }[spacing];

  return (
    <Tag id={id} className={cn("relative", pad, className)} {...rest}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- typography */

export function Eyebrow({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon?: IconName;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-300/20 bg-brand-500/8 px-3.5 py-1.5",
        "font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-brand-200 uppercase",
        className,
      )}
    >
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className,
  /** Renders the leading part of `title` before a pipe as a gradient. */
  titleAccent,
}: {
  eyebrow?: string;
  eyebrowIcon?: IconName;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
  titleAccent?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow> : null}

      <Tag
        className={cn(
          "text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]",
          align === "center" ? "max-w-3xl" : "max-w-3xl",
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
      </Tag>

      {lede ? (
        <div
          className={cn(
            "max-w-2xl text-[1.0625rem] leading-relaxed text-slate-400",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------- decoration */

export function Glow({
  className,
  color = "rgba(47,116,245,0.35)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("vc-glow h-[26rem] w-[26rem]", className)}
      style={{ background: color }}
    />
  );
}

export function Badge({
  children,
  className,
  icon,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  icon?: IconName;
  tone?: "neutral" | "brand" | "positive" | "warning";
}) {
  const tones = {
    neutral: "border-white/10 bg-white/5 text-slate-300",
    brand: "border-brand-300/25 bg-brand-500/10 text-brand-100",
    positive: "border-pulse-400/25 bg-pulse-400/10 text-pulse-400",
    warning: "border-[#f5a524]/25 bg-[#f5a524]/10 text-[#f5a524]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {icon ? <Icon name={icon} className="h-3 w-3" /> : null}
      {children}
    </span>
  );
}

export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
        {value}
      </span>
      <span className="text-[0.8125rem] leading-snug text-slate-400">
        {label}
      </span>
    </div>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-brand-200"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-slate-300" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <Icon
                  name="chevronRight"
                  className="h-3 w-3 text-slate-600"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
