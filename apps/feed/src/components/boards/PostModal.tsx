"use client"

import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent } from "@feedgot/ui/components/dialog"
import { client } from "@feedgot/api/client"

export default function PostModal({ open, onOpenChange, postId }: { open: boolean; onOpenChange: (o: boolean) => void; postId: string | null }) {
  const q = useQuery({
    enabled: open && !!postId,
    queryKey: ["post-detail", postId],
    queryFn: async () => {
      const res = await client.board.postDetail.$get({ postId: postId! })
      const data = await res.json()
      return data as {
        post: { id: string; title: string; content?: string | null; upvotes?: number | null; downvotes?: number | null; commentCount?: number | null; status?: string | null; roadmapStatus?: string | null; createdAt?: string | Date | null; publishedAt?: string | Date | null; authorName?: string | null }
        board: { name: string; type: string; slug: string } | null
        tags: { id: string; name: string; slug: string; color?: string | null }[]
        comments: { id: string; content: string; authorName?: string | null; createdAt?: string | Date | null; upvotes?: number | null }[]
      }
    },
  })

  const p = q.data?.post
  const b = q.data?.board
  const tags = q.data?.tags || []
  const comments = q.data?.comments || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,960px)]">
        {!p ? (
          <div className="text-sm text-accent">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  {p.authorName ? <p className="text-xs text-accent mt-1">by {p.authorName}</p> : null}
                </div>
                <div className="text-xs text-accent">▲ {p.upvotes ?? 0} · 💬 {p.commentCount ?? 0}</div>
              </div>
              {p.content ? <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">{p.content}</div> : null}
              <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-muted/30 p-4 flex items-center justify-between">
                <span className="text-xs text-accent">Please authenticate to join the conversation.</span>
                <a href="/auth/sign-in" className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md">Sign in / Sign up</a>
              </div>
              <div className="mt-6">
                <div className="text-sm font-medium mb-3">Comments</div>
                {comments.length === 0 ? (
                  <div className="text-xs text-accent">No comments yet</div>
                ) : (
                  <ul className="space-y-3">
                    {comments.map((c) => (
                      <li key={c.id} className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-accent">{c.authorName || "Anonymous"}</span>
                          <span className="text-xs text-accent">▲ {c.upvotes ?? 0}</span>
                        </div>
                        <div className="mt-2 text-sm">{c.content}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card p-4">
                <div className="text-sm font-medium">Upvoters</div>
                <div className="text-xs text-accent mt-1">{p.upvotes ?? 0}</div>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card p-4">
                <div className="text-sm font-medium">Status</div>
                <div className="mt-2 text-xs"><span className="px-2 py-1 rounded-md bg-primary/10 text-primary">{p.status || "published"}</span></div>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card p-4">
                <div className="text-sm font-medium">Board</div>
                <div className="text-xs text-accent mt-1">{b?.name} · {b?.type}</div>
              </div>
              {tags.length > 0 ? (
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card p-4">
                  <div className="text-sm font-medium">Tags</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t.id} className="text-xs px-2 py-1 rounded-md border" style={{ borderColor: t.color || undefined }}>{t.name}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-card p-4">
                <div className="text-sm font-medium">Date</div>
                <div className="text-xs text-accent mt-1">{typeof p.createdAt === "string" ? p.createdAt : p.createdAt?.toString() || ""}</div>
              </div>
            </aside>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}