"use client"

import React from "react"
import { useQueryClient } from "@tanstack/react-query"

export default function PostCountSeed({ slug, statuses, boards, tags, search, count }: { slug: string; statuses: string[]; boards: string[]; tags: string[]; search: string; count: number }) {
  const qc = useQueryClient()
  React.useEffect(() => {
    const key: (string | string[])[] = ["post-count", slug, statuses, boards, tags, search]
    qc.setQueryData(key as any, count)
  }, [qc, slug, statuses, boards, tags, search, count])
  return null
}
