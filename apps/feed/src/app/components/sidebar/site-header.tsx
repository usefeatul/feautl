import { Button } from "@feedgot/ui/components/button"
import { Separator } from "@feedgot/ui/components/separator"
import { SidebarTrigger } from "@feedgot/ui/components/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center px-3">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-sm font-normal ml-3">Documents</h1>
      </div>
    </header>
  )
}
