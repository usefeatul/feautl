"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@featul/ui/lib/utils"
import { BookOpen, ChevronUp, X } from "lucide-react"
import type { ReactElement } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@featul/ui/components/button"
import { AnimatePresence, motion } from "framer-motion"
import { docsSections, type DocsNavSection } from "./sidebar"

/**
 * Derives the current page label from a docs pathname.
 *
 * @param pathname - The current Next.js pathname or null.
 * @returns A human-readable page label.
 */
export function getDocsCurrentPageLabel(pathname: string | null): string {
  if (!pathname) return "Introduction"
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 0) return "Introduction"
  const lastPart = parts[parts.length - 1]
  if (!lastPart) return "Introduction"
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, " ")
}

/**
 * Derives the current docs section label from a pathname and section config.
 *
 * @param pathname - The current Next.js pathname or null.
 * @param sections - The docs navigation sections definition.
 * @returns The label of the current section or a default fallback.
 */
export function getDocsCurrentSectionLabel(
  pathname: string | null,
  sections: DocsNavSection[],
): string {
  if (!pathname) return "Getting started"
  for (const section of sections) {
    const hasMatch = section.items.some((item) => item.href === pathname)
    if (hasMatch) return section.label
  }
  return "Getting started"
}

/**
 * Mobile navigation for the docs layout, including a floating bottom pill
 * that expands into a full-screen navigation sheet.
 *
 * This component is only rendered on small screens.
 */
export function DocsMobileNav(): ReactElement {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isBottomNavVisible, setIsBottomNavVisible] = useState<boolean>(true)
  const [isZooming, setIsZooming] = useState<boolean>(false)

  const openTimeoutIdRef = useRef<number | null>(null)
  const lastScrollYRef = useRef<number>(0)

  const currentPageLabel = useMemo(
    () => getDocsCurrentPageLabel(pathname),
    [pathname],
  )

  const currentSectionLabel = useMemo(
    () => getDocsCurrentSectionLabel(pathname, docsSections),
    [pathname],
  )

  function handleOpen(): void {
    setIsZooming(true)

    if (openTimeoutIdRef.current !== null) {
      window.clearTimeout(openTimeoutIdRef.current)
    }

    openTimeoutIdRef.current = window.setTimeout(() => {
      setIsOpen(true)
      setIsZooming(false)
    }, 150)
  }

  function handleClose(): void {
    setIsOpen(false)
    setIsZooming(false)

    if (openTimeoutIdRef.current !== null) {
      window.clearTimeout(openTimeoutIdRef.current)
      openTimeoutIdRef.current = null
    }
  }

  useEffect(
    () => () => {
      if (openTimeoutIdRef.current !== null) {
        window.clearTimeout(openTimeoutIdRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (!pathname) {
      setIsOpen(false)
      setIsZooming(false)
      return
    }

    setIsOpen(false)
    setIsZooming(false)
  }, [pathname])

  useEffect(() => {
    function handleScroll(): void {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsBottomNavVisible(false)
      } else {
        setIsBottomNavVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-14 flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-medium text-sm">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Docs</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs h-8">
            Log in
          </Button>
          <Button size="sm" className="text-xs h-8 rounded-full bg-foreground text-background hover:bg-foreground/90">
            Register
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="md:hidden fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Pill / Expanded Menu */}
      <div
        className={cn(
          "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-auto max-w-[calc(100vw-32px)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          !isOpen && !isBottomNavVisible ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              layoutId="nav-pill"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8
              }}
              className="bg-black border border-border/30 rounded-4xl shadow-2xl overflow-hidden w-[90vw] max-w-[420px] max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
                <div className="flex flex-col">
                  <motion.span
                    layoutId="nav-page-label"
                    className="text-white font-medium"
                  >
                    {currentPageLabel}
                  </motion.span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                  }}
                  className="p-2 -mr-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 space-y-6">
                {docsSections.map((section) => (
                  <div key={section.label} className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/40 px-2">
                    {section.label}
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={handleClose}
                            className={cn(
                              "flex items-center gap-3 rounded-4xl px-3 py-2 text-sm transition-colors",
                              isActive
                                ? "bg-white/10 text-white font-medium"
                                : "text-white/60 hover:text-white hover:bg-white/5",
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-sm transition-colors",
                                isActive ? "bg-primary text-white" : "bg-white/20",
                              )}
                            />
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.button
              layoutId="nav-pill"
              animate={{ scale: isZooming ? 1.15 : 1 }}
              whileTap={{ scale: 1.15 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8
              }}
              onClick={handleOpen}
              className="bg-black text-white rounded-2xl px-1 py-1 flex items-center shadow-lg border border-white/10 min-w-[280px]"
            >
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
                <span className="text-white/60 text-xs">{currentSectionLabel}</span>
                <motion.span layoutId="nav-page-label">{currentPageLabel}</motion.span>
              </div>
              <div className="flex items-center pl-1 pr-3">
                <ChevronUp className="w-4 h-4 text-white/60" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
