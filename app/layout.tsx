import { Suspense, type CSSProperties, type ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DeferredFloatingCTA from "@/components/deferred-floating-cta"
import Script from "next/script"
import {
  BUSINESS_COORDINATES,
  BUSINESS_COUNTRY,
  BUSINESS_LOCALITY,
  BUSINESS_REGION,
  BUSINESS_REGION_CODE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DEFAULT_OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  buildOrganizationSchema,
  buildProfessionalServiceSchema,
  buildWebsiteSchema,
  serializeJsonLd,
} from "@/lib/seo"
import ScrollToTop from "@/components/scroll-to-top"
const fontVariables = {
  "--font-manrope": '"Manrope", "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  "--font-space-grotesk": '"Space Grotesk", "Trebuchet MS", "Aptos", "Segoe UI", sans-serif',
} as CSSProperties

const chatWidgetSrc = process.env.NEXT_PUBLIC_CHAT_WIDGET_URL

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  classification: "Software Development Company",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  referrer: "origin-when-cross-origin",
  verification: {
    other: {
      "msvalidate.01": "748E26A926DC8DFC1F0DE9D34CBBBA2C",
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/touchicon-180.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} banner`,
      },
    ],
    locale: "en_US",
    countryName: BUSINESS_COUNTRY,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
    site: "@rayonweb",
    creator: "@rayonweb",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content={BUSINESS_REGION_CODE} />
        <meta name="geo.placename" content={`${BUSINESS_LOCALITY}, ${BUSINESS_REGION}, ${BUSINESS_COUNTRY}`} />
        <meta name="geo.position" content={`${BUSINESS_COORDINATES.latitude};${BUSINESS_COORDINATES.longitude}`} />
        <meta name="ICBM" content={`${BUSINESS_COORDINATES.latitude}, ${BUSINESS_COORDINATES.longitude}`} />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="businesses, startups, enterprises" />
        <meta name="contact" content={CONTACT_EMAIL} />
        <meta name="telephone" content={CONTACT_PHONE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildWebsiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildProfessionalServiceSchema()),
          }}
        />
      </head>
      <body style={fontVariables} className="font-sans antialiased text-gray-100 min-h-screen">
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        {chatWidgetSrc ? <Script id="chat-widget" strategy="afterInteractive" src={chatWidgetSrc} defer /> : null}
        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-68457LHBSZ`}
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-68457LHBSZ');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '23863632866572138');
              fbq('track', 'PageView');
            `,
          }}
        />

        <div className="relative">
          <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent blur-3xl" />
          <Navbar />
          <main className="pt-20 relative z-10">{children}</main>
          <DeferredFloatingCTA />
          <Footer />
        </div>
      </body>
    </html>
  )
}
