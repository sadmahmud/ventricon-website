import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BackToTop,
  HashScroll,
  ScrollProgress,
} from "@/components/layout/ScrollUtilities";
import { JsonLd } from "@/components/seo/JsonLd";

/* Self-hosted, preloaded and subset: no render-blocking font requests. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["500", "600", "700"],
  preload: true,
});

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Business Solutions & Technology | Build. Grow. Transform.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.legalName, url: siteUrl }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Business solutions & technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Build. Grow. Transform.`,
    description: site.shortDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.promise}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Build. Grow. Transform.`,
    description: site.shortDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04060c" },
    { media: "(prefers-color-scheme: light)", color: "#04060c" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {/*
          Marks the document as JS-capable before first paint. Scroll-reveal
          animations are only hidden when this flag is present, so visitors with
          JavaScript disabled still see all content.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.dataset.js="true";',
          }}
        />
      </head>

      <body className="flex min-h-dvh flex-col antialiased">
        {/* Keyboard users can jump straight past the navigation. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to main content
        </a>

        <ScrollProgress />
        <Header />

        <main id="main" className="flex-1 pt-0">
          {children}
        </main>

        <Footer />

        <HashScroll />
        <BackToTop />
      </body>
    </html>
  );
}
