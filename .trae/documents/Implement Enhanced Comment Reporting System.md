I will implement a full comment reporting system with a dialog for selecting reasons and adding details.

### Implementation Plan

1.  **Create `CommentReportDialog` Component**
    -   Create a new file `apps/feed/src/components/comments/actions/CommentReportDialog.tsx`.
    -   Use the existing UI components: `Dialog`, `Select`, `Textarea`, `Button`, `Label`.
    -   Implement a form that allows users to:
        -   Select a reason from the supported types: Spam, Harassment, Inappropriate, Off-topic, Other.
        -   Optionally provide a description/details.
    -   Handle form submission using `client.comment.report.$post`.
    -   Manage loading states and error handling (toast notifications).

2.  **Refactor `CommentReportAction`**
    -   Modify `apps/feed/src/components/comments/actions/CommentReportAction.tsx` to remove the immediate API call logic.
    -   Convert it into a presentational component that accepts an `onClick` handler to trigger the dialog.

3.  **Update `CommentActions`**
    -   Modify `apps/feed/src/components/comments/actions/CommentActions.tsx` to manage the dialog state (`showReportDialog`).
    -   Render `CommentReportDialog` outside the `Popover` to ensure it persists when the menu closes.
    -   Wire up the `CommentReportAction` button to close the menu and open the dialog.

### Verification
-   Verify that clicking "Report" closes the menu and opens the dialog.
-   Verify that the reason selection works and maps to the correct API enum.
-   Verify that submitting sends the correct data to the backend.
-   Verify that error and success states are handled (toasts).