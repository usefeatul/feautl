import { z } from "zod"
import { fingerprintSchema } from "./shared"

export const byIdSchema = z.object({ postId: z.string().uuid() })

export const updatePostMetaSchema = z.object({
  postId: z.string().uuid(),
  roadmapStatus: z.string().min(1).max(64).optional(),
  isPinned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export const updatePostBoardSchema = z.object({
  postId: z.string().uuid(),
  boardSlug: z.string().min(1).max(128),
})

export const votePostSchema = z.object({
  postId: z.string().uuid(),
  fingerprint: fingerprintSchema,
})
