I will modify `apps/feed/src/components/post/PostContent.tsx` to:
1.  **Replace `img` with `next/image`**: Use the `Image` component for both the thumbnail and the full-size preview.
2.  **Add Dialog for Image Preview**: Wrap the thumbnail in a `Dialog` (from `@feedgot/ui/components/dialog`) so that clicking it opens a larger version of the image.
3.  **Configure Image**: Since dimensions are unknown for uploaded images, I will use `width={0} height={0} sizes="100vw" style={{ width: 'auto', height: 'auto' }}` pattern for proper rendering.
4.  **Preserve Layout**: Ensure the remove button remains accessible and the layout spacing (added in the previous step) is maintained.

This addresses the user's request to "wrapper in that contentimage so when use the click it on the image its open in the dialog" and "make the img its update to the image from next".