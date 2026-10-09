import { defineConfig, devices } from "@playwright/test";

/**
 * ============================================================================
 * VENTRICON — end-to-end test configuration
 * ============================================================================
 * Runs against the production build by default:
 *
 *   npm run build && npm run test:e2e
 *
 * The suite covers navigation, buttons, the contact form (validation, success
 * and failure paths), portfolio filtering, the FAQ accordion, anchors,
 * responsive layout at five breakpoints and console/page errors on every route.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],

  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],

  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
