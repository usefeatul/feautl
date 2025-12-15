import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { client } from "@oreilla/api/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@oreilla/ui/components/button"
import { ArrowLeft, Edit } from "lucide-react"
import ChangelogRenderer from "@/components/changelog/ChangelogRenderer"
import { Badge } from "@oreilla/ui/components/badge"
import { formatDistanceToNow } from "date-fns"

export const revalidate = 30

type Props = { 
  params: Promise<{ slug: string; id: string }> 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, id } = await params
  return createPageMetadata({
    title: "View Changelog",
    description: "View changelog entry",
    path: `/workspaces/${slug}/changelog/${id}`,
    indexable: false,
  })
}

export default async function ViewChangelogPage({ params }: Props) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/workspaces/${slug}/changelog`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Changelog
          </Button>
        </Link>
        <Link href={`/workspaces/${slug}/changelog/${id}/edit`}>
          <Button size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                entry.status === "published"
                  ? "default"
                  : entry.status === "draft"
                  ? "secondary"
                  : "outline"
              }
            >
              {entry.status}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold">{entry.title}</h1>

          {entry.summary && (
            <p className="text-lg text-muted-foreground">{entry.summary}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {entry.publishedAt ? (
              <time dateTime={entry.publishedAt}>
                Published {formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}
              </time>
            ) : (
              <time dateTime={entry.createdAt}>
                Created {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
              </time>
            )}
          </div>

          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="text-sm rounded-md bg-muted px-3 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {entry.coverImage && (
            <img
              src={entry.coverImage}
              alt={entry.title}
              className="w-full rounded-lg border"
            />
          )}
        </header>

        <div className="border-t pt-6">
          <ChangelogRenderer data={entry.content} />
        </div>
      </article>
    </div>
  )
}


