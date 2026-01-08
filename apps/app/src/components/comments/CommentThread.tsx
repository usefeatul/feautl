import React from "react"
import type { CommentData } from "../../types/comment";

import AnimatedReplies from "./AnimatedReplies"
import CommentItem from "./CommentItem";
import { updateCommentCollapseState } from "@/lib/comments.actions"

interface CommentThreadProps {
  postId: string
  comments: CommentData[]
  currentUserId?: string | null
  onUpdate?: () => void
  workspaceSlug?: string
  initialCollapsedIds?: string[]
  hidePublicMemberIdentity?: boolean
}

export default function CommentThread({
  postId,
  comments,
  currentUserId,
  onUpdate,
  workspaceSlug,
  initialCollapsedIds = [],
  hidePublicMemberIdentity,
}: CommentThreadProps) {
  const [collapsedIds, setCollapsedIds] = React.useState<Set<string>>(
    new Set(initialCollapsedIds)
  )

  const toggleCollapse = async (commentId: string) => {
    const next = new Set(collapsedIds)
    const isCollapsed = !next.has(commentId)

    if (isCollapsed) {
      next.add(commentId)
    } else {
      next.delete(commentId)
    }
    setCollapsedIds(next)

    try {
      await updateCommentCollapseState(postId, commentId, isCollapsed)
    } catch (error) {
      console.error("Failed to update collapse state cookie", error)
    }
  }

  const rootComments = comments.filter((c) => !c.parentId)

  const getReplies = (parentId: string) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }

  return (
    <div className="space-y-6">
      {rootComments.map((comment) => (
        <ThreadItem
          key={comment.id}
          comment={comment}
          getReplies={getReplies}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          collapsedIds={collapsedIds}
          onToggleCollapse={toggleCollapse}
          workspaceSlug={workspaceSlug}
          hidePublicMemberIdentity={hidePublicMemberIdentity}
        />
      ))}
    </div>
  )
}

interface ThreadItemProps {
  comment: CommentData
  getReplies: (parentId: string) => CommentData[]
  currentUserId?: string | null
  onUpdate?: () => void
  depth?: number
  collapsedIds: Set<string>
  onToggleCollapse: (id: string) => void
  workspaceSlug?: string
  hidePublicMemberIdentity?: boolean
}

function ThreadItem({
  comment,
  getReplies,
  currentUserId,
  onUpdate,
  depth = 0,
  collapsedIds,
  onToggleCollapse,
  workspaceSlug,
  hidePublicMemberIdentity,
}: ThreadItemProps) {
  const replies = getReplies(comment.id)
  const isCollapsed = collapsedIds.has(comment.id)

  return (
    <div className="group/thread">
      <CommentItem
        comment={comment}
        currentUserId={currentUserId}
        onUpdate={onUpdate}
        onReplySuccess={onUpdate}
        depth={depth}
        hasReplies={replies.length > 0}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => onToggleCollapse(comment.id)}
        workspaceSlug={workspaceSlug}
        hidePublicMemberIdentity={hidePublicMemberIdentity}
      />
      {replies.length > 0 && (
        <AnimatedReplies isOpen={!isCollapsed}>
          <div className="relative pl-6 mt-2">
            {/* Thread line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border/40 group-hover/thread:bg-border/60 transition-colors" />
            <div className="space-y-3">
              {replies.map((reply) => (
                <ThreadItem
                  key={reply.id}
                  comment={reply}
                  getReplies={getReplies}
                  currentUserId={currentUserId}
                  onUpdate={onUpdate}
                  depth={depth + 1}
                  collapsedIds={collapsedIds}
                  onToggleCollapse={onToggleCollapse}
                  workspaceSlug={workspaceSlug}
                  hidePublicMemberIdentity={hidePublicMemberIdentity}
                />
              ))}
            </div>
          </div>
        </AnimatedReplies>
      )}
    </div>
  )
}
