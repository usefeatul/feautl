import { headers } from "next/headers"

export const ROADMAP_STATUSES = ["planned", "progress", "review", "completed", "pending", "closed"] as const

export async function readInitialCollapsedByStatus(slug: string): Promise<Record<string, boolean>> {
  const key = `rdmpc:${slug}`
  const cookieHeader =  (await headers()).get("cookie") || ""
  const match = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${key}=`))
  const encoded = match ? decodeURIComponent(match.split("=")[1] || "") : ""
  const initial: Record<string, boolean> = {}
  for (let i = 0; i < ROADMAP_STATUSES.length; i++) {
    const s = ROADMAP_STATUSES[i]
    initial[s as string] = encoded.charAt(i) === "1"
  }
  return initial
}
