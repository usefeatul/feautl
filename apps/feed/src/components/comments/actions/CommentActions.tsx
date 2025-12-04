"use client"

import React from "react"
import { MoreHorizontal } from "lucide-react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverList,
  PopoverListItem,
} from "@feedgot/ui/components/popover"
import CommentDeleteAction from "./CommentDeleteAction"
import CommentReportAction from "./CommentReportAction"
import CommentEditAction from "./CommentEditAction"

interface CommentActionsProps {
  commentId: string
  postId: string
  isAuthor: boolean
  canDelete?: boolean
  onEdit?: () => void
  onDeleteSuccess?: () => void
}

export default function CommentActions({
  commentId,
  postId,
  isAuthor,
  canDelete = false,
  onEdit,
  onDeleteSuccess,
}: CommentActionsProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
          aria-label="More options"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" list>
        <PopoverList>
          {isAuthor ? (
            <>
              {onEdit && (
                <CommentEditAction onEdit={onEdit} onCloseMenu={() => setOpen(false)} />
              )}
              {canDelete && (
                <CommentDeleteAction 
                  commentId={commentId}
                  postId={postId}
                  onSuccess={onDeleteSuccess}
                  onCloseMenu={() => setOpen(false)} 
                />
              )}
            </>
          ) : (
            <>
              {canDelete && (
                <CommentDeleteAction 
                  commentId={commentId}
                  postId={postId}
                  onSuccess={onDeleteSuccess} 
                  onCloseMenu={() => setOpen(false)} 
                />
              )}
              <CommentReportAction 
                commentId={commentId} 
                onCloseMenu={() => setOpen(false)} 
              />
            </>
          )}
        </PopoverList>
      </PopoverContent>
    </Popover>
  )
}
