"use client"

import React from "react"
import { useDroppable } from "@dnd-kit/core"
import { ChevronDown } from "lucide-react"

export default function RoadmapColumn({
  id,
  label,
  count,
  collapsed,
  onToggle,
  children,
}: {
  id: string
  label: string
  count: number
  collapsed?: boolean
  onToggle?: (next: boolean) => void
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border overflow-hidden transition-all ${isOver ? "bg-primary border-primary" : "bg-card"}`}
    >
      <div
        className={`${collapsed ? "px-2 py-1" : "px-3 py-2"} border-b flex items-center justify-between cursor-pointer`}
        role="button"
        tabIndex={0}
        aria-expanded={!collapsed}
        onClick={() => onToggle?.(!collapsed)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle?.(!collapsed)
        }}
      >
        {!collapsed ? <div className="text-sm font-medium truncate">{label}</div> : null}
        <div className="flex items-center gap-2">
          <div className="text-xs text-accent tabular-nums">{count}</div>
          <button
            type="button"
            aria-label={collapsed ? "Expand" : "Collapse"}
            onClick={(e) => {
              e.stopPropagation()
              onToggle?.(!collapsed)
            }}
            className="inline-flex items-center justify-center size-6 rounded-md hover:bg-muted text-accent hover:text-primary"
          >
            <ChevronDown className={`size-4 transition-transform ${collapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
      {!collapsed ? (
        <ul className={`p-3 space-y-2 min-h-24 ${isOver ? "bg-primary rounded-b-md" : ""}`}>{children}</ul>
      ) : null}
    </div>
  )
}
