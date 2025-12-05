"use client"

import React, { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@feedgot/ui/components/avatar"
import { cn } from "@feedgot/ui/lib/utils"
import { getInitials } from "@/utils/user-utils"

export interface MentionCandidate {
  id: string
  name: string
  image?: string | null
  email?: string | null
}

interface MentionListProps {
  candidates: MentionCandidate[]
  selectedIndex: number
  onSelect: (user: MentionCandidate) => void
  className?: string
}

export default function MentionList({ candidates, selectedIndex, onSelect, className }: MentionListProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current && candidates.length > 0) {
      const el = listRef.current.children[selectedIndex] as HTMLElement
      if (el) {
        el.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex, candidates.length])

  if (candidates.length === 0) return null

  return (
    <ul
      ref={listRef}
      className={cn(
        "absolute z-50 w-64 max-h-60 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
        className
      )}
      role="listbox"
    >
      {candidates.map((user, index) => (
        <li
          key={user.id}
          role="option"
          aria-selected={index === selectedIndex}
          className={cn(
            "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
            index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={() => onSelect(user)}
          onMouseDown={(e) => e.preventDefault()} // Prevent blur
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback className="text-[10px]">{getInitials(user.name || "U")}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
             <span className="font-medium leading-none">{user.name}</span>
             {/* <span className="text-xs text-muted-foreground">{user.email}</span> */}
          </div>
        </li>
      ))}
    </ul>
  )
}
