"use client"

import React from "react"
import type { Member } from "@/types/team"
import { Avatar, AvatarFallback, AvatarImage } from "@oreilla/ui/components/avatar"
import { getInitials } from "@/utils/user-utils"
import { format } from "date-fns"
import { roleBadgeClass } from "@/components/settings/team/role-badge"
import { cn } from "@oreilla/ui/lib/utils"
import RoleBadge from "@/components/global/RoleBadge"

interface MemberHeaderProps {
  member?: Member
  userId: string
  stats: {
    posts: number
    comments: number
    upvotes: number
  }
}

interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-sm p-0">
      <div className="text-sm text-accent">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

export function MemberHeader({ member, userId, stats }: MemberHeaderProps) {
  return (
    <div className="rounded-sm border bg-card dark:bg-black/40 p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ring-1 ring-border/60 ring-offset-1 ring-offset-background">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="size-12">
            <AvatarImage src={member?.image || ""} alt={member?.name || member?.email || ""} />
            <AvatarFallback>{getInitials(member?.name || member?.email || "")}</AvatarFallback>
          </Avatar>
          <RoleBadge role={member?.role} isOwner={member?.isOwner} />
        </div>
        <div className="min-w-0 space-y-1">
          <div className="text-base font-semibold truncate">{member?.name || member?.email || userId}</div>
          <div className="text-xs text-accent truncate">{member?.email}</div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={cn("px-2 py-0.5 rounded-full border", roleBadgeClass(member?.role || "member", member?.isOwner))}>
              {member?.isOwner ? "owner" : member?.role}
            </span>
            {member?.joinedAt ? (
              <span className="text-accent">Joined {format(new Date(member.joinedAt), "LLL d, yyyy")}</span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
        <StatCard label="Posts" value={Number(stats.posts || 0)} />
        <StatCard label="Comments" value={Number(stats.comments || 0)} />
        <StatCard label="Upvotes" value={Number(stats.upvotes || 0)} />
      </div>
    </div>
  )
}

