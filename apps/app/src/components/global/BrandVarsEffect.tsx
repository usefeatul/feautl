"use client"

import * as React from "react"

export default function BrandVarsEffect({ primary }: { primary: string }) {
  React.useEffect(() => {
    const root = document.documentElement
    const p = (primary || "#3b82f6").trim()
    root.style.setProperty("--primary", p)
    root.style.setProperty("--ring", p)
    root.style.setProperty("--sidebar-primary", p)
  }, [primary])
  return null
}

