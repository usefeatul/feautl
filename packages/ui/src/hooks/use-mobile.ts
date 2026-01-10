import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const targetBreakpoint = breakpoint ?? MOBILE_BREAKPOINT

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${targetBreakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < targetBreakpoint)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < targetBreakpoint)
    return () => mql.removeEventListener("change", onChange)
  }, [targetBreakpoint])

  return !!isMobile
}
