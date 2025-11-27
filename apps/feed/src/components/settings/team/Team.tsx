"use client";

import React from "react";
import SectionCard from "../global/SectionCard";
import { Button } from "@feedgot/ui/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@feedgot/ui/components/table";
import { Label } from "@feedgot/ui/components/label";
import { client } from "@feedgot/api/client";
import { toast } from "sonner";
import InviteMemberModal from "./InviteMemberModal";
import MemberRow from "./MemberRow";
import InvitesList from "./InvitesList";

export type Member = {
  userId: string;
  role: "admin" | "member" | "viewer";
  isOwner?: boolean;
  joinedAt?: string;
  isActive?: boolean;
  name?: string;
  email?: string;
  image?: string;
};
export type Invite = {
  id: string;
  email: string;
  role: "admin" | "member" | "viewer";
  invitedBy: string;
  expiresAt: string;
  acceptedAt?: string | null;
  createdAt: string;
};

export default function TeamSection({ slug }: { slug: string }) {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [invites, setInvites] = React.useState<Invite[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [meId, setMeId] = React.useState<string | null>(null);
  const [menuFor, setMenuFor] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    void (async () => {
      try {
        const res = await client.team.membersByWorkspaceSlug.$get({ slug });
        const data = await res.json();
        if (mounted) {
          setMembers(data?.members || []);
          setInvites(data?.invites || []);
          setMeId(data?.meId || null);
        }
      } catch (e) {
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const refresh = async () => {
    const res = await client.team.membersByWorkspaceSlug.$get({ slug });
    const data = await res.json();
    setMembers(data?.members || []);
    setInvites(data?.invites || []);
    setMeId(data?.meId || null);
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "admin" | "member" | "viewer"
  ) => {
    try {
      const res = await client.team.updateRole.$post({
        slug,
        userId,
        role: newRole,
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Role updated");
      setMembers((prev) =>
        prev.map((m) => (m.userId === userId ? { ...m, role: newRole } : m))
      );
      setMenuFor(null);
    } catch (e) {
      toast.error("Failed to update role");
    }
  };

  const handleRevoke = async (inviteId: string) => {
    try {
      const res = await client.team.revokeInvite.$post({ slug, inviteId });
      if (!res.ok) throw new Error("Revoke failed");
      toast.success("Invite revoked");
      await refresh();
    } catch (e) {
      toast.error("Failed to revoke invite");
    }
  };

  return (
    <SectionCard title="Manage Members" description="Members have access to your workspace.">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Name</TableHead>
                  <TableHead className="px-4 w-48 text-center">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="px-4 py-6 text-accent">No members</TableCell>
                  </TableRow>
                ) : (
                  members.map((m) => (
                    <MemberRow key={m.userId} m={m} menuFor={menuFor} setMenuFor={setMenuFor} onRoleChange={handleRoleChange} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Pending Invites</Label>
          <InvitesList slug={slug} invites={invites} loading={loading} onChanged={refresh} />
        </div>

        <div className="pt-2 space-y-2">
          <div className="text-sm text-accent">Invite a new member to your workspace.</div>
          <div className="flex items-center justify-start">
            <Button type="button" variant="quiet" onClick={() => setInviteOpen(true)}>
              Invite Member
            </Button>
          </div>
          <InviteMemberModal
            slug={slug}
            open={inviteOpen}
            onOpenChange={setInviteOpen}
            onInvited={async () => {
              await refresh();
            }}
          />
        </div>
      </div>
    </SectionCard>
  );
}
