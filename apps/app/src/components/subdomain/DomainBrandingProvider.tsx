"use client"

import * as React from "react"

type DomainBrandingContextType = { hidePoweredBy?: boolean; sidebarPosition?: "left" | "right" }

const DomainBrandingContext = React.createContext<DomainBrandingContextType>({})

export function DomainBrandingProvider({ hidePoweredBy, sidebarPosition, children }: { hidePoweredBy?: boolean; sidebarPosition?: "left" | "right"; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ hidePoweredBy, sidebarPosition }), [hidePoweredBy, sidebarPosition])
  return <DomainBrandingContext.Provider value={value}>{children}</DomainBrandingContext.Provider>
}

export function useDomainBranding() {
  return React.useContext(DomainBrandingContext)
}
