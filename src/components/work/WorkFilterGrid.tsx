"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { projects, workCategories } from "@/lib/work";
import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "@/components/sections/FeaturedWork";
import type { WorkCategoryId } from "@/lib/types";

type Filter = WorkCategoryId | "all";

/**
 * Client-side portfolio filtering.
 *
 * - Instant, because the blueprints are static data (no fake spinner)
 * - Filter state is reflected in the URL (?filter=ecommerce) so a filtered
 *   view is shareable, and the back button works
 * - `aria-pressed` on the controls and a polite live region announcing the
 *   result count keep it usable without sight
 */
const validFilters = new Set<string>(workCategories.map((c) => c.id));

/** Maps a `?filter=` value to a real category, ignoring anything else. */
function resolveFilter(value: string | null): Filter {
  return value && validFilters.has(value) ? (value as Filter) : "all";
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readUrlFilter(): Filter {
  return resolveFilter(new URLSearchParams(window.location.search).get("filter"));
}

export function WorkFilterGrid({ className }: { className?: string }) {
  /**
   * The URL is the source of truth for the active filter, so filtered views are
   * shareable and the browser back button behaves.
   *
   * It is read with `useSyncExternalStore`, which serves "all" during
   * server rendering and hydration — that keeps the complete, crawlable list of
   * blueprints in the prerendered HTML (good for SEO) with no hydration
   * mismatch, then switches to the URL's filter on the client.
   */
  const urlFilter = useSyncExternalStore(
    subscribeToUrl,
    readUrlFilter,
    () => "all" as Filter,
  );

  /** Set when a chip is clicked, so the click wins over the (older) URL value. */
  const [clickedFilter, setClickedFilter] = useState<Filter | null>(null);

  /* Browser back/forward should follow the URL again. */
  useEffect(() => {
    const resetClicked = () => setClickedFilter(null);
    window.addEventListener("popstate", resetClicked);
    return () => window.removeEventListener("popstate", resetClicked);
  }, []);

  const filter = clickedFilter ?? urlFilter;

  /**
   * Selecting a chip updates React state *and* the URL. The URL is written here
   * (rather than in an effect) so a shared ?filter= link is never overwritten
   * before the first paint resolves.
   */
  function selectFilter(next: Filter) {
    setClickedFilter(next);

    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", next);
    window.history.replaceState(null, "", url);
  }

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", projects.length]]);
    for (const category of workCategories) {
      map.set(
        category.id,
        projects.filter((project) => project.categories.includes(category.id))
          .length,
      );
    }
    return map;
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All work" },
    ...workCategories.map((category) => ({
      id: category.id as Filter,
      label: category.label,
    })),
  ];

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-4">
        <div
          role="group"
          aria-label="Filter engagement blueprints by discipline"
          className="flex flex-wrap gap-2"
        >
          {filters.map((item) => {
            const active = filter === item.id;
            const count = counts.get(item.id) ?? 0;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                disabled={count === 0 && item.id !== "all"}
                onClick={() => selectFilter(item.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all duration-200",
                  active
                    ? "border-brand-300/50 bg-brand-500/15 text-white"
                    : "border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:text-white",
                  count === 0 && item.id !== "all" && "cursor-not-allowed opacity-40",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "font-mono text-[0.625rem]",
                    active ? "text-brand-100" : "text-slate-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-xs text-slate-500">
          Showing {visible.length} of {projects.length} engagement blueprints
          {filter !== "all"
            ? ` in ${workCategories.find((c) => c.id === filter)?.label}`
            : ""}
          .
        </p>
      </div>

      {visible.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={Math.min(index, 5)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/8 bg-ink-900/50 px-6 py-16 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <p className="font-display text-lg font-semibold text-white">
            No blueprints in this discipline yet
          </p>
          <p className="max-w-sm text-sm text-slate-400">
            We publish a blueprint only after an engagement type is proven. Try
            another filter, or ask us directly about work in this area.
          </p>
          <button
            type="button"
            onClick={() => selectFilter("all")}
            className="text-sm font-semibold text-brand-200 underline underline-offset-4 hover:text-white"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
