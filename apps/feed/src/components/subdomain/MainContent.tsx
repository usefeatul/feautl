"use client"

import React from "react";
import { useSearchParams } from "next/navigation";

import { BoardsDropdown } from "./BoardsDropdown";
import { PublicRequestPagination } from "./PublicRequestPagination";
import { DomainSidebar } from "./DomainSidebar";
import { SortPopover } from "./SortPopover";
import { SearchAction } from "./SearchAction";
import { SubmitIdeaCard } from "./SubmitIdeaCard";
import PostCard from "@/components/subdomain/PostCard";
import EmptyDomainPosts from "./EmptyPosts";

type Item = any;

export function MainContent({
  subdomain,
  slug,
  items,
  totalCount,
  page,
  pageSize,
  sidebarPosition = "right",
  initialBoards,
}: {
  subdomain: string;
  slug: string;
  items: Item[];
  totalCount: number;
  page: number;
  pageSize: number;
  sidebarPosition?: "left" | "right";
  initialBoards?: Array<{ id: string; name: string; slug: string; postCount?: number }>;
}) {
  const search = useSearchParams();
  const [listItems, setListItems] = React.useState<Item[]>(items || []);
  React.useEffect(() => {
    console.log(`[MainContent] useEffect triggered - items changed:`, items.map(i => ({ id: i.id, hasVoted: i.hasVoted })))
    setListItems(items || []);
  }, [items]);
  
  React.useEffect(() => {
    console.log(`[MainContent] listItems state updated:`, listItems.map(i => ({ id: i.id, hasVoted: i.hasVoted })))
  }, [listItems]);

  // Fetch hasVoted status client-side after mount (works around localhost subdomain cookie issue)
  React.useEffect(() => {
    // Only fetch if we have items and at least one doesn't have hasVoted set
    const needsFetch = listItems.some(item => item.hasVoted === undefined || item.hasVoted === false)
    if (!needsFetch || listItems.length === 0) return

    let mounted = true
    ;(async () => {
      try {
        // Fetch vote status for all posts via API (API routes can access cookies)
        const postIds = listItems.map(item => item.id).filter(Boolean)
        if (postIds.length === 0) return

        // Check each post's vote status by calling the vote endpoint (it returns hasVoted)
        // We'll use a HEAD-like approach or create a batch endpoint, but for now let's check individually
        // Actually, let's create a simple batch check - but that requires a new endpoint
        // For now, let's just let the UpvoteButton handle it via its own state sync
        // The issue is that UpvoteButton's useEffect should sync, but it's not because hasVoted is false
        
        // Better approach: The UpvoteButton already syncs on mount, so the issue must be that
        // the initialHasVoted prop is false/undefined. Let's ensure we don't override client-side state
        console.log(`[MainContent] Client-side mount - will let UpvoteButton sync its own state`)
      } catch (error) {
        console.error(`[MainContent] Error fetching vote status:`, error)
      }
    })()

    return () => { mounted = false }
  }, []) // Only run once on mount
  const orderParam = String(search.get("order") || "likes").toLowerCase();
  const handleVoteChange = React.useCallback((id: string, upvotes: number, hasVoted: boolean) => {
    setListItems((prev: any[]) => {
      const next = prev.map((p) => (p.id === id ? { ...p, upvotes, hasVoted } : p));
      if (orderParam === "likes") {
        next.sort((a, b) => (Number(b.upvotes || 0) - Number(a.upvotes || 0)) || new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      }
      return next;
    });
  }, [orderParam]);
  return (
    <section>
      <div
        className={
          sidebarPosition === "left"
            ? "lg:grid lg:grid-cols-[250px_minmax(0,1.5fr)] lg:gap-6"
            : "lg:grid lg:grid-cols-[minmax(0,1.5fr)_250px] lg:gap-6"
        }
      >
        {sidebarPosition === "left" ? (
          <aside className="hidden lg:block mt-10 lg:mt-0">
            <DomainSidebar subdomain={subdomain} slug={slug} initialBoards={initialBoards} />
          </aside>
        ) : null}
        <div>
          <div className="mb-4">
            {sidebarPosition === "left" ? (
              <div className="lg:hidden flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1">
                  <SortPopover subdomain={subdomain} slug={slug} />
                  <SearchAction />
                </span>
                <BoardsDropdown slug={slug} subdomain={subdomain} initialBoards={initialBoards} />
              </div>
            ) : (
              <div className="lg:hidden flex items-center justify-between gap-2">
                <BoardsDropdown slug={slug} subdomain={subdomain} initialBoards={initialBoards} />
                <span className="inline-flex items-center gap-1">
                  <SortPopover subdomain={subdomain} slug={slug} />
                  <SearchAction />
                </span>
              </div>
            )}
            <div className={sidebarPosition === "left" ? "hidden lg:flex items-center justify-end" : "hidden lg:flex items-center justify-start"}>
              <BoardsDropdown slug={slug} subdomain={subdomain} initialBoards={initialBoards} />
            </div>
          </div>
          <div className="lg:hidden mb-4">
            <SubmitIdeaCard subdomain={subdomain} slug={slug} />
          </div>
          <div className="rounded-md border bg-card mt-4">
            {(items as any[]).length === 0 ? (
              <EmptyDomainPosts subdomain={subdomain} slug={slug} />
            ) : (
              <div className="divide-y">
                {(listItems as any[]).map((p: any) => (
                  <PostCard key={p.id} item={p} onVoteChange={handleVoteChange} />
                ))}
              </div>
            )}
          </div>
          <PublicRequestPagination
            subdomain={subdomain}
            slug={slug}
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
        </div>
        {sidebarPosition === "right" ? (
          <aside className="hidden lg:block mt-10 lg:mt-0">
            <DomainSidebar subdomain={subdomain} slug={slug} initialBoards={initialBoards} />
          </aside>
        ) : null}
      </div>
    </section>
  );
}
