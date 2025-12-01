"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Popover, PopoverTrigger, PopoverContent, PopoverList, PopoverListItem } from "@feedgot/ui/components/popover"
import { MenuIcon } from "@feedgot/ui/icons/menu"
import { client } from "@feedgot/api/client"

type Board = { id: string; name: string; slug: string; type?: string | null }

export function MobileBoardsMenu({ slug, subdomain }: { slug: string; subdomain: string }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [boards, setBoards] = React.useState<Board[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    const key = `boards:${slug}`
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null
      if (raw) {
        const cached = JSON.parse(raw)
        const list = ((cached?.boards || cached?.data) || []) as Board[]
        const filtered = list.filter((b) => b.slug !== "roadmap" && b.slug !== "changelog")
        if (mounted) {
          setBoards(filtered)
          setLoading(false)
        }
      }
    } catch {}
    ;(async () => {
      try {
        const res = await client.board.byWorkspaceSlug.$get({ slug })
        const data = await res.json()
        const list = (data?.boards || []) as Board[]
        const filtered = list.filter((b) => b.slug !== "roadmap" && b.slug !== "changelog")
        if (mounted) setBoards(filtered)
        try {
          if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify({ boards: filtered, ts: Date.now() }))
        } catch {}
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [slug])

  function go(value: string) {
    const base = `/${subdomain}/${slug}`
    const next = value === "__all__" ? base : `${base}?board=${encodeURIComponent(value)}`
    setOpen(false)
    router.push(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open boards"
          className="inline-flex items-center justify-center rounded-md p-2 bg-muted/70 disabled:opacity-50"
          disabled={loading}
        >
          <MenuIcon width={20} height={20} className="text-accent" />
        </button>
      </PopoverTrigger>
      <PopoverContent list className="min-w-[11rem] w-fit">
        <PopoverList>
          <PopoverListItem onClick={() => go("__all__")}>
            <span className="text-sm">All Feedback</span>
          </PopoverListItem>
          {boards.map((b) => (
            <PopoverListItem key={b.id} onClick={() => go(b.slug)}>
              <span className="text-sm">{b.name}</span>
            </PopoverListItem>
          ))}
        </PopoverList>
      </PopoverContent>
    </Popover>
  )
}

