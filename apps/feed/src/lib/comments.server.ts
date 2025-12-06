import { cookies } from "next/headers"

export async function readInitialCollapsedCommentIds(postId: string): Promise<string[]> {
  const cookieStore = await cookies()
  const key = `cmc${postId}`
  const cookie = cookieStore.get(key)
  
  if (!cookie?.value) return []
  
  // The value might be URI encoded
  return decodeURIComponent(cookie.value).split(",").filter(Boolean)
}
