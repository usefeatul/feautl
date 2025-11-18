import Script from "next/script"
import { pageUrl } from "@/lib/seo"

export default function DefinedTermJsonLd({ name, description, path, alternateNames }: { name: string; description: string; path: string; alternateNames?: string[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url: pageUrl(path),
    inDefinedTermSet: pageUrl("/definitions"),
    alternateName: alternateNames && alternateNames.length ? alternateNames : undefined,
  }
  return (
    <Script id="schema-defined-term" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  )
}