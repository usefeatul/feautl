I will modify the backend to allow unauthenticated users to create comments.

### Backend Changes
**File:** `packages/api/src/router/comment.ts`

1.  **Update `create` procedure**:
    - Change from `privateProcedure` to `publicProcedure` to allow unauthenticated access.
    - Implement manual session retrieval within the procedure to check if a user is logged in.
    - **Logic for authenticated users**: Continue to link the comment to their user account and handle mentions.
    - **Logic for unauthenticated users**: 
        - Set `authorId` to `null`.
        - Set `authorName` to `"Anonymous"`.
        - Set `isAnonymous` to `true`.
        - Skip the mention processing (since mentions require a valid sender).

### Frontend Verification
- The `CommentForm.tsx` currently displays a "Please sign in" error on 401 responses. With the endpoint made public, this error will no longer be triggered, allowing the submission to proceed.
- The `CommentList.tsx` is already equipped to display anonymous comments (handling missing author info by showing "Anonymous" and a generated avatar).

### Mentions
- Mention functionality will be disabled for anonymous users because the database schema requires a valid `mentionedBy` user ID for notifications.

No other changes are required for the router or frontend components.