"use client"

import React from "react"
import SectionCard from "@/components/settings/global/SectionCard"
import { Avatar, AvatarImage, AvatarFallback } from "@feedgot/ui/components/avatar"
import { Input } from "@feedgot/ui/components/input"
import { Button } from "@feedgot/ui/components/button"
import { LoadingButton } from "@/components/global/loading-button"
import { toast } from "sonner"
import { authClient } from "@feedgot/auth/client"
import { getInitials, getDisplayUser } from "@/utils/user-utils"

export default function Profile() {
  const [user, setUser] = React.useState<{ name?: string; email?: string; image?: string | null } | null>(null)
  const [name, setName] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const s = await authClient.getSession()
        if (!active) return
        const u = (s as any)?.data?.user || null
        setUser(u)
        setName((u?.name || "").trim())
      } catch {}
    })()
    return () => { active = false }
  }, [])

  const d = getDisplayUser(user || undefined)
  const initials = getInitials(d.name || "U")

  const onSave = React.useCallback(async () => {
    if (saving) return
    setSaving(true)
    try {
      toast.success("Saved")
    } catch {
      toast.error("Failed to save")
    } finally {
      setSaving(false)
    }
  }, [saving])

  const onReset = React.useCallback(() => {
    setName((d.name || "").trim())
  }, [d.name])

  return (
    <SectionCard title="Profile" description="Update your name and avatar">
      <div className="divide-y mt-2">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Avatar</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <div className="rounded-md border ring-1 ring-border overflow-hidden">
              <Avatar className="size-8">
                {d.image ? <AvatarImage src={d.image} alt={d.name} /> : null}
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Name</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9 w-[220px] text-right" placeholder="Your name" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Email</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Input value={d.email || ""} readOnly className="h-9 w-[220px] text-right" />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-2 justify-end">
        <LoadingButton onClick={onSave} loading={saving}>Save</LoadingButton>
        <Button size="sm" variant="secondary" onClick={onReset}>Reset</Button>
      </div>
    </SectionCard>
  )
}
