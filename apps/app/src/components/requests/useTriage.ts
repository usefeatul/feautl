import { useMemo } from "react"
import type { RequestDetailData } from "./RequestDetail"

export type SubmissionStatus = "pending" | "review" | "planned" | "progress" | "completed" | "closed"

export interface TriageSignals {
  ageDays: number
  isStale: boolean
  isLowTraction: boolean
  isHighTraction: boolean
}

export interface TriageAction {
  id: string
  label: string
  next?: SubmissionStatus
  intent?: "primary" | "secondary" | "danger" | "info"
}

export interface TriageDecision {
  banner?: string
  primary: TriageAction
  secondary: TriageAction
  extras?: TriageAction[]
}

function getStatus(s?: string): SubmissionStatus {
  const raw = (s || "pending").trim().toLowerCase().replace(/[\s-]+/g, "")
  const map: Record<string, SubmissionStatus> = {
    pending: "pending",
    review: "review",
    inreviewing: "review",
    planned: "planned",
    progress: "progress",
    inprogress: "progress",
    completed: "completed",
    closed: "closed",
  }
  return map[raw] || "pending"
}

export function useTriageSignals(post: RequestDetailData): TriageSignals {
  return useMemo(() => {
    const createdAt = new Date(post.publishedAt || post.createdAt)
    const ageDays = Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 86400000))
    const isStale = ageDays >= 90
    const upvotes = Number(post.upvotes || 0)
    const comments = Number(post.commentCount || 0)
    const isHighTraction = upvotes >= 5 || comments >= 3
    const isLowTraction = upvotes < 2 && comments === 0
    return { ageDays, isStale, isLowTraction, isHighTraction }
  }, [post.publishedAt, post.createdAt, post.upvotes, post.commentCount])
}

export function triageForStatus(status: string | undefined, signals: TriageSignals): TriageDecision {
  const s = getStatus(status)
  if (s === "pending") {
    return signals.isHighTraction
      ? {
          primary: { id: "accept-review", label: "Accept", next: "review", intent: "primary" },
          secondary: { id: "close", label: "Close", next: "closed", intent: "secondary" },
          extras: [{ id: "merge", label: "Merge", intent: "info" }, { id: "skip", label: "Skip", next: "closed", intent: "danger" }],
        }
      : {
          primary: { id: "accept-planned", label: "Accept", next: "planned", intent: "primary" },
          secondary: { id: "close", label: "Close", next: "closed", intent: "secondary" },
          extras: [{ id: "merge", label: "Merge", intent: "info" }, { id: "skip", label: "Skip", next: "closed", intent: "danger" }],
        }
  }
  if (s === "review") {
    return {
      primary: { id: "start-work", label: "Start Work", next: "progress", intent: "primary" },
      secondary: { id: "move-planned", label: "Move to Planned", next: "planned", intent: "secondary" },
      extras: [{ id: "close", label: "Close", next: "closed", intent: "danger" }],
    }
  }
  if (s === "planned") {
    if (signals.isStale) {
      const months = Math.max(1, Math.floor(signals.ageDays / 30))
      return {
        banner: `Stale for ${months} month${months > 1 ? "s" : ""}`,
        primary: { id: "move-review", label: "Move to Review", next: "review", intent: "primary" },
        secondary: { id: "keep-planned", label: "Keep Planned", next: "planned", intent: "secondary" },
        extras: [{ id: "close", label: "Close", next: "closed", intent: "danger" }],
      }
    }
    return {
      primary: { id: "start-work", label: "Start Work", next: "progress", intent: "primary" },
      secondary: { id: "move-review", label: "Move to Review", next: "review", intent: "secondary" },
      extras: [{ id: "close", label: "Close", next: "closed", intent: "danger" }],
    }
  }
  if (s === "progress") {
    return {
      primary: { id: "mark-complete", label: "Mark Complete", next: "completed", intent: "primary" },
      secondary: { id: "move-planned", label: "Move to Planned", next: "planned", intent: "secondary" },
      extras: [{ id: "close", label: "Close", next: "closed", intent: "danger" }],
    }
  }
  if (s === "completed") {
    return {
      primary: { id: "draft-changelog", label: "Draft Changelog", intent: "primary" },
      secondary: { id: "reopen", label: "Reopen", next: "pending", intent: "secondary" },
      extras: [{ id: "merge", label: "Merge", intent: "info" }],
    }
  }
  return {
    primary: { id: "reopen", label: "Reopen", next: "pending", intent: "primary" },
    secondary: { id: "keep-closed", label: "Keep Closed", next: "closed", intent: "secondary" },
    extras: [{ id: "merge", label: "Merge", intent: "info" }],
  }
}

