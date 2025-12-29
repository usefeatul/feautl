"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"

export default function SubdomainThemeProvider({
  theme,
  children,
}: {
  theme: "light" | "dark" | "system"
  children: React.ReactNode
}) {
  // Use the branding theme as the initial/default theme, but allow the user
  // to override it via the theme switcher (no forcedTheme here).
  const defaultTheme = theme ?? "system"

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

