# Reorganize Routing System for Subdomain Board & Post Management

I will implement the requested subdomain-based routing structure under `apps/feed/src/app/[subdomain]/` to support `/board/[theboard]` and `/board/p/[posthere]` while preserving existing functionality.

## 1. Component Refactoring
I will update shared components to support dynamic linking and board context.

- **`apps/feed/src/components/subdomain/PostCard.tsx`**
  - Add `linkPrefix` prop (defaults to `/p`).
  - Update `href` to use `linkPrefix`.

- **`apps/feed/src/components/subdomain/MainContent.tsx`**
  - Add `linkPrefix` and `selectedBoard` props.
  - Pass `linkPrefix` to `PostCard`.
  - Pass `selectedBoard` to `BoardsList` and `BoardsDropdown`.

- **`apps/feed/src/components/subdomain/BoardsList.tsx` & `BoardsDropdown.tsx`**
  - Add `selectedBoard` prop.
  - Update highlighting logic to prioritize `selectedBoard`.
  - Update navigation logic (`go` function):
    - Navigate to `/` for "All Feedback".
    - Navigate to `/board/[slug]` for specific boards.

- **`apps/feed/src/components/subdomain/request-detail/RequestHeader.tsx`**
  - Add `backLink` prop (defaults to `/`).
  - Use `backLink` for the "Back" button.

- **`apps/feed/src/components/subdomain/SubdomainRequestDetail.tsx`**
  - Add `backLink` prop and pass it to `RequestHeader`.

## 2. New Route Implementation
I will create the new route handlers in the requested structure.

- **`apps/feed/src/app/[subdomain]/board/[slug]/page.tsx`** (Board Listing)
  - Fetches workspace using `subdomain` param.
  - Fetches posts filtered by board `slug`.
  - Renders `MainContent` with:
    - `slug={subdomain}` (Workspace slug for context)
    - `selectedBoard={slug}` (Current board)
    - `linkPrefix="/board/p"` (To link posts to the board-aware detail page)

- **`apps/feed/src/app/[subdomain]/board/p/[slug]/page.tsx`** (Post Detail)
  - Fetches workspace using `subdomain`.
  - Fetches post using `slug`.
  - Renders `SubdomainRequestDetail` with:
    - `backLink={`/board/${post.boardSlug}`}` (To maintain board context)

## 3. Verification
- Verify that `/board/[theboard]` loads posts for that board.
- Verify that clicking a post on a board page goes to `/board/p/[posthere]`.
- Verify that the "Back" button on a board post page returns to the specific board.
- Verify that "All Feedback" `/` still works and links to standard `/p/[posthere]`.
