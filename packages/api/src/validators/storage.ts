import { z } from "zod"

export const getUploadUrlInputSchema = z.object({
  slug: z.string().min(1),
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  folder: z.string().optional(),
})

export const getCommentImageUploadUrlInputSchema = z.object({
  postId: z.string().uuid(),
  fileName: z.string().min(1),
  contentType: z.string().min(1),
})

export type GetUploadUrlInput = z.infer<typeof getUploadUrlInputSchema>
export type GetCommentImageUploadUrlInput = z.infer<typeof getCommentImageUploadUrlInputSchema>
