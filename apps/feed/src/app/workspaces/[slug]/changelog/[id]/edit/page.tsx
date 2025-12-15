import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { client } from "@oreilla/api/client"
import { notFound } from "next/navigation"
import ChangelogEditor from "@/components/changelog/ChangelogEditor"

export const revalidate = 0

type Props = { 
  params: Promise<{ slug: string; id: string }> 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params
  return createPageMetadata({
    title: "Edit Changelog",
    description: "Edit changelog entry",
    path: `/workspaces/${slug}/changelog/${id}/edit`,
    indexable: false,
  })
}

export default async function EditChangelogPage({ params }: Props) {
  const { slug, id } = await params

  let entry
  try {
    const res = await client.changelog.get.$get({ id })
    const d = await res.json()
    entry = (d as any)?.entry
  } catch (error) {
    notFound()
  }

  if (!entry) {
    notFound()
  }

  return (
    <ChangelogEditor 
      slug={slug}
      initialData={{
        id: entry.id,
        title: entry.title,
        summary: entry.summary,
        content: entry.content,
        coverImage: entry.coverImage,
        tags: entry.tags,
        status: entry.status,
      }}
    />
  )
}


