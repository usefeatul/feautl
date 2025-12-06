I will implement the hard delete functionality by modifying the backend API handler for comments.

### 1. Backend Implementation (`packages/api/src/router/comment.ts`)
- **Replace Soft Delete**: Locate the `delete` procedure in the comment router. Replace the existing `update` operation (which sets `status: 'deleted'`) with a `delete` operation: `ctx.db.delete(comment).where(eq(comment.id, commentId))`.
- **Handle Cascade**: The database schema already defines `onDelete: "cascade"` for the `parentId` relation and other related tables (reactions, mentions, reports). This ensures that deleting a comment will automatically remove its replies and associated data from the database.
- **Update Post Comment Count**: Since a hard delete may remove multiple comments (the target comment plus all its descendants), simply decrementing the count by 1 is insufficient. I will update the logic to recalculate the total number of published comments for the post after the deletion to ensure accuracy:
  ```typescript
  // Recalculate post comment count
  const [{ count }] = await ctx.db
    .select({ count: sql<number>`count(*)` })
    .from(comment)
    .where(and(eq(comment.postId, existingComment.postId), eq(comment.status, 'published')));
    
  await ctx.db.update(post)
    .set({ commentCount: count })
    .where(eq(post.id, existingComment.postId));
  ```
- **Update Parent Reply Count**: If the deleted comment is a reply (has a `parentId`), I will decrement the `replyCount` of its direct parent by 1. This logic remains the same as removing a direct child always reduces the parent's immediate reply count by exactly one.

### 2. Frontend Review
- The existing frontend component `CommentDeleteAction.tsx` and `CommentList.tsx` are already designed to refetch the comment list upon successful deletion. No frontend changes are required as the UI will automatically reflect the removal of the comments.

### 3. Verification
- I will verify the implementation by:
  - Creating a comment structure (Parent -> Child).
  - Deleting the Parent.
  - Confirming both Parent and Child are removed from the database.
  - Confirming `post.commentCount` is updated correctly.
