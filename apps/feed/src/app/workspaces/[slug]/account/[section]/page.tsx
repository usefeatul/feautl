import type { Metadata } from "next"
import AccountTabs from "@/components/account/AccountTabs"
import { createPageMetadata } from "@/lib/seo"
import { getAccountSectionMeta } from "@/config/account-sections"
import { getServerSession } from "@feedgot/auth/session"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string; section: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, section } = await params
  const m = getAccountSectionMeta(section)
  return createPageMetadata({
    title: m.label,
    description: m.desc,
    path: `/workspaces/${slug}/account/${section}`,
    indexable: false,
  })
}

export default async function AccountSectionPage({ params }: Props) {
  const { slug, section } = await params
  const session = await getServerSession()
  if (!session?.user) {
    redirect(`/auth/sign-in?redirect=/workspaces/${slug}/account/${encodeURIComponent(section)}`)
  }
  return <AccountTabs selectedSection={section} />
}
