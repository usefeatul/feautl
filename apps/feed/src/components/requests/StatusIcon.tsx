"use client"

import PlannedIcon from "@feedgot/ui/icons/planned"
import ProgressIcon from "@feedgot/ui/icons/progress"
import ReviewingIcon from "@feedgot/ui/icons/review"
import CompletedIcon from "@feedgot/ui/icons/completed"
import PendingIcon from "@feedgot/ui/icons/pending"
import ClosedIcon from "@feedgot/ui/icons/closed"

export default function StatusIcon({ status, className = "" }: { status?: string; className?: string }) {
  const s = (status || "").toLowerCase()
  const map: Record<string, any> = {
    planned: PlannedIcon,
    progress: ProgressIcon,
    review: ReviewingIcon,
    completed: CompletedIcon,
    pending: PendingIcon,
    closed: ClosedIcon
  }
  const Icon = map[s] || PendingIcon
  return <Icon className={className} />
}

