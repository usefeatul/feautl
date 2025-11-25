"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SECTIONS, WORKSPACE_TITLES } from "@/config/sections"

function resolveTitle(segment: string): string {
  const s = segment.toLowerCase()
  if (WORKSPACE_TITLES[s]) return WORKSPACE_TITLES[s]
  const found = SECTIONS.find((x) => x.value === s)
  return found ? found.label : ""
}

export default function WorkspaceHeader() {
  const pathname = usePathname() || "/"
  const parts = pathname.split("/").filter(Boolean)
  const idx = parts.indexOf("workspaces")
  const rest = idx >= 0 ? parts.slice(idx + 2) : []

  let title = "Overview"
  if (rest.length > 0) {
    const t = resolveTitle(rest[0] ?? "")
    title = t || ""
  }

  if (!title) return null

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}
