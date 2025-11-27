"use client"

import React from "react"
import { Button } from "@feedgot/ui/components/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverList, PopoverListItem } from "@feedgot/ui/components/popover"
import { DropdownIcon } from "@feedgot/ui/icons/dropdown"
import { client } from "@feedgot/api/client"

const STATUSES = ["pending", "review", "planned", "progress", "completed", "closed"] as const

export default function StatusPicker({ postId, value, onChange }: { postId: string; value?: string; onChange: (v: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const select = async (v: string) => {
    if (saving) return
    setSaving(true)
    try {
      await client.board.updatePostMeta.$post({ postId, roadmapStatus: v })
      onChange(v)
      setOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-7 px-2">
          <span className="rounded-md bg-card px-2 py-0.5 capitalize">{value || "pending"}</span>
          <DropdownIcon className="ml-1 opacity-60" size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent list className="min-w-0 w-fit">
        <PopoverList>
          {STATUSES.map((s) => (
            <PopoverListItem key={s} role="menuitemradio" aria-checked={(value || "").toLowerCase() === s} onClick={() => select(s)}>
              <span className="text-sm capitalize">{s.replace(/-/g, " ")}</span>
              {(value || "").toLowerCase() === s ? <span className="ml-auto text-xs">✓</span> : null}
            </PopoverListItem>
          ))}
        </PopoverList>
      </PopoverContent>
    </Popover>
  )
}
