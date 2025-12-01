"use client"

import { SortPopover } from "./SortPopover"
import { SearchAction } from "./SearchAction"
import { SubmitIdeaCard } from "./SubmitIdeaCard"
import { BoardsList } from "./BoardsList"
import { PoweredBy } from "./PoweredBy"

export function DomainSidebar({ subdomain, slug }: { subdomain: string; slug: string }) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-end gap-1">
        <SortPopover subdomain={subdomain} slug={slug} />
        <SearchAction />
      </div>
      <SubmitIdeaCard subdomain={subdomain} slug={slug} />
      <BoardsList subdomain={subdomain} slug={slug} />
      <PoweredBy />
    </aside>
  )
}
