"use client"
import { useEffect, useState } from 'react'

export type PreviewKey = 'dashboard' | 'roadmap' | 'changelog'

export function usePreviewHint(active: PreviewKey) {
  const [showHint, setShowHint] = useState(true)

  // Hide after 7s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 7000)
    return () => clearTimeout(t)
  }, [])

  // Hide when switching away from dashboard
  useEffect(() => {
    if (active !== 'dashboard') setShowHint(false)
  }, [active])

  return showHint
}