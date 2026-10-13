import { z } from "zod";
import { serviceOptions } from "@/lib/services";

/**
 * ============================================================================
 * Contact form contract — shared by the client form and POST /api/contact
 * ============================================================================
 * One schema, validated in both places: instant feedback in the browser,
 * enforcement (never trust the client) on the server.
 */

const serviceValues = serviceOptions.map((option) => option.value) as [
  string,
  ...string[],
];

/** Pragmatic email check — deliberately not RFC-pedantic. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Phone: optional in the schema, but if present it must be plausible. */
const phonePattern = /^[+]?[\d\s().-]{7,22}$/;

export const budgetOptions = [
  "Under $2,500",
  "$2,500 – $7,500",
  "$7,500 – $20,000",
  "$20,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Still exploring",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is too long."),

  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business or organisation name.")
    .max(160, "That name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email address.")
    .max(200, "That email address is too long.")
    .regex(emailPattern, "Check that email address — it looks incomplete."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(22, "That phone number is too long.")
    .refine((value) => phonePattern.test(value), {
      message: "Use digits, spaces, + ( ) or - only.",
    }),

  service: z
    .string()
    .trim()
    .refine((value) => serviceValues.includes(value), {
      message: "Choose the service you need from the list.",
    }),

  projectDetails: z
    .string()
    .trim()
    .min(30, "Please give us at least 30 characters so we can prepare properly.")
    .max(4000, "Please keep project details under 4000 characters."),

  budget: z.string().trim().optional().or(z.literal("")),

  timeline: z.string().trim().optional().or(z.literal("")),

  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Please confirm we may contact you about this enquiry.",
    }),

  /** Honeypot: real visitors never fill this because it is visually hidden. */
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.input<typeof contactSchema>;

/** Flattens a ZodError into { field: firstMessage } for the UI. */
export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }

  return out;
}

export const CONTACT_LIMITS = {
  name: 120,
  businessName: 160,
  email: 200,
  phone: 22,
  projectDetails: 4000,
} as const;
