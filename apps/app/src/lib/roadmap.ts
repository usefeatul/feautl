export const ROADMAP_STATUSES = ["planned", "progress", "review", "completed", "pending", "closed"] as const

export function statusLabel(s: string) {
  const t = s.toLowerCase()
  if (t === "progress") return "Progress"
  if (t === "review") return "Review"
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export function encodeCollapsed(collapsed: Record<string, boolean>): string {
  return ROADMAP_STATUSES.map((s) => (collapsed[s as string] ? "1" : "0")).join("")
}

export function groupItemsByStatus<T extends { roadmapStatus?: string | null }>(items: T[]) {
  const acc: Record<string, T[]> = {}
  for (const s of ROADMAP_STATUSES) acc[s as string] = []
  for (const it of items) {
    const s = String(it.roadmapStatus || "pending").toLowerCase()
    const key = (ROADMAP_STATUSES as readonly string[]).includes(s) ? s : "pending"
    ;(acc[key] || (acc[key] = [])).push(it)
  }
  return acc
}
