I will implement browser fingerprinting for more accurate anonymous upvote tracking.

### Backend Changes
**File:** `packages/api/src/validators/comment.ts`
- Update `upvoteCommentInputSchema` to include an optional `fingerprint` string.

**File:** `packages/api/src/router/comment.ts`
- Modify the `upvote` procedure to accept `fingerprint` from input.
- **Logic Update**:
    - **Check Existing Reaction**:
        - If `fingerprint` is provided, use it to find existing reactions for anonymous users (where `userId` is null).
        - Fallback to `ipAddress` if no fingerprint is found or provided.
    - **Create Reaction**:
        - Store the provided `fingerprint` in the `commentReaction` table.
        - Ensure uniqueness logic checks `(fingerprint, commentId)` OR `(ipAddress, commentId)` for anonymous users to prevent double voting.

### Frontend Changes
**File:** `apps/feed/src/components/comments/CommentVote.tsx`
- Implement a simple persistent fingerprint generator:
    - On mount, check `localStorage` for a `visitorId`.
    - If not present, generate a random UUID and store it in `localStorage`.
- Pass this `visitorId` as the `fingerprint` parameter when calling `client.comment.upvote.$post`.

### Verification
- **Scenario 1 (Same Browser)**: An anonymous user votes. The vote is recorded with their fingerprint. They refresh the page and try to vote again -> system detects the fingerprint and toggles the vote off.
- **Scenario 2 (Different Browser, Same IP)**: A user opens an Incognito window (generating a new fingerprint). They vote -> system allows it (if IP check is relaxed or secondary). *Note: To strictly prevent abuse, I will enforce that IF a fingerprint is provided, it must be unique for that comment. If no fingerprint, IP must be unique. However, to allow multiple users behind one NAT (e.g. office) to vote, relying on fingerprint is better.*
- **Decision**: I will prioritize Fingerprint for uniqueness if provided. If fingerprint matches, toggle. If fingerprint doesn't match but IP does, I will allow the vote (assuming different user on same IP), UNLESS the previous IP-based vote had NO fingerprint (legacy/dumb client).
    - Actually, a safer and simpler logic for now:
        - If `fingerprint` provided: Check `(commentId, fingerprint)`.
        - Else: Check `(commentId, ipAddress)`.
    - This allows multiple users on the same IP to vote if they have different fingerprints, which solves the "coffee shop problem".

I will proceed with this implementation.