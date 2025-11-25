import { notFound } from "next/navigation"
import { db, workspace, board, post } from "@feedgot/db"
import { eq, and, sql } from "drizzle-orm"
import StatusIcon from "@/components/requests/StatusIcon"
import { WorkspaceHeaderActionsToggle } from "@/components/providers/workspace-header-actions"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string; post: string }> }

export default async function RequestDetailPage({ params }: Props) {
  const { slug, post: postSlug } = await params
  const [ws] = await db
    .select({ id: workspace.id, name: workspace.name })
    .from(workspace)
    .where(eq(workspace.slug, slug))
    .limit(1)
  if (!ws) return notFound()

  const [p] = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image,
      upvotes: post.upvotes,
      commentCount: post.commentCount,
      roadmapStatus: post.roadmapStatus,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      boardName: board.name,
      boardSlug: board.slug,
    })
    .from(post)
    .innerJoin(board, eq(post.boardId, board.id))
    .where(and(eq(board.workspaceId, ws.id), sql`(board.system_type is null or board.system_type not in ('roadmap','changelog'))`, eq(post.slug, postSlug)))
    .limit(1)
  if (!p) return notFound()

  return (
    <section className="space-y-4">
      <WorkspaceHeaderActionsToggle enabled />
      <div className="flex items-center gap-2">
        <StatusIcon status={p.roadmapStatus || undefined} className="w-[20px] h-[20px] text-foreground/80" />
        <h1 className="text-xl font-semibold">{p.title}</h1>
      </div>
      {p.image ? <img src={p.image} alt="" className="w-full max-w-xl rounded-md object-cover border" /> : null}
      <div className="text-sm text-accent">{p.boardName}</div>
      <div className="mt-2 flex items-center gap-3 text-xs text-accent">
        <span className="rounded-md bg-muted px-2 py-0.5">{p.roadmapStatus || "pending"}</span>
        <span>↑ {p.upvotes}</span>
        <span>💬 {p.commentCount}</span>
        <span>{new Date(p.publishedAt ?? p.createdAt).toLocaleDateString()}</span>
      </div>
      {p.content ? <div className="prose dark:prose-invert text-sm">{p.content}</div> : null}
    </section>
  )
}
