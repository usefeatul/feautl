"use client";

import React, { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { PopoverListItem } from "@feedgot/ui/components/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@feedgot/ui/components/alert-dialog";
import { client } from "@feedgot/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RequestDeleteActionProps {
  postId: string;
}

export function RequestDeleteAction({ postId }: RequestDeleteActionProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await client.post.delete.$post({ postId });
        if (res.ok) {
          toast.success("Post deleted successfully");
          // Navigate back to the board or home
          // We need to know the workspace/board context ideally, but for now router.back() or similar
          // Better to redirect to the parent board if possible, but since we don't have the slug here easily without prop drilling
          // Let's try to parse it from URL or just go back
          router.back(); 
        } else {
          const err = await res.json();
          toast.error((err as any)?.message || "Failed to delete post");
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete post");
      } finally {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <PopoverListItem
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <span className="text-sm">Delete</span>
        <Trash2 className="ml-auto size-4" />
      </PopoverListItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
