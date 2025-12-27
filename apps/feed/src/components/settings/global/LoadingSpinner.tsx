"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@oreilla/ui/lib/utils"

interface LoadingSpinnerProps {
  label?: string
  className?: string
}

export function LoadingSpinner({ label = "Loading...", className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-6 text-sm text-accent", className)}>
      <Loader2 className="size-4 animate-spin" />
      <span>{label}</span>
    </div>
  )
}

