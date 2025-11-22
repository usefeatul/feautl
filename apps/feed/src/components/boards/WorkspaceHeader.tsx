"use client"

import { useQuery } from "@tanstack/react-query"
import { client } from "@feedgot/api/client"
import Link from "next/link"
import { Button } from "@feedgot/ui/components/button"
import { Container } from "@/components/container"

export default function WorkspaceHeader({ name, slug, className = "" }: { name: string; slug: string; className?: string }) {
  const boardsQ = useQuery({
    queryKey: ["boards", slug],
    queryFn: async () => {
      const res = await client.board.byWorkspaceSlug.$get({ slug })
      const data = await res.json()
      return (data?.boards || []) as { id: string; name: string; slug: string; type: string }[]
    },
  })

  return (
    <header className={`bg-muted border-b border-zinc-200 dark:border-zinc-800 ${className}`}>
      <Container maxWidth="7xl" className="py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-full bg-muted" />
          <div>
            <div className="text-base sm:text-lg font-semibold">{name}</div>
            <div className="text-xs text-accent">{slug}.feedgot.com</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/auth/sign-in"><Button variant="outline" size="sm">Sign in</Button></Link>
          <Link href="/auth/sign-up"><Button size="sm">Sign up</Button></Link>
        </div>
      </Container>
    </header>
  )
}