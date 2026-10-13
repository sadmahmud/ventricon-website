/**
 * Tiny class-name joiner. Keeps component APIs readable without pulling in
 * `clsx` + `tailwind-merge` as runtime dependencies.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | readonly ClassValue[];

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...(value as ClassValue[]));
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}

/** Absolute URL builder that works in any environment (no trailing slash). */
export function absoluteUrl(path = "/"): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://www.ventricon.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(date: string | Date): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

/** Strip characters that could break an href / deep link. */
export function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}
