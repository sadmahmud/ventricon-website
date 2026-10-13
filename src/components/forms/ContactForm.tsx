"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  fieldErrorsFrom,
  budgetOptions,
  timelineOptions,
  CONTACT_LIMITS,
} from "@/lib/validation";
import { serviceOptions } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import {
  CheckboxField,
  SelectField,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";
import type { ContactApiResponse, ContactApiSuccess } from "@/lib/types";

type Status = "idle" | "submitting" | "success" | "error";

type Values = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  budget: string;
  timeline: string;
  consent: boolean;
  company_website: string;
};

const emptyValues: Values = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "",
  projectDetails: "",
  budget: "",
  timeline: "",
  consent: false,
  company_website: "",
};

/** Field order drives "focus the first invalid field" behaviour. */
const fieldOrder: (keyof Values)[] = [
  "name",
  "businessName",
  "email",
  "phone",
  "service",
  "projectDetails",
  "consent",
];

const channelLabels: Record<string, string> = {
  "email:resend": "Email notification",
  "email:webhook": "Email notification",
  email: "Email notification",
  whatsapp: "WhatsApp alert",
  crm: "CRM record",
  "storage:jsonl": "Server lead log",
  "spam-filter": "Spam filter",
};

/**
 * Contact form with client + server validation, loading state, success/error
 * handling and a graceful fallback that never loses a real enquiry.
 */
export function ContactForm({
  defaultService = "",
  className,
  id = "contact-form",
  locale = "en",
}: {
  defaultService?: string;
  className?: string;
  id?: string;
  locale?: "en" | "bn";
}) {
  const isBn = locale === "bn";
  const [values, setValues] = useState<Values>({
    ...emptyValues,
    service: defaultService,
  });
  /** Field errors returned by the API (authoritative for server-side rules). */
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<ContactApiSuccess | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [prefilled, setPrefilled] = useState(false);

  const busy = status === "submitting";

  const displayServiceOptions = isBn
    ? serviceOptions.map((option) => {
        const labels: Record<string, string> = {
          "Branding & Design": "ব্র্যান্ডিং ও ডিজাইন",
          "Website & E-commerce": "ওয়েবসাইট ও ই-কমার্স",
          "Digital Marketing": "ডিজিটাল মার্কেটিং",
          "AI & Automation": "AI ও অটোমেশন",
          "Business Systems": "বিজনেস সিস্টেমস",
          "Multiple services": "একাধিক সেবা / নিশ্চিত নই",
          Other: "অন্যান্য",
        };
        return { ...option, label: labels[option.value] ?? option.label };
      })
    : serviceOptions;

  const displayBudgetOptions = isBn
    ? budgetOptions.map((value) => ({
        value,
        label: value === "Under $2,500" ? "$2,500-এর কম" : value === "$50,000+" ? "$50,000+" : value === "Not sure yet" ? "এখনও নিশ্চিত নই" : value,
      }))
    : budgetOptions.map((value) => ({ value, label: value }));

  const displayTimelineOptions = isBn
    ? timelineOptions.map((value) => ({
        value,
        label: ({
          "As soon as possible": "যত দ্রুত সম্ভব",
          "Within 1 month": "১ মাসের মধ্যে",
          "1–3 months": "১–৩ মাস",
          "3–6 months": "৩–৬ মাস",
          "Still exploring": "এখনও পরিকল্পনা করছি",
        } as Record<string, string>)[value],
      }))
    : timelineOptions.map((value) => ({ value, label: value }));

  /**
   * Pre-select the service from `?service=` on mount.
   *
   * Read from `window.location` rather than `useSearchParams()` so the page
   * stays fully static (no Suspense boundary or dynamic rendering needed).
   * Any value that isn't a real service option is ignored.
   */
  useEffect(() => {
    if (defaultService) return;

    const requested = new URLSearchParams(window.location.search).get("service");
    if (!requested) return;

    const match = serviceOptions.find(
      (option) =>
        option.value.toLowerCase() === requested.trim().toLowerCase() ||
        option.label.toLowerCase() === requested.trim().toLowerCase(),
    );

    if (match) {
      // Synchronising with an external system (the URL) at mount. Doing this
      // during render would desynchronise SSR and client markup, and this page
      // is intentionally prerendered as static HTML.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((previous) => ({ ...previous, service: match.value }));
      setPrefilled(true);
    }
  }, [defaultService]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setServerErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  /**
   * Validation is *derived* on every render rather than stored in state:
   * correct by construction, no cascading re-renders, and errors clear the
   * instant a field becomes valid.
   */
  const validationErrors = useMemo<Record<string, string>>(() => {
    const parsed = contactSchema.safeParse(values);
    return parsed.success ? {} : fieldErrorsFrom(parsed.error);
  }, [values]);

  /** Only show a message once the visitor has left the field, or on submit. */
  const errors = useMemo<Record<string, string>>(() => {
    const visible: Record<string, string> = {};

    for (const [key, message] of Object.entries(validationErrors)) {
      if (submitAttempted || touched[key]) visible[key] = message;
    }

    return { ...visible, ...serverErrors };
  }, [validationErrors, touched, submitAttempted, serverErrors]);

  const remaining = CONTACT_LIMITS.projectDetails - values.projectDetails.length;

  const fallbackEmailHref = useMemo(() => {
    const subject = encodeURIComponent(
      `New project enquiry${values.businessName ? ` — ${values.businessName}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Business: ${values.businessName}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Service needed: ${values.service}`,
        values.budget ? `Budget: ${values.budget}` : "",
        values.timeline ? `Timeline: ${values.timeline}` : "",
        "",
        values.projectDetails,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    return `mailto:${site.contact.projectsEmail}?subject=${subject}&body=${body}`;
  }, [values]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSubmitAttempted(true);

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setStatus("error");
      setFormError(
        `Please review ${Object.keys(fieldErrors).length === 1 ? "the highlighted field" : "the highlighted fields"} below.`,
      );

      const firstKey = fieldOrder.find((key) => fieldErrors[key]);
      if (firstKey) {
        document.getElementById(firstKey)?.focus();
      }
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!response.ok || !payload.ok) {
        const errorPayload = payload as Extract<ContactApiResponse, { ok: false }>;

        if (errorPayload.fieldErrors) {
          setServerErrors(errorPayload.fieldErrors);
          setTouched(
            fieldOrder.reduce<Record<string, boolean>>((acc, key) => {
              acc[key] = true;
              return acc;
            }, {}),
          );
          const firstKey = fieldOrder.find((key) => errorPayload.fieldErrors?.[key]);
          if (firstKey) document.getElementById(firstKey)?.focus();
        }

        setStatus("error");
        setFormError(
          errorPayload.retryAfterSeconds
            ? `${errorPayload.message} (about ${errorPayload.retryAfterSeconds}s)`
            : errorPayload.message,
        );
        return;
      }

      setResult(payload);
      setStatus("success");
      setValues({ ...emptyValues, service: defaultService });
      setServerErrors({});
      setTouched({});
      setSubmitAttempted(false);

      // Move focus to the confirmation so screen readers announce it.
      window.requestAnimationFrame(() => {
        successRef.current?.focus();
        successRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    } catch {
      setStatus("error");
      setFormError(
        "We couldn't reach the server. Check your connection and try again — or use the direct email and WhatsApp links below.",
      );
    }
  }

  /* --------------------------------------------------------------- success */
  if (status === "success" && result) {
    const sent = result.delivery.filter((entry) => entry.status === "sent");
    const failed = result.delivery.filter((entry) => entry.status === "failed");

    return (
      <div
        ref={successRef}
        tabIndex={-1}
        aria-live="polite"
        className={cn("flex flex-col gap-6 outline-none", className)}
      >
        <div className="vc-panel rounded-3xl p-6 sm:p-8">
          <span
            aria-hidden="true"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-pulse-400/30 bg-pulse-400/12 text-pulse-400"
          >
            <Icon name="checkCircle" className="h-6 w-6" />
          </span>

          <h2 className="mt-5 text-2xl font-semibold sm:text-[1.75rem]">
            {isBn ? "আপনার অনুরোধটি গ্রহণ করা হয়েছে — ধন্যবাদ।" : "Enquiry received — thank you."}
          </h2>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-400">
            {isBn ? (
              <>আপনার রেফারেন্স হলো {" "}
                <span className="font-mono font-semibold text-brand-200">{result.reference}</span>। VENTRICON-এর একজন সিনিয়র সদস্য {" "}
                <span className="text-slate-200">{values.email || "আপনার ইমেইলে"}</span> {" "}
                এক কর্মদিবসের মধ্যে উত্তর দেবেন — সাধারণত কয়েকটি প্রশ্ন ও discovery call-এর সম্ভাব্য সময়সহ।</>
            ) : (
              <>Your reference is {" "}
                <span className="font-mono font-semibold text-brand-200">{result.reference}</span>। A senior member of the VENTRICON team will reply to {" "}
                <span className="text-slate-200">{values.email || "your email"}</span> {" "}
                within one business day — usually with a short set of questions and two or three proposed times for a discovery call.</>
            )}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-4">
              <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-slate-500 uppercase">
                {isBn ? "রেফারেন্স" : "Reference"}
              </dt>
              <dd className="mt-1.5 font-mono text-sm text-slate-200">
                {result.reference}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/8 bg-ink-900/60 p-4">
              <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-slate-500 uppercase">
                {isBn ? "গ্রহণের সময়" : "Received"}
              </dt>
              <dd className="mt-1.5 text-sm text-slate-200">
                {new Date(result.receivedAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "UTC",
                })}{" "}
                UTC
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-white/8 bg-ink-900/40 p-4">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-slate-500 uppercase">
              {isBn ? "ডেলিভারি লগ" : "Delivery log"}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {[...sent, ...failed].map((entry) => (
                <li key={entry.channel} className="flex items-start gap-2.5">
                  <Icon
                    name={entry.status === "sent" ? "checkCircle" : "alert"}
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      entry.status === "sent" ? "text-pulse-400" : "text-[#ff8f8f]",
                    )}
                  />
                  <span className="text-slate-300">
                    {channelLabels[entry.channel] ?? entry.channel}
                    <span className="text-slate-500">
                      {" "}
                      — {entry.status === "sent" ? "delivered" : `not sent (${entry.detail ?? "error"})`}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {!sent.some((entry) => entry.channel.startsWith("email")) ? (
            <Alert tone="info" title={isBn ? "আজই উত্তর চান?" : "Want a same-day answer?"} className="mt-6">
              {isBn
                ? "ইমেইল এখনো কনফিগার করা হয়নি, তাই আপনার অনুরোধ সার্ভারে সংরক্ষিত হয়েছে। দ্রুত যোগাযোগ করতে নিচের যেকোনো মাধ্যম ব্যবহার করুন:"
                : "Email is not yet configured on this deployment, so your enquiry was logged on the server. To reach us immediately, use one of these:"}
              <div className="mt-3 flex flex-wrap gap-3">
                <Button href={fallbackEmailHref} variant="outline" size="sm" icon="mail">
                  {isBn ? "সরাসরি ইমেইল করুন" : "Email us directly"}
                </Button>
                {whatsappLink(`Hello VENTRICON, my enquiry reference is ${result.reference}.`) ? (
                  <Button
                    href={
                      whatsappLink(
                        `Hello VENTRICON, my enquiry reference is ${result.reference}.`,
                      ) as string
                    }
                    external
                    variant="quiet"
                    size="sm"
                    icon="whatsapp"
                  >
                    WhatsApp
                  </Button>
                ) : null}
              </div>
            </Alert>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              icon="refresh"
              onClick={() => {
                setStatus("idle");
                setResult(null);
              }}
            >
              {isBn ? "আরেকটি অনুরোধ পাঠান" : "Send another enquiry"}
            </Button>
            <Button href={isBn ? "/bn" : "/work"} variant="ghost" icon="arrowRight">
              {isBn ? "আমাদের কাজের পদ্ধতি দেখুন" : "See how we work"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ form */
  return (
    <form
      ref={formRef}
      id={id}
      onSubmit={onSubmit}
      noValidate
      aria-busy={busy}
      className={cn("flex flex-col gap-6", className)}
    >
      {formError ? (
        <Alert
          tone="error"
          title={isBn ? "এখনই পাঠানো যায়নি" : "We couldn't send that yet"}
          action={
            <div className="flex flex-wrap gap-2">
              <Button href={fallbackEmailHref} variant="outline" size="sm" icon="mail">
                {isBn ? "ইমেইলে পাঠান" : "Email instead"}
              </Button>
              <Button
                href={`tel:${site.contact.phoneE164}`}
                variant="quiet"
                size="sm"
                icon="phone"
              >
                {isBn ? "কল করুন" : "Call us"}
              </Button>
            </div>
          }
        >
          {formError}
        </Alert>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          meta={{
            id: "name",
            label: isBn ? "আপনার নাম" : "Your name",
            required: true,
            error: errors.name,
            hint: isBn ? "কাকে উত্তরটি পাঠাব?" : "Who should we address the reply to?",
          }}
          value={values.name}
          onChange={(value) => set("name", value)}
          onBlur={() => setTouched((previous) => ({ ...previous, name: true }))}
          placeholder={isBn ? "পূর্ণ নাম" : "Full name"}
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          disabled={busy}
        />

        <TextInput
          meta={{
            id: "businessName",
            label: isBn ? "ব্যবসার নাম" : "Business name",
            required: true,
            error: errors.businessName,
            hint: isBn ? "আপনার কোম্পানি বা প্রতিষ্ঠানের নাম।" : "Your company or organisation.",
          }}
          value={values.businessName}
          onChange={(value) => set("businessName", value)}
          onBlur={() =>
            setTouched((previous) => ({ ...previous, businessName: true }))
          }
          placeholder={isBn ? "কোম্পানি বা ব্র্যান্ডের নাম" : "Company or brand name"}
          autoComplete="organization"
          maxLength={CONTACT_LIMITS.businessName}
          disabled={busy}
        />

        <TextInput
          meta={{
            id: "email",
            label: isBn ? "ইমেইল" : "Email",
            required: true,
            error: errors.email,
            hint: isBn ? "আমরা নিয়মিত পর্যবেক্ষণ করা ইনবক্স থেকে উত্তর দিই।" : "We reply from a monitored inbox, not a no-reply address.",
          }}
          type="email"
          value={values.email}
          onChange={(value) => set("email", value)}
          onBlur={() => setTouched((previous) => ({ ...previous, email: true }))}
          placeholder="you@company.com"
          autoComplete="email"
          inputMode="email"
          maxLength={CONTACT_LIMITS.email}
          disabled={busy}
        />

        <TextInput
          meta={{
            id: "phone",
            label: isBn ? "ফোন / WhatsApp" : "Phone / WhatsApp",
            required: true,
            error: errors.phone,
            hint: isBn ? "যোগাযোগের সুবিধার জন্য country code দিন।" : "Include your country code so we can reach you.",
          }}
          type="tel"
          value={values.phone}
          onChange={(value) => set("phone", value)}
          onBlur={() => setTouched((previous) => ({ ...previous, phone: true }))}
          placeholder="+880 1700 000000"
          autoComplete="tel"
          inputMode="tel"
          maxLength={CONTACT_LIMITS.phone}
          disabled={busy}
        />
      </div>

      <SelectField
        meta={{
          id: "service",
          label: isBn ? "প্রয়োজনীয় সেবা" : "Service needed",
          required: true,
          error: errors.service,
          hint: isBn ? "সবচেয়ে কাছের সেবাটি বেছে নিন — call-এ আমরা scope নিশ্চিত করব।" : "Pick the closest match — we'll confirm the right scope on the call.",
        }}
        value={values.service}
        onChange={(value) => set("service", value)}
        onBlur={() => setTouched((previous) => ({ ...previous, service: true }))}
        options={displayServiceOptions}
        placeholder={isBn ? "একটি সেবা নির্বাচন করুন" : "Select a service"}
        disabled={busy}
        footer={
          prefilled && !errors.service ? (
            <p className="text-xs text-brand-200">
              Pre-filled from the page you came from — change it if that&apos;s
              not quite right.
            </p>
          ) : null
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          meta={{
            id: "budget",
            label: isBn ? "আনুমানিক বাজেট" : "Indicative budget",
            hint: isBn ? "ঐচ্ছিক — বাস্তবসম্মত scope নির্ধারণে সাহায্য করে।" : "Optional — helps us scope realistically.",
          }}
          value={values.budget}
          onChange={(value) => set("budget", value)}
          options={displayBudgetOptions}
          placeholder={isBn ? "একটি রেঞ্জ নির্বাচন করুন" : "Select a range"}
          disabled={busy}
        />

        <SelectField
          meta={{
            id: "timeline",
            label: isBn ? "সময়সীমা" : "Timeline",
            hint: isBn ? "ঐচ্ছিক — আপনি কখন শুরু করতে চান।" : "Optional — when you'd like to start.",
          }}
          value={values.timeline}
          onChange={(value) => set("timeline", value)}
          options={displayTimelineOptions}
          placeholder={isBn ? "সময়সীমা নির্বাচন করুন" : "Select a timeline"}
          disabled={busy}
        />
      </div>

      <TextArea
        meta={{
          id: "projectDetails",
          label: isBn ? "প্রজেক্টের বিস্তারিত" : "Project details",
          required: true,
          error: errors.projectDetails,
          hint: isBn ? "আপনি কী অর্জন করতে চান, কী বাধা আছে এবং সফল ফলাফল কেমন হবে তা লিখুন।" : "What are you trying to achieve, what's in the way, and what does success look like?",
        }}
        value={values.projectDetails}
        onChange={(value) => set("projectDetails", value)}
        onBlur={() =>
          setTouched((previous) => ({ ...previous, projectDetails: true }))
        }
        placeholder={isBn ? "উদাহরণ: আমরা একটি ব্যবসা পরিচালনা করি। আমাদের ওয়েবসাইটে ভিজিটর আসে, কিন্তু enquiry কম। আমরা qualified lead তৈরি করার মতো website ও একটি কার্যকর CRM চাই।" : "Example: We sell industrial components to contractors. Our website gets traffic but very few enquiries, and our sales team works from a spreadsheet. We want a site that generates qualified enquiries and a CRM the team will actually use. Budget approved for Q1; we would like to start within a month."}
        rows={7}
        maxLength={CONTACT_LIMITS.projectDetails}
        disabled={busy}
        footer={
          <p
            className={cn(
              "-mt-1 text-right font-mono text-[0.6875rem]",
              remaining < 200 ? "text-[#f5a524]" : "text-slate-600",
            )}
            aria-hidden="true"
          >
            {values.projectDetails.length} / {CONTACT_LIMITS.projectDetails}
          </p>
        }
      />

      <CheckboxField
        meta={{
          id: "consent",
          label: isBn ? "সম্মতি" : "Consent",
          error: errors.consent,
        }}
        checked={values.consent}
        onChange={(checked) => set("consent", checked)}
      >
        {isBn
          ? "আমি সম্মত যে VENTRICON এই অনুরোধ সম্পর্কে আমার সাথে যোগাযোগ করতে পারে। আমরা আপনার তথ্য শুধু আপনাকে উত্তর দেওয়ার জন্য ব্যবহার করি — দেখুন আমাদের "
          : "I agree that VENTRICON may contact me about this enquiry. We use your details only to respond to you — see our "}
        <Link href={isBn ? "/bn/privacy" : "/privacy"} className="text-brand-200 underline underline-offset-2">
          {isBn ? "গোপনীয়তা নীতি" : "privacy notice"}
        </Link>
        .
      </CheckboxField>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="vc-sr-only" aria-hidden="true">
        <label htmlFor="company_website">{isBn ? "কোম্পানির ওয়েবসাইট (ফাঁকা রাখুন)" : "Company website (leave blank)"}</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={(event) => set("company_website", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-slate-500">
          {isBn
            ? "আমরা সাধারণত এক কর্মদিবসের মধ্যে উত্তর দিই। আপনার তথ্য বিক্রি বা অপ্রয়োজনীয় sales sequence-এ ব্যবহার করা হয় না।"
            : `${site.contact.responseTime} No sales sequences, no reselling your details.`}
        </p>

        <Button
          type="submit"
          size="lg"
          loading={busy}
          icon="arrowRight"
          disabled={busy}
          className="w-full sm:w-auto"
        >
          {busy ? (isBn ? "পাঠানো হচ্ছে…" : "Sending…") : (isBn ? "প্রজেক্ট শুরু করুন" : "START A PROJECT")}
        </Button>
      </div>
    </form>
  );
}
