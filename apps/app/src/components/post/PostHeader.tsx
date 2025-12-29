"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@featul/ui/components/avatar";
import { ChevronRightIcon } from "@featul/ui/icons/chevron-right";
import { BoardSelector } from "./BoardSelector";
import { StatusSelector } from "./StatusSelector";
import { TagSelector } from "./TagSelector";

export interface PostHeaderProps {
  user: { name?: string; image?: string | null } | null;
  initials: string;
  boards: any[];
  selectedBoard: { name: string; slug: string } | null;
  onSelectBoard: (board: any) => void;
  status?: string;
  onStatusChange?: (status: string) => void;
  availableTags?: any[];
  selectedTags?: string[];
  onToggleTag?: (tagId: string) => void;
}

export function PostHeader({
  user,
  initials,
  boards,
  selectedBoard,
  onSelectBoard,
  status,
  onStatusChange,
  availableTags,
  selectedTags,
  onToggleTag,
}: PostHeaderProps) {
  return (
    <div className="flex items-center gap-2 p-3 md:p-4 pb-1">
      {/* User Avatar */}
      <Avatar className="size-8">
        {user?.image ? (
          <AvatarImage src={user.image} alt={user.name} />
        ) : (
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        )}
      </Avatar>
      <ChevronRightIcon className="size-3" />
      <BoardSelector
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={onSelectBoard}
      />
      {status && onStatusChange && (
        <StatusSelector status={status} onStatusChange={onStatusChange} />
      )}
      {availableTags && selectedTags && onToggleTag && (
        <TagSelector
          availableTags={availableTags}
          selectedTags={selectedTags}
          onToggleTag={onToggleTag}
        />
      )}
    </div>
  );
}
