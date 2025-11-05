export const alternativeDescriptions: Record<string, string[]> = {
  userjot: [
    "UserJot has a free‑forever plan with unlimited users and posts, 2 boards, a public roadmap/changelog, and 3 admin seats. It’s hosted only (not open‑source or self‑hostable). Feedgot is open‑source and supports self‑hosting while keeping feedback, roadmap and changelog connected.",
    "UserJot offers helpful AI features like duplicate detection and categorization. Choose Feedgot when you want open‑source transparency, self‑hosting, and a simple path from feedback to public planning and release notes — all in one place.",
    "UserJot’s paid tiers add branding and custom domains. Feedgot emphasizes openness and control: run privately or in your own cloud, share a public roadmap, and publish a clean changelog without vendor lock‑in.",
  ],
  featurebase: [
    "Featurebase’s free plan is limited (≈1 team member, 1 feedback board, 1 roadmap) and paid plans start around $49/mo. It’s hosted and not open‑source/self‑hostable. Feedgot is open‑source, supports self‑hosting, and connects feedback to a public roadmap and changelog.",
    "Featurebase is great for voting and surfacing ideas; Feedgot adds end‑to‑end planning and announcements so teams can prioritize, track progress publicly, and ship with clear release notes.",
    "Pick Featurebase for a simple hosted board; pick Feedgot to keep intake, prioritization, planning, and releases in a transparent, self‑hostable stack that you control.",
  ],
  nolt: [
    "Nolt offers a 10‑day free trial; there’s no ongoing free tier, and paid plans start around $29/mo. It’s hosted only (not open‑source or self‑hostable). Feedgot provides an open‑source, self‑hostable alternative that links feedback, roadmap, and changelog.",
    "Nolt focuses on community boards and voting. Feedgot complements that with public planning, statuses, and release notes, plus the option to deploy privately and own your infrastructure.",
    "If ownership and cost control matter, Feedgot’s open‑source model and self‑hosting options avoid per‑seat limits and keep data under your control while maintaining a clear feedback, roadmap, and changelog loop.",
  ],
  canny: [
    "Canny’s Free plan currently includes about 25 tracked users and requires a brief unlock flow; paid tiers scale with tracked users/admin seats. It’s hosted only and not open‑source/self‑hostable. Feedgot is open‑source, self‑hostable, and connects feedback, roadmap, and changelog.",
    "Canny is strong for discovery and prioritization. Choose Feedgot when you want open‑source transparency, self‑hosting, and a straightforward path from feedback to a public roadmap and structured release notes.",
    "Teams avoiding per‑user limits and seeking deployment control pick Feedgot: run privately, keep a public roadmap, and publish a clean changelog while retaining ownership.",
  ],
  upvoty: [
    "Upvoty offers a free trial but no free plan; v2 paid plans start around $15/mo. It’s hosted only (not open‑source or self‑hostable). Feedgot is open‑source and supports self‑hosting with a connected feedback, roadmap, and changelog workflow.",
    "Upvoty keeps voting simple. Feedgot adds public planning and release notes, plus the option to deploy privately for data ownership and flexibility.",
    "Choose Upvoty for a straightforward hosted board; choose Feedgot to own your stack, keep the roadmap public, and publish structured changelogs with open‑source transparency.",
  ],
}

function hashIndex(key: string, length: number): number {
  if (length <= 1) return 0
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h % length
}

export function getAltDescription(slug: string, strategy: 'slug-hash' | 'first' = 'slug-hash'): string {
  const list = alternativeDescriptions[slug] ?? []
  const fallback = `Compare ${slug} and Feedgot across feedback, roadmap, and changelog.`
  if (!list.length) return fallback
  if (strategy === 'first') return list[0] ?? fallback
  const idx = hashIndex(slug, list.length)
  return list[idx] ?? fallback
}