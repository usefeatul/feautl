import { eq, and, sql, isNull } from "drizzle-orm"
import { j, publicProcedure } from "../jstack"
import { vote, post } from "@feedgot/db"
import { votePostSchema } from "../validators/post"
import { HTTPException } from "hono/http-exception"
import { auth } from "@feedgot/auth"
import { headers } from "next/headers"

export function createPostRouter() {
  return j.router({
    vote: publicProcedure
      .input(votePostSchema)
      .post(async ({ ctx, input, c }) => {
        const { postId, fingerprint } = input
        
        let userId: string | null = null
        try {
          const session = await auth.api.getSession({
            headers: (c as any)?.req?.raw?.headers || (await headers()),
          })
          if (session?.user?.id) {
            userId = session.user.id
          }
        } catch {}

        if (!userId && !fingerprint) {
             throw new HTTPException(400, { message: "Missing identification" })
        }

        // Check if post exists
        const [targetPost] = await ctx.db
          .select({ id: post.id })
          .from(post)
          .where(eq(post.id, postId))
          .limit(1)
        
        if (!targetPost) {
          throw new HTTPException(404, { message: "Post not found" })
        }

        let existingVote
        
        if (userId) {
             [existingVote] = await ctx.db
            .select()
            .from(vote)
            .where(and(eq(vote.postId, postId), eq(vote.userId, userId)))
            .limit(1)
        } else if (fingerprint) {
             [existingVote] = await ctx.db
            .select()
            .from(vote)
            .where(and(eq(vote.postId, postId), isNull(vote.userId), eq(vote.fingerprint, fingerprint)))
            .limit(1)
        }

        if (existingVote) {
          // Remove vote
          await ctx.db.delete(vote).where(eq(vote.id, existingVote.id))
          
          const [updatedPost] = await ctx.db
            .update(post)
            .set({ 
              upvotes: sql`greatest(0, ${post.upvotes} - 1)` 
            })
            .where(eq(post.id, postId))
            .returning({ upvotes: post.upvotes })
            
          return c.superjson({ upvotes: updatedPost?.upvotes || 0, hasVoted: false })
        } else {
          // Add vote
          await ctx.db.insert(vote).values({
            postId,
            userId: userId || null,
            fingerprint: userId ? null : fingerprint || null,
            type: 'upvote'
          })

          const [updatedPost] = await ctx.db
            .update(post)
            .set({ 
              upvotes: sql`${post.upvotes} + 1` 
            })
            .where(eq(post.id, postId))
            .returning({ upvotes: post.upvotes })

          return c.superjson({ upvotes: updatedPost?.upvotes || 0, hasVoted: true })
        }
      }),

    getVoteStatus: publicProcedure
      .input(votePostSchema)
      .get(async ({ ctx, input, c }) => {
        const { postId, fingerprint } = input
        
        let userId: string | null = null
        try {
          const session = await auth.api.getSession({
            headers: (c as any)?.req?.raw?.headers || (await headers()),
          })
          if (session?.user?.id) {
            userId = session.user.id
          }
        } catch {}

        let hasVoted = false
        
        if (userId) {
             const [existing] = await ctx.db
            .select({ id: vote.id })
            .from(vote)
            .where(and(eq(vote.postId, postId), eq(vote.userId, userId)))
            .limit(1)
            hasVoted = !!existing
        } else if (fingerprint) {
             const [existing] = await ctx.db
            .select({ id: vote.id })
            .from(vote)
            .where(and(eq(vote.postId, postId), isNull(vote.userId), eq(vote.fingerprint, fingerprint)))
            .limit(1)
            hasVoted = !!existing
        }
        
        return c.superjson({ hasVoted })
      }),
  })
}
