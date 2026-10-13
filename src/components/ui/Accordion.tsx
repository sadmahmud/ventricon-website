"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/lib/types";

/**
 * Accessible accordion.
 *
 * - Native buttons with `aria-expanded` / `aria-controls`
 * - Height animates with the CSS grid-rows technique (no JS measuring)
 * - Keyboard: Tab to each header, Enter/Space toggles, Home/End jump
 * - `allowMultiple` controls whether several panels can be open at once
 */
export function Accordion({
  items,
  allowMultiple = true,
  defaultOpen = -1,
  className,
  variant = "panel",
  idBase,
  onToggle,
}: {
  items: Faq[];
  allowMultiple?: boolean;
  defaultOpen?: number;
  className?: string;
  variant?: "panel" | "plain";
  idBase?: string;
  onToggle?: (index: number, open: boolean) => void;
}) {
  const reactId = useId();
  const base = idBase ?? `acc-${reactId.replace(/[:]/g, "")}`;
  const [open, setOpen] = useState<number[]>(
    defaultOpen >= 0 ? [defaultOpen] : [],
  );

  function toggle(index: number) {
    const isOpen = open.includes(index);
    const next = isOpen
      ? open.filter((i) => i !== index)
      : allowMultiple
        ? [...open, index]
        : [index];

    setOpen(next);
    onToggle?.(index, !isOpen);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const buttons = Array.from(
      event.currentTarget
        .closest("[data-accordion]")
        ?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]") ?? [],
    );

    const position = buttons.indexOf(event.currentTarget);

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = (position + delta + buttons.length) % buttons.length;
      buttons[next]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      buttons[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      buttons[buttons.length - 1]?.focus();
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(index);
    }
  }

  return (
    <div
      data-accordion
      className={cn(
        variant === "panel" ? "flex flex-col gap-3" : "divide-y divide-white/8",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const triggerId = `${base}-trigger-${index}`;
        const panelId = `${base}-panel-${index}`;

        return (
          <div
            key={item.q}
            className={cn(
              variant === "panel" &&
                "overflow-hidden rounded-2xl border transition-colors duration-300",
              variant === "panel" &&
                (isOpen
                  ? "border-brand-300/35 bg-ink-850/80"
                  : "border-white/8 bg-ink-900/50 hover:border-white/16"),
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                data-accordion-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 text-left",
                  variant === "panel" ? "px-5 py-4.5 sm:px-6" : "py-4.5",
                  "font-display text-[1.0625rem] font-medium text-white",
                  "transition-colors hover:text-brand-100",
                )}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-180 border-brand-300/40 bg-brand-500/15 text-brand-100"
                      : "border-white/12 text-slate-400",
                  )}
                >
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-350 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "text-[0.9375rem] leading-relaxed text-slate-400",
                    variant === "panel" ? "px-5 pb-5 sm:px-6" : "pb-4",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
