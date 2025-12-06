I will fix the unauthorized mention toast not showing by correcting how the API client handles errors.

### The Issue
The previous implementation in `CommentForm.tsx` assumed `client.team.membersByWorkspaceSlug.$get` would return a response object with a `status` property even when it fails. However, the JStack client likely throws an error for non-2xx responses (like 403 Forbidden) instead of returning the response object.

### The Fix
**File:** `apps/feed/src/components/comments/CommentForm.tsx`
- Modify the `try/catch` block around the API call.
- Move the error handling logic into the `catch` block.
- Check the error object for status codes (or error messages) to determine if it's a 403 or 401.
- Display the appropriate toast message based on the caught error.

I will update the `CommentForm.tsx` to correctly catch and handle these errors.