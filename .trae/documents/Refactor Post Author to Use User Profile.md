I will implement the changes to use the user profile for post authors instead of storing author details directly on the post record.

### 1. Update Database Schema
- Modify `packages/db/schema/post.ts` to remove `authorName`, `authorEmail`, and `authorImage` columns from the `post` table.
- This ensures the source of truth for author information is always the `user` table.

### 2. Update Data Fetching Logic (Workspace)
- Update `apps/feed/src/lib/workspace.ts`:
  - In `getWorkspacePosts`, add a join to the `user` table on `post.authorId`.
  - Map `authorName` to `user.name` and `authorImage` to `user.image`.
  - Ensure `isAnonymous` logic still works (the UI handles it, but the query should return the real name/image if not anonymous).

### 3. Update API Router (Board)
- Update `packages/api/src/router/board.ts`:
  - In `postsByBoard` (for `postsList` logic) and `postDetail`, add a join to the `user` table.
  - Select `user.name` and `user.image` instead of `post.authorName` and `post.authorImage`.

### 4. Verification
- The `PostCard` component already uses `item.authorName` and `item.authorImage`. By updating the queries to populate these fields from the `user` table, the UI will correctly display the user's profile information without needing component changes.
- I will verify that the code compiles and that the queries are syntactically correct.