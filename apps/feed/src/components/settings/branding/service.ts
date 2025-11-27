import { client } from "@feedgot/api/client"
import type { BrandingConfig, BrandingResponse } from "./types"

function getJSON<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function setJSON(key: string, value: unknown): void {
  try {
    if (typeof window === "undefined") return
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

const BRANDING_CACHE_KEY = (slug: string) => `branding:${slug}`

export function getCachedBranding(slug: string): BrandingConfig | null {
  return getJSON<BrandingConfig>(BRANDING_CACHE_KEY(slug))
}

export function setCachedBranding(slug: string, conf: BrandingConfig): void {
  setJSON(BRANDING_CACHE_KEY(slug), conf)
}

export async function loadBrandingBySlug(slug: string): Promise<BrandingConfig | null> {
  const res = await client.branding.byWorkspaceSlug.$get({ slug })
  const data = (await res.json()) as BrandingResponse
  return data?.config || null
}

export async function saveBranding(slug: string, input: BrandingConfig & { logoUrl?: string }): Promise<boolean> {
  const res = await client.branding.update.$post({
    slug,
    logoUrl: input.logoUrl,
    primaryColor: input.primaryColor,
    theme: input.theme,
    hidePoweredBy: input.hidePoweredBy,
  })
  return res.ok
}

export async function getLogoUploadUrl(slug: string, fileName: string, contentType: string): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const res = await client.storage.getUploadUrl.$post({ slug, fileName, contentType, folder: "branding/logo" })
  const data = await res.json()
  return { uploadUrl: data.uploadUrl, key: data.key, publicUrl: data.publicUrl }
}
