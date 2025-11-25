"use client"

import { SearchIcon } from "@feedgot/ui/icons/search"
import { cn } from "@feedgot/ui/lib/utils"
import BoardsAction from "./actions/BoardsAction"
import StatusAction from "./actions/StatusAction"
import TagsAction from "./actions/TagsAction"
import SortAction from "./actions/SortAction"

export default function HeaderActions({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button type="button" className="rounded-md border bg-card px-2 py-1" aria-label="Search">
        <SearchIcon className="w-4 h-4" size={16} />
      </button>
      <BoardsAction />
      <StatusAction />
      <TagsAction />
      <SortAction />
    </div>
  )
}
