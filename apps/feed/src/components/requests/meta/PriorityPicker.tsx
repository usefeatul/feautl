"use client"

import React from "react"
import { Button } from "@feedgot/ui/components/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverList, PopoverListItem } from "@feedgot/ui/components/popover"
import { DropdownIcon } from "@feedgot/ui/icons/dropdown"
import { client } from "@feedgot/api/client"

const PRIORITIES = ["low", "medium", "high", "critical"] as const

export default function PriorityPicker({ postId, value, onChange }: { postId: string; value?: "low" | "medium" | "high" | "critical"; onChange: (v: "low" | "medium" | "high" | "critical") => void }) {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const select = async (v: (typeof PRIORITIES)[number]) => {
    if (saving) return
    setSaving(true)
    try {
      await client.board.updatePostMeta.$post({ postId, priority: v })
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
          <span className="rounded-md bg-card px-2 py-0.5 capitalize">{value || "medium"}</span>
          <DropdownIcon className="ml-1 opacity-60" size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent list className="min-w-0 w-fit">
        <PopoverList>
          {PRIORITIES.map((p) => (
            <PopoverListItem key={p} role="menuitemradio" aria-checked={(value || "").toLowerCase() === p} onClick={() => select(p)}>
              <span className="text-sm capitalize">{p.replace(/_/g, " ")}</span>
              {(value || "").toLowerCase() === p ? <span className="ml-auto text-xs">✓</span> : null}
            </PopoverListItem>
          ))}
        </PopoverList>
      </PopoverContent>
    </Popover>
  )
}
