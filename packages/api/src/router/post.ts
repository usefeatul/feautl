import { eq, and, sql } from "drizzle-orm"
import { j, privateProcedure } from "../jstack"
import { vote, post } from "@feedgot/db"
import { byIdSchema } from "../validators/post"
import { HTTPException } from "hono/http-exception"

export function createPostRouter() {
  return j.router({
    vote: privateProcedure
      .input(byIdSchema)
      .post(async ({ ctx, input, c }) => {
        const { postId } = input
        const userId = ctx.session.user.id

        // Check if post exists
        const [targetPost] = await ctx.db
          .select({ id: post.id })
          .from(post)
          .where(eq(post.id, postId))
          .limit(1)
        
        if (!targetPost) {
          throw new HTTPException(404, { message: "Post not found" })
        }

        const [existingVote] = await ctx.db
          .select()
          .from(vote)
          .where(and(eq(vote.postId, postId), eq(vote.userId, userId)))
          .limit(1)

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
            userId,
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
      })
  })
}
