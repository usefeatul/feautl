I have revised the plan to use **cookies** for session persistence as requested, and to fix the "reset" bug.

### 1. Implement Cookie-Based Session Persistence
*   **File**: `apps/feed/src/utils/fingerprint.ts`
*   **Action**: 
    *   Add helper functions to read and write cookies (`getCookie`, `setCookie`).
    *   Update `getBrowserFingerprint` to:
        1.  Check if a `visitor_id` cookie already exists.
        2.  If yes, return it immediately (ensuring stable identity across sessions/IPs).
        3.  If no, generate the fingerprint, store it in a `visitor_id` cookie (valid for 1 year), and return it.
    *   This satisfies the "Create a new session" requirement using standard web cookies.

### 2. Fix the "Reset to Original Value" Bug
*   **File**: `apps/feed/src/components/comments/CommentVote.tsx`
*   **Action**: 
    *   Update the `useQuery` hook for vote status to **pass the `fingerprint` (visitorId)** to the backend `comment.list` query.
    *   Add `visitorId` to the `queryKey` so the query updates when the ID is ready.
    *   Set `enabled: !!visitorId` to prevent premature fetching.
    *   **Result**: The backend will now correctly identify the user's previous votes using the persistent cookie ID, preventing the "reset" issue caused by IP address changes.

### 3. Verification
*   I will verify that `CommentVote` correctly waits for the cookie-based ID and passes it to the server.
*   The system will now support anonymous users with persistent sessions (via cookies) and accurate vote tracking.
