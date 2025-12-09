I will update `PostCard.tsx` to display the post creation time.

1.  **Import `relativeTime`**: Import the utility function from `@/lib/time` in `apps/feed/src/components/subdomain/PostCard.tsx`.
2.  **Display Time**: In `PostCardBase`, render the relative time using `item.publishedAt` (falling back to `item.createdAt`) inside the author info section.
    - I will place it after the author name.
    - I will apply similar styling (`text-xs text-accent mt-2`) to ensure it aligns with the author name.

This will result in a clean display of the post time (e.g., "2h ago", "just now") next to the author's name.