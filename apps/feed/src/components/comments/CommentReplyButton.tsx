"use client"

import React from "react"
import { MessageSquare } from "lucide-react"
import { cn } from "@feedgot/ui/lib/utils"

interface CommentReplyButtonProps {
  onClick: () => void
  className?: string
}

export default function CommentReplyButton({ onClick, className }: CommentReplyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer font-medium",
        className
      )}
    >
      <MessageSquare className="h-3.5 w-3.5" />
      Reply
    </button>
  )
}
