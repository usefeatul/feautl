import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Providers } from "../components/providers/providers"
import "./styles/globals.css"
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd"
import {
  SITE_URL,
  DEFAULT_TITLE,
  TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from "@/config/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Feedgot",
    title: "Feedgot",
    description: DEFAULT_DESCRIPTION,
    images: [
      { url: "/logo.png", width: 1200, height: 630, alt: "Feedgot" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedgot",
    description: DEFAULT_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Feedgot",
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
  }
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <Script
          id="software-app-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Feedgot",
            url: SITE_URL,
            applicationCategory: "Project planning and delivery",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            image: `${SITE_URL}/logo.png`,
          }) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
