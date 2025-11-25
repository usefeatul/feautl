"use client"

import { SearchIcon } from "@feedgot/ui/icons/search"
import { TagIcon } from "@feedgot/ui/icons/tag"
import { ArrowUpDownIcon } from "@feedgot/ui/icons/arrow-up-down"
import { ListFilterIcon } from "@feedgot/ui/icons/list-filter"
import { LayersIcon } from "@feedgot/ui/icons/layers"
import { cn } from "@feedgot/ui/lib/utils"

export default function HeaderActions({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Search">
        <SearchIcon className="w-4 h-4" size={16} />
      </button>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Boards">
        <LayersIcon className="w-4 h-4" size={16} />
      </button>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Requests">
        <ListFilterIcon className="w-4 h-4" size={16} />
      </button>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Tags">
        <TagIcon className="w-4 h-4" size={16} />
      </button>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Sort">
        <ArrowUpDownIcon className="w-4 h-4" size={16} />
      </button>
    </div>
  )
}
