import { db, workspace } from "@feedgot/db"
import { eq } from "drizzle-orm"
import Tabs from "@/components/boards/Tabs"
import PostList from "@/components/boards/PostList"
import Sidebar from "@/components/boards/Sidebar"

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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-accent text-sm">{slug}.feedgot.com</p>

        <Tabs active={tab as any} />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div>
            {tab==="issues" && <PostList workspaceSlug={slug} boardSlug="issues" />}
            {tab==="roadmap" && <PostList workspaceSlug={slug} boardSlug="roadmap" />}
            {tab==="changelog" && <PostList workspaceSlug={slug} boardSlug="changelog" />}
          </div>
          <Sidebar workspaceSlug={slug} />
        </div>
      </div>
    </main>
  )
}