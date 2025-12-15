export const revalidate = 30

import type { Metadata } from "next"
import DomainPageLayout from "@/components/subdomain/DomainPageLayout"
import { createWorkspaceSectionMetadata } from "@/lib/seo"
import { getSidebarPositionBySlug } from "@/lib/workspace"
import { client } from "@oreilla/api/client"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import ChangelogRenderer from "@/components/changelog/ChangelogRenderer"

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const { subdomain } = await params
  return createWorkspaceSectionMetadata(subdomain, "changelog")
}

export default async function ChangelogPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params
  const slug = subdomain
  const sidebarPosition = await getSidebarPositionBySlug(slug)
  const res = await client.changelog.entriesList.$get({ 
    slug,
    status: "published",
    limit: 50,
    offset: 0,
  })
  const d = await res.json()
  const entries = (d as any)?.entries || []

  return (
    <DomainPageLayout subdomain={subdomain} slug={slug} sidebarPosition={sidebarPosition} hideSubmitButton={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Changelog</h1>
          <p className="text-sm text-muted-foreground">
            Latest product updates and announcements
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No changelog entries yet</p>
          </div>
        ) : (
          <div className="space-y-12">
            {entries.map((entry: any) => (
              <article key={entry.id} className="space-y-4">
                <header className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {entry.publishedAt && (
                      <time dateTime={entry.publishedAt}>
                        {formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}
                      </time>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold">
                    {entry.title}
                  </h2>

                  {entry.summary && (
                    <p className="text-muted-foreground">{entry.summary}</p>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs rounded-md bg-muted px-2 py-1 text-muted-foreground"
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
                  <ChangelogRenderer data={entry.content} className="text-sm" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DomainPageLayout>
  )
}
