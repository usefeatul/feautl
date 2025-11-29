"use client"

import React from "react"
import { useDroppable } from "@dnd-kit/core"
import { ChevronDown } from "lucide-react"

export default function RoadmapColumn({
  id,
  label,
  count,
  children,
}: {
  id: string
  label: string
  count: number
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div ref={setNodeRef} className={`rounded-md border ${isOver ? "bg-primary/10 border-primary" : "bg-card"}`}>
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <div className="text-sm font-medium truncate">{label}</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-accent tabular-nums">{count}</div>
          <button
            type="button"
            aria-label={collapsed ? "Expand" : "Collapse"}
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex items-center justify-center size-6 rounded-md hover:bg-muted text-accent hover:text-primary"
          >
            <ChevronDown className={`size-4 transition-transform ${collapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
      {!collapsed ? (
        <ul className={`p-3 space-y-2 min-h-24 ${isOver ? "bg-primary/10 rounded-b-md" : ""}`}>{children}</ul>
      ) : null}
    </div>
  )
}

