"use client"

import React from "react"
import { Input } from "@oreilla/ui/components/input"
import { Button } from "@oreilla/ui/components/button"
import { SettingsDialogShell } from "@/components/settings/global/SettingsDialogShell"
import { toSlug } from "@/lib/slug"

export default function ModalCreateBoard({ open, onOpenChange, onSave, saving }: { open: boolean; onOpenChange: (v: boolean) => void; onSave: (params: { name: string; slug?: string }) => void; saving?: boolean }) {
  const [name, setName] = React.useState("")
  const [slug, setSlug] = React.useState("")

  React.useEffect(() => {
    if (!open) {
      setName("")
      setSlug("")
    }
  }, [open])

  return (
    <SettingsDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Create board"
      description="Add a new board to organize your feedback."
      width="wide"
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <label htmlFor="board-name" className="text-xs">Name</label>
          <Input id="board-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" className="h-9 placeholder:text-accent" />
        </div>
        <div className="space-y-2">
          <label htmlFor="board-slug" className="text-xs">Slug (optional)</label>
          <Input
            id="board-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. features"
            className="h-9 placeholder:text-accent"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-3">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button
          onClick={() => onSave({ name: name.trim(), slug: slug ? toSlug(slug) : undefined })}
          disabled={Boolean(saving) || !name.trim()}
        >
          {saving ? "Creating..." : "Create"}
        </Button>
      </div>
    </SettingsDialogShell>
  )
}

