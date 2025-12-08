"use client";

import React from "react";
import { Edit2 } from "lucide-react";
import { PopoverListItem } from "@feedgot/ui/components/popover";

interface RequestEditActionProps {
  onClick: () => void;
}

export function RequestEditAction({ onClick }: RequestEditActionProps) {
  return (
    <PopoverListItem onClick={onClick}>
      <span className="text-sm">Edit</span>
      <Edit2 className="ml-auto size-4 text-muted-foreground" />
    </PopoverListItem>
  );
}
