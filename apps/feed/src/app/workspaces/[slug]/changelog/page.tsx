import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { client } from "@oreilla/api/client"
import Link from "next/link"
import { Button } from "@oreilla/ui/components/button"
import { Plus } from "lucide-react"
import ChangelogList from "@/components/changelog/ChangelogList"

export const revalidate = 30

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return createPageMetadata({
    title: "Changelog",
    description: "Workspace changelog",
    path: `/workspaces/${slug}/changelog`,
    indexable: false,
  })
}

export default async function ChangelogPage({ params }: Props) {
  const { slug } = await params
  const res = await client.changelog.entriesList.$get({ 
    slug,
    status: "all",
    limit: 50,
    offset: 0,
  })
  const d = await res.json()
  const entries = (d as any)?.entries || []

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Changelog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product updates and announcements
          </p>
        </div>
        <Link href={`/workspaces/${slug}/changelog/new`}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </Link>
      </div>

      <ChangelogList entries={entries} slug={slug} />
    </section>
  )
}
