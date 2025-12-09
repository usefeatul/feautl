import React from "react"
import Link from "next/link"
import { UpvoteButton } from "@/components/upvote/UpvoteButton"
import { CommentsIcon } from "@feedgot/ui/icons/comments"

interface SimilarPost {
  id: string
  title: string
  slug: string
  upvotes: number | null
  commentCount: number | null
}

interface SimilarPostsProps {
  posts: SimilarPost[]
  isLoading: boolean
}

export function SimilarPosts({ posts, isLoading }: SimilarPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="transition-all duration-200 bg-muted/50 dark:bg-black/50">
      <div className="px-4 py-2 flex items-center justify-between border-t border-border dark:border-border/50">  
        <div className="text-xs font-extralight text-accent uppercase tracking-wide">
          Similar Posts
        </div>
      </div>
      
      <div className="divide-y divide-border">
          {posts.map((post) => (
          <div key={post.id} className="relative group p-4 hover:bg-muted/30 dark:hover:bg-black/30 transition-colors">
            <Link 
              href={`/board/p/${post.slug}`}
              className="absolute inset-0 focus:outline-none"
            >
                <span className="sr-only">View post</span>
            </Link>
            
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-light text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-3 text-xs text-accent shrink-0">
                <div className="inline-flex items-center gap-2 relative z-10 pointer-events-none opacity-80">
                  <UpvoteButton
                    postId={post.id}
                    upvotes={post.upvotes || 0}
                    hasVoted={false} 
                    className="text-xs"
                    activeBg
                  />
                </div>
                <div className="inline-flex items-center gap-1">
                  <CommentsIcon aria-hidden className="size-3.5" />
                  <span className="tabular-nums">{post.commentCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
          ))}
      </div>
    </div>
  )
}
