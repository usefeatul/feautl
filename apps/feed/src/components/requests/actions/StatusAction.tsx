"use client"

import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@feedgot/ui/components/popover"
import { ListFilterIcon } from "@feedgot/ui/icons/list-filter"
import { cn } from "@feedgot/ui/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function parseArrayParam(v: string | null): string[] {
  try {
    if (!v) return []
    const arr = JSON.parse(v)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function enc(arr: string[]) {
  return encodeURIComponent(JSON.stringify(arr))
}

const options = [
  { label: "Pending", value: "pending" },
  { label: "Review", value: "under-review" },
  { label: "Planned", value: "planned" },
  { label: "Progress", value: "in-progress" },
  { label: "Complete", value: "completed" },
  { label: "Closed", value: "closed" },
]

export default function StatusAction({ className = "" }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const sp = useSearchParams()
  const [open, setOpen] = React.useState(false)

  const slug = React.useMemo(() => {
    const parts = pathname.split("/")
    return parts[2] || ""
  }, [pathname])

  const selected = React.useMemo(() => parseArrayParam(sp.get("status")).map((s) => String(s).toLowerCase()), [sp])

  const toggle = (v: string) => {
    const next = selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]
    const boards = sp.get("board") || encodeURIComponent(JSON.stringify([]))
    const tags = sp.get("tag") || encodeURIComponent(JSON.stringify([]))
    const order = sp.get("order") || "newest"
    const search = sp.get("search") || ""
    const href = `/workspaces/${slug}/requests?status=${enc(next)}&board=${boards}&tag=${tags}&order=${order}&search=${search}`
    router.push(href)
  }

  const clear = () => {
    const boards = sp.get("board") || encodeURIComponent(JSON.stringify([]))
    const tags = sp.get("tag") || encodeURIComponent(JSON.stringify([]))
    const order = sp.get("order") || "newest"
    const search = sp.get("search") || ""
    const href = `/workspaces/${slug}/requests?status=${enc([])}&board=${boards}&tag=${tags}&order=${order}&search=${search}`
    router.push(href)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={cn("rounded-md border bg-card px-2 py-1", className)} aria-label="Requests">
          <ListFilterIcon className="w-4 h-4" size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent list className="w-[220px]">
        <div className="p-2 text-xs text-accent">Statuses</div>
        <div className="divide-y">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted",
                selected.includes(opt.value) ? "bg-muted" : ""
              )}
            >
              <span>{opt.label}</span>
              {selected.includes(opt.value) ? <span className="ml-auto text-xs">✓</span> : null}
            </button>
          ))}
        </div>
        <div className="p-2 flex items-center justify-end">
          <button type="button" onClick={clear} className="text-xs text-primary hover:underline px-2 py-1">Clear</button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

