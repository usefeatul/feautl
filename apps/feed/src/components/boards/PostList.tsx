"use client"

import { useQuery } from "@tanstack/react-query"
import { client } from "@feedgot/api/client"
import PostCard from "./PostCard"

export default function PostList({ workspaceSlug, boardSlug, className = "" }: { workspaceSlug: string; boardSlug: string; className?: string }) {
  const q = useQuery({
    queryKey: ["posts", workspaceSlug, boardSlug],
    queryFn: async () => {
      const res = await client.board.postsByBoard.$get({ slug: workspaceSlug, boardSlug })
      const data = await res.json()
      return (data?.posts || []) as { id: string; title: string; content?: string | null; upvotes?: number | null; commentCount?: number | null; roadmapStatus?: string | null; publishedAt?: string | Date | null }[]
    },
  })

  if (!q.isSuccess) return <div className={className + " text-sm text-accent"}>Loading…</div>
  if (q.data.length === 0) return <div className={className + " text-sm text-accent"}>No posts yet.</div>

  return (
    <div className={className + " space-y-3"}>
      {q.data.map((p) => (
        <PostCard
          key={p.id}
          title={p.title}
          description={p.content}
          metaLeft={<div className="flex items-center gap-2"><div className="size-6 rounded-full bg-muted" /><span>Anonymous</span></div>}
          metaRight={
            boardSlug === "updates"
              ? <span>{typeof p.publishedAt === "string" ? p.publishedAt : p.publishedAt?.toString() || ""}</span>
              : <div className="flex items-center gap-2"><span>▲ {p.upvotes ?? 0}</span><span>💬 {p.commentCount ?? 0}</span></div>
          }
        />
      ))}
    </div>
  )
}