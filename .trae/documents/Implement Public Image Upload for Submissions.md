I will implement a public image upload route to allow both signed-in and non-signed-in users to upload images for submissions.

### 1. Backend: Add Public Upload Endpoint
I will modify `packages/api/src/router/storage.ts` to:
- Import `publicProcedure` from `../jstack`.
- Create a new procedure `getPublicPostImageUploadUrl`.
- Use `getPostImageUploadUrlInputSchema` for input validation.
- Implement logic to:
    - Verify the workspace exists using `workspaceSlug`.
    - Generate a signed upload URL (S3/R2) without requiring user authentication.
    - Return `uploadUrl`, `key`, and `publicUrl`.

### 2. Frontend Service: Switch to Public Endpoint
I will modify `apps/feed/src/lib/post-service.ts` to:
- Update the `getPostImageUploadUrl` function to call the new `client.storage.getPublicPostImageUploadUrl.$post` endpoint instead of the private one.
- This ensures that `usePostImageUpload` (and by extension `CreatePostModal`) uses the public route automatically.

### 3. Verification
- I will verify that the new endpoint is reachable and returns a valid upload URL.
- I will ensure the existing `usePostImageUpload` hook works with the changes.
