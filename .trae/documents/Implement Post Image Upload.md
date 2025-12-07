I will implement the image upload functionality for post submissions.

### 1. API & Validation Updates
- **Update Post Validator**: Modify `packages/api/src/validators/post.ts` to include an optional `image` field in `createPostSchema`.
- **Update Storage Validator**: Add `getPostImageUploadUrlInputSchema` to `packages/api/src/validators/storage.ts` accepting `workspaceSlug`, `boardSlug`, `fileName`, and `contentType`.

### 2. Backend Implementation
- **Storage Router**: Add `getPostImageUploadUrl` to `packages/api/src/router/storage.ts`.
    - This will generate a signed URL for uploading images to a `posts` folder in the workspace's storage bucket.
    - It will validate access based on workspace membership or board settings (allowing anonymous uploads if the board permits).
- **Post Router**: Update the `create` procedure in `packages/api/src/router/post.ts` to accept the `image` URL and save it to the database.

### 3. Frontend Services & Hooks
- **Post Service**: Create `apps/feed/src/lib/post-service.ts` to handle the API call to `getPostImageUploadUrl`.
- **Upload Hook**: Create `apps/feed/src/hooks/usePostImageUpload.ts` to manage the file selection, upload process, and state (loading, error, success).
- **Submission Hook**: Update `apps/feed/src/hooks/usePostSubmission.ts` to include the `image` state and pass it to the post creation API call.

### 4. UI Implementation
- **PostContent Component**: Update `apps/feed/src/components/post/PostContent.tsx` to include:
    - A file input (hidden or styled).
    - An image preview area.
    - A button/icon to trigger the file selection.
    - A button to remove the selected image.
- **CreatePostModal Component**: Update `apps/feed/src/components/post/CreatePostModal.tsx` to integrate the `usePostImageUpload` hook and pass the necessary props to `PostContent`.
