"use client"

import React, { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import { cn } from "@feedgot/ui/lib/utils"

interface CommentVoteProps {
  commentId: string
  initialUpvotes: number
  initialHasVoted: boolean
}

export default function CommentVote({ commentId, initialUpvotes, initialHasVoted }: CommentVoteProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [hasVoted, setHasVoted] = useState(initialHasVoted)
  const [isPending, startTransition] = useTransition()

  React.useEffect(() => {
    setUpvotes(initialUpvotes)
    setHasVoted(initialHasVoted)
  }, [initialUpvotes, initialHasVoted])

  const handleUpvote = () => {
    const previousUpvotes = upvotes
    const previousHasVoted = hasVoted
    const nextHasVoted = !hasVoted
    const nextUpvotes = nextHasVoted ? upvotes + 1 : upvotes - 1

    setHasVoted(nextHasVoted)
    setUpvotes(nextUpvotes)

    startTransition(async () => {
      try {
        const res = await client.comment.upvote.$post({ commentId })
        if (res.ok) {
          const data = await res.json()
          setUpvotes(data.upvotes)
          setHasVoted(data.hasVoted)
        } else {
          setUpvotes(previousUpvotes)
          setHasVoted(previousHasVoted)
          if (res.status === 401) toast.error("Please sign in to vote")
        }
      } catch (error) {
        setUpvotes(previousUpvotes)
        setHasVoted(previousHasVoted)
        console.error("Failed to vote:", error)
      }
    })
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={isPending}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer group/vote",
        hasVoted ? "text-red-500" : "text-muted-foreground/70 hover:text-red-500/80"
      )}
    >
      <Heart className={cn("h-3.5 w-3.5", hasVoted ? "fill-current" : "group-hover/vote:scale-110 transition-transform")} />
      {upvotes > 0 && <span className="tabular-nums font-medium">{upvotes}</span>}
    </button>
  )
}
