I will update the `MainContent` component in `apps/feed/src/app/[subdomain]/[slug]/page.tsx` to use the `/board/p` link prefix for posts. This ensures that clicking on a post from the main feed navigates to the board-context post view (`/board/p/[slug]`) instead of the default post view (`/p/[slug]`).

Steps:

1. Edit `apps/feed/src/app/[subdomain]/[slug]/page.tsx`:

   * Locate the `MainContent` component usage.

   * Add the `linkPrefix="/board/p"` prop.

