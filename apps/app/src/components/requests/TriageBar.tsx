"use client"

import React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@featul/ui/components/button"
import { cn } from "@featul/ui/lib/utils"
import { MergePopover } from "./MergePopover"
import type { RequestDetailData } from "./RequestDetail"
import { useTriageSignals, triageForStatus, type TriageAction } from "./useTriage"
import { getSlugFromPath } from "@/config/nav"
import { toast } from "sonner"
import { useRequestNavigation } from "@/hooks/useRequestNavigation"
import { ChevronLeftIcon } from "@featul/ui/icons/chevron-left"
import { ChevronRightIcon } from "@featul/ui/icons/chevron-right"

export interface TriageBarProps {
  post: RequestDetailData
  workspaceSlug: string
  readonly?: boolean
  className?: string
  navigation?: { prev: { slug: string; title: string } | null; next: { slug: string; title: string } | null }
}

export function TriageBar({ post, workspaceSlug, readonly, className, navigation }: TriageBarProps) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const queryClient = useQueryClient()
  const canEdit = (post.role === "admin" || post.isOwner) && !readonly
  const signals = useTriageSignals(post)
  const decision = triageForStatus(post.roadmapStatus || "pending", signals)
  const slug = React.useMemo(() => getSlugFromPath(pathname), [pathname])
  const { prevHref, nextHref } = useRequestNavigation(workspaceSlug, navigation)

  if (!canEdit) return null

  async function run(action: TriageAction) {
    try {
      if (action.id === "merge") return
      if (action.id === "draft-changelog") {
        try {
          window.dispatchEvent(new CustomEvent("post:draft-changelog", { detail: { postId: post.id } }))
        } catch {
          void 0
        }
        toast.info("Opening changelog composer")
        return
      }
      if (!action.next) return
      const res = await (await import("@featul/api/client")).client.board.updatePostMeta.$post({
        postId: post.id,
        roadmapStatus: action.next,
      } as any)
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        toast.error(((err as any)?.message as string) || "Failed to update status")
        return
      }
      if (slug) {
        queryClient.setQueryData(["status-counts", slug], (prev: any) => {
          if (!prev) return prev
          const copy: Record<string, number> = { ...prev }
          const prevStatus = (post.roadmapStatus || "pending").toLowerCase().replace(/[\s-]+/g, "")
          const nextStatus = (action.next || "pending").toLowerCase().replace(/[\s-]+/g, "")
          if (typeof copy[prevStatus] === "number") copy[prevStatus] = Math.max(0, (copy[prevStatus] || 0) - 1)
          copy[nextStatus] = (copy[nextStatus] || 0) + 1
          return copy
        })
        queryClient.invalidateQueries({ queryKey: ["status-counts", slug] })
      }
      toast.success("Status updated")
      router.refresh()
    } catch {
      toast.error("Failed to update status")
    }
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 -translate-x-1/2 px-3 py-2",
        className
      )}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/95 text-foreground shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/90 px-1.5 py-1">
          <Button
            asChild
            variant="nav"
            size="sm"
            className="h-8 px-3 gap-2 rounded-full border-none shadow-none text-xs font-medium hover:bg-muted"
            disabled={!prevHref}
          >
            {prevHref ? (
              <Link href={prevHref} aria-label="Previous">
                <ChevronLeftIcon className="size-3.5" />
              </Link>
            ) : (
              <span aria-hidden="true">
                <ChevronLeftIcon className="size-3.5 opacity-40" />
              </span>
            )}
          </Button>
          <div className="h-4 w-px bg-white/20" />
          <Button
            type="button"
            variant="nav"
            size="sm"
            className="h-8 px-3 gap-2 rounded-full border-none shadow-none text-xs font-medium hover:bg-muted"
            onClick={() => {
              const extras = decision.extras || []
              const close = extras.find((e) => e.id === "close") || decision.secondary
              run(close)
            }}
            aria-label="Close"
          >
            <span className="text-xs font-medium">Close</span>
          </Button>
          <div className="h-4 w-px bg-white/20" />
          <div className="inline-flex items-center">
            <MergePopover postId={post.id} workspaceSlug={workspaceSlug} />
            {typeof post.mergedCount === "number" && post.mergedCount > 0 ? (
              <span className="ml-1 inline-flex items-center justify-center rounded-sm border bg-card px-1.5 text-[10px] leading-none text-accent">
                {post.mergedCount}
              </span>
            ) : null}
          </div>
          <div className="h-4 w-px bg-white/20" />
          <Button
            type="button"
            variant="nav"
            size="sm"
            className="h-8 px-3 gap-2 rounded-full border-none shadow-none text-xs font-medium hover:bg-muted"
            onClick={() => run(decision.primary)}
            aria-label={decision.primary.label}
          >
            <span className="text-xs font-medium">{decision.primary.label}</span>
          </Button>
          <div className="h-4 w-px bg-white/20" />
          <Button
            type="button"
            variant="nav"
            size="sm"
            className="h-8 px-3 gap-2 rounded-full border-none shadow-none text-xs font-medium hover:bg-muted"
            onClick={() => run(decision.secondary)}
            aria-label={decision.secondary.label}
          >
            <span className="text-xs font-medium">{decision.secondary.label}</span>
          </Button>
          <div className="h-4 w-px bg-white/20" />
          <Button
            asChild
            variant="nav"
            size="sm"
            className="h-8 px-3 gap-2 rounded-full border-none shadow-none text-xs font-medium hover:bg-muted"
            disabled={!nextHref}
          >
            {nextHref ? (
              <Link href={nextHref} aria-label="Next">
                <ChevronRightIcon className="size-3.5" />
              </Link>
            ) : (
              <span aria-hidden="true">
                <ChevronRightIcon className="size-3.5 opacity-40" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
