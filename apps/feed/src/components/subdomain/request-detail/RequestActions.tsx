"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverList,
} from "@feedgot/ui/components/popover";
import { Button } from "@feedgot/ui/components/button";
import { RequestEditAction } from "./actions/RequestEditAction";
import { RequestShareAction } from "./actions/RequestShareAction";
import { RequestReportAction } from "./actions/RequestReportAction";
import { RequestDeleteAction } from "./actions/RequestDeleteAction";
import EditPostModal from "./EditPostModal";
import { SubdomainRequestDetailData } from "./types";

interface RequestActionsProps {
  post: SubdomainRequestDetailData;
  workspaceSlug: string;
}

export function RequestActions({ post, workspaceSlug }: RequestActionsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <MoreVertical className="size-4" />
            <span className="sr-only">More options</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40">
          <PopoverList>
            <RequestEditAction onClick={() => setEditOpen(true)} />
            <RequestShareAction postId={post.id} />
            <RequestReportAction postId={post.id} />
            <RequestDeleteAction postId={post.id} />
          </PopoverList>
        </PopoverContent>
      </Popover>

      <EditPostModal
        open={editOpen}
        onOpenChange={setEditOpen}
        workspaceSlug={workspaceSlug}
        post={post}
      />
    </>
  );
}
