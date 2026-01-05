import type { ReactNode } from "react"
import { DocsLayoutShell } from "@/components/docs/DocsLayout"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DocsLayoutShell>
      {children}
    </DocsLayoutShell>
  )
}

