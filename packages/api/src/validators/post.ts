import { z } from "zod"

export const byIdSchema = z.object({ postId: z.string().uuid() })

export const updatePostMetaSchema = z.object({
  postId: z.string().uuid(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  effort: z.enum(["small", "medium", "large", "extra_large"]).optional(),
  roadmapStatus: z.string().min(1).max(64).optional(),
  isPinned: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export const updatePostBoardSchema = z.object({
  postId: z.string().uuid(),
  boardSlug: z.string().min(1).max(128),
})
