"use client"

import React, { useTransition } from "react"
import { FlagIcon } from "@feedgot/ui/icons/flag"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import { PopoverListItem } from "@feedgot/ui/components/popover"

interface CommentReportActionProps {
  commentId: string
  onCloseMenu?: () => void
}

export default function CommentReportAction({ commentId, onCloseMenu }: CommentReportActionProps) {
  const [isPending, startTransition] = useTransition()

  const handleReport = () => {
    if (isPending) return
    
    onCloseMenu?.()
    
    startTransition(async () => {
      try {
        const res = await client.comment.report.$post({
          commentId,
          reason: "spam",
        })
        if (res.ok) {
          toast.success("Comment reported")
        } else if (res.status === 401) {
          toast.error("Please sign in to report")
        } else {
          toast.error("Failed to report comment")
        }
      } catch (error) {
        console.error("Failed to report comment:", error)
        toast.error("Failed to report comment")
      }
    })
  }

  return (
    <PopoverListItem onClick={handleReport} disabled={isPending}>
      <FlagIcon className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="text-sm">Report</span>
    </PopoverListItem>
  )
}
