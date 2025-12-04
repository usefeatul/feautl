"use client"

import React from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "@feedgot/api/client"
import CommentForm from "./CommentForm"
import CommentThread from "./CommentThread"
import { Loader2 } from "lucide-react"
import { useSession } from "@feedgot/auth/client"

interface CommentListProps {
  postId: string
  initialCount?: number
}

export default function CommentList({ postId, initialCount = 0 }: CommentListProps) {
  const queryClient = useQueryClient()
  const { data: session } = useSession() as any
  const currentUserId = session?.user?.id || null

  const queryKey = ["comments", postId]

  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await client.comment.list.$get({ postId })
      if (!res.ok) {
        throw new Error("Failed to fetch comments")
      }
      return await res.json()
    },
    staleTime: 30_000,
    gcTime: 300_000,
  })

  const comments = commentsData?.comments || []
  const commentCount = comments.length

  const handleCommentSuccess = () => {
    refetch()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">
          Comments {commentCount > 0 && `(${commentCount})`}
        </h2>
      </div>

      {/* Comment Form */}
      <div className="rounded-md border bg-card p-3">
        <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : commentCount === 0 ? (
        <div className="rounded-md border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <CommentThread comments={comments} currentUserId={currentUserId} onUpdate={handleCommentSuccess} />
        </div>
      )}
    </div>
  )
}

