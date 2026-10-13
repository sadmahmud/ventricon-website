import type { Service, ServiceId } from "@/lib/types";

/**
 * ============================================================================
 * VENTRICON — service catalog
 * ============================================================================
 * Business-scope statements and process descriptions are accurate to how
 * VENTRICON works. The `metrics` figures are the **targets VENTRICON commits
 * to for each engagement type** — they are deliberately not attributed to
 * named clients. Replace them with verified client results as they accumulate.
 */

export const services: Service[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: "branding-design",
    slug: "branding-design",
    order: 1,
    name: "Branding & Design",
    shortName: "Branding",
    tagline: "A brand that earns trust before you say a word.",
    summary:
      "Positioning, identity, messaging and design systems that make your business look like the obvious choice in its category.",
    intro: [
      "Most businesses don't have a branding problem — they have a clarity problem. Buyers can't tell what you do, who it's for or why you're better, so they default to whoever is cheapest or loudest.",
      "We fix that. We work out the one thing you want to be known for, then build an identity and messaging system that says it consistently across your website, proposals, packaging, social and sales decks.",
    ],
    outcomesIntro:
      "You leave with a brand you can hand to any designer, agency or new hire — and they will produce work that looks like it came from the same company.",
    icon: "palette",
    accent: "grape",
    problems: [
      {
        title: "You look interchangeable",
        body: "Your website, deck and social channels could belong to three different companies — and none of them clearly says why you're the better choice.",
      },
      {
        title: "Sales keeps re-explaining you",
        body: "Every new prospect needs the full explanation from scratch because nothing you send does the positioning work for you.",
      },
      {
        title: "You've outgrown your logo",
        body: "The identity was made for a smaller, different business and it now undersells the quality of what you actually deliver.",
      },
      {
        title: "Your team improvises",
        body: "Without a design system, everyone picks their own fonts, colours and layouts, and consistency erodes with every new asset.",
      },
    ],
    capabilities: [
      {
        title: "Brand strategy & positioning",
        icon: "compass",
        body: "Market and competitor review, customer interviews, positioning statement, value proposition, proof points and messaging hierarchy.",
      },
      {
        title: "Naming & verbal identity",
        icon: "quote",
        body: "Name development and screening, tagline, tone of voice, boilerplate copy and a glossary of terms your team should and shouldn't use.",
      },
      {
        title: "Visual identity",
        icon: "palette",
        body: "Logo suite and lockups, colour system, type scale, iconography, photography and illustration direction, motion principles.",
      },
      {
        title: "Design systems",
        icon: "layers",
        body: "Reusable component libraries for Figma and for code — spacing, grids, states, dark/light tokens and accessibility contrast rules.",
      },
      {
        title: "Collateral & marketing design",
        icon: "sparkles",
        body: "Pitch decks, sales one-pagers, brochures, packaging, event and trade-show graphics, templates your team can edit themselves.",
      },
      {
        title: "Brand guidelines",
        icon: "shield",
        body: "A working guidelines site — not a 90-page PDF nobody opens — with do/don't examples, asset downloads and usage rules.",
      },
    ],
    benefits: [
      {
        title: "Faster, higher-priced sales",
        body: "Clear positioning shortens the sales conversation, and confident design means fewer buyers negotiate purely on price.",
      },
      {
        title: "One voice everywhere",
        body: "Ad, website, proposal and support reply all sound like the same business — so recognition compounds instead of resetting.",
      },
      {
        title: "Cheaper content production",
        body: "Templates and a design system cut the time (and cost) of every future asset your team or agency produces.",
      },
      {
        title: "Onboarding in minutes",
        body: "New hires and freelancers get a single link that answers 'how do we look and sound?' without asking you.",
      },
    ],
    deliverables: [
      "Brand strategy document (positioning, audience, messaging, proof)",
      "Naming and tagline options with screening notes",
      "Primary logo, secondary lockups, favicon and app icon set",
      "Colour system with accessible contrast pairs",
      "Typography scale and font licensing guidance",
      "Iconography, photography and illustration direction",
      "Figma design-system library with published components",
      "Sales deck and one-pager templates",
      "Social media templates (posts, stories, covers)",
      "Brand guidelines site with downloadable assets",
    ],
    process: [
      {
        title: "Discovery & audit",
        body: "We interview your founders, sales team and customers, audit what you publish today and map how competitors are positioned.",
      },
      {
        title: "Strategy & positioning",
        body: "We agree the single positioning idea, the audience it targets, the proof behind it and the message hierarchy that supports it.",
      },
      {
        title: "Design exploration",
        body: "Two or three distinct visual directions, applied to real touchpoints (not a logo on a grey background), reviewed together.",
      },
      {
        title: "Systemise & hand over",
        body: "We build the full system, document the rules, then run a working session so your team can operate it without us.",
      },
    ],
    metrics: [
      { value: "3", label: "Distinct directions to choose from" },
      { value: "2", label: "Revision rounds included" },
      { value: "1", label: "Single source of brand truth" },
      { value: "100%", label: "Editable source files at handover" },
    ],
    stack: [
      "Figma",
      "Adobe Illustrator",
      "Photoshop",
      "After Effects",
      "Notion",
      "Google Fonts / licensed type",
    ],
    engagements: [
      {
        name: "Brand Refresh",
        duration: "3–4 weeks",
        bestFor: "Established businesses whose look no longer matches their quality.",
        includes: [
          "Positioning and messaging refresh",
          "Refined logo suite and colour/type system",
          "Core templates and a short guidelines set",
        ],
      },
      {
        name: "Full Brand Build",
        duration: "5–7 weeks",
        bestFor: "New ventures and businesses repositioning into a new market.",
        includes: [
          "Everything in Brand Refresh",
          "Naming, verbal identity and tone of voice",
          "Complete design system, collateral suite and guidelines site",
          "Team rollout workshop",
        ],
        featured: true,
      },
      {
        name: "Design Partner (ongoing)",
        duration: "Monthly retainer",
        bestFor: "Teams shipping campaigns, assets and product changes every month.",
        includes: [
          "Reserved design capacity each month",
          "Campaign, product and sales collateral",
          "Priority turnaround and quarterly system updates",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we have to change our logo?",
        a: "No. Plenty of refreshes keep a recognisable mark and modernise everything around it — colour, type, layout and messaging. If we believe a new mark is genuinely worth the equity cost, we'll show you why and let you decide.",
      },
      {
        q: "How do you make sure the brand isn't just your taste?",
        a: "Every direction is judged against the agreed positioning and the audience it must convince, not our preference. We score options on clarity, distinctiveness, credibility and practical flexibility, and we show each direction applied to real touchpoints so you're evaluating applied work rather than abstract concepts.",
      },
      {
        q: "Who owns the final files?",
        a: "You do — full ownership of the approved deliverables transfers to you on final payment, including editable source files and font licensing guidance.",
      },
    ],
    ctaLabel: "Branding & Design",
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: "website-ecommerce",
    slug: "website-ecommerce",
    order: 2,
    name: "Website & E-commerce",
    shortName: "Web & Commerce",
    tagline: "Websites built to sell — and fast enough to prove it.",
    summary:
      "High-performance marketing sites and e-commerce stores engineered for conversion, search visibility and easy day-to-day editing.",
    intro: [
      "A website is not a brochure. It's the one salesperson that works every hour, in every market, and never improvises. It should be built with the same discipline as your best hire: clear, credible, responsive and always on.",
      "We design and engineer sites on modern frameworks — server-rendered, accessible, fast on a mid-range phone over a weak connection — and we wire them into your analytics, CRM and payment stack so enquiry and order data lands where your team already works.",
    ],
    outcomesIntro:
      "You end up with a site your team can update without a developer, and a measurable funnel you can improve month after month instead of guessing.",
    icon: "code",
    accent: "brand",
    problems: [
      {
        title: "Traffic without enquiries",
        body: "People visit but leave — usually because the offer is unclear in the first five seconds or the path to contact is buried.",
      },
      {
        title: "Slow on real phones",
        body: "Heavy themes and unoptimised images mean the site loads slowly for actual customers on mid-range devices, and they bounce.",
      },
      {
        title: "Editing needs a developer",
        body: "Changing a price, adding a product or publishing a post turns into a support ticket and a wait.",
      },
      {
        title: "Checkout leaks revenue",
        body: "Customers reach checkout and drop off because of forced accounts, surprise shipping costs or a payment method they don't use.",
      },
      {
        title: "Invisible in search",
        body: "No technical SEO foundation, no structured data and no content strategy, so competitors capture the demand you created.",
      },
    ],
    capabilities: [
      {
        title: "Conversion-focused web design",
        icon: "target",
        body: "Message-first page architecture, clear hierarchy, objection handling, trust signals and a contact path visible in every viewport.",
      },
      {
        title: "Front-end engineering",
        icon: "code",
        body: "Hand-built, accessible, responsive interfaces with semantic HTML, sensible component boundaries and no bloated theme baggage.",
      },
      {
        title: "E-commerce stores",
        icon: "cart",
        body: "Catalogue architecture, PDPs that answer buying questions, frictionless checkout, local payment methods, tax and shipping logic.",
      },
      {
        title: "CMS & content operations",
        icon: "layers",
        body: "Structured content models your team can edit safely — products, blog, case studies, landing pages — with previews before publishing.",
      },
      {
        title: "Performance & Core Web Vitals",
        icon: "gauge",
        body: "Image pipelines, code splitting, caching and CDN strategy. We measure real-user metrics, not just lab scores.",
      },
      {
        title: "Technical SEO & analytics",
        icon: "search",
        body: "Crawlable structure, metadata and Open Graph, JSON-LD, sitemaps, redirects and conversion events wired into your analytics.",
      },
      {
        title: "Integrations",
        icon: "flow",
        body: "Payments, CRM, ERP, email marketing, WhatsApp, live chat and shipping providers connected through documented, maintainable APIs.",
      },
      {
        title: "Support & growth",
        icon: "refresh",
        body: "Monitoring, uptime alerts, dependency and security updates, iterative A/B tests and continuous improvement against live data.",
      },
    ],
    benefits: [
      {
        title: "More enquiries per visitor",
        body: "Structured offers, credible proof and shorter paths to contact mean more of the traffic you already pay for converts.",
      },
      {
        title: "Rankings that hold",
        body: "A clean technical foundation means SEO work compounds instead of fighting the platform.",
      },
      {
        title: "Lower cost per change",
        body: "Self-service CMS editing removes routine developer tickets from your budget and your calendar.",
      },
      {
        title: "Revenue without babysitting",
        body: "Reliable hosting, monitoring and a tested checkout keep the store selling while your team sleeps.",
      },
    ],
    deliverables: [
      "Technical spec, sitemap and page-by-page wireframes",
      "Responsive UI design for every unique template",
      "Production build on a modern React/Next.js stack",
      "CMS configured with content models and editor roles",
      "Payment, shipping, tax and invoicing configuration",
      "CRM, email and analytics integrations",
      "SEO foundation: metadata, Open Graph, JSON-LD, sitemaps",
      "Core Web Vitals performance report with real-user data",
      "Editor and admin training plus written runbook",
      "30-day post-launch support window",
    ],
    process: [
      {
        title: "Architecture & content",
        body: "We map the funnel, decide which pages earn their place and write the message each one must land before any design starts.",
      },
      {
        title: "Design & prototype",
        body: "We design the key templates and prototype the flows that matter — enquiry, checkout, account, search — in the browser where possible.",
      },
      {
        title: "Build & integrate",
        body: "Component-based development, CMS wiring, payment and CRM integrations, accessibility passes and cross-browser testing.",
      },
      {
        title: "Optimise & launch",
        body: "Performance tuning, analytics events, redirect mapping, launch-day checks and a documented handover for your team.",
      },
    ],
    metrics: [
      { value: "90+", label: "Target Lighthouse performance score" },
      { value: "<2.5s", label: "Target LCP on 4G mobile" },
      { value: "100%", label: "Pages with unique metadata" },
      { value: "AA", label: "WCAG contrast and semantics target" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel / AWS",
      "Shopify",
      "WooCommerce",
      "Stripe / SSLCommerz / bKash",
      "Sanity / Shopify CMS",
      "GA4 + GTM",
    ],
    engagements: [
      {
        name: "Marketing Site",
        duration: "4–6 weeks",
        bestFor: "Service businesses that need a credible, fast, editable lead-generation website.",
        includes: [
          "Up to 10 page templates",
          "CMS for blog and case studies",
          "Analytics, SEO foundation and form → CRM routing",
        ],
        featured: true,
      },
      {
        name: "E-commerce Launch",
        duration: "6–10 weeks",
        bestFor: "Retailers and D2C brands selling physical or digital products online.",
        includes: [
          "Catalogue architecture and merchandising",
          "Checkout, payments, shipping and tax setup",
          "Product content system and launch campaigns plan",
        ],
      },
      {
        name: "Replatform & Rebuild",
        duration: "Scoped per audit",
        bestFor: "Sites stuck on a slow or limited platform that has become a growth ceiling.",
        includes: [
          "Migration audit and redirect mapping",
          "Full rebuild on the new stack",
          "Zero-downtime cutover and post-launch watch",
        ],
      },
    ],
    faqs: [
      {
        q: "Which platform will you build on?",
        a: "We recommend the stack based on your team, catalogue, traffic and integrations. For content-led marketing sites that's usually Next.js with a headless CMS; for retail with heavy merchandising and app requirements, Shopify; WooCommerce where WordPress is already deeply embedded in the business.",
      },
      {
        q: "Can we edit the site ourselves after launch?",
        a: "Yes — that's a requirement, not an add-on. You get a structured CMS, sensible editor roles, a written runbook and a live training session before handover.",
      },
      {
        q: "Who hosts and maintains it?",
        a: "We deploy to managed infrastructure with automated backups, SSL, CDN and monitoring. You can take ownership of the accounts at handover, or keep us on a support agreement for updates and improvements.",
      },
      {
        q: "Will the design be original?",
        a: "Every layout is designed for your content model and funnel, built from your brand system. We do not resell or reuse commercial themes as the finished product.",
      },
    ],
    ctaLabel: "Website & E-commerce",
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    order: 3,
    name: "Digital Marketing",
    shortName: "Marketing",
    tagline: "Attention you can trace to revenue.",
    summary:
      "Paid media, search, content and lifecycle marketing managed against revenue and pipeline — not impressions and vanity reach.",
    intro: [
      "Marketing fails quietly when nobody owns the numbers. Spend goes out, dashboards look busy, and the honest question — what did we actually get for it? — has no answer.",
      "We run marketing as a measurable system: clear offer, tracking that survives scrutiny, campaigns built to a hypothesis, and weekly decisions about where the next unit of budget goes. You see the same numbers we do, in a dashboard you own.",
    ],
    outcomesIntro:
      "You get a channel-by-channel picture of what your acquisition actually costs, plus a plan that keeps improving it instead of resetting every quarter.",
    icon: "megaphone",
    accent: "amber",
    problems: [
      {
        title: "Spend without attribution",
        body: "You know you're spending, but not which channel, campaign or keyword produces paying customers rather than cheap clicks.",
      },
      {
        title: "Content with no engine",
        body: "Posts and videos go out irregularly, nobody owns them and there's no link between content and pipeline.",
      },
      {
        title: "Leads that never convert",
        body: "Enquiries arrive but go cold because follow-up depends on someone remembering to send a message.",
      },
      {
        title: "Falling organic reach",
        body: "Rankings and traffic slide because the technical foundation and content plan were never maintained.",
      },
      {
        title: "No shared source of truth",
        body: "Ad platform, analytics and CRM all disagree, so planning meetings become arguments about whose number is right.",
      },
    ],
    capabilities: [
      {
        title: "Strategy & channel planning",
        icon: "compass",
        body: "Audience research, offer and message testing, budget allocation by expected payback, and a quarterly roadmap with owners.",
      },
      {
        title: "Paid search & social",
        icon: "target",
        body: "Google, Meta, LinkedIn and TikTok campaigns — structure, creative, audience testing, landing pages and ongoing bid management.",
      },
      {
        title: "SEO & content",
        icon: "search",
        body: "Keyword and intent mapping, technical fixes, on-page optimisation, editorial calendar, briefs and production support.",
      },
      {
        title: "Social media management",
        icon: "users",
        body: "Channel-specific content systems, scheduling, community responses, and creator or influencer collaborations.",
      },
      {
        title: "Email & lifecycle",
        icon: "mail",
        body: "Segmentation, welcome and abandoned-cart flows, nurture sequences, re-engagement and post-purchase retention.",
      },
      {
        title: "Conversion rate optimisation",
        icon: "chart",
        body: "Funnel diagnostics, heatmaps and session review, landing-page testing and removal of friction at each step.",
      },
      {
        title: "Analytics & attribution",
        icon: "gauge",
        body: "GA4 and server-side event setup, UTM governance, call and form tracking, CRM closed-loop reporting and Looker dashboards.",
      },
      {
        title: "Content production",
        icon: "sparkles",
        body: "Copy, ad creative, short-form video, product photography direction and a reusable asset library tied to the brand system.",
      },
    ],
    benefits: [
      {
        title: "Know your real CAC",
        body: "Cost per qualified lead and per closed customer by channel — the numbers you need to decide where money goes next.",
      },
      {
        title: "Compounding organic assets",
        body: "SEO and content build equity you own, lowering blended acquisition cost as paid prices rise.",
      },
      {
        title: "Leads that don't leak",
        body: "Automated follow-up means every enquiry is worked within minutes, not whenever someone checks the inbox.",
      },
      {
        title: "Defensible reporting",
        body: "One dashboard, agreed definitions and a written record of what changed and why — useful for boards and investors.",
      },
    ],
    deliverables: [
      "Marketing audit with findings ranked by impact",
      "Quarterly channel plan, budget split and forecast",
      "Tracking and attribution implementation in GA4 + GTM",
      "Paid campaign structures, audiences and creative sets",
      "SEO roadmap with prioritised technical and content tasks",
      "Content calendar and copy for agreed channels",
      "Landing pages built to test specific offers",
      "Email and lifecycle automation flows",
      "Live KPI dashboard covering spend to revenue",
      "Monthly performance review with next-period decisions",
    ],
    process: [
      {
        title: "Audit & measurement",
        body: "We establish a trustworthy baseline first: fix tracking, agree definitions, then analyse channel, funnel and creative performance.",
      },
      {
        title: "Offer & message testing",
        body: "Before scaling spend we test offers, headlines and audiences in small, cheap increments to find what actually resonates.",
      },
      {
        title: "Scale what works",
        body: "Winning combinations get budget and volume; losers get cut. Every change is documented with its hypothesis.",
      },
      {
        title: "Retain & compound",
        body: "Lifecycle email, retargeting, organic content and referral programmes turn first purchases into repeat revenue.",
      },
    ],
    metrics: [
      { value: "CAC", label: "Reported per channel, not blended only" },
      { value: "ROAS", label: "Tracked against closed revenue where possible" },
      { value: "CPL", label: "Cost per qualified lead, not per raw form fill" },
      { value: "Weekly", label: "Optimisation cadence with written decisions" },
    ],
    stack: [
      "Google Ads",
      "Meta Ads Manager",
      "LinkedIn Ads",
      "TikTok Ads",
      "GA4",
      "Google Tag Manager",
      "Search Console",
      "Ahrefs / Semrush",
      "Klaviyo / Mailchimp",
      "Looker Studio",
    ],
    engagements: [
      {
        name: "Foundation Sprint",
        duration: "3–4 weeks",
        bestFor: "Businesses with no reliable tracking or channel clarity yet.",
        includes: [
          "Tracking, GA4 and CRM attribution build",
          "Audit, offer testing and channel plan",
          "Launch-ready campaign and landing-page kit",
        ],
        featured: true,
      },
      {
        name: "Growth Management",
        duration: "3-month minimum",
        bestFor: "Companies ready to run paid, organic and lifecycle in parallel.",
        includes: [
          "Full-funnel management across agreed channels",
          "Creative production and CRO testing",
          "Monthly review and quarterly strategy resets",
        ],
      },
      {
        name: "Performance Only",
        duration: "Rolling monthly",
        bestFor: "Teams with in-house content who need paid media expertise.",
        includes: [
          "Paid search and social management",
          "Landing pages and creative iterations",
          "Spend, CAC and ROAS reporting",
        ],
      },
    ],
    faqs: [
      {
        q: "Is media spend included in your fee?",
        a: "No. Our fee covers strategy, production, management and reporting. Ad spend is paid directly to the platforms from your own account, so you keep full ownership, history and data.",
      },
      {
        q: "How quickly will we see results?",
        a: "Paid channels can produce qualified leads within the first two to four weeks of testing, though reliable cost benchmarks take roughly a full quarter. SEO and content typically show meaningful movement in three to six months and compound after that.",
      },
      {
        q: "Do we need a large budget to start?",
        a: "No. We would rather run a tightly budgeted test that proves a channel than spread a thin budget across five. Part of our job is telling you when a channel isn't ready for more spend — and when it is.",
      },
    ],
    ctaLabel: "Digital Marketing",
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: "ai-automation",
    slug: "ai-automation",
    order: 4,
    name: "AI & Automation",
    shortName: "AI & Automation",
    tagline: "Remove the repetitive work. Keep the judgement.",
    summary:
      "Practical AI assistants, agentic workflows and integrations that delete manual handoffs, cut response times and keep humans on the decisions that matter.",
    intro: [
      "Automation is not about replacing your team. It's about removing the work your team should never have been doing: re-typing the same data into three systems, answering the same five questions, copying information between a form and a spreadsheet.",
      "We map your real processes, find where time and accuracy leak, and then build the smallest reliable system that fixes it — usually a mix of API integrations, event-driven workflows and a well-scoped AI layer on top of your own data.",
    ],
    outcomesIntro:
      "Every automation ships with logs, failure handling and a documented fallback, so your team trusts it and your operations don't depend on one person remembering a step.",
    icon: "robot",
    accent: "aqua",
    problems: [
      {
        title: "Data re-typed by hand",
        body: "The same customer or order details are entered into the CRM, the invoice tool and a spreadsheet — with predictable errors.",
      },
      {
        title: "Slow response times",
        body: "Enquiries sit unanswered overnight and at weekends, so prospects go to whoever replied first.",
      },
      {
        title: "Knowledge locked in heads",
        body: "Answers to routine customer and internal questions exist only with two senior people, who are now the bottleneck.",
      },
      {
        title: "Reports rebuilt monthly",
        body: "Someone spends two days every month assembling a report from exports instead of acting on the numbers.",
      },
      {
        title: "Processes break silently",
        body: "A step gets missed and nobody notices until a customer complains, because nothing flags exceptions.",
      },
    ],
    capabilities: [
      {
        title: "Process discovery & mapping",
        icon: "flow",
        body: "We document how work actually flows today, measure time and error rates per step, and rank automation candidates by payback.",
      },
      {
        title: "Workflow & API automation",
        icon: "refresh",
        body: "Event-driven workflows connecting your CRM, website, inbox, finance tools and spreadsheets with retries and alerting.",
      },
      {
        title: "AI assistants on your data",
        icon: "robot",
        body: "Retrieval-augmented assistants trained on your documents, policies and product data — with citations and refusal rules.",
      },
      {
        title: "Document & data processing",
        icon: "database",
        body: "Extraction from invoices, forms, purchase orders and PDFs into structured records your systems can act on.",
      },
      {
        title: "Customer support automation",
        icon: "users",
        body: "Deflection for common questions, drafting for agents, smart routing and escalation rules back to a human.",
      },
      {
        title: "Sales & marketing automation",
        icon: "target",
        body: "Lead enrichment and scoring, instant WhatsApp and email replies, sequence triggers and automatic CRM hygiene.",
      },
      {
        title: "Reporting automation",
        icon: "chart",
        body: "Scheduled pipelines that refresh dashboards and email the summary automatically, with anomaly alerts.",
      },
      {
        title: "AI governance & guardrails",
        icon: "shield",
        body: "Data-boundary reviews, human-in-the-loop checkpoints, logging, cost controls and clear internal usage policy.",
      },
    ],
    benefits: [
      {
        title: "Hours returned weekly",
        body: "Measured in staff hours saved per process, so you can see payback in weeks rather than quarters.",
      },
      {
        title: "Response within minutes",
        body: "Every enquiry acknowledged instantly, day or night, in the customer's channel of choice.",
      },
      {
        title: "Fewer costly errors",
        body: "Validation and single-source data entry eliminate the re-typing mistakes that create rework and refunds.",
      },
      {
        title: "Capacity without headcount",
        body: "Handle a larger volume of work with the same team, and redeploy people to revenue-generating tasks.",
      },
      {
        title: "You own the logic",
        body: "Automations are documented and version-controlled, so they're maintainable — not a mystery nobody can touch.",
      },
    ],
    deliverables: [
      "Current-state process map with time and cost per step",
      "Automation opportunity register ranked by ROI",
      "Working automations in your live tools",
      "AI assistant with knowledge base, guardrails and escalation paths",
      "Integration layer with credentials, retries and error logging",
      "Human-in-the-loop review checkpoints where risk requires them",
      "Monitoring dashboard with success and failure alerts",
      "Runbook, ownership matrix and staff training",
      "Cost and usage forecast with budget alerts",
      "30-day stabilisation and tuning period",
    ],
    process: [
      {
        title: "Discover",
        body: "Shadow the process, interview the people doing it and write down the real steps — including the workarounds nobody documents.",
      },
      {
        title: "Prioritise",
        body: "Score each candidate by time saved, error reduction and implementation effort. We start with the highest-return, lowest-risk win.",
      },
      {
        title: "Build & pilot",
        body: "Ship to a small group first with logging and a manual fallback, then tune prompts, rules and mappings against real cases.",
      },
      {
        title: "Scale & govern",
        body: "Roll out to the full team, train users, monitor cost and accuracy, and add the next process on a fixed cadence.",
      },
    ],
    metrics: [
      { value: "ROI", label: "Ranked before anything gets built" },
      { value: "Human-in-loop", label: "Checkpoints on high-risk steps" },
      { value: "100%", label: "Automations documented and version-controlled" },
      { value: "Logged", label: "Every run, failure and retry recorded" },
    ],
    stack: [
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "n8n",
      "Make",
      "Zapier",
      "LangChain",
      "PostgreSQL",
      "Pinecone / pgvector",
      "Twilio",
      "WhatsApp Business API",
    ],
    engagements: [
      {
        name: "Automation Audit",
        duration: "1–2 weeks",
        bestFor: "Teams who suspect there's time to reclaim but don't know where.",
        includes: [
          "Process mapping of your core workflows",
          "Ranked opportunity register with ROI estimates",
          "Implementation roadmap and quick-win build",
        ],
        featured: true,
      },
      {
        name: "Pilot Build",
        duration: "3–5 weeks",
        bestFor: "Proving a specific automation or assistant before wider rollout.",
        includes: [
          "One production automation or AI assistant",
          "Integration, guardrails and escalation design",
          "Measurement plan and pilot review",
        ],
      },
      {
        name: "Automation Partner (ongoing)",
        duration: "Monthly retainer",
        bestFor: "Businesses committed to automating a process every month.",
        includes: [
          "Continuous backlog execution",
          "Monitoring, maintenance and model/cost tuning",
          "Team training and internal AI policy upkeep",
        ],
      },
    ],
    faqs: [
      {
        q: "Will AI give our customers wrong answers?",
        a: "We constrain it. Assistants answer from your approved knowledge sources, cite where the answer came from, and hand over to a human when confidence is low or the topic is sensitive. High-risk actions always require a person to approve.",
      },
      {
        q: "Where does our data go?",
        a: "That's a design decision we make with you, not a default. We review each integration for data boundaries, prefer enterprise endpoints with no training on your data, and can keep processing inside your own cloud environment where required.",
      },
      {
        q: "What if the AI model changes or gets more expensive?",
        a: "We build on a provider-agnostic layer wherever possible, keep prompts and evaluation cases in version control, and monitor token cost. Swapping or downgrading a model for a given task is a configuration change, not a rebuild.",
      },
      {
        q: "Do we need a technical team to maintain this?",
        a: "No. We hand over a runbook with ownership, monitoring and clear escalation paths. Most clients keep us on a light retainer for tuning and new processes; others operate it themselves after training.",
      },
    ],
    ctaLabel: "AI & Automation",
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: "business-systems",
    slug: "business-systems",
    order: 5,
    name: "Business Systems",
    shortName: "Business Systems",
    tagline: "One reliable system of record for the whole business.",
    summary:
      "CRM, ERP, portals and dashboards that replace scattered spreadsheets with a single, governed source of truth your team actually uses.",
    intro: [
      "When a business grows faster than its systems, information fractures. Sales has its own sheet, operations has another, finance reconciles both by hand at month end, and nobody can answer a simple question without a meeting.",
      "We design and implement the operational backbone: a CRM your team adopts, an ERP or inventory layer that matches how you actually work, customer portals, and dashboards that give owners a live view of the business.",
    ],
    outcomesIntro:
      "The result is a business that runs on defined processes and shared numbers — which also makes it easier to hire into, audit, finance and eventually scale.",
    icon: "database",
    accent: "pulse",
    problems: [
      {
        title: "Spreadsheets everywhere",
        body: "Critical data lives in personal files. When someone leaves, part of the business leaves with them.",
      },
      {
        title: "Numbers don't agree",
        body: "Sales, operations and finance each report different figures, so leadership spends meetings reconciling instead of deciding.",
      },
      {
        title: "Process depends on memory",
        body: "Follow-ups, approvals and handovers happen only if the right person remembers — and there's no way to see what's stuck.",
      },
      {
        title: "Tool sprawl",
        body: "Six subscriptions that don't talk to each other, with data re-entered in each one and no reliable audit trail.",
      },
      {
        title: "Reporting takes days",
        body: "Month-end reporting is a manual assembly job, so the numbers are stale by the time anyone acts on them.",
      },
    ],
    capabilities: [
      {
        title: "Systems audit & blueprint",
        icon: "compass",
        body: "Review of current tools, data flows and process gaps, producing an architecture blueprint and a phased implementation plan.",
      },
      {
        title: "CRM implementation",
        icon: "users",
        body: "Pipeline design, custom objects and fields, quoting, automation rules, migration, and adoption training — the part most implementations skip.",
      },
      {
        title: "ERP & inventory",
        icon: "layers",
        body: "Purchasing, stock, order and fulfilment flows with multi-warehouse logic, batch tracking and accounting reconciliation.",
      },
      {
        title: "Customer & partner portals",
        icon: "globe",
        body: "Secure self-service portals for orders, invoices, tickets, documents and approvals — reducing routine inbound email.",
      },
      {
        title: "Dashboards & BI",
        icon: "chart",
        body: "A governed data model and live dashboards for revenue, operations, stock and cash, with scheduled distribution.",
      },
      {
        title: "Process design & SOPs",
        icon: "flow",
        body: "Written, versioned standard operating procedures with owners, SLAs and escalation paths built into the tooling.",
      },
      {
        title: "Data migration & integrity",
        icon: "database",
        body: "Cleaning, de-duplicating and mapping legacy data, with verification counts and rollback plans for every migration.",
      },
      {
        title: "Governance & security",
        icon: "lock",
        body: "Role-based access, audit logs, backup and recovery procedures, and a review cadence so systems don't drift.",
      },
    ],
    benefits: [
      {
        title: "Decide from live data",
        body: "Owners and managers open one dashboard instead of requesting three exports — and can act the same day.",
      },
      {
        title: "Predictable operations",
        body: "Defined stages, owners and SLAs mean nothing quietly stalls between departments.",
      },
      {
        title: "Genuine adoption",
        body: "Because the system mirrors how your team already works, they use it — rather than maintaining shadow spreadsheets.",
      },
      {
        title: "Compliance-ready records",
        body: "Audit trails, permissions and retention rules are in place before a client, auditor or investor asks for them.",
      },
      {
        title: "Scale without chaos",
        body: "Add people, branches or product lines into a structure that already knows how to absorb them.",
      },
    ],
    deliverables: [
      "Systems and data-flow blueprint with phased roadmap",
      "Configured CRM with pipelines, objects, automations and permissions",
      "ERP or inventory module setup aligned to your operations",
      "Customer and partner portal build",
      "Cleaned, migrated and verified historical data",
      "Data model documentation and integration map",
      "Live dashboards with scheduled reporting",
      "Standard operating procedures and ownership matrix",
      "Role-based access control and audit logging",
      "Team training, adoption tracking and post-launch review",
    ],
    process: [
      {
        title: "Map & specify",
        body: "We document how the business runs today, agree target processes with the people who execute them, and write the specification together.",
      },
      {
        title: "Model & configure",
        body: "Data model, fields, stages, roles, automations and reporting are configured to the agreed specification — in a sandbox first.",
      },
      {
        title: "Migrate & train",
        body: "Legacy data is cleaned, migrated and verified. Department champions are trained before the wider rollout.",
      },
      {
        title: "Adopt & improve",
        body: "We track usage and process adherence weekly, fix friction, then extend the system as the business grows.",
      },
    ],
    metrics: [
      { value: "1", label: "System of record per process" },
      { value: "Live", label: "Dashboards, not month-end exports" },
      { value: "Verified", label: "Migration row counts before go-live" },
      { value: "Weekly", label: "Adoption and data-quality review" },
    ],
    stack: [
      "HubSpot",
      "Zoho CRM / Zoho One",
      "Salesforce",
      "Odoo",
      "Notion",
      "Airtable",
      "PostgreSQL",
      "Supabase",
      "Metabase",
      "Power BI / Looker Studio",
    ],
    engagements: [
      {
        name: "Systems Audit",
        duration: "2–3 weeks",
        bestFor: "Businesses outgrowing spreadsheets but unsure which system to buy.",
        includes: [
          "Current-state process and data-flow map",
          "Tool recommendations with total cost comparison",
          "Phased implementation roadmap",
        ],
        featured: true,
      },
      {
        name: "CRM & Operations Build",
        duration: "4–8 weeks",
        bestFor: "Companies ready to move sales and operations onto one platform.",
        includes: [
          "CRM configuration and automation",
          "Data migration and verification",
          "Dashboards, SOPs and team training",
        ],
      },
      {
        name: "Systems Partner (ongoing)",
        duration: "Monthly retainer",
        bestFor: "Growing businesses whose systems need continuous tuning.",
        includes: [
          "Ongoing configuration and new modules",
          "Data-quality and adoption monitoring",
          "Quarterly architecture review",
        ],
      },
    ],
    faqs: [
      {
        q: "Which CRM or ERP should we choose?",
        a: "It depends on your process complexity, team size, industry rules and existing tools — not on which vendor we prefer. The Systems Audit compares two or three realistic options on total cost and fit, and you make the call with the trade-offs written down.",
      },
      {
        q: "Will our team actually use it?",
        a: "Adoption is designed in, not hoped for. We involve the people who execute the process in specifying it, remove any step that exists only for reporting's sake, train department champions before wider rollout and track usage weekly after go-live.",
      },
      {
        q: "What happens to our historical data?",
        a: "We clean, de-duplicate and map it, then verify record counts and reconciliation totals against your original sources so migrations are checkable. A rollback plan exists before any migration runs.",
      },
      {
        q: "How disruptive is the rollout?",
        a: "We phase it. Usually one department or process goes live first while others continue as they were, with data flowing between old and new until the cutover is proven.",
      },
    ],
    ctaLabel: "Business Systems",
  },
];

export const serviceById = Object.fromEntries(
  services.map((service) => [service.id, service]),
) as Record<ServiceId, Service>;

export const serviceBySlug = serviceById;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceNames = services.map((service) => service.name);

/** Used by the contact form dropdown — always includes a "not sure yet" option. */
export const serviceOptions = [
  ...services.map((s) => ({
    value: s.name,
    label: `${s.shortName} — ${s.name}`,
  })),
  { value: "Multiple services", label: "Multiple services / not sure yet" },
  { value: "Other", label: "Something else" },
];
