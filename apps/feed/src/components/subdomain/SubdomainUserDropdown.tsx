"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@oreilla/ui/components/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@oreilla/ui/components/avatar"
import { cn } from "@oreilla/ui/lib/utils"
import { authClient } from "@oreilla/auth/client"
import { toast } from "sonner"
import { getInitials, getDisplayUser } from "@/utils/user-utils"
import { CommentsIcon } from "@oreilla/ui/icons/comments"
import { SettingIcon } from "@oreilla/ui/icons/setting"
import { PlusIcon } from "@oreilla/ui/icons/plus"
import { LogoutIcon } from "@oreilla/ui/icons/logout"
import { useTheme } from "next-themes"
import CreatePostModal from "./CreatePostModal"
//

type User = { name?: string; email?: string; image?: string | null } | null

export default function SubdomainUserDropdown({
  className = "",
  workspace,
  subdomain,
  initialUser,
}: {
  className?: string
  workspace: { slug: string; name?: string; logo?: string | null }
  subdomain: string
  initialUser?: User
}) {
  const router = useRouter()
  const { theme = "system", setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState<User>(initialUser ?? null)
  const [postModalOpen, setPostModalOpen] = React.useState(false)

  React.useEffect(() => {
    let active = true
    ;(async () => {
      try {
        if (initialUser?.image) return
        const s = await authClient.getSession()
        if (!active) return
        const u = (s as any)?.data?.user || null
        if (u?.image) setUser(u)
      } catch {}
    })()
    return () => { active = false }
  }, [initialUser?.image])

  const d = getDisplayUser(user || undefined)
  const initials = getInitials(d.name || "U")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ""
  const themeLabel = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"

  const onSubmitPost = React.useCallback(() => {
    setOpen(false)
    setPostModalOpen(true)
  }, [setPostModalOpen])

  const onTheme = React.useCallback(() => {
    const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system"
    setTheme(next)
    setOpen(false)
  }, [theme, setTheme])

  const onDashboard = React.useCallback(() => {
    setOpen(false)
    const target = `${appUrl}/start`
    window.location.href = target
  }, [appUrl])

  const onCreateProject = React.useCallback(() => {
    setOpen(false)
    const target = `${appUrl}/workspaces/new`
    window.location.href = target
  }, [appUrl])

  const onSignOut = React.useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      await authClient.signOut()
      toast.success("Signed out")
      router.replace("/auth/sign-in")
    } catch {
      toast.error("Failed to sign out")
    } finally {
      setLoading(false)
    }
  }, [router, loading])

  return (
    <div className={cn(className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className="w-full cursor-pointer">
          <button
            suppressHydrationWarning
            type="button"
            className="group flex items-center gap-2 rounded-sm bg-background/60 px-1.5 py-1 text-xs md:text-sm text-foreground shadow-xs hover:bg-muted/80"
          >
              <Avatar className="size-5.5">
                {d.image ? (
                  <AvatarImage src={d.image} alt={d.name} loading="eager" />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-36 max-w-[85vw] p-1.5"
          side="bottom"
          align="center"
          sideOffset={8}
        >
          <div className="space-y-1 text-xs">
            <div className="border-b border-border/70 pb-1">
              <DropdownMenuItem
                onClick={onSubmitPost}
                className="flex items-center justify-between px-2 py-1.5 text-xs group"
              >
                <span className="transition-colors group-hover:text-foreground">
                  Submit post
                </span>
                <CommentsIcon className="size-4 text-foreground/70 opacity-100 transition-colors group-hover:text-primary" />
              </DropdownMenuItem>
            </div>

            <div className="border-b border-border/70 pb-1">
              <DropdownMenuItem
                onClick={onDashboard}
                className="mt-1 flex items-center justify-between px-2 py-1.5 text-xs group"
              >
                <span className="transition-colors group-hover:text-foreground">
                  Dashboard
                </span>
                <SettingIcon className="size-4 text-foreground/70 opacity-100 transition-colors group-hover:text-primary" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onCreateProject}
                className="mt-0.5 flex items-center justify-between px-2 py-1.5 text-xs group"
              >
                <span className="transition-colors group-hover:text-foreground">
                  Create project
                </span>
                <PlusIcon className="size-4 text-foreground/70 opacity-100 transition-colors group-hover:text-primary" />
              </DropdownMenuItem>
            </div>

            <div className="pt-1">
              <DropdownMenuItem
                onClick={onTheme}
                className="flex items-center justify-between px-2 py-1.5 text-xs group"
              >
                <span className="transition-colors group-hover:text-foreground">
                  Theme: {themeLabel}
                </span>
                <SettingIcon className="size-4 text-foreground/70 opacity-100 transition-colors group-hover:text-primary" />
              </DropdownMenuItem>
              {user ? (
                <DropdownMenuItem
                  onClick={onSignOut}
                  className="mt-0.5 flex items-center justify-between px-2 py-1.5 text-xs group"
                  aria-disabled={loading}
                  variant="destructive"
                >
                  <span>Sign out</span>
                  <LogoutIcon className="size-4 text-foreground/80 opacity-100 transition-colors group-hover:text-red-500" />
                </DropdownMenuItem>
              ) : null}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreatePostModal
        open={postModalOpen}
        onOpenChange={setPostModalOpen}
        workspaceSlug={subdomain}
        boardSlug={subdomain}
      />
    </div>
  )
}
