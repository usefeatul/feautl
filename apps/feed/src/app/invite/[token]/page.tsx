"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import Invite from "@/components/invite/Invite"
import { authClient } from "@feedgot/auth/client"

export default function InviteAcceptPage({ params }: { params: Promise<{ token: string }> }) {
  const [busy, setBusy] = React.useState(false)
  const [token, setToken] = React.useState<string>("")
  const [workspaceName, setWorkspaceName] = React.useState<string | null>(null)
  const [workspaceLogo, setWorkspaceLogo] = React.useState<string | null>(null)
  const [inviterName, setInviterName] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<any>(null)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const { token } = await params
      if (!token) return
      setToken(token)
      console.log("Invite page: token present", !!token)
      const s = await authClient.getSession()
      console.log("Invite page: session email", s?.data?.user?.email || null)
      if (!s?.data?.user) {
        router.replace(`/auth/sign-in?redirect=/invite/${token}`)
        return
      }
      try {
        console.log("Invite page: fetching inviteByToken")
        const res = await client.team.inviteByToken.$get({ token })
        console.log("Invite page: inviteByToken status", (res as any)?.status, (res as any)?.ok)
        if (!res.ok) {
          if ((res as any)?.status === 403) setError("This invite is for a different email. Please sign in with the invited address.")
          else if ((res as any)?.status === 410) setError("This invite has expired. Ask your admin to send a new one.")
          else if ((res as any)?.status === 404) setError("Invalid invite link.")
          else setError("Could not load invite.")
          return
        }
        const data = await res.json()
        console.log("Invite page: invite data", (data as any)?.invite || null)
        if (!mounted) return
        if (!data?.invite) {
          setError("Invite not found or expired.")
          return
        }
        setWorkspaceName((data.invite.workspaceName as string) || null)
        setWorkspaceLogo((data.invite.workspaceLogo as string) || null)
        setInviterName((data.invite.invitedByName as string) || null)
        if (mounted) setUser(s?.data?.user || null)
      } catch (e) {
        console.error("Invite page: error fetching invite", e)
        setError("Could not load invite.")
      }
    })()
    return () => {
      mounted = false
    }
  }, [params])

  return (
    <section className="space-y-3">
      {error ? (
        <div className="rounded-md border bg-card p-3 text-sm text-accent">
          {error}
          {user?.email ? (
            <span className="ml-1">Signed in as {user.email}.</span>
          ) : null}
        </div>
      ) : null}
      <Invite
        workspaceName={workspaceName}
        workspaceLogo={workspaceLogo}
        inviterName={inviterName}
        user={user}
        busy={busy}
        onAccept={async () => {
          if (!token || busy) return
          setBusy(true)
          try {
            const res = await client.team.acceptInvite.$post({ token })
            if (!res.ok) throw new Error("Invite failed")
            toast.success("Invite accepted")
            router.replace("/start")
          } catch (e) {
            toast.error("Invite failed")
          } finally {
            setBusy(false)
          }
        }}
        onDecline={async () => {
          if (!token || busy) return
          setBusy(true)
          try {
            const res = await client.team.declineInvite.$post({ token })
            if (!res.ok) throw new Error("Decline failed")
            toast.success("Invite declined")
            router.replace("/start")
          } catch (e) {
            toast.error("Invite failed")
          } finally {
            setBusy(false)
          }
        }}
      />
    </section>
  )
}
