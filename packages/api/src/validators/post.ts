import { z } from "zod"

export const byIdSchema = z.object({
  postId: z.string().uuid(),
})
