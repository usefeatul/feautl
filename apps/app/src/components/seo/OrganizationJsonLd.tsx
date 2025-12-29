import Script from 'next/script'
import { getOrganizationJsonLd } from '@/config/seo'

export default function OrganizationJsonLd() {
  return (
    <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(getOrganizationJsonLd())}
    </Script>
  )
}