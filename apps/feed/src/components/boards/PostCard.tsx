"use client"

import { ReactNode } from "react"

export type PostCardProps = {
  title: string
  description?: string | null
  metaLeft?: ReactNode
  metaRight?: ReactNode
  onClick?: () => void
}

export default function PostCard({ title, description, metaLeft, metaRight, onClick }: PostCardProps) {
  return (
    <div onClick={onClick} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm cursor-pointer hover:bg-muted/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-semibold leading-snug">{title}</h3>
          {description ? <p className="text-xs sm:text-sm text-accent mt-1 line-clamp-2">{description}</p> : null}
        </div>
        {metaRight ? <div className="shrink-0 text-xs text-accent">{metaRight}</div> : null}
      </div>
      {(metaLeft || metaRight) && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-accent">{metaLeft}</div>
          <div className="flex items-center gap-3 text-xs text-accent">{metaRight}</div>
        </div>
      )}
    </div>
  )
}