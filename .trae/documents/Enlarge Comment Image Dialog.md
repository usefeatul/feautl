I have analyzed the `CommentImage.tsx` component and confirmed that:
1.  **Click-to-Open:** Yes, the image currently has an `onClick` handler that opens a `Dialog` component containing the full-size image.
2.  **Current Size:** The dialog is currently restricted to `max-w-4xl` (approx. 896px wide), which limits how large the image can appear even on large screens.

To make the dialog image "a lot, lot bigger" as requested, I plan to:

1.  **Modify `apps/feed/src/components/comments/CommentImage.tsx`**:
    *   Update the `DialogContent` class: Change `max-w-4xl` to `max-w-[95vw]` (95% of the viewport width) or `max-w-screen-2xl` to remove the narrow width constraint.
    *   Update the image constraints if necessary to ensure it maximizes the available space while remaining fully visible (e.g., maintaining `max-h-[85vh]` or increasing it slightly to `90vh`).

This will allow the image to expand to fill almost the entire screen when clicked.