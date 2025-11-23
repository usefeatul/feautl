"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@feedgot/ui/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@feedgot/ui/components/dropdown-menu"
import { client } from "@feedgot/api/client"
import { getSlugFromPath } from "./nav"
import { DropdownIcon } from "@feedgot/ui/icons/dropdown"
import { Check } from "lucide-react"

type Ws = { id: string; name: string; slug: string; logo?: string | null; domain?: string | null }

export default function WorkspaceSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [workspaces, setWorkspaces] = React.useState<Ws[]>([])
  const [currentDetails, setCurrentDetails] = React.useState<Ws | null>(null)
  const [open, setOpen] = React.useState(false)
  const slug = getSlugFromPath(pathname || "")

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await client.workspace.listMine.$get()
        const data = await res.json()
        const list = data?.workspaces || []
        if (mounted) setWorkspaces(list)
      } catch {}
    })()
    return () => {
      mounted = false
    }
  }, [])

  React.useEffect(() => {
    if (!slug) {
      setCurrentDetails(null)
      return
    }
    let active = true
    ;(async () => {
      try {
        const res = await client.workspace.bySlug.$get({ slug })
        const data = await res.json()
        const ws = data?.workspace || null
        if (active) setCurrentDetails(ws)
      } catch {
        if (active) setCurrentDetails(null)
      }
    })()
    return () => {
      active = false
    }
  }, [slug])

  const current = workspaces.find((w) => w.slug === slug)
  const currentLogo: string | null = currentDetails?.logo ?? current?.logo ?? null
  const all = workspaces

  return (
    <div className={cn(className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="w-full">
          <div className="group flex items-center gap-2 rounded-md px-2 py-2 text-sm text-accent hover:bg-muted">
            {currentLogo ? (
              <img src={currentLogo} alt="Workspace" className="w-6 h-6 rounded-sm" />
            ) : (
              <div className="w-6 h-6 rounded-sm bg-muted border" />
            )}
            <span className="transition-colors">{currentDetails?.name || current?.name || slug || "Current"}</span>
            <DropdownIcon className="ml-auto w-4 h-4 text-foreground/80 group-hover:text-primary transition-colors" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-w-[95vw] max-h-[80vh] overflow-auto p-2" side="bottom" align="center" sideOffset={8}>
          {all.length === 0 ? (
            <DropdownMenuItem disabled>No workspaces yet</DropdownMenuItem>
          ) : (
            <div className="flex flex-col gap-1">
              {all.map((w) => {
                const logoUrl: string | null = w.logo ?? null
                const isCurrent = w.slug === slug
                return (
                  <DropdownMenuItem
                    key={w.slug}
                    onSelect={() => { setOpen(false); router.push(`/workspaces/${w.slug}`) }}
                    className={cn("flex items-center gap-2 px-2 py-2 rounded-md", isCurrent ? "bg-muted" : "hover:bg-muted")}
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="" className="w-6 h-6 rounded-sm" />
                    ) : (
                      <div className="w-6 h-6 rounded-sm bg-muted border" />
                    )}
                    <span className="truncate text-sm">{w.name}</span>
                    {isCurrent ? <Check className="ml-auto size-4 text-primary" /> : <span className="ml-auto" />}
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => { setOpen(false); router.push("/workspaces/new") }}
                className="p-0"
              >
                <div className="w-full rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm text-center hover:bg-primary/90">
                  Create new project
                </div>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
