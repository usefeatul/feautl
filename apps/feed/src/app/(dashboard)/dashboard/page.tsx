import { AppSidebar } from "@/app/components/sidebar/app-sidebar"
import { ChartAreaInteractive } from "@/app/components/sidebar/chart-area-interactive"
import { DataTable } from "@/app/components/sidebar/data-table"
import { SectionCards } from "@/app/components/sidebar/section-cards"
import { SiteHeader } from "@/app/components/sidebar/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@feedgot/ui/components/sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
