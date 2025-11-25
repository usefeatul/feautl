"use client"

import React from "react"
import { SearchIcon } from "@feedgot/ui/icons/search"
import { cn } from "@feedgot/ui/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { buildRequestsUrl } from "@/utils/request-filters"
import { getSlugFromPath } from "@/config/nav"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@feedgot/ui/components/command"

export default function SearchAction({ className = "" }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const sp = useSearchParams()
  const [open, setOpen] = React.useState(false)

  const slug = React.useMemo(() => getSlugFromPath(pathname), [pathname])
  const [value, setValue] = React.useState(sp.get("search") || "")

  React.useEffect(() => {
    setValue(sp.get("search") || "")
  }, [sp])

  const runSearch = () => {
    const href = buildRequestsUrl(slug, sp, { search: value })
    router.push(href)
    setOpen(false)
  }

  const clearSearch = () => {
    setValue("")
    const href = buildRequestsUrl(slug, sp, { search: "" })
    router.push(href)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className={cn("rounded-md border bg-card px-2 py-1 cursor-pointer", className)}
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-4 h-4" size={16} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search" description="Find requests">
        <CommandInput
          value={value}
          onValueChange={(v) => setValue(v)}
          placeholder="Search requests"
          aria-label="Search requests"
          onKeyDown={(e) => {
            if (e.key === "Enter") runSearch()
          }}
        />
        <CommandList>
          <CommandEmpty>No matches. Press Enter to search.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={runSearch} disabled={!value.trim()}>
              Search “{value || ""}” in requests
            </CommandItem>
            <CommandItem onSelect={clearSearch} disabled={!sp.get("search")}>Clear search</CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
