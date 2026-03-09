import type React from "react"
import type { Metadata } from "next"
import { Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingCTA from "@/components/floating-cta"
import Script from "next/script"

// Optimize font loading
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Rayon Web Solutions | Your Vision, Our Code",
    template: "%s | Rayon Web Solutions",
  },
  description:
    "Software development company for web, mobile, AI/ML, DevOps, QA, and UI/UX services. We design and build scalable digital products for startups and enterprises.",
  keywords: [
    "Rayon Web Solutions",
    "Web Development",
    "App Development",
    "Python Django Development",
    "Backend Development",
    "DevOps",
    "Docker",
    "Kubernetes",
    "Cloud Services",
    "UI/UX Design",
    "LMS Integration",
    "QA Testing",
    "Automation",
    "AI Development",
    "Machine Learning Services",
  ],
  authors: [{ name: "Rayon Web Solutions", url: "https://rayonweb.com" }],
  creator: "Rayon Web Solutions",
  publisher: "Rayon Web Solutions",
  metadataBase: new URL("https://rayonweb.com"),
  alternates: {
    canonical: "/",
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
    title: "Rayon Web Solutions | Your Vision, Our Code",
    description:
      "Software development partner for web apps, mobile apps, AI/ML systems, and cloud-native engineering.",
    url: "https://rayonweb.com",
    siteName: "Rayon Web Solutions",
    images: [
      {
        url: "https://rayonweb.com/images/new-1.png",
        width: 1200,
        height: 630,
        alt: "Rayon Web Solutions Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayon Web Solutions | Your Vision, Our Code",
    description:
      "We build modern web, app, cloud, and AI solutions tailored to your business goals.",
    images: ["https://rayonweb.com/images/new-1.png"],
    creator: "@rayonweb",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="748E26A926DC8DFC1F0DE9D34CBBBA2C" />
      </head>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased text-gray-100 min-h-screen`}
      >
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-68457LHBSZ`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
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
          <FloatingCTA />
          <Footer />
        </div>
      </body>
    </html>
  )
}
