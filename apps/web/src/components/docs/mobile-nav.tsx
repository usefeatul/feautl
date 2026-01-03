"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@featul/ui/lib/utils"
import { BookOpen, ChevronUp, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@featul/ui/components/button"
import { docsSections } from "./sidebar"
import { AnimatePresence, motion } from "framer-motion"

export function DocsMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showBottomNav, setShowBottomNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Close nav on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Handle bottom nav visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowBottomNav(false)
      } else {
        setShowBottomNav(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Get current section/page title for the floating pill
  const getCurrentPageLabel = () => {
    const parts = pathname?.split('/').filter(Boolean) || []
    if (parts.length === 0) return "Introduction"
    const lastPart = parts[parts.length - 1]
    if (!lastPart) return "Introduction"
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ')
  }

  // Find current section name
  const getCurrentSection = () => {
    for (const section of docsSections) {
      if (section.items.some(item => item.href === pathname)) {
        return section.label
      }
    }
    return "Getting started"
  }

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
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Pill / Expanded Menu */}
      <div 
        className={cn(
          "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] w-auto max-w-[calc(100vw-32px)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          !open && !showBottomNav ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              layoutId="nav-pill"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8
              }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden w-[90vw] max-w-[420px] max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Current</span>
                  <span className="text-white font-medium">{getCurrentPageLabel()}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen(false)
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
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive 
                                  ? "bg-white/10 text-white font-medium" 
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1.5 rounded-full transition-colors",
                                  isActive ? "bg-[#a855f7]" : "bg-white/20"
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
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 0.8
              }}
              onClick={() => setOpen(true)}
              className="bg-[#1A1A1A] text-white rounded-full px-1 py-1 flex items-center shadow-lg border border-white/10 min-w-[260px]"
            >
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
                <span className="text-white/60 text-xs">{getCurrentSection()}</span>
                <span>{getCurrentPageLabel()}</span>
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
