"use client"

import React from "react"
import SectionCard from "@/components/settings/global/SectionCard"
import { Button } from "@feedgot/ui/components/button"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

export default function Security() {
  const router = useRouter()
  const pathname = usePathname() || "/"

  const onChangePassword = React.useCallback(() => {
    const redirect = encodeURIComponent(pathname)
    router.push(`/auth/forgot-password?redirect=${redirect}`)
  }, [router, pathname])

  const onSignOutAll = React.useCallback(() => {
    toast.info("Signed out of other devices")
  }, [])

  return (
    <SectionCard title="Security" description="Manage password and sessions">
      <div className="divide-y mt-2">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Password</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Button onClick={onChangePassword}>Change password</Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Sessions</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Button variant="secondary" onClick={onSignOutAll}>Sign out of other devices</Button>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
