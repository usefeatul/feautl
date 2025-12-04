import { db, vote } from "@feedgot/db"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "@feedgot/auth"

export async function readHasVotedForPost(postId: string): Promise<boolean> {
  const session = await getServerSession()
  const userId = String((session as any)?.user?.id || "")
  console.log(`[readHasVotedForPost] Post ${postId}: session exists=${!!session}, userId=${userId || 'none'}`)
  if (!userId) {
    console.log(`[readHasVotedForPost] Post ${postId}: No userId, returning false`)
    return false
  }
  const [v] = await db
    .select({ id: vote.id })
    .from(vote)
    .where(and(eq(vote.postId, postId), eq(vote.userId, userId)))
    .limit(1)
  const hasVoted = Boolean(v?.id)
  console.log(`[readHasVotedForPost] Post ${postId}: Found vote=${hasVoted}`)
  return hasVoted
}
