import type { Metadata } from "next"
import AccountTabs from "@/components/account/AccountTabs"
import { createPageMetadata } from "@/lib/seo"
import { getServerSession } from "@feedgot/auth/session"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return createPageMetadata({
    title: "Account",
    description: "Manage your account",
    path: `/workspaces/${slug}/account`,
    indexable: false,
  })
}

export default async function AccountPage({ params }: Props) {
  const { slug } = await params
  const session = await getServerSession()
  if (!session?.user) {
    redirect(`/auth/sign-in?redirect=/workspaces/${slug}/account`)
  }
  return <AccountTabs />
}
