"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface UseFilterBarVisibilityOptions {
  hasAnyFilters: boolean
  buildClearAllHref: () => string
}

interface UseFilterBarVisibilityResult {
  isVisible: boolean
  handleClearAll: () => void
  handleBarExitComplete: () => void
}

export function useFilterBarVisibility(
  options: UseFilterBarVisibilityOptions
): UseFilterBarVisibilityResult {
  const { hasAnyFilters, buildClearAllHref } = options
  const router = useRouter()

  const [isVisible, setIsVisible] = React.useState(hasAnyFilters)
  const clearAllHrefRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (hasAnyFilters) {
      setIsVisible(true)
      return
    }
    if (!clearAllHrefRef.current) {
      setIsVisible(false)
    }
  }, [hasAnyFilters])

  const handleClearAll = React.useCallback(() => {
    if (!hasAnyFilters) return
    clearAllHrefRef.current = buildClearAllHref()
    setIsVisible(false)
  }, [hasAnyFilters, buildClearAllHref])

  const handleBarExitComplete = React.useCallback(() => {
    const href = clearAllHrefRef.current
    if (!href) return
    clearAllHrefRef.current = null
    React.startTransition(() => router.replace(href, { scroll: false }))
  }, [router])

  return {
    isVisible,
    handleClearAll,
    handleBarExitComplete,
  }
}
