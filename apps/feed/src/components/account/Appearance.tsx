"use client"

import React from "react"
import SectionCard from "@/components/settings/global/SectionCard"
import ThemePicker from "@/components/settings/branding/ThemePicker"
import { useTheme } from "next-themes"

export default function Appearance() {
  const { theme = "system", setTheme } = useTheme()

  return (
    <SectionCard title="Appearance" description="Choose light, dark, or system theme">
      <div className="divide-y mt-2">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Theme</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <ThemePicker value={(theme as "light" | "dark" | "system") || "system"} onSelect={(t) => setTheme(t)} />
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

