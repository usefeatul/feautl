"use client"

import { useMemo } from "react"

export default function Tabs({ active, className }: { active: "issues" | "roadmap" | "changelog"; className?: string }) {
  const items = useMemo(() => ["issues", "roadmap", "changelog"] as const, [])
  const base = className || "mt-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-6"
  return (
    <nav className={base}>
      {items.map((k) => (
        <a key={k} href={`?tab=${k}`} className={active===k ? "py-3 text-primary border-b-2 border-primary" : "py-3 text-accent hover:text-primary"}>
          {k.charAt(0).toUpperCase() + k.slice(1)}
        </a>
      ))}
    </nav>
  )
}
