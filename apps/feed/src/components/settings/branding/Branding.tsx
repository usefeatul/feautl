"use client"

import React from "react"
import SectionCard from "../global/SectionCard"
import { Input } from "@feedgot/ui/components/input"
import { LoadingButton } from "@/components/loading-button"
import { loadBrandingBySlug, saveBranding, getCachedBranding, setCachedBranding } from "./service"
import { toast } from "sonner"
import { Switch } from "@feedgot/ui/components/switch"
import { Badge } from "@feedgot/ui/components/badge"
import { BRANDING_COLORS, findColorByPrimary, applyBrandPrimary } from "../../../types/colors"
import ColorPicker from "./ColorPicker"
import ThemePicker from "./ThemePicker"
import LogoUploader from "./LogoUploader"
import { setWorkspaceLogo } from "@/lib/branding-store"

export default function BrandingSection({ slug, initialPrimary }: { slug: string; initialPrimary?: string }) {
  const [logoUrl, setLogoUrl] = React.useState("")
  const [primaryColor, setPrimaryColor] = React.useState("#3b82f6")
  const [accentColor, setAccentColor] = React.useState("#60a5fa")
  const [colorKey, setColorKey] = React.useState<string>("blue")
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")
  const [hidePoweredBy, setHidePoweredBy] = React.useState<boolean>(false)
  const [saving, setSaving] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

function applyConf(conf: { logoUrl?: string; primaryColor?: string; accentColor?: string; theme?: "light" | "dark" | "system"; hidePoweredBy?: boolean }) {
  setLogoUrl(conf.logoUrl || "")
  const currentPrimary = conf.primaryColor || "#3b82f6"
  const found = findColorByPrimary(currentPrimary) || BRANDING_COLORS[1]
  setPrimaryColor(currentPrimary)
  setAccentColor(conf.accentColor || (found && found.accent) || "#60a5fa")
  setColorKey(found ? found.key : "blue")
  if (conf.theme === "light" || conf.theme === "dark" || conf.theme === "system") setTheme(conf.theme)
  setHidePoweredBy(Boolean(conf.hidePoweredBy))
  applyBrandPrimary(currentPrimary)
}

  React.useEffect(() => {
    let mounted = true
    const cached = getCachedBranding(slug)
    if (cached) {
      applyConf(cached)
    } else if (initialPrimary) {
      const p = initialPrimary.trim()
      const found = findColorByPrimary(p) || BRANDING_COLORS[1]
      setPrimaryColor(p)
      setAccentColor(found ? found.accent : "#60a5fa")
      setColorKey(found ? found.key : "blue")
      applyBrandPrimary(p)
    }
    void (async () => {
      try {
        const conf = await loadBrandingBySlug(slug)
        if (mounted && conf) {
          applyConf(conf)
          setCachedBranding(slug, conf)
        }
      } catch (e) {}
      finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [slug, initialPrimary])

  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    const root = document.documentElement
    const prevP = getComputedStyle(root).getPropertyValue("--primary").trim()
    const p = primaryColor.trim()
    const a = accentColor.trim()
    applyBrandPrimary(p)
    try {
      const ok = await saveBranding(slug, { logoUrl: logoUrl.trim(), primaryColor: p, accentColor: a, theme, hidePoweredBy })
      if (!ok) throw new Error("Update failed")
      setCachedBranding(slug, { logoUrl: logoUrl.trim(), primaryColor: p, accentColor: a, theme, hidePoweredBy })
      if (logoUrl.trim()) setWorkspaceLogo(slug, logoUrl.trim())
      toast.success("Branding updated")
    } catch (e) {
      applyBrandPrimary(prevP || "#3b82f6")
      toast.error("Failed to update branding")
    } finally {
      setSaving(false)
    }
  }

  return (
    <SectionCard title="Branding" description="Change your brand settings.">
      <div className="divide-y">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Logo</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <LogoUploader slug={slug} value={logoUrl} onChange={setLogoUrl} />
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Primary Color</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <ColorPicker
              valueKey={colorKey}
              valueHex={primaryColor}
              onSelect={(c) => {
                setColorKey(c.key)
                setPrimaryColor(c.primary)
                setAccentColor(c.accent)
                applyBrandPrimary(c.primary)
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Theme</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <ThemePicker value={theme} onSelect={(t) => setTheme(t)} />
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Hide "Powered by" Branding</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Switch checked={hidePoweredBy} onCheckedChange={(v) => setHidePoweredBy(Boolean(v))} aria-label="Hide Powered by" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <Badge variant="outline">Custom branding is only available on our paid plans.</Badge>
      </div>

      <div className="px-4 pb-4">
        <LoadingButton onClick={handleSave} loading={saving} disabled={loading}>Save</LoadingButton>
      </div>
    </SectionCard>
  )
}
