"use client"

import * as React from "react"

type DomainBrandingContextType = { hidePoweredBy?: boolean }

const DomainBrandingContext = React.createContext<DomainBrandingContextType>({})

export function DomainBrandingProvider({ hidePoweredBy, children }: { hidePoweredBy?: boolean; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ hidePoweredBy }), [hidePoweredBy])
  return <DomainBrandingContext.Provider value={value}>{children}</DomainBrandingContext.Provider>
}

export function useDomainBranding() {
  return React.useContext(DomainBrandingContext)
}

