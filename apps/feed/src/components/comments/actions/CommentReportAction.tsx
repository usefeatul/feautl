"use client"

import React from "react"
import { FlagIcon } from "@feedgot/ui/icons/flag"
import { PopoverListItem } from "@feedgot/ui/components/popover"

interface CommentReportActionProps {
  onClick: () => void
}

export default function CommentReportAction({ onClick }: CommentReportActionProps) {
  return (
    <PopoverListItem onClick={onClick}>
      <FlagIcon className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="text-sm">Report</span>
    </PopoverListItem>
  )
}
