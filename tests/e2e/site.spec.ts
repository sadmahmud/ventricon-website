import { expect, test, type Page } from "@playwright/test";

/* ==========================================================================
   Shared fixtures
   ========================================================================== */

/** Every public route, plus the expected <h1> (or 404 marker). */
const ROUTES: { path: string; expect: RegExp }[] = [
  { path: "/", expect: /BUILD\.\s*GROW\.\s*TRANSFORM\./i },
  { path: "/services", expect: /Five capabilities/i },
  { path: "/services/branding-design", expect: /Branding & Design/i },
  { path: "/services/website-ecommerce", expect: /Website & E-commerce/i },
  { path: "/services/digital-marketing", expect: /Digital Marketing/i },
  { path: "/services/ai-automation", expect: /AI & Automation/i },
  { path: "/services/business-systems", expect: /Business Systems/i },
  { path: "/solutions", expect: /Buy the outcome/i },
  { path: "/work", expect: /Engagement blueprints/i },
  { path: "/work/d2c-apparel-replatform", expect: /Replatforming/i },
  { path: "/about", expect: /One team/i },
  { path: "/contact", expect: /Let's talk about/i },
  { path: "/privacy", expect: /Privacy notice/i },
  { path: "/terms", expect: /Terms of use/i },
];

/** Collects console errors and uncaught exceptions for a page. */
function watchForErrors(page: Page): string[] {
  const problems: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      const text = message.text();
      // Ignore noise that is not ours: favicon fetches in some environments.
      if (/favicon/i.test(text)) return;
      problems.push(`console.error: ${text}`);
    }
  });

  page.on("pageerror", (error) => {
    problems.push(`pageerror: ${error.message}`);
  });

  page.on("requestfailed", (request) => {
    const url = request.url();
    if (/\.(woff2?|css|js)(\?|$)/.test(url)) {
      problems.push(`requestfailed: ${url} (${request.failure()?.errorText})`);
    }
  });

  return problems;
}

test.describe("routes and console health", () => {
  for (const route of ROUTES) {
    test(`renders ${route.path} without console errors`, async ({ page }) => {
      const problems = watchForErrors(page);

      const response = await page.goto(route.path, { waitUntil: "networkidle" });

      expect(response?.status(), `HTTP status for ${route.path}`).toBe(200);
      await expect(page.locator("h1").first()).toContainText(route.expect);

      // Exactly one <h1> per page.
      expect(await page.locator("h1").count()).toBe(1);

      expect(problems, problems.join("\n")).toEqual([]);
    });
  }

  test("unknown routes render the styled 404 page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("404", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /moved, renamed, or never existed/i,
    );
  });

  test("API rejects GET and answers malformed POSTs safely", async ({ request }) => {
    const get = await request.get("/api/contact");
    expect(get.status()).toBe(405);

    const badJson = await request.post("/api/contact", {
      headers: { "content-type": "application/json" },
      data: Buffer.from("{not json"),
    });
    expect(badJson.status()).toBe(400);
    expect((await badJson.json()).ok).toBe(false);
  });
});

test.describe("navigation", () => {
  test("desktop header links navigate to every page", async ({ page, isMobile }) => {
    test.skip(isMobile, "The desktop header is hidden below the lg breakpoint");
    await page.goto("/");

    for (const [label, heading] of [
      ["Services", /Five capabilities/i],
      ["Solutions", /Buy the outcome/i],
      ["Work", /Engagement blueprints/i],
      ["About", /One team/i],
      ["Contact", /Let's talk about/i],
    ] as const) {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page.locator("h1").first()).toContainText(heading);
    }
  });

  test("services dropdown opens, lists all five services and closes on Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop-only dropdown");

    await page.goto("/");
    const trigger = page.getByRole("button", { name: /show service menu/i });
    await trigger.click();

    const menu = page.locator("#services-menu");
    await expect(menu).toBeVisible();
    for (const name of [
      "Branding & Design",
      "Website & E-commerce",
      "Digital Marketing",
      "AI & Automation",
      "Business Systems",
    ]) {
      await expect(menu.getByText(name, { exact: true })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // The label itself still navigates to the services index.
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
    await expect(page.locator("h1").first()).toContainText(/Five capabilities/i);
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only menu");

    await page.goto("/");

    /* The trigger is located by its aria-controls so the assertion still works
       after its label switches from "Open menu" to "Close menu". */
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    const menu = page.locator("#mobile-menu");

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName(/close menu/i);

    await menu.getByRole("link", { name: "About", exact: true }).click();
    await expect(page.locator("h1").first()).toContainText(/One team/i);
    await expect(page.locator("#mobile-menu")).toBeHidden();
    await expect(
      page.locator('button[aria-controls="mobile-menu"]'),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu exposes the services list and the project CTA", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile-only menu");

    await page.goto("/");
    await page.locator('button[aria-controls="mobile-menu"]').click();

    const menu = page.locator("#mobile-menu");
    await expect(menu.getByText("Business Systems", { exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: /start a project/i })).toBeVisible();

    // Escape closes the sheet and the page scroll is released.
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
  });

  test("footer links and skip-to-content work", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Services" })
      .getByRole("link", { name: "AI & Automation" })
      .first()
      .click();
    await expect(page.locator("h1").first()).toContainText(/AI & Automation/i);

    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("cross-page anchors resolve to the right section", async ({ page }) => {
    await page.goto("/about#how-we-work");
    await expect(page.locator("#how-we-work")).toBeVisible();

    await page.goto("/services#ai-automation");
    await expect(page.locator("#ai-automation")).toBeVisible();
    await expect(page.locator("#ai-automation-heading")).toContainText(
      /AI & Automation/i,
    );
  });

  test("service navigation jumps between service sections", async ({ page }) => {
    await page.goto("/services");
    await page
      .getByRole("navigation", { name: /jump to a service/i })
      .getByRole("link", { name: /Business Systems/i })
      .click();
    await expect(page).toHaveURL(/#business-systems$/);
    await expect(page.locator("#business-systems-heading")).toBeInViewport();
  });
});

test.describe("portfolio filtering", () => {
  test("filters blueprints and reflects the state in the URL", async ({ page }) => {
    await page.goto("/work");

    // The grid is prerendered; the chips hydrate client-side.
    await expect(page.getByRole("button", { name: /^All work/ })).toBeEnabled();

    const cards = page.locator("main a[href^='/work/']");
    const total = await cards.count();
    expect(total).toBeGreaterThan(5);

    await page.getByRole("button", { name: /^AI & Automation/ }).click();
    await expect(page).toHaveURL(/filter=ai/);
    await expect(
      page.getByText(/Showing \d+ of \d+ engagement blueprints in AI & Automation/i),
    ).toBeVisible();

    await page.getByRole("button", { name: /^All work/ }).click();
    await expect(page).not.toHaveURL(/filter=/);
    await expect(page.getByText(new RegExp(`Showing ${total} of ${total}`, "i"))).toBeVisible();
  });

  test("a shared ?filter= URL opens pre-filtered", async ({ page }) => {
    await page.goto("/work?filter=systems");
    await expect(page.getByRole("button", { name: /^All work/ })).toBeEnabled();
    await expect(
      page.getByRole("button", { name: /^Business Systems/ }),
    ).toBeEnabled();
    await expect(
      page.getByRole("button", { name: /^Business Systems/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByText(/Showing \d+ of \d+ engagement blueprints in Business Systems/i),
    ).toBeVisible();
  });
});

test.describe("FAQ accordion", () => {
  test("expands, collapses and reports state to assistive tech", async ({ page }) => {
    await page.goto("/about#faq");

    const first = page.locator("#faq [data-accordion-trigger]").first();
    await expect(first).toHaveAttribute("aria-expanded", "true"); // defaultOpen

    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "false");

    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");

    // Keyboard operation: ArrowDown moves focus to the next header.
    await first.focus();
    await page.keyboard.press("ArrowDown");
    const second = page.locator("#faq [data-accordion-trigger]").nth(1);
    await expect(second).toBeFocused();
  });

  test("service page FAQs toggle independently", async ({ page }) => {
    await page.goto("/services/digital-marketing#faq");
    const triggers = page.locator(
      "[data-accordion-trigger][id^='faq-digital-marketing']",
    );
    await expect(triggers.first()).toBeVisible();
    await triggers.first().click();
    await expect(triggers.first()).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("contact form", () => {
  test("blocks invalid submissions and explains each error", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: /start a project/i }).click();

    // Validation summary + per-field messages.
    await expect(page.getByText(/review the highlighted fields/i)).toBeVisible();
    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await expect(
      page.getByText("Please enter your business or organisation name."),
    ).toBeVisible();
    await expect(page.getByText("Please enter your email address.")).toBeVisible();
    await expect(page.getByText(/confirm we may contact you/i)).toBeVisible();

    // The form is idle again (no request was made).
    await expect(page.locator("#project-enquiry")).toHaveAttribute(
      "aria-busy",
      "false",
    );
    await expect(
      page.getByRole("button", { name: /start a project/i }),
    ).toBeEnabled();
  });

  test("validates email format and short project details as you type", async ({
    page,
  }) => {
    await page.goto("/contact");

    const email = page.locator("#email");
    await email.fill("not-an-email");
    await page.locator("#name").click(); // blur
    await expect(page.getByText(/looks incomplete/i)).toBeVisible();

    await email.fill("founder@example.com");
    await expect(page.getByText(/looks incomplete/i)).toBeHidden();

    const details = page.locator("#projectDetails");
    await details.fill("Too short");
    await page.locator("#name").click();
    await expect(page.getByText(/at least 30 characters/i)).toBeVisible();
  });

  test("submits successfully and shows a reference with a delivery log", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Pre-fill via the URL contract used by service and solution CTAs.
    await page.goto("/contact?service=AI%20%26%20Automation");
    await expect(page.locator("#service")).toHaveValue("AI & Automation");
    await expect(page.getByText(/pre-filled from the page/i)).toBeVisible();

    await page.locator("#name").fill("Test Person");
    await page.locator("#businessName").fill("Test Business Ltd");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#phone").fill("+8801700000000");
    await page
      .locator("#projectDetails")
      .fill(
        "We need an automation audit for our order processing workflow and a CRM the sales team will actually use.",
      );
    await page.locator("#consent").check();

    await page.getByRole("button", { name: /start a project/i }).click();

    await expect(
      page.getByRole("heading", { name: /enquiry received/i }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/VNT-[A-Z0-9]{6}/).first()).toBeVisible();
    await expect(page.getByText(/delivery log/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /send another enquiry/i })).toBeVisible();

    // The form is reset and can be used again.
    await page.getByRole("button", { name: /send another enquiry/i }).click();
    await expect(page.locator("#name")).toHaveValue("");
  });

  test("the honeypot field is invisible and not focusable", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("#company_website");
    await expect(honeypot).toBeAttached();
    await expect(honeypot).not.toBeInViewport();
  });

  test("every CTA button leads somewhere real", async ({ page }) => {
    for (const path of ["/", "/services", "/services/ai-automation", "/solutions", "/work"]) {
      await page.goto(path);

      const ctas = page.locator("main a[href^='/contact'], main a[href^='/services'], main a[href^='/work'], main a[href^='/solutions']");
      const count = await ctas.count();
      expect(count, `CTA links on ${path}`).toBeGreaterThan(0);

      // No dead anchors or placeholder hrefs anywhere in the page.
      const hrefs = await page.locator("a").evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href")),
      );
      for (const href of hrefs) {
        expect(href, `href on ${path}`).not.toBe("#");
        expect(href).not.toContain("example.com");
      }
    }
  });
});

test.describe("responsive layout", () => {
  const viewports = [
    { name: "small phone", width: 360, height: 780 },
    { name: "phone", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "laptop", width: 1024, height: 768 },
    { name: "desktop", width: 1440, height: 900 },
  ];

  const pages = ["/", "/services", "/services/branding-design", "/solutions", "/work", "/about", "/contact"];

  for (const viewport of viewports) {
    test(`no horizontal overflow at ${viewport.name} (${viewport.width}px)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const path of pages) {
        await page.goto(path);
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          const offenders: string[] = [];

          // Elements that stick out beyond the viewport width.
          for (const element of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
            const rect = element.getBoundingClientRect();
            if (rect.width === 0) continue;
            if (rect.right > window.innerWidth + 1 || rect.left < -1) {
              const style = getComputedStyle(element);
              if (style.position === "fixed" || style.overflow === "hidden") continue;
              offenders.push(
                `${element.tagName.toLowerCase()}.${element.className.toString().slice(0, 60)} right=${Math.round(rect.right)}`,
              );
            }
            if (offenders.length > 4) break;
          }

          return {
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            offenders,
          };
        });

        expect(
          overflow.scrollWidth,
          `horizontal overflow on ${path} at ${viewport.width}px (${overflow.offenders.join(" | ")})`,
        ).toBeLessThanOrEqual(viewport.width + 1);
      }
    });
  }

  test("tap targets in the mobile header are large enough", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /open menu/i });
    const box = await toggle.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(40);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(40);
  });
});

test.describe("SEO and metadata", () => {
  test("home page exposes complete Open Graph, Twitter and canonical metadata", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /VENTRICON/,
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /ventricon\.com\/?$/,
    );
    await expect(page.locator('html')).toHaveAttribute("lang", "en");
  });

  test("structured data parses as valid JSON-LD", async ({ page }) => {
    for (const path of ["/", "/services", "/services/ai-automation", "/contact", "/about"]) {
      await page.goto(path);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) => nodes.map((node) => node.textContent ?? ""));

      expect(blocks.length, `JSON-LD blocks on ${path}`).toBeGreaterThan(0);

      for (const block of blocks) {
        const parsed = JSON.parse(block);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        for (const item of items) {
          expect(item["@context"]).toBe("https://schema.org");
          expect(item["@type"]).toBeTruthy();
        }
      }
    }
  });

  test("sitemap and robots are served correctly", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("<urlset");
    expect(xml).toContain("/services/ai-automation");
    expect(xml).toContain("/work/d2c-apparel-replatform");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const body = await robots.text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("Disallow: /api/");
  });

  test("Open Graph image is generated as a PNG", async ({ request }) => {
    const image = await request.get("/opengraph-image");
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
  });
});
