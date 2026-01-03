import type { ReactNode } from "react"
import { DocsSidebar } from "./sidebar"

interface DocsLayoutShellProps {
  children: ReactNode
  rightColumn?: ReactNode
}

export function DocsLayoutShell({ children, rightColumn }: DocsLayoutShellProps) {
  return (
    <main className="min-h-screen pt-10 md:pt-12 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="flex gap-6 lg:gap-10 w-full">
        <DocsSidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
        {rightColumn ? (
          <aside className="hidden lg:block w-56 shrink-0 pl-4">
            <div className="sticky top-24">
              {rightColumn}
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  )
}
