import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Inline spinner for buttons and loading panels. */
export function Spinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-live="polite" className="inline-flex">
      <Icon
        name="loader"
        className={cn("h-4 w-4 animate-spin text-current", className)}
      />
      <span className="vc-sr-only">{label}</span>
    </span>
  );
}

/** Skeleton block used while data or media is arriving. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("vc-skeleton block rounded-lg", className)}
    />
  );
}

type AlertTone = "success" | "error" | "info";

const alertTones: Record<
  AlertTone,
  { wrapper: string; icon: IconName; iconWrap: string }
> = {
  success: {
    wrapper: "border-pulse-400/30 bg-pulse-400/8",
    icon: "checkCircle",
    iconWrap: "bg-pulse-400/15 text-pulse-400",
  },
  error: {
    wrapper: "border-[#ff6b6b]/35 bg-[#ff6b6b]/8",
    icon: "alert",
    iconWrap: "bg-[#ff6b6b]/15 text-[#ff8f8f]",
  },
  info: {
    wrapper: "border-brand-300/25 bg-brand-500/8",
    icon: "sparkles",
    iconWrap: "bg-brand-500/15 text-brand-200",
  },
};

/**
 * Status message block.
 * `role="alert"` on errors makes screen readers announce them immediately;
 * successes use a polite live region so they don't interrupt.
 */
export function Alert({
  tone,
  title,
  children,
  className,
  action,
}: {
  tone: AlertTone;
  title: string;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  const config = alertTones[tone];

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={cn(
        "animate-[pop_0.28s_cubic-bezier(0.34,1.56,0.64,1)] flex gap-3.5 rounded-2xl border p-4 sm:p-5",
        config.wrapper,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full",
          config.iconWrap,
        )}
      >
        <Icon name={config.icon} className="h-4.5 w-4.5" />
      </span>

      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="font-display text-[0.95rem] font-semibold text-white">
          {title}
        </p>
        {children ? (
          <div className="text-sm leading-relaxed text-slate-300">
            {children}
          </div>
        ) : null}
        {action ? <div className="mt-1.5">{action}</div> : null}
      </div>
    </div>
  );
}
