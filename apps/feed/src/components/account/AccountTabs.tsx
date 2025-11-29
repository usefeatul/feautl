"use client"

import React from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@feedgot/ui/components/tabs"
import SectionCard from "@/components/settings/global/SectionCard"
import { ACCOUNT_SECTIONS } from "@/config/account-sections"
import ProfileSection from "./Profile"
import SecuritySection from "./Security"
import NotificationsSection from "./Notifications"

type Props = { selectedSection?: string }

export default function AccountTabs({ selectedSection }: Props) {
  const router = useRouter()
  const routeParams = useParams()
  const slugParam = typeof (routeParams as any)?.slug === "string" ? (routeParams as any).slug : undefined
  const paramSection = typeof routeParams?.section === "string" ? routeParams.section : undefined
  const selected = selectedSection || paramSection || ACCOUNT_SECTIONS[0]?.value

  const onValueChange = React.useCallback((v: string) => {
    const s = slugParam || ""
    if (!s) {
      router.replace(`/workspaces/new`)
      return
    }
    router.replace(`/workspaces/${s}/account/${encodeURIComponent(v)}`)
  }, [router, slugParam])

  React.useEffect(() => {
    if (!paramSection && selected) {
      const s = slugParam || ""
      if (!s) {
        router.replace(`/workspaces/new`)
        return
      }
      router.replace(`/workspaces/${s}/account/${encodeURIComponent(selected)}`)
    }
  }, [paramSection, selected, router, slugParam])

  React.useEffect(() => {
    const s = slugParam || ""
    if (!s) return
    ACCOUNT_SECTIONS.forEach((sec) => {
      router.prefetch(`/workspaces/${s}/account/${encodeURIComponent(sec.value)}`)
    })
  }, [router, slugParam])

  return (
    <section className="space-y-4">
      <Tabs value={selected} onValueChange={onValueChange} className="space-y-4">
        <TabsList className="w-full">
          {ACCOUNT_SECTIONS.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="min-h-[36px] px-3 text-accent">{item.label}</TabsTrigger>
          ))}
        </TabsList>

        {ACCOUNT_SECTIONS.map((s) => (
          <TabsContent key={s.value} value={s.value} className="mt-2">
            <AccountSectionRenderer section={s.value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function AccountSectionRenderer({ section }: { section: string }) {
  switch (section) {
    case "profile":
      return <ProfileSection />
    case "security":
      return <SecuritySection />
    case "notifications":
      return <NotificationsSection />
    default:
      return <SectionCard title="Unknown" description="No such section" />
  }
}

// sections implemented via separate components
