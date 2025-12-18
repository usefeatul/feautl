import type { Metadata } from "next"
import WorkspaceWizard from "@/components/wizard/Wizard"
import { createPageMetadata } from "@/lib/seo"
import { redirect } from "next/navigation"
import { getServerSession } from "@oreilla/auth/session"

export const revalidate = 30
export const metadata: Metadata = createPageMetadata({
  title: "New Project",
  description: "Create a new project in oreilla.",
  path: "/workspaces/new",
  indexable: false,
})

export default async function NewWorkspacePage() {
  const session = await getServerSession()
  if (!session?.user) {
    redirect("/auth/sign-in?redirect=/workspaces/new")
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
      <WorkspaceWizard />
    </div>
  )
}
