"use client"

import React from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function RoadmapDraggable({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id })
  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: transform ? CSS.Translate.toString(transform) : undefined }}
      className={"rounded-md border bg-background px-3 py-2 overflow-hidden " + className}
    >
      {children}
    </li>
  )
}

