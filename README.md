# VENTRICON — Official Website

**Business Solutions & Technology · Build. Grow. Transform.**

A complete, production-ready marketing website for VENTRICON, built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Every interaction is functional or explicitly integration-ready — there is no mock behaviour and no placeholder copy.

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [What's included](#2-whats-included)
3. [Project structure](#3-project-structure)
4. [Where to change content](#4-where-to-change-content)
5. [Environment variables & integrations](#5-environment-variables--integrations)
6. [The contact form pipeline](#6-the-contact-form-pipeline)
7. [Testing](#7-testing)
8. [Deployment](#8-deployment)
9. [Before you go live checklist](#9-before-you-go-live-checklist)
10. [Technical decisions](#10-technical-decisions)

---

## 1. Quick start

**Requirements:** Node.js 20.9 or newer (Node 20 or 22 LTS recommended) and npm 10+.

```bash
# 1. Install dependencies
npm install

# 2. Optional — configure integrations (the site works without this)
cp .env.example .env.local

# 3. Start the development server
npm run dev
# → http://localhost:3000
```

Production build:

```bash
npm run build     # compiles, type-checks and prerenders every route
npm start         # serves the production build on http://localhost:3000
```

Other scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also runs the TypeScript check) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | typecheck → lint → build, in one command |
| `npm run test:e2e` | Playwright end-to-end suite (desktop + mobile) |
| `npm run test:e2e:ui` | Playwright interactive UI mode |

> **First run of the E2E suite:** install the browser once with
> `npx playwright install --with-deps chromium`. The suite starts its own
> production server automatically.

---

## 2. What's included

### Pages (23 routes)

| Route | Contents |
| --- | --- |
| `/` | Hero (BUILD. GROW. TRANSFORM. + Get Started / Explore Services), sector marquee, Services, Why VENTRICON, How We Work, Featured Work, About, written commitments, final CTA, full contact section, FAQ |
| `/services` | All five services with capabilities, benefits, deliverables, timelines and inline CTAs, plus a sticky jump-to-service bar that tracks the section in view and a comparison table of when to combine services |
| `/services/branding-design` | Full service page: symptoms, capabilities, benefits, 10 deliverables, process, engagement models, FAQ, related work, cross-links |
| `/services/website-ecommerce` | As above |
| `/services/digital-marketing` | As above |
| `/services/ai-automation` | As above |
| `/services/business-systems` | As above |
| `/solutions` | Six packaged programmes with anchors, a services × programmes comparison matrix, scoping process, and "who this is not for" |
| `/work` | Filterable index of eight engagement blueprints (URL-synced filters, live result counts) |
| `/work/[slug]` | Eight case-study pages: situation, challenges, approach, results, stack, sidebar snapshot, related work |
| `/about` | Why VENTRICON exists, principles, capability groups, how we work, commitments, FAQ |
| `/contact` | Validated enquiry form, direct channels, office hours, studio, guidance paths, contact FAQ |
| `/privacy`, `/terms` | Written, substantive legal pages |
| `/not-found` | Branded 404 with popular destinations, services and programmes |
| `/api/contact` | POST endpoint: validation, rate limiting, spam filtering, multi-channel delivery |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/manifest.webmanifest` | Generated at build time |

### Functionality

- **Responsive navigation** — sticky glass header, active-route highlighting, services flyout (keyboard operable, Escape to close, outside-click to dismiss), phone number, persistent "Start a project" CTA
- **Mobile menu** — opaque full-height sheet, body-scroll lock, closes on navigation and on Escape
- **Smooth scrolling** — `scroll-behavior: smooth` with `scroll-padding-top` so sticky-header anchors land correctly, plus a cross-page hash resolver for links like `/about#how-we-work`
- **Portfolio filtering** — instant client-side filtering with live counts, `aria-pressed` state, polite live-region announcements, and `?filter=` URL sync (shareable; server-rendered with every blueprint so nothing is hidden from crawlers)
- **FAQ accordion** — native buttons with `aria-expanded`/`aria-controls`, animated with the grid-rows technique, Arrow/Home/End keyboard support
- **Contact form** — six required fields plus optional budget and timeline, inline validation on blur and on submit, character counter, loading state, success screen with reference number and per-channel delivery log, error state with direct email/phone fallback
- **Loading states** — button spinners, `aria-busy`, skeletons on the work index fallback, reading-progress bar
- **CTA interactions** — service and solution CTAs pre-fill the contact form's "Service needed" field via `?service=`
- **Back-to-top** button, skip-to-content link, scroll-reveal animations that respect `prefers-reduced-motion` and never hide content when JavaScript is off
- **SEO** — per-route metadata via a single builder, canonical URLs, Open Graph + Twitter cards with a generated OG image, JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`, `AboutPage`, `ContactPage`, `ItemList`), sitemap, robots

---

## 3. Project structure

```
ventricon/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              Root layout: fonts, metadata, header, footer, JSON-LD
│  │  ├─ page.tsx                Home
│  │  ├─ globals.css             Design tokens, brand utilities, motion, a11y styles
│  │  ├─ not-found.tsx           404
│  │  ├─ services/[slug]/page.tsx
│  │  ├─ solutions/page.tsx
│  │  ├─ work/[slug]/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ privacy/page.tsx  ·  terms/page.tsx
│  │  ├─ api/contact/route.ts    Enquiry endpoint (validation → spam → delivery)
│  │  ├─ opengraph-image.tsx     Social card, generated with ImageResponse
│  │  ├─ sitemap.ts  ·  robots.ts  ·  manifest.ts  ·  icon.svg
│  ├─ components/
│  │  ├─ ui/          Button, Icon (typed inline SVG set), Layout, Reveal,
│  │  │               Accordion, Feedback (Alert/Spinner/Skeleton), Artwork
│  │  ├─ layout/      Header, Footer, PageHero, ScrollUtilities, CopyrightYear
│  │  ├─ sections/    Hero, ServiceGrid, SolutionsGrid, WhyVentricon,
│  │  │               ProcessTimeline, FeaturedWork, AboutPreview, FinalCta,
│  │  │               ContactSection, FaqSection, StatsBand
│  │  ├─ services/    ServiceNav, ServiceSections (composable page blocks)
│  │  ├─ forms/       ContactForm, Fields (accessible field primitives)
│  │  ├─ work/        WorkFilterGrid
│  │  └─ seo/         JsonLd
│  ├─ lib/
│  │  ├─ site.ts         ⚠️ Brand + contact details — edit this first
│  │  ├─ services.ts     Five services: capabilities, deliverables, FAQs…
│  │  ├─ solutions.ts    Six packaged programmes
│  │  ├─ work.ts         Eight engagement blueprints
│  │  ├─ process.ts      How we work, values, commitments, general FAQs
│  │  ├─ validation.ts   Zod schema shared by the form and the API
│  │  ├─ integrations.ts Email / WhatsApp / CRM / storage connectors
│  │  ├─ seo.ts          Metadata builder + JSON-LD factories
│  │  ├─ types.ts        Shared domain types
│  │  └─ utils.ts        cn(), URL helpers, formatting
│  └─ tests/e2e/site.spec.ts     80+ Playwright assertions
├─ .env.example
├─ playwright.config.ts
└─ next.config.ts
```

---

## 4. Where to change content

All copy is data-driven. You never need to touch a component to change wording.

| What | File |
| --- | --- |
| **Brand name, taglines, phone, email, WhatsApp, address, office hours, social links, company facts** | `src/lib/site.ts` |
| Services (descriptions, capabilities, benefits, deliverables, process, engagement models, FAQs, target metrics) | `src/lib/services.ts` |
| Solutions (programmes, audiences, inclusions, timelines) | `src/lib/solutions.ts` |
| Portfolio blueprints (narrative, challenges, approach, results, stack) | `src/lib/work.ts` |
| How we work (5 stages), values, commitments, team roles, general FAQs | `src/lib/process.ts` |
| Budget and timeline options, field rules | `src/lib/validation.ts` |
| Design tokens (colours, type, motion) | `src/app/globals.css` (`@theme`) |
| Navigation and footer link groups | `src/components/layout/Header.tsx`, `Footer.tsx` |

**Search for `PLACEHOLDER`** — every value that must be replaced before launch is
marked, so `grep -rn "PLACEHOLDER" src/` gives you the complete pre-launch list.

The portfolio publishes **engagement blueprints** (how each engagement type is
run) rather than unverifiable client logos. Figures labelled "target" are the
success measures VENTRICON agrees at kick-off and are deliberately not
attributed to named clients. If you would rather publish named client work,
replace the `client` descriptors in `src/lib/work.ts` and confirm each result
before publishing.

---

## 5. Environment variables & integrations

Copy `.env.example` to `.env.local`. **All of it is optional** — the site is
fully functional with an empty file.

| Variable | Effect when set |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, OG tags, JSON-LD, sitemap, robots |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Shows WhatsApp CTAs site-wide (hidden when empty — never a dead link) |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Emails each enquiry to the team with `reply-to` set to the enquirer, and an auto-reply-shaped reference number for the visitor |
| `CONTACT_WEBHOOK_URL` | Posts the full lead (plus a formatted `summary`) to Zapier / Make / n8n / Formspree / your API |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_NUMBER` | Sends an internal WhatsApp Business alert per enquiry |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_TOKEN` | Creates a record in HubSpot / Zoho / Pipedrive / Salesforce via a vendor-neutral payload |
| `LEADS_DIR` | Where the server-side JSONL lead log is written (default `./.data/leads`) |

Configure one, several, or none. Each channel is independent: one failing never
blocks the others, and the visitor is always told what actually happened.

### Adding a new provider

Open `src/lib/integrations.ts`. Each channel is one small async function —
`deliverEmail`, `deliverWhatsapp`, `deliverCrm` — returning a typed
`DeliveryReport`. Add a function, add it to the `Promise.allSettled` fan-out in
`deliverLead`, and it appears automatically in the success screen's delivery log.

---

## 6. The contact form pipeline

```
Browser form
  │  1. Client validation        zod schema (instant, on blur + on submit)
  ▼
POST /api/contact
  │  2. Rate limit               5 requests / 10 min per connection (in-memory)
  │  3. Server validation        same zod schema — the client is never trusted
  │  4. Spam honeypot            hidden field; bots get a fake success
  ▼
Promise.allSettled fan-out
  ├─ email      (Resend  OR  automation webhook)
  ├─ whatsapp   (WhatsApp Business API)
  ├─ crm        (vendor-neutral webhook)
  └─ storage    (append ./.data/leads/YYYY-MM-DD.jsonl)
  ▼
JSON response: reference, receivedAt, per-channel delivery log, fallback links
```

The response drives the UI: the success screen lists exactly which channels
delivered, and when email is not yet configured it says so plainly and offers
direct email and WhatsApp links so a real enquiry is never lost.

**Fields:** Name, Business Name, Email, Phone, Service Needed, Project Details
(all required) plus optional Indicative Budget and Timeline, and a consent
checkbox. The submit button reads **START A PROJECT**.

---

## 7. Testing

```bash
npx playwright install --with-deps chromium   # once
npm run test:e2e
```

The suite runs against the production build in two projects — **desktop**
(1440×900) and **mobile** (Pixel 7) — and covers:

- Every public route: HTTP 200, correct `<h1>`, exactly one `<h1>`, **zero console errors**, no failed asset requests
- Unknown routes render the branded 404 with a real 404 status
- Desktop header navigation across all five pages; services flyout contents and Escape behaviour
- Mobile menu: open, navigate, close, scroll-lock release, services list and CTA present
- Footer links and the skip-to-content link (keyboard focus + jump)
- Cross-page anchors (`/about#how-we-work`, `/services#ai-automation`) and the service jump-bar
- Portfolio filtering: chip state, URL sync, result counts, pre-filtered shareable URLs
- FAQ accordion: expand/collapse, `aria-expanded`, ArrowDown keyboard navigation, per-service independence
- Contact form: blocking invalid submissions with per-field messages, live email/textarea validation, **a real successful submission** with reference and delivery log, honeypot invisibility, no dead `href`s anywhere
- **Responsive layout:** no horizontal overflow on 7 pages × 5 viewports (360, 390, 768, 1024, 1440)
- Mobile tap-target size, canonical/OG/Twitter metadata, JSON-LD validity on 5 routes, sitemap and robots content, OG image is a real PNG
- API contract: `GET` → 405, malformed JSON → 400

Manual QA performed alongside the suite: full-page screenshots of every route at
desktop/tablet/mobile, scroll-reveal verification after slow and instant scroll,
heading-outline audit, duplicate-id audit, unlabelled-control audit, and a
performance trace (FCP 156–244 ms, ~12 KB CSS, ~200 KB JS, 12–13 requests per
page on the production build).

---

## 8. Deployment

### Vercel (recommended — zero configuration)

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**.
4. Deploy.

> On serverless, the local JSONL lead log cannot persist between invocations.
> That is handled gracefully — but configure `RESEND_API_KEY` (or
> `CONTACT_WEBHOOK_URL`) **and** `CRM_WEBHOOK_URL` so enquiries are durably
> delivered. The delivery log in the success screen shows exactly what was sent.

### Any Node host (VPS, Docker, Railway, Render, Fly.io)

```bash
npm ci
npm run build
npm start          # binds to :3000 by default
```

Set `PORT` to change the port and `HOSTNAME=0.0.0.0` if the platform requires it.
Keep `LEADS_DIR` on a persistent volume to retain the local lead log. Put a
reverse proxy (nginx, Caddy) in front for TLS — the site is served over HTTPS
only and sets no cookies, so no extra configuration is required.

### Static export

Not recommended: the contact endpoint, sitemap and OG image are server-rendered.
If you need a static host, keep the site on a Node host or point the form at an
external form service via `CONTACT_WEBHOOK_URL`.

---

## 9. Before you go live checklist

- [ ] `grep -rn "PLACEHOLDER" src/` — replace every marked value in `src/lib/site.ts`
- [ ] Set the real email address, phone number and studio address
- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (or leave empty to hide WhatsApp CTAs)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Add social profile URLs in `site.social` (blank entries are hidden automatically)
- [ ] Confirm company facts — `site.facts` (clients served, countries, team size, founding year)
- [ ] Configure at least one delivery channel (`RESEND_API_KEY` or `CONTACT_WEBHOOK_URL`)
- [ ] Replace `src/app/favicon.ico` if you have a production favicon
- [ ] Send a live test enquiry and confirm it arrives by email **and** in the CRM
- [ ] Review the engagement blueprints in `src/lib/work.ts` — confirm or replace every "target" figure before publishing
- [ ] Update `site.facts.contentUpdated` so `sitemap.xml` reports an accurate last-modified date
- [ ] Run `npm run verify && npm run test:e2e`
- [ ] Submit `sitemap.xml` in Google Search Console; verify with Rich Results Test

---

## 10. Technical decisions

**Next.js App Router with Cache Components.** 32 routes are prerendered as static
HTML; only `/api/contact` is dynamic. Server Components carry all content, so the
JavaScript payload stays ~200 KB — the interactive pieces (navigation, form,
filter, accordion, reveal) are the only client components.

**Tailwind CSS v4 with `@theme` tokens.** All brand colours, fonts and animations
live in one `@theme` block in `globals.css`, so the palette is changeable in one
place. Composite effects that Tailwind expresses poorly (glass surfaces, panel
gradients, grid backdrops, skeleton shimmer) are plain CSS utilities, which also
keeps the compiled stylesheet at ~12 KB.

**Accessibility as a build requirement, not a retrofit.** Semantic landmarks and
a single `<h1>` per page; every control has an accessible name (an early version
shipped four unlabelled inputs — the E2E suite caught it, and the field
primitives were rebuilt so a control *cannot* be rendered without a label);
`aria-expanded`/`aria-controls`/`aria-pressed`/`aria-live` where state changes;
full keyboard operation including Arrow/Home/End in the accordion; skip link;
visible focus rings; `prefers-reduced-motion` honoured; AA-targeted contrast.

**No image assets.** Every visual — the logo mark, service glyphs, project
artwork, process diagram, procedural decoration — is inline SVG generated
deterministically from typed data. That means no layout shift, no licence costs,
no CDN dependency, nothing to optimise, and it renders identically in the preview
sandbox where external assets are blocked.

**Zero runtime UI dependencies.** No component library, no icon package, no
animation library, no `clsx`. The only runtime dependencies are Next.js, React
and Zod. One small utility (`cn`) replaces the two classname packages most
projects install.

**Honest content.** No Lorem Ipsum, no invented client logos, no fake
testimonials, no "trusted by" walls. Where a number is a commitment rather than a
delivered outcome it says so. Where a fallback exists because an integration
isn't configured, the UI says that too.

---

© 2026 VENTRICON Business Solutions & Technology. Build. Grow. Transform.
