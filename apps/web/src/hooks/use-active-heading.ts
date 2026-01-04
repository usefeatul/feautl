import { useEffect, useState } from "react"
import type { TocItem } from "@/lib/toc"

export function useActiveHeading(items: TocItem[], rootSelector?: string) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (!items?.length) return

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)

    const root = rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (!topMost) return

        setActiveId(topMost.target.id)
      },
      {
        root: root ?? null,
        // For docs (scroll container) and blog (window) we keep a generous
        // bottom margin so the last section can still become active.
        rootMargin: "0px 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items, rootSelector])

  return activeId
}
