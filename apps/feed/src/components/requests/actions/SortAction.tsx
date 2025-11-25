"use client"

import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@feedgot/ui/components/popover"
import { ArrowUpDownIcon } from "@feedgot/ui/icons/arrow-up-down"
import { cn } from "@feedgot/ui/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SortAction({ className = "" }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const sp = useSearchParams()
  const [open, setOpen] = React.useState(false)

  const slug = React.useMemo(() => {
    const parts = pathname.split("/")
    return parts[2] || ""
  }, [pathname])

  const order = (sp.get("order") || "newest").toLowerCase() === "oldest" ? "oldest" : "newest"

  const setOrder = (v: "newest" | "oldest") => {
    const status = sp.get("status") || encodeURIComponent(JSON.stringify([]))
    const boards = sp.get("board") || encodeURIComponent(JSON.stringify([]))
    const tags = sp.get("tag") || encodeURIComponent(JSON.stringify([]))
    const search = sp.get("search") || ""
    const href = `/workspaces/${slug}/requests?status=${status}&board=${boards}&tag=${tags}&order=${v}&search=${search}`
    router.push(href)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={cn("rounded-md border bg-card px-2 py-1", className)} aria-label="Sort">
          <ArrowUpDownIcon className="w-4 h-4" size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent list className="w-[180px]">
        <button
          type="button"
          onClick={() => setOrder("newest")}
          className={cn("w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted", order === "newest" ? "bg-muted" : "")}
        >
          <span>Newest</span>
          {order === "newest" ? <span className="ml-auto text-xs">✓</span> : null}
        </button>
        <button
          type="button"
          onClick={() => setOrder("oldest")}
          className={cn("w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted", order === "oldest" ? "bg-muted" : "")}
        >
          <span>Oldest</span>
          {order === "oldest" ? <span className="ml-auto text-xs">✓</span> : null}
        </button>
      </PopoverContent>
    </Popover>
  )
}

