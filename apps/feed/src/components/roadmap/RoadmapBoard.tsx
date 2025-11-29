"use client"

import React from "react"
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import RoadmapRequestItem from "@/components/roadmap/RoadmapRequestItem"
import { useQueryClient } from "@tanstack/react-query"
import RoadmapColumn from "@/components/roadmap/RoadmapColumn"
import RoadmapDraggable from "@/components/roadmap/RoadmapDraggable"

type Item = {
  id: string
  title: string
  slug: string
  content: string | null
  image: string | null
  commentCount: number
  upvotes: number
  roadmapStatus: string | null
  publishedAt: string | null
  createdAt: string
  boardSlug: string
  boardName: string
}

const STATUSES = ["planned", "progress", "review", "completed", "pending", "closed"] as const

function statusLabel(s: string) {
  const t = s.toLowerCase()
  if (t === "progress") return "Progress"
  if (t === "review") return "Review"
  return t.charAt(0).toUpperCase() + t.slice(1)
}

// Droppable and Draggable have been extracted into dedicated components for clarity

export default function RoadmapBoard({ workspaceSlug, items: initialItems }: { workspaceSlug: string; items: Item[] }) {
  const [items, setItems] = React.useState<Item[]>(() => initialItems)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [savingId, setSavingId] = React.useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const queryClient = useQueryClient()

  const grouped = React.useMemo(() => {
    const acc: Record<string, Item[]> = {}
    for (const s of STATUSES) acc[s] = []
    for (const it of items) {
      const s = ((it.roadmapStatus || "pending").toLowerCase()) as (typeof STATUSES)[number]
      const key = STATUSES.includes(s) ? s : "pending"
      acc[key]?.push(it)
    }
    return acc
  }, [items])

  const handleDragStart = (id: string) => {
    setActiveId(id)
  }

  const onDragEnd = async (overId?: string) => {
    const dragged = items.find((i) => i.id === activeId)
    setActiveId(null)
    if (!dragged) return
    const target = (overId || "").toLowerCase()
    if (!STATUSES.includes(target as any)) return
    if ((dragged.roadmapStatus || "pending").toLowerCase() === target) return
    const normalize = (s: string) => {
      const raw = (s || "pending").trim().toLowerCase().replace(/[\s-]+/g, "")
      const map: Record<string, string> = { pending:"pending", review:"review", inreviewing:"review", planned:"planned", progress:"progress", inprogress:"progress", completed:"completed", closed:"closed" }
      return map[raw] || "pending"
    }
    const prev = normalize(dragged.roadmapStatus || "pending")
    const next = normalize(target)
    setItems((prevItems) => prevItems.map((i) => (i.id === dragged.id ? { ...i, roadmapStatus: target } : i)))
    queryClient.setQueryData(["status-counts", workspaceSlug], (prevCounts: any) => {
      if (!prevCounts) return prevCounts
      const copy: Record<string, number> = { ...prevCounts }
      if (typeof copy[prev] === "number") copy[prev] = Math.max(0, (copy[prev] || 0) - 1)
      copy[next] = ((copy[next] || 0) + 1)
      return copy
    })
    setSavingId(dragged.id)
    try {
      await client.board.updatePostMeta.$post({ postId: dragged.id, roadmapStatus: target })
      queryClient.invalidateQueries({ queryKey: ["status-counts", workspaceSlug] })
      toast.success("Status updated")
    } catch (e: any) {
      setItems((prevItems) => prevItems.map((i) => (i.id === dragged.id ? { ...i, roadmapStatus: prev || null } : i)))
      queryClient.invalidateQueries({ queryKey: ["status-counts", workspaceSlug] })
      toast.error(e?.message || "Failed to update status")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <section className="space-y-4">
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => handleDragStart(String(active.id))}
        onDragEnd={({ over }) => onDragEnd(over?.id as string | undefined)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {STATUSES.map((s) => {
            const itemsForStatus = grouped[s]
            return (
              <RoadmapColumn key={s} id={s} label={statusLabel(s)} count={itemsForStatus?.length ?? 0}>
                {(itemsForStatus || []).map((it) => {
                  const isSaving = savingId === it.id
                  return (
                    <RoadmapDraggable key={it.id} id={it.id}>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex-1 min-w-0">
                          <RoadmapRequestItem item={{ id: it.id, title: it.title, slug: it.slug, roadmapStatus: it.roadmapStatus, content: it.content }} workspaceSlug={workspaceSlug} />
                        </div>
                        {isSaving ? <span className="ml-2 text-[11px] text-accent">Saving…</span> : null}
                      </div>
                    </RoadmapDraggable>
                  )
                })}
              </RoadmapColumn>
            )
          })}
        </div>
      </DndContext>
    </section>
  )
}
