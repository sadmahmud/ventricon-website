import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";
import type { ContactPayload, DeliveryReport } from "@/lib/types";

/**
 * ============================================================================
 * VENTRICON — lead delivery integrations
 * ============================================================================
 * Every channel is **integration-ready and opt-in**. With no environment
 * variables set, the site still works end to end: the enquiry is validated,
 * stored locally, and the visitor is given direct email/WhatsApp links so a
 * lead is never lost. Add credentials to switch a channel on.
 *
 *   EMAIL — pick one:
 *     RESEND_API_KEY + CONTACT_FROM_EMAIL   (Resend transactional API)
 *     CONTACT_WEBHOOK_URL                   (Zapier / Make / n8n / Formspree)
 *
 *   WHATSAPP (business notification on new lead):
 *     WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID + WHATSAPP_NOTIFY_NUMBER
 *
 *   CRM:
 *     CRM_WEBHOOK_URL   [+ CRM_WEBHOOK_TOKEN]   (HubSpot, Zoho, Pipedrive,
 *                                                Salesforce, custom endpoint)
 *
 *   STORAGE:
 *     LEADS_DIR (default ./.data/leads) — JSONL append log on the server.
 */

export type Lead = ContactPayload & {
  reference: string;
  receivedAt: string;
  meta: {
    /** Where the enquiry came from, if the browser sent a referer. */
    source: string;
    /** Coarse, non-identifying context for spam review. */
    userAgent: string;
  };
};

const TIMEOUT_MS = 10_000;

/** fetch with a hard timeout so a slow upstream never hangs the request. */
async function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Human-readable summary used across email, WhatsApp and CRM payloads. */
export function leadSummary(lead: Lead): string {
  return [
    `New enquiry — ${lead.reference}`,
    ``,
    `Name: ${lead.name}`,
    `Business: ${lead.businessName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Service needed: ${lead.service}`,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    ``,
    `Project details:`,
    lead.projectDetails,
    ``,
    `Received: ${lead.receivedAt}`,
    `Source: ${lead.meta.source}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

/* ------------------------------------------------------------------ storage */

export async function storeLeadLocally(
  lead: Lead,
): Promise<{ stored: boolean; detail?: string }> {
  const dir = process.env.LEADS_DIR ?? path.join(process.cwd(), ".data", "leads");

  try {
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${lead.receivedAt.slice(0, 10)}.jsonl`);
    await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
    return { stored: true, detail: `Appended to ${file}` };
  } catch (error) {
    // Read-only filesystem (serverless) — expected; other channels cover it.
    return {
      stored: false,
      detail: error instanceof Error ? error.message : "Unknown storage error",
    };
  }
}

/* -------------------------------------------------------------------- email */

async function deliverEmail(lead: Lead): Promise<DeliveryReport> {
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, CONTACT_WEBHOOK_URL } =
    process.env;

  // 1) Direct transactional email via Resend.
  if (RESEND_API_KEY) {
    try {
      const response = await post(
        "https://api.resend.com/emails",
        {
          from:
            CONTACT_FROM_EMAIL ??
            `${site.name} Website <onboarding@resend.dev>`,
          to: [CONTACT_TO_EMAIL ?? site.contact.projectsEmail],
          reply_to: lead.email,
          subject: `New enquiry — ${lead.service} — ${lead.businessName} (${lead.reference})`,
          text: leadSummary(lead),
        },
        { authorization: `Bearer ${RESEND_API_KEY}` },
      );

      if (!response.ok) {
        return {
          channel: "email:resend",
          status: "failed",
          detail: `HTTP ${response.status}`,
        };
      }

      return { channel: "email:resend", status: "sent" };
    } catch (error) {
      return {
        channel: "email:resend",
        status: "failed",
        detail: error instanceof Error ? error.message : "Request failed",
      };
    }
  }

  // 2) Automation webhook (Zapier / Make / n8n / Formspree-compatible).
  if (CONTACT_WEBHOOK_URL) {
    try {
      const response = await post(CONTACT_WEBHOOK_URL, {
        ...lead,
        summary: leadSummary(lead),
      });

      if (!response.ok) {
        return {
          channel: "email:webhook",
          status: "failed",
          detail: `HTTP ${response.status}`,
        };
      }

      return { channel: "email:webhook", status: "sent" };
    } catch (error) {
      return {
        channel: "email:webhook",
        status: "failed",
        detail: error instanceof Error ? error.message : "Request failed",
      };
    }
  }

  return {
    channel: "email",
    status: "skipped",
    detail:
      "No email integration configured (set RESEND_API_KEY or CONTACT_WEBHOOK_URL).",
  };
}

/* ----------------------------------------------------------------- whatsapp */

async function deliverWhatsapp(lead: Lead): Promise<DeliveryReport> {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_NUMBER } =
    process.env;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_NOTIFY_NUMBER) {
    return {
      channel: "whatsapp",
      status: "skipped",
      detail:
        "No WhatsApp Business API credentials configured (WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_NUMBER).",
    };
  }

  try {
    const response = await post(
      `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: WHATSAPP_NOTIFY_NUMBER.replace(/[^\d]/g, ""),
        type: "text",
        text: {
          preview_url: false,
          body: leadSummary(lead).slice(0, 4000),
        },
      },
      { authorization: `Bearer ${WHATSAPP_TOKEN}` },
    );

    if (!response.ok) {
      return {
        channel: "whatsapp",
        status: "failed",
        detail: `HTTP ${response.status}`,
      };
    }

    return { channel: "whatsapp", status: "sent" };
  } catch (error) {
    return {
      channel: "whatsapp",
      status: "failed",
      detail: error instanceof Error ? error.message : "Request failed",
    };
  }
}

/* ---------------------------------------------------------------------- crm */

async function deliverCrm(lead: Lead): Promise<DeliveryReport> {
  const { CRM_WEBHOOK_URL, CRM_WEBHOOK_TOKEN, CRM_API_URL, CRM_API_KEY } =
    process.env;

  const endpoint = CRM_WEBHOOK_URL ?? CRM_API_URL;
  const token = CRM_WEBHOOK_TOKEN ?? CRM_API_KEY;

  if (!endpoint) {
    return {
      channel: "crm",
      status: "skipped",
      detail: "No CRM endpoint configured (set CRM_WEBHOOK_URL).",
    };
  }

  try {
    const response = await post(
      endpoint,
      {
        // Vendor-neutral field names + the raw lead for custom mappings.
        reference: lead.reference,
        receivedAt: lead.receivedAt,
        contact: {
          fullName: lead.name,
          company: lead.businessName,
          email: lead.email,
          phone: lead.phone,
        },
        enquiry: {
          service: lead.service,
          budget: lead.budget ?? null,
          timeline: lead.timeline ?? null,
          details: lead.projectDetails,
          source: lead.meta.source,
        },
        lead,
      },
      token ? { authorization: `Bearer ${token}` } : {},
    );

    if (!response.ok) {
      return {
        channel: "crm",
        status: "failed",
        detail: `HTTP ${response.status}`,
      };
    }

    return { channel: "crm", status: "sent" };
  } catch (error) {
    return {
      channel: "crm",
      status: "failed",
      detail: error instanceof Error ? error.message : "Request failed",
    };
  }
}

/* ------------------------------------------------------------------ dispatch */

/**
 * Fans a lead out to every configured channel in parallel.
 * One channel failing never blocks the others, and the caller always gets a
 * full report so the visitor can be told exactly what happened.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryReport[]> {
  const results = await Promise.allSettled([
    deliverEmail(lead),
    deliverWhatsapp(lead),
    deliverCrm(lead),
  ]);

  return results.map((result, index) => {
    if (result.status === "fulfilled") return result.value;
    const channel = ["email", "whatsapp", "crm"][index];
    return {
      channel,
      status: "failed" as const,
      detail:
        result.reason instanceof Error
          ? result.reason.message
          : "Unexpected delivery error",
    };
  });
}

/** True when at least one outbound integration will actually send something. */
export function hasConfiguredIntegration(): boolean {
  const env = process.env;
  return Boolean(
    env.RESEND_API_KEY ||
      env.CONTACT_WEBHOOK_URL ||
      env.CRM_WEBHOOK_URL ||
      env.CRM_API_URL ||
      (env.WHATSAPP_TOKEN && env.WHATSAPP_PHONE_NUMBER_ID),
  );
}

/** Short, URL-safe enquiry reference, e.g. VNT-7K2M4Q. */
export function makeReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `VNT-${suffix}`;
}
