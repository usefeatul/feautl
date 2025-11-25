"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SECTIONS, WORKSPACE_TITLES } from "@/config/sections"
import HeaderActions from "@/components/requests/HeaderActions"
import { useWorkspaceHeaderActions } from "@/components/providers/workspace-header-actions"

function resolveTitle(segment: string): string {
  const s = segment.toLowerCase()
  if (WORKSPACE_TITLES[s]) return WORKSPACE_TITLES[s]
  const found = SECTIONS.find((x) => x.value === s)
  return found ? found.label : ""
}

export default function WorkspaceHeader() {
  const pathname = usePathname() || "/"
  const { show, actionsOnly, title: overrideTitle } = useWorkspaceHeaderActions()
  const parts = pathname.split("/").filter(Boolean)
  const idx = parts.indexOf("workspaces")
  const rest = idx >= 0 ? parts.slice(idx + 2) : []

  let title = overrideTitle || "Overview"
  if (rest.length > 0) {
    const t = resolveTitle(rest[0] ?? "")
    title = overrideTitle || t || ""
  }

  if (!title && !show) return null

  if (actionsOnly) {
    return (
      <div className="mb-3">
        <div className="flex items-center justify-end">
          {show ? <HeaderActions /> : null}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        {title ? <h1 className="text-xl font-semibold">{title}</h1> : <div />}
        {show ? <HeaderActions /> : null}
      </div>
    </div>
  )
}
