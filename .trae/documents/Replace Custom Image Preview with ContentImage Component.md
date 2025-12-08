I will modify `apps/feed/src/components/post/PostContent.tsx` to:

1. **Use** **`ContentImage`**: Import and use the `ContentImage` component from `@/components/global/ContentImage` to handle the image display and preview dialog.
2. **Remove manual Dialog**: Remove the locally implemented `Dialog`, `DialogTrigger`, `DialogContent`, etc., and the `next/image` import, as `ContentImage` encapsulates this functionality.
3. **Maintain Styling**: Apply the `mb-4`, `ring-1`, and size constraints (using a fixed width like `w-40` since `ContentImage` enforces an aspect ratio) via the `className` prop to `ContentImage`.
4. **Preserve Remove Button**: Keep the remove button positioned absolutely relative to the image container.

