"use client";

import React from "react";
import { Input } from "@featul/ui/components/input";
import { Button } from "@featul/ui/components/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

type Props = {
  workspaceId?: string;
};

export default function WorkspaceIdSection({ workspaceId }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-foreground">Workspace ID</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Unique identifier for this workspace. Use this for API integrations.
        </p>
      </div>
      <div className="flex items-center gap-2 max-w-md">
        <Input
          readOnly
          value={workspaceId || ""}
          className="font-mono text-sm bg-muted/50"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (!workspaceId) return;
            navigator.clipboard.writeText(workspaceId);
            toast.success("Copied to clipboard");
          }}
          className="h-9 gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>
    </div>
  );
}
