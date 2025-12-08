I will modify the backend logic in `packages/api/src/router/board.ts` to ensure consistent avatars for anonymous users based on their browser fingerprint, mirroring the existing behavior for comments.

1. **Update** **`postsByBoard`** **procedure**:

   * Modify the database query to include the `metadata` field (which contains the fingerprint) when fetching posts.

   * Update the avatar generation logic to use a hash of the `fingerprint` as the seed for the avatar if the user is anonymous and a fingerprint is available. This ensures that the same anonymous user gets the same avatar across different posts.

2. **Update** **`postDetail`** **procedure**:

   * Similarly update the avatar generation logic for the single post detail view to use the `fingerprint` from `metadata` for anonymous users.

This will ensure that when a guest user posts multiple times, their avatar remains consistent, as requested.

**Files to be modified:**

* `packages/api/src/router/board.ts`

