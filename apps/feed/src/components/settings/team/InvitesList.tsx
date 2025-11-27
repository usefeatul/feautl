import React from "react";
import { Button } from "@feedgot/ui/components/button";
import type { Invite } from "./Team";

export default function InvitesList({
  invites,
  loading,
  onRevoke,
}: {
  invites: Invite[];
  loading: boolean;
  onRevoke: (inviteId: string) => void;
}) {
  return (
    <div className="divide-y">
      {invites.length === 0 && !loading ? (
        <div className="p-4 text-sm text-accent">No pending invites</div>
      ) : (
        invites.map((i) => (
          <div key={i.id} className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-medium truncate">{i.email}</div>
              <div className="text-xs text-accent">Expires {new Date(i.expiresAt).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{i.role}</span>
              <Button variant="ghost" onClick={() => onRevoke(i.id)}>Revoke</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

