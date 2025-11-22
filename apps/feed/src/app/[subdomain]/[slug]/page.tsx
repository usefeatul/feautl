import { db, workspace } from "@feedgot/db"
import { eq } from "drizzle-orm"
import Tabs from "@/components/boards/Tabs"
import PostList from "@/components/boards/PostList"
import Sidebar from "@/components/boards/Sidebar"
import WorkspaceHeader from "@/components/boards/WorkspaceHeader"
import { Container } from "@/components/container"

export const dynamic = "force-dynamic"

export default async function SitePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ tab?: string }> }) {
  const { slug } = await params
  const sp = searchParams ? await searchParams : {}
  const tab = sp?.tab === "roadmap" || sp?.tab === "changelog" ? sp.tab! : "issues"

  const [ws] = await db
    .select({ id: workspace.id, name: workspace.name, slug: workspace.slug, domain: workspace.domain })
    .from(workspace)
    .where(eq(workspace.slug, slug))
    .limit(1)

  const name = ws?.name || slug

  return (
    <main className="min-h-screen bg-background">
      <WorkspaceHeader name={name} slug={slug} activeTab={tab as any} className="w-full rounded-none border-0 border-b border-zinc-200 dark:border-zinc-800" />

      <Container maxWidth="5xl">

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_360px] gap-6">
          <div>
            {tab==="issues" && <PostList workspaceSlug={slug} boardSlug="issues" />}
            {tab==="roadmap" && <PostList workspaceSlug={slug} boardSlug="roadmap" />}
            {tab==="changelog" && <PostList workspaceSlug={slug} boardSlug="changelog" />}
          </div>
          <Sidebar workspaceSlug={slug} />
        </div>
      </Container>
    </main>
  )
}