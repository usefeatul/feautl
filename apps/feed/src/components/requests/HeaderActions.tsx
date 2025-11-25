"use client"

import { cn } from "@feedgot/ui/lib/utils"
import BoardsAction from "./actions/BoardsAction"
import StatusAction from "./actions/StatusAction"
import TagsAction from "./actions/TagsAction"
import SortAction from "./actions/SortAction"
import SearchAction from "./actions/SearchAction"

export default function HeaderActions({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <SearchAction />
      <BoardsAction />
      <StatusAction />
      <TagsAction />
      <SortAction />
    </div>
  )
}
