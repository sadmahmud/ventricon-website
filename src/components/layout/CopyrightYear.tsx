"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the current year without breaking static prerendering.
 *
 * Under `cacheComponents`, calling `new Date()` during render is rejected
 * because the value would differ between builds. The build-time year is
 * rendered first (so server HTML and hydration always agree), then corrected
 * directly in the DOM on mount — so the footer stays accurate on 1 January
 * without a redeploy.
 */
export function CopyrightYear({ fallback }: { fallback: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const current = new Date().getFullYear();
    if (ref.current && current !== fallback) {
      ref.current.textContent = String(current);
    }
  }, [fallback]);

  return <span ref={ref}>{fallback}</span>;
}
