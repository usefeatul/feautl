I will modify the backend to allow unauthenticated users to upvote comments by tracking their IP address.

### Backend Changes
**File:** `packages/api/src/router/comment.ts`

1.  **Update `upvote` procedure**:
    - Change from `privateProcedure` to `publicProcedure`.
    - Manually check for a session.
    - Extract the user's IP address from the request headers (`x-forwarded-for` or similar).
    - **Logic update**:
        - **If authenticated**: Continue to use `userId` to check/add/remove reactions.
        - **If unauthenticated**:
            - Use the IP address as the identifier.
            - Query `commentReaction` using `ipAddress` (and `userId` IS NULL).
            - Insert new reactions with the `ipAddress` and `userId: null`.
    - Ensure duplicate upvotes are prevented by checking for an existing reaction from the same IP (for anonymous users) or User ID (for logged-in users).

### Frontend Changes
- No code changes are required in the frontend components (`CommentVote.tsx` or `CommentList.tsx`) because the `upvote` mutation is already wired up.
- The UI will simply stop redirecting or erroring when a guest clicks the upvote button, as the API will now accept the request.
- (Verification) I will ensure the optimistic UI update or refetch works correctly for anonymous users.

### Database
- The `commentReaction` table already has an `ipAddress` column and `userId` is nullable, so no schema migration is needed.
- The existing unique index is on `(commentId, userId, type)`. This won't enforce uniqueness for anonymous users (since `userId` is null), so I will rely on the application logic check in the router to prevent double-voting from the same IP.

### Summary
I will update the `upvote` API endpoint to handle anonymous requests by using the client's IP address for tracking, ensuring that guests can upvote comments without signing in.