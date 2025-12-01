import { SortPopover } from "./SortPopover"
import { SearchAction } from "./SearchAction"
import { SubmitIdeaCard } from "./SubmitIdeaCard"
import { BoardsList } from "./BoardsList"

export function DomainSidebar({ subdomain, slug }: { subdomain: string; slug: string }) {
  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-end gap-1">
        <SortPopover subdomain={subdomain} slug={slug} />
        <SearchAction />
      </div>
      <SubmitIdeaCard subdomain={subdomain} slug={slug} />
      <BoardsList subdomain={subdomain} slug={slug} />
      <div className="pt-2 text-center">
        <span className="rounded-md bg-muted px-3 py-1 text-xs text-accent">Powered by UserJot</span>
      </div>
    </aside>
  )
}

