import Link from "next/link"
import { getServerSession } from "@feedgot/auth/session"
import { db, workspace, workspaceMember } from "@feedgot/db"
import { eq } from "drizzle-orm"

export default async function NotFound() {
  const session = await getServerSession()
  let href = "/workspace/new"
  if (session?.user) {
    const userId = session.user.id
    const [owned] = await db
      .select({ slug: workspace.slug })
      .from(workspace)
      .where(eq(workspace.ownerId, userId))
      .limit(1)
    if (owned?.slug) {
      href = `/workspaces/${owned.slug}`
    } else {
      const [memberWs] = await db
        .select({ slug: workspace.slug })
        .from(workspaceMember)
        .innerJoin(workspace, eq(workspaceMember.workspaceId, workspace.id))
        .where(eq(workspaceMember.userId, userId))
        .limit(1)
      if (memberWs?.slug) {
        href = `/workspaces/${memberWs.slug}`
      }
    }
  }
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="mx-auto max-w-lg  text-center">
        <h1 className="text-3xl font-sans tracking-wider ">Whoops…</h1>
        <p className="text-accent mt-2 text-sm font-mono">
          Sorry, there's no such page. Go to your
          <Link
            href={href}
            className="ml-1 text-primary text-sm font-normal hover:text-primary"
            aria-label="Go to workspace"
          >
            workspace
          </Link>
          .
        </p>
      </div>
    </main>
  )
}