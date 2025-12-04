"use client";

import React, { useState, useTransition, useEffect, useRef } from "react";
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
  const prevPostIdRef = useRef<string>(postId);
  const hasInteractedRef = useRef<boolean>(false);
  const isInitialMountRef = useRef<boolean>(true);

  console.log(`[UpvoteButton] Render - postId: ${postId}, initialHasVoted: ${initialHasVoted}, initialUpvotes: ${initialUpvotes}, current hasVoted state: ${hasVoted}, activeBg: ${activeBg}`)

  // Sync state with props when postId changes (different post) or on initial mount/refresh
  // This ensures state persists correctly after page refresh while not interfering with optimistic updates
  useEffect(() => {
    console.log(`[UpvoteButton] useEffect triggered - postId: ${postId}, initialHasVoted: ${initialHasVoted}, isInitialMount: ${isInitialMountRef.current}, hasInteracted: ${hasInteractedRef.current}, isPending: ${isPending}`)
    
    if (isInitialMountRef.current) {
      // On initial mount, sync with props
      console.log(`[UpvoteButton] Initial mount - syncing state: hasVoted=${initialHasVoted || false}, upvotes=${initialUpvotes}`)
      isInitialMountRef.current = false;
      setUpvotes(initialUpvotes);
      setHasVoted(initialHasVoted || false);
      prevPostIdRef.current = postId;
      
      // If initialHasVoted is false/undefined, verify client-side (works around localhost subdomain cookie issue)
      if (!initialHasVoted) {
        console.log(`[UpvoteButton] Initial hasVoted is false/undefined for ${postId}, checking client-side...`)
        startTransition(async () => {
          try {
            console.log(`[UpvoteButton] Calling API to check vote status for ${postId}`)
            const res = await client.post.hasVoted.$get({ postId });
            console.log(`[UpvoteButton] API response status: ${res.status}, ok: ${res.ok}`)
            if (res.ok) {
              const data = await res.json();
              console.log(`[UpvoteButton] Client-side vote check for ${postId}: hasVoted=${data.hasVoted}`)
              if (data.hasVoted) {
                setHasVoted(true);
                // Use current upvotes state (which was just set from initialUpvotes)
                setUpvotes(prev => {
                  if (onChange) onChange({ upvotes: prev, hasVoted: true });
                  return prev;
                });
              }
            } else {
              const errorText = await res.text().catch(() => 'unknown error')
              console.log(`[UpvoteButton] API check failed for ${postId}: ${res.status} - ${errorText}`)
            }
          } catch (error) {
            console.error(`[UpvoteButton] Error checking vote status for ${postId}:`, error);
          }
        });
      }
    } else if (prevPostIdRef.current !== postId) {
      // Different post - always sync and reset interaction flag
      console.log(`[UpvoteButton] Post changed - syncing state: hasVoted=${initialHasVoted || false}, upvotes=${initialUpvotes}`)
      prevPostIdRef.current = postId;
      hasInteractedRef.current = false;
      setUpvotes(initialUpvotes);
      setHasVoted(initialHasVoted || false);
    } else if (!hasInteractedRef.current && !isPending) {
      // Same post, no user interaction yet, not pending - sync to handle prop updates from server
      console.log(`[UpvoteButton] Props updated (no interaction) - syncing state: hasVoted=${initialHasVoted || false}, upvotes=${initialUpvotes}`)
      setUpvotes(initialUpvotes);
      setHasVoted(initialHasVoted || false);
    } else {
      console.log(`[UpvoteButton] Skipping sync - hasInteracted: ${hasInteractedRef.current}, isPending: ${isPending}`)
    }
  }, [postId, initialUpvotes, initialHasVoted, isPending]);
  
  useEffect(() => {
    console.log(`[UpvoteButton] State changed - postId: ${postId}, hasVoted: ${hasVoted}, upvotes: ${upvotes}, activeBg: ${activeBg}, will show red bg: ${activeBg && hasVoted}`)
  }, [postId, hasVoted, upvotes, activeBg]);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Mark that user has interacted - prevents sync from overriding optimistic updates
    hasInteractedRef.current = true;
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
        // Check if it's an auth error
        if (error && typeof error === 'object' && 'message' in error && error.message === 'Unauthorized') {
          toast.error("Please sign in to vote");
        }
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
          "group-hover:text-red-500",
          activeBg && hasVoted && "bg-red-500/10 group-hover:bg-red-500/20"
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
