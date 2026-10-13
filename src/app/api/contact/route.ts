import { NextResponse } from "next/server";
import { contactSchema, fieldErrorsFrom } from "@/lib/validation";
import {
  deliverLead,
  hasConfiguredIntegration,
  leadSummary,
  makeReference,
  storeLeadLocally,
  type Lead,
} from "@/lib/integrations";
import { site, whatsappLink } from "@/lib/site";
import type { ContactApiResponse } from "@/lib/types";

/**
 * POST /api/contact — validates an enquiry and fans it out to every
 * configured channel (email, WhatsApp Business, CRM) in parallel.
 *
 * Route handlers run on the Node.js runtime by default (required for the
 * local JSONL lead log). `runtime` / `dynamic` segment config is deliberately
 * omitted — it is incompatible with `cacheComponents`, and POST handlers are
 * dynamic by definition.
 */

/* ------------------------------------------------------------- rate limiting
 * Simple in-memory sliding window. Adequate for a single instance and for
 * abuse-blunting on serverless. For multi-instance or higher assurance, swap
 * the Map for Upstash Redis / Vercel KV — the interface below stays the same.
 * ------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the Map cannot grow without bound.
  if (hits.size > 500) {
    for (const [mapKey, times] of hits) {
      if (times.every((time) => now - time > WINDOW_MS)) hits.delete(mapKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  // Never store raw IPs — enough to rate limit, nothing to leak.
  return ip.slice(0, 64);
}

export async function POST(request: Request) {
  /* ------------------------------------------------------------- body parse */
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json<ContactApiResponse>(
      { ok: false, message: "We couldn't read that request. Please try again." },
      { status: 400 },
    );
  }

  const key = clientKey(request);
  const limit = rateLimit(key);

  if (!limit.allowed) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message:
          "Too many enquiries from this connection. Please wait a few minutes, or email us directly.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfterSeconds) },
      },
    );
  }

  /* -------------------------------------------------------------- validation */
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  /* ------------------------------------------------------------------ spam */
  // Honeypot: a hidden field real users never see. Bots fill it in.
  if (data.company_website && data.company_website.length > 0) {
    // Respond with success so the bot doesn't learn anything, but send nothing.
    return NextResponse.json<ContactApiResponse>({
      ok: true,
      reference: "VNT-FILTERED",
      receivedAt: new Date().toISOString(),
      delivery: [{ channel: "spam-filter", status: "skipped" }],
      storedLocally: false,
      fallback: { email: site.contact.email, whatsapp: null },
    });
  }

  const receivedAt = new Date().toISOString();
  const lead: Lead = {
    ...data,
    budget: data.budget || undefined,
    timeline: data.timeline || undefined,
    reference: makeReference(),
    receivedAt,
    meta: {
      source:
        request.headers.get("referer") ??
        request.headers.get("origin") ??
        "direct",
      userAgent: (request.headers.get("user-agent") ?? "unknown").slice(0, 200),
    },
  };

  /* ------------------------------------------------------------------ deliver */
  const [storage, delivery] = await Promise.all([
    storeLeadLocally(lead),
    deliverLead(lead),
  ]);

  const anySent = delivery.some((report) => report.status === "sent");

  // A stored lead with no outbound integration is still a captured lead — log
  // it prominently so it is never silently dropped.
  if (!anySent && !hasConfiguredIntegration()) {
    console.info(
      `[VENTRICON] New enquiry received (no integration configured).\n${leadSummary(lead)}`,
    );
  }

  return NextResponse.json<ContactApiResponse>(
    {
      ok: true,
      reference: lead.reference,
      receivedAt,
      delivery: [
        ...delivery,
        storage.stored
          ? { channel: "storage:jsonl", status: "sent" as const, detail: storage.detail }
          : {
              channel: "storage:jsonl",
              status: "skipped" as const,
              detail: storage.detail,
            },
      ],
      storedLocally: storage.stored,
      fallback: {
        email: site.contact.email,
        whatsapp: whatsappLink(
          `Hello ${site.name}, I submitted the enquiry ${lead.reference}. Details: ${lead.service}.`,
        ),
      },
    },
    { status: 200 },
  );
}

/** Anything other than POST on this endpoint. */
export async function GET() {
  return NextResponse.json<ContactApiResponse>(
    {
      ok: false,
      message:
        "POST a JSON body to this endpoint to submit an enquiry. See the contact form for the expected shape.",
    },
    { status: 405, headers: { allow: "POST" } },
  );
}
