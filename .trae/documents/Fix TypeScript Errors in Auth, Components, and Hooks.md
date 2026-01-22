I will fix the TypeScript errors by addressing them in the following groups:

### 1. Fix `findFirstAccessibleWorkspaceSlug` Argument Type
The function expects a `string`, but `session.user.id` is inferred as `string | undefined`. I will assert that `id` exists since we are inside a `session.user` check.
- **Files**:
  - `apps/app/src/app/auth/sign-in/page.tsx`
  - `apps/app/src/app/auth/sign-up/page.tsx`
  - `apps/app/src/app/not-found.tsx`
  - `apps/app/src/app/start/page.tsx`
- **Action**: Change `session.user.id` to `session.user.id!` or add a check.

### 2. Fix `usePostSubmission` Types
This will resolve errors in `CreatePostModal.tsx` (property `slug` does not exist) and `subdomain/CreatePostModal.tsx` (argument `user` type mismatch).
- **File**: `apps/app/src/hooks/usePostSubmission.ts`
- **Action**:
  - Update `onCreated` prop type in `UsePostSubmissionProps` from `(post: { post: { slug: string } }) => void` to `(post: { slug: string }) => void`.
  - Relax `user` parameter type in `submitPost` from `{ id: string } | null` to `any | null` (or a more compatible type) since `id` is not actually used in the function, only the existence of `user`.

### 3. Remove Invalid `activeBg` Prop
The `UpvoteButton` component does not accept an `activeBg` prop, but it is being passed in several places.
- **Files**:
  - `apps/app/src/components/post/SimilarPosts.tsx`
  - `apps/app/src/components/subdomain/request-detail/RequestContent.tsx`
  - `apps/app/src/components/team/MemberTopPosts.tsx`
- **Action**: Remove the `activeBg` prop usage.

### 4. Fix `useRequestNavigation` Element Type
`document.activeElement` is generic `Element`, which doesn't have `isContentEditable`.
- **File**: `apps/app/src/hooks/useRequestNavigation.ts`
- **Action**: Cast `document.activeElement` to `HTMLElement` before accessing `isContentEditable`.
