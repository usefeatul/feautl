"use client";

import React from "react";
import SectionCard from "../global/SectionCard";
import { Input } from "@oreilla/ui/components/input";
import { Button } from "@oreilla/ui/components/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@oreilla/ui/components/alert-dialog";
import { TrashIcon } from "@oreilla/ui/icons/trash";
import { client } from "@oreilla/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
  workspaceName?: string;
};

export default function DataSection({ slug, workspaceName }: Props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [confirmName, setConfirmName] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = React.useCallback(() => {
    if (!slug) return;
    startTransition(async () => {
      try {
        const res = await client.workspace.delete.$post({
          slug,
          confirmName: confirmName.trim(),
        });
        const data = await res.json().catch(() => ({} as any));
        if (!res.ok || !data?.ok) {
          const message =
            (data as any)?.message || "Failed to delete workspace";
          toast.error(message);
          return;
        }

        toast.success("Workspace deleted");

        // After delete, try to move the user to another workspace if they have one.
        let nextSlug: string | null = null;
        try {
          const listRes = await client.workspace.listMine.$get();
          const listData = await listRes.json().catch(() => ({} as any));
          const workspaces = ((listData as any).workspaces ||
            []) as { slug: string }[];
          const remaining = workspaces.filter((w) => w.slug !== slug);
          nextSlug = remaining[0]?.slug || null;
        } catch {
          nextSlug = null;
        }

        if (nextSlug) {
          router.push(`/workspaces/${nextSlug}`);
        } else {
          router.push("/start");
        }
        router.refresh();
      } catch (error) {
        console.error("Failed to delete workspace", error);
        toast.error("Failed to delete workspace");
      } finally {
        setOpen(false);
        setConfirmName("");
      }
    });
  }, [slug, confirmName, router]);

  const expectedName = String(workspaceName || "").trim();
  const disableConfirm =
    isPending ||
    !expectedName ||
    !confirmName.trim() ||
    confirmName.trim() !== expectedName;

  return (
    <SectionCard
      title="Danger zone"
      description="Delete this workspace and all of its data."
    >
      <div className="space-y-4">
        <p className="text-sm text-accent">
          Deleting a workspace is permanent and cannot be undone. All boards,
          posts, tags, members, and settings will be removed.
        </p>
        <Button
          type="button"
          variant="destructive"
          onClick={() => setOpen(true)}
          disabled={isPending || !slug}
        >
          Delete workspace
        </Button>

        <AlertDialog
          open={open}
          onOpenChange={(next) => {
            if (isPending) return;
            setOpen(next);
            if (!next) setConfirmName("");
          }}
        >
          <AlertDialogContent className="p-1 bg-muted rounded-xl gap-2">
            <AlertDialogHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <AlertDialogTitle className="flex items-center gap-2 px-2 mt-1 py-1 text-sm font-normal">
                <TrashIcon width={18} height={18} className="opacity-80" />
                Are you absolutely sure?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="bg-card rounded-lg p-2 dark:bg-black/40 border border-border">
              <AlertDialogDescription className="space-y-3 text-sm text-accent mb-2">
                <span className="block">
                  This will permanently delete{" "}
                  <span className="font-semibold text-red-500">
                    {workspaceName || slug}
                  </span>{" "}
                  and <span className="font-semibold">all content within this workspace</span>.
                </span>
                <span className="block font-medium text-red-500">
                  This action cannot be undone.
                </span>
                {expectedName ? (
                  <span className="block">
                    To confirm, type the workspace name{" "}
                    <span className="font-mono text-foreground/80">
                      {expectedName}
                    </span>{" "}
                    below.
                  </span>
                ) : (
                  <span className="block">
                    To confirm, type the workspace name below.
                  </span>
                )}
              </AlertDialogDescription>
              <div className="mt-3">
                <Input
                  autoFocus
                  placeholder={expectedName || "Workspace name"}
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  disabled={isPending}
                  className="h-10"
                />
              </div>
              <AlertDialogFooter className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel disabled={isPending} className="h-8 px-3 text-sm">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    if (!disableConfirm) handleDelete();
                  }}
                  disabled={disableConfirm}
                  className="h-8 px-4 text-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  {isPending ? "Deleting..." : "Delete workspace"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SectionCard>
  );
}
