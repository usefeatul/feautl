import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"
import { getServerSession } from "@oreilla/auth/session"
import { findFirstAccessibleWorkspaceSlug } from "@/lib/workspace"
import { CreateWorkspaceDialog } from "@/components/workspaces/CreateWorkspaceDialog"

export const revalidate = 30
export const metadata: Metadata = createPageMetadata({
  title: "Welcome to oreilla",
  description: "Create your first workspace in oreilla.",
  path: "/start",
  indexable: false,
})

export default async function StartPage() {
  const session = await getServerSession()
  if (!session?.user) {
    redirect("/auth/sign-in?redirect=/start")
  }
  const slug = await findFirstAccessibleWorkspaceSlug(session.user.id)
  if (slug) {
    redirect(`/workspaces/${slug}`)
  }
  return (
    <div className="min-h-screen bg-background">
      <CreateWorkspaceDialog open />
    </div>
  )
}
