import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import ChangelogEditor from "@/components/changelog/ChangelogEditor"

export const revalidate = 0

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return createPageMetadata({
    title: "New Changelog",
    description: "Create a new changelog entry",
    path: `/workspaces/${slug}/changelog/new`,
    indexable: false,
  })
}

export default async function NewChangelogPage({ params }: Props) {
  const { slug } = await params

  return <ChangelogEditor slug={slug} />
}


