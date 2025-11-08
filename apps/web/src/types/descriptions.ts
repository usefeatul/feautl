export const alternativeDescriptions: Record<string, string[]> = {
  userjot: [
    "UserJot’s free plan includes unlimited users/posts, 2 boards, a roadmap, and 3 admin seats. It’s hosted only. Feedgot is open‑source, self‑hostable, and connects feedback, roadmap, and changelog.",
    "UserJot adds AI tools like duplicate detection. Feedgot offers open‑source transparency, self‑hosting, and a unified flow from feedback to release notes.",
    "UserJot’s paid tiers add branding. Feedgot focuses on control: run privately, share a roadmap, and publish a clean changelog without vendor lock‑in.",
  ],
  featurebase: [
    "Featurebase’s free plan is limited (~1 team, board, roadmap); paid from $49/mo. It’s hosted only. Feedgot is open‑source, self‑hostable, and links feedback, roadmap, and changelog.",
    "Featurebase handles voting; Feedgot adds planning and release tracking to ship transparently with clear notes.",
    "Choose Featurebase for a simple hosted board; choose Feedgot for a full, self‑hostable, transparent feedback‑to‑release stack.",
  ],
  nolt: [
    "Nolt’s 10‑day trial leads to paid plans (~$29/mo), hosted only. Feedgot is open‑source, self‑hostable, and ties feedback, roadmap, and changelog together.",
    "Nolt centers on voting; Feedgot extends it with statuses, planning, and release notes you can self‑host.",
    "For ownership and cost control, Feedgot’s open‑source model avoids seat limits and keeps your data private.",
  ],
  canny: [
    "Canny’s free tier covers ~25 tracked users and paid plans scale by seats. It’s hosted only. Feedgot is open‑source, self‑hostable, and unites feedback, roadmap, and changelog.",
    "Canny is great for discovery; Feedgot adds transparency, self‑hosting, and public planning with structured release notes.",
    "Skip user limits with Feedgot—self‑host, share a roadmap, and publish clean changelogs while keeping full control.",
  ],
  upvoty: [
    "Upvoty offers a trial but no free plan; paid starts ~\$15/mo. It’s hosted only. Feedgot is open‑source, self‑hostable, and connects feedback, roadmap, and changelog.",
    "Upvoty focuses on voting simplicity; Feedgot adds public planning, release notes, and private deployment options.",
    "Choose Upvoty for hosted ease, or Feedgot to own your stack with transparent roadmaps and changelogs.",
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