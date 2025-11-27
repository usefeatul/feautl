"use client"

import React from "react"
import { useRouter, useParams } from "next/navigation"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import Invite from "@/components/invite/Invite"
import { authClient } from "@feedgot/auth/client"

export default function InviteAcceptPage() {
  const [busy, setBusy] = React.useState(false)
  const [token, setToken] = React.useState<string>("")
  const [workspaceName, setWorkspaceName] = React.useState<string | null>(null)
  const [workspaceLogo, setWorkspaceLogo] = React.useState<string | null>(null)
  const [inviterName, setInviterName] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<any>(null)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  const routeParams = useParams() as any
  const tokenParam = typeof routeParams?.token === "string" ? routeParams.token : undefined
  const tokenFromParams = React.useMemo(() => (tokenParam || "").trim(), [tokenParam])

  React.useEffect(() => {
    let mounted = true
    if (!tokenFromParams) return
    setToken(tokenFromParams)
    const sessionPromise = authClient.getSession()
    const invitePromise = client.team.inviteByToken.$get({ token: tokenFromParams })
    ;(async () => {
      const [sRes, iRes] = await Promise.allSettled([sessionPromise, invitePromise])
      const s = sRes.status === "fulfilled" ? sRes.value : null
      console.log("Invite page: session email", s?.data?.user?.email || null)
      if (!s?.data?.user) {
        router.replace(`/auth/sign-in?redirect=/invite/${tokenFromParams}`)
        return
      }
      if (mounted && s?.data?.user) setUser(s.data.user)

      if (iRes.status === "fulfilled") {
        const res = iRes.value as Response
        console.log("Invite page: inviteByToken status", (res as any)?.status, (res as any)?.ok)
        if (!res.ok) {
          if ((res as any)?.status === 403) setError("This invite is for a different email. Please sign in with the invited address.")
          else if ((res as any)?.status === 410) setError("This invite has expired. Ask your admin to send a new one.")
          else if ((res as any)?.status === 404) setError("Invalid invite link.")
          else setError("Could not load invite.")
          return
        }
        const { invite } = (await res.json()) as { invite?: { workspaceName?: string | null; workspaceLogo?: string | null; invitedByName?: string | null } }
        // console.log("Invite page: invite data", invite || null)
        if (!mounted) return
        if (!invite) {
          setError("Invite not found or expired.")
          return
        }
        setWorkspaceName((invite.workspaceName as string) || null)
        setWorkspaceLogo((invite.workspaceLogo as string) || null)
        setInviterName((invite.invitedByName as string) || null)
      } else {
        setError("Could not load invite.")
      }
    })()
    return () => {
      mounted = false
    }
  }, [tokenFromParams, router])

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
            let targetSlug: string | null = null
            try {
              const mineRes = await client.workspace.listMine.$get()
              const mineData = await mineRes.json()
              const all = (mineData?.workspaces || []) as { slug: string; name: string }[]
              if (workspaceName) {
                const found = all.find((w) => w.name === workspaceName)
                targetSlug = found?.slug || null
              }
              if (!targetSlug && all.length > 0) {
                targetSlug = all[0]?.slug || null
              }
            } catch {}
            toast.success("Invite accepted")
            if (targetSlug) router.replace(`/workspaces/${targetSlug}`)
            else router.replace("/start")
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
