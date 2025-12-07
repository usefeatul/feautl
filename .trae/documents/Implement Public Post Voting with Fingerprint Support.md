I will implement public voting for posts by refactoring the backend to support fingerprint-based authentication and updating the frontend to send the fingerprint. I will also create shared schemas for both the database and validation to avoid code duplication.

### 1. Create Shared Schema & Validators
- **Database**: Create `packages/db/schema/shared.ts` to export a reusable `fingerprint` column definition using Drizzle ORM.
- **Validation**: Create `packages/api/src/validators/shared.ts` to export a reusable `fingerprintSchema` using Zod.
- **Refactor**: Update `packages/db/schema/vote.ts`, `packages/db/schema/comment.ts`, and `packages/api/src/validators/comment.ts` to use these shared definitions.

### 2. Update Post API Router
- Modify `packages/api/src/router/post.ts`:
  - Change the `vote` procedure from `privateProcedure` to `publicProcedure` to allow anonymous access.
  - Update the input validator to accept an optional `fingerprint` (using the new shared validator).
  - Implement logic to handle votes from anonymous users by checking the `fingerprint` when no user session exists.
  - Ensure the `vote` table is updated correctly with the fingerprint data.

### 3. Update Frontend Component
- Modify `apps/feed/src/components/global/UpvoteButton.tsx`:
  - Integrate `getBrowserFingerprint` from `@/utils/fingerprint`.
  - Fetch the browser fingerprint on component mount.
  - Pass the `fingerprint` to the `client.post.vote.$post` API call.
  - Ensure optimistic updates and error handling work for anonymous users.

### 4. Verification
- Verify that signed-in users can still vote.
- Verify that anonymous users can vote and that their votes are persisted based on their fingerprint.
- Ensure that the same anonymous user cannot vote multiple times on the same post (enforced by the database unique index).
