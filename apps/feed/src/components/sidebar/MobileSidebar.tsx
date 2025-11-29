"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@feedgot/ui/lib/utils";
import { Drawer } from "@feedgot/ui/components/drawer";
import { useQuery } from "@tanstack/react-query";
import { client } from "@feedgot/api/client";
import {
  buildTopNav,
  buildMiddleNav,
  buildBottomNav,
  getSlugFromPath,
} from "../../config/nav";
import MobileBottomBar from "./MobileBottomBar";
import MobileDrawerContent from "./MobileDrawerContent";

export default function MobileSidebar({ className = "", initialCounts, initialTimezone, initialServerNow, initialWorkspace, initialWorkspaces }: { className?: string; initialCounts?: Record<string, number>; initialTimezone?: string | null; initialServerNow?: number; initialWorkspace?: { id: string; name: string; slug: string; logo?: string | null; customDomain?: string | null } | undefined; initialWorkspaces?: { id: string; name: string; slug: string; logo?: string | null }[] | undefined }) {
  const pathname = usePathname() || "/";
  const slug = getSlugFromPath(pathname);
  const primaryNav = React.useMemo(() => buildTopNav(slug), [slug]);
  const { data: wsInfo } = useQuery({
    queryKey: ["workspace", slug],
    queryFn: async () => {
      if (!slug) return null as any;
      const res = await client.workspace.bySlug.$get({ slug });
      const data = await res.json();
      return (data as any)?.workspace || null;
    },
    enabled: !!slug,
    staleTime: 60_000,
    gcTime: 300_000,
    refetchOnMount: false,
    initialData: initialWorkspace as any,
  });
  const customDomain = (wsInfo as any)?.customDomain || null;
  const middleNav = React.useMemo(() => buildMiddleNav(slug, customDomain), [slug, customDomain]);
  const secondaryNav = buildBottomNav();
  const { data: statusCounts } = useQuery({
    queryKey: ["status-counts", slug],
    queryFn: async () => {
      if (!slug) return null as any;
      const res = await client.workspace.statusCounts.$get({ slug });
      const json = (await res.json()) as { counts?: Record<string, number> };
      return json.counts || null;
    },
    enabled: !!slug,
    staleTime: 300_000,
    gcTime: 300_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: initialCounts,
  });

  return (
    <div className={cn("md:hidden", className)}>
      <Drawer direction="right">
        <MobileBottomBar items={middleNav} />
        <MobileDrawerContent
          pathname={pathname}
          primaryNav={primaryNav}
          statusCounts={statusCounts}
          initialTimezone={initialTimezone}
          initialServerNow={initialServerNow}
          secondaryNav={secondaryNav}
          initialWorkspace={initialWorkspace as any}
          initialWorkspaces={initialWorkspaces as any}
        />
      </Drawer>
    </div>
  );
}
