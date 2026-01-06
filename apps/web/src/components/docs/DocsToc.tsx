"use client"

import { cn } from "@featul/ui/lib/utils"
import type { TocItem } from "@/lib/toc"
import {
  buildTocPath,
  getProgressForIndex,
  getTocHeight,
  TOC_ITEM_HEIGHT,
  TOC_INDENT_OFFSET,
} from "@/lib/toc-path"
import { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface DocsTocProps {
  items: TocItem[]
}

export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  // Find active index
  const activeIndex = useMemo(() => {
    return items.findIndex((item) => item.id === activeId)
  }, [items, activeId])

  // Build the SVG path for the zig-zag border track
  const { pathD, pathLength, itemPositions } = useMemo(
    () => buildTocPath(items),
    [items]
  )

  // Spring-animated progress along the path (0 to 1)
  const targetProgress = useMotionValue(0)
  const springProgress = useSpring(targetProgress, {
    stiffness: 120,
    damping: 20,
    mass: 1,
  })

  // Update progress when active item changes
  useLayoutEffect(() => {
    const progress = getProgressForIndex(activeIndex, itemPositions, pathLength)
    targetProgress.set(progress)
  }, [activeIndex, itemPositions, pathLength, targetProgress])

  // Convert progress to stroke-dashoffset
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 1],
    [pathLength, 0]
  )

  useEffect(() => {
    if (!items?.length) return

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)

    const container = document.querySelector<HTMLElement>(
      '[data-docs-scroll-container="true"]'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topMost = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0]
        if (!topMost) return

        setActiveId(topMost.target.id)
      },
      {
        root: container ?? null,
        rootMargin: "0px 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (!items?.length) return null

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const container = document.querySelector<HTMLElement>(
      '[data-docs-scroll-container="true"]'
    )
    const el = document.getElementById(id)
    if (!container || !el) return

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const offsetInContainer = elRect.top - containerRect.top
    const targetY = offsetInContainer + container.scrollTop

    container.scrollTo({ top: targetY, behavior: "smooth" })

    if (history?.replaceState) {
      history.replaceState(null, "", `#${id}`)
    }
  }

  const totalHeight = getTocHeight(items.length)

  return (
    <nav aria-label="On this page" className="text-xs text-accent">
      <div className="text-md font-bold text-foreground mb-3">On this page</div>
      <div ref={navRef} className="relative" style={{ paddingLeft: TOC_INDENT_OFFSET + 8 }}>
        {/* SVG for zig-zag border track */}
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={TOC_INDENT_OFFSET + 4}
          height={totalHeight}
          style={{ overflow: "visible" }}
        >
          {/* Background track */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-border/50"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated progress indicator */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-primary"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Nav items */}
        <ul className="list-none pl-0 m-0 space-y-0">
          {items.map((item) => {
            const isH3 = item.level === 3

            return (
              <li
                key={item.id}
                style={{
                  marginLeft: isH3 ? 0 : -TOC_INDENT_OFFSET,
                  height: TOC_ITEM_HEIGHT,
                }}
              >
                <a
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.id, el)
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    "flex items-center h-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-md",
                    activeId === item.id && "text-foreground font-medium"
                  )}
                  aria-current={activeId === item.id ? "location" : undefined}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
