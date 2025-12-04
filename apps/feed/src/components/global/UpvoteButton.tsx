"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { LoveIcon } from "@feedgot/ui/icons/love";
import { cn } from "@feedgot/ui/lib/utils";
import { client } from "@feedgot/api/client";
import { toast } from "sonner";

interface UpvoteButtonProps {
  postId: string;
  upvotes: number;
  hasVoted?: boolean;
  className?: string;
  activeBg?: boolean;
  onChange?: (v: { upvotes: number; hasVoted: boolean }) => void;
}

export function UpvoteButton({
  postId,
  upvotes: initialUpvotes,
  hasVoted: initialHasVoted,
  className,
  activeBg = false,
  onChange,
}: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasVoted, setHasVoted] = useState(initialHasVoted || false);
  const [isPending, startTransition] = useTransition();
  const iconControls = useAnimationControls();

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Optimistic update
    const previousUpvotes = upvotes;
    const previousHasVoted = hasVoted;
    const nextHasVoted = !hasVoted;
    const nextUpvotes = nextHasVoted ? upvotes + 1 : upvotes - 1;
    setHasVoted(nextHasVoted);
    setUpvotes(nextUpvotes);
    if (onChange) onChange({ upvotes: nextUpvotes, hasVoted: nextHasVoted });
    iconControls.start({ y: [0, -8, 0], scale: [1, 1.25, 1], transition: { duration: 0.35, times: [0, 0.5, 1], ease: "easeOut" } });
    startTransition(async () => {
      try {
        const res = await client.post.vote.$post({ postId });
        if (res.ok) {
          const data = await res.json();
          setUpvotes(data.upvotes);
          setHasVoted(data.hasVoted);
          if (onChange) onChange({ upvotes: data.upvotes, hasVoted: data.hasVoted });
        } else {
          setUpvotes(previousUpvotes);
          setHasVoted(previousHasVoted);
          if (onChange) onChange({ upvotes: previousUpvotes, hasVoted: previousHasVoted });
          if (res.status === 401) toast.error("Please sign in to vote");
        }
      } catch (error) {
        setUpvotes(previousUpvotes);
        setHasVoted(previousHasVoted);
        if (onChange) onChange({ upvotes: previousUpvotes, hasVoted: previousHasVoted });
        console.error("Failed to vote:", error);
      }
    });
  };

  return (
    <motion.button
      onClick={handleVote}
      disabled={isPending}
      className={cn(
        "inline-flex items-center gap-1 group transition-colors cursor-pointer",
        className
      )}
      whileTap={{ scale: 0.97 }}
      aria-pressed={hasVoted}
    >
      <motion.span
        className={cn(
          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded",
          "group-hover:text-red-500"
        )}
      >
        <motion.span animate={iconControls} initial={{ y: 0, scale: 1 }}>
          <LoveIcon
            className={cn(
              "size-4 transition-colors opacity-100",
              hasVoted
                ? "fill-current text-red-500 group-hover:text-white"
                : "text-muted-foreground group-hover:text-white"
            )}
          />
        </motion.span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={upvotes}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "tabular-nums",
              hasVoted ? "text-red-600" : "text-muted-foreground",
              "group-hover:text-white"
            )}
          >
            {upvotes}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}
