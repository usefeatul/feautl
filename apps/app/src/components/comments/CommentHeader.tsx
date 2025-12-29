import React from "react"
import { relativeTime } from "@/lib/time"
import PinnedBadge from "./PinnedBadge"
import CommentCollapseToggle from "./CommentCollapseToggle"
import CommentActions from "./actions/CommentActions"
import { CommentData } from "../../types/comment"

interface CommentHeaderProps {
  comment: CommentData
  isEditing: boolean
  isAuthor: boolean
  isOwner: boolean
  canDelete: boolean
  hasReplies: boolean
  isCollapsed: boolean
  onToggleCollapse?: () => void
  onEdit: () => void
  onDeleteSuccess?: () => void
}

export default function CommentHeader({
  comment,
  isEditing,
  isAuthor,
  isOwner,
  canDelete,
  hasReplies,
  isCollapsed,
  onToggleCollapse,
  onEdit,
  onDeleteSuccess,
}: CommentHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2 flex-wrap leading-none">
        <span className="text-sm font-semibold text-foreground">
          {comment.authorName}
        </span>
        <span className="text-xs text-muted-foreground/60">
          {relativeTime(comment.createdAt)}
        </span>
        {comment.isEdited && (
          <span className="text-xs text-muted-foreground/60">(edited)</span>
        )}
        {comment.isPinned && <PinnedBadge />}
        {hasReplies && onToggleCollapse && (
          <CommentCollapseToggle
            isCollapsed={isCollapsed}
            replyCount={comment.replyCount}
            onToggle={onToggleCollapse}
            className="ml-auto sm:ml-0"
          />
        )}
      </div>

      {!isEditing && (
        <div>
          <CommentActions
            commentId={comment.id}
            postId={comment.postId}
            isAuthor={isAuthor}
            canDelete={canDelete}
            canPin={isOwner}
            isPinned={!!comment.isPinned}
            onEdit={onEdit}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      )}
    </div>
  )
}
