"use client"

import React from "react"
import SectionCard from "../global/SectionCard"
import PlanNotice from "../global/PlanNotice"
import { Switch } from "@feedgot/ui/components/switch"
import { Button } from "@feedgot/ui/components/button"
import { Input } from "@feedgot/ui/components/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@feedgot/ui/components/table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"

export default function ChangelogSection({ slug, initialIsVisible, initialPlan }: { slug: string; initialIsVisible?: boolean; initialPlan?: string }) {
  const queryClient = useQueryClient()
  const { data = { isVisible: Boolean(initialIsVisible) }, isLoading, refetch } = useQuery({
    queryKey: ["changelog-settings", slug],
    queryFn: async () => {
      const res = await client.changelog.settings.$get({ slug })
      const d = await res.json()
      return { isVisible: Boolean((d as any)?.isVisible) }
    },
    initialData: initialIsVisible !== undefined ? { isVisible: Boolean(initialIsVisible) } : undefined,
    staleTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const { data: tagsData = [], isLoading: tagsLoading, refetch: refetchTags } = useQuery({
    queryKey: ["changelog-tags", slug],
    queryFn: async () => {
      const res = await client.changelog.tagsList.$get({ slug })
      const d = await res.json()
      return ((d as any)?.tags || [])
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const visible = Boolean((data as any)?.isVisible)
  const [newTagName, setNewTagName] = React.useState<string>("")

  

  const handleToggleVisible = async (v: boolean) => {
    try {
      try {
        queryClient.setQueryData(["changelog-settings", slug], (prev: any) => ({ ...(prev || {}), isVisible: v }))
      } catch {}
      const res = await client.changelog.toggleVisibility.$post({ slug, isVisible: v })
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { message?: string } | null
        throw new Error(err?.message || "Update failed")
      }
      const msg = v ? "Changelog is now visible on your public site" : "Changelog is hidden from your public site"
      toast.success(msg)
      queryClient.setQueryData(["changelog-settings", slug], (prev: any) => ({ ...(prev || {}), isVisible: v }))
    } catch (e: unknown) {
      try {
        queryClient.setQueryData(["changelog-settings", slug], (prev: any) => ({ ...(prev || {}), isVisible: !v }))
      } catch {}
      const m = (e as { message?: string })?.message || "Couldn't update changelog visibility"
      toast.error(m)
    }
  }


  

  return (
    <SectionCard title="Changelog" description="Manage product updates and visibility.">
      <div className="divide-y mt-2">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm">Visible on public site</div>
          <div className="w-full max-w-md flex items-center justify-end">
            <Switch checked={visible} onCheckedChange={handleToggleVisible} aria-label="Toggle Changelog Visibility" />
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-sm">Changelog Tags</div>
          <div className="flex gap-2">
            <Input className="h-9 w-[220px]" placeholder="New tag" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
            <Button type="button" variant="quiet" onClick={async () => {
              const name = newTagName.trim()
              if (!name) return
              try {
                const res = await client.changelog.tagsCreate.$post({ slug, name })
                if (!res.ok) {
                  const err = (await res.json().catch(() => null)) as { message?: string } | null
                  throw new Error(err?.message || "Create failed")
                }
                toast.success("Tag created")
                setNewTagName("")
                await refetchTags()
              } catch (e: unknown) {
                toast.error((e as { message?: string })?.message || "Failed to create tag")
              }
            }}>Add</Button>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Tag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(tagsData || []).length === 0 && !tagsLoading ? (
                  <TableRow>
                    <TableCell colSpan={1} className="px-4 py-6 text-accent">No tags</TableCell>
                  </TableRow>
                ) : (
                  (tagsData || []).map((t: any) => (
                    <TableRow key={t.id}>
                      <TableCell className="px-4 text-sm">{t.name}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <PlanNotice slug={slug} feature="changelog_tags" plan={initialPlan} changelogTagsCount={(tagsData || []).length} />
        </div>

        
      </div>
    </SectionCard>
  )
}
