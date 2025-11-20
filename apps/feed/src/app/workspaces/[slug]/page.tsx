import { notFound, redirect } from "next/navigation"
import UserInfo from "@/components/auth/UserInfo"
import { getServerSession } from "@feedgot/auth/session"
import { db, workspace } from "@feedgot/db"
import { eq } from "drizzle-orm"

export default async function WorkspacePage({ params }: { params: { slug: string } }) {
  const session = await getServerSession()
  if (!session?.user) {
    redirect(`/auth/sign-in?redirect=/workspaces/${params.slug}`)
  }

  const [ws] = await db
    .select({ id: workspace.id, name: workspace.name, slug: workspace.slug })
    .from(workspace)
    .where(eq(workspace.slug, params.slug))
    .limit(1)

  if (!ws) notFound()

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">{ws.name}</h1>
          <p className="text-sm text-accent">Workspace: {ws.slug}</p>
        </div>
        <UserInfo />
      </div>
    </section>
  )
}