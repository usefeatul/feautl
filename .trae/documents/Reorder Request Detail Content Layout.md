I will modify `apps/feed/src/components/requests/RequestDetail.tsx` to:
1.  **Move the Image**: Reposition the `ContentImage` component to appear *after* the content text (`post.content`), instead of before it.
2.  **Adjust Layout**: Ensure the image is the last element in the content flow, just before the footer actions (upvote/comments).

This change addresses the user's request: "the image show be last on dispaly line".