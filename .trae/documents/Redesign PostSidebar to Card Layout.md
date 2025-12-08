I will update the `PostSidebar` component to match the requested design, transforming it into a cleaner card layout with a merged header and pill-style property selectors.

### 1. Refactor `PostSidebar.tsx`
- **Layout Structure**:
  - Replace the current segmented layout with a single card container (`rounded-xl`, `border`, `shadow-sm`, `p-4`).
  - **Header Section**: Combine the Author and Date into a single row.
    - Avatar on the left (keeping `RoleBadge`).
    - Name and Relative Time (e.g., "21 hours ago") stacked on the right.
    - Implement a `timeAgo` helper function to format the date relatively.
  - **Properties Section**:
    - "Board" and "Status" rows with labels on the left (`text-muted-foreground`) and values on the right.
    - Remove the explicit "Author", "Date", and "Flags" section headers to clean up the UI.

### 2. Enhance Picker Components
- **`BoardPicker.tsx`**:
  - Update to accept a `className` prop to allow custom styling from the parent.
  - Update the trigger button to support a "pill" style (rounded, colored background) to match the "Features" badge in the screenshot.
- **`StatusPicker.tsx`**:
  - Update to accept a `className` prop.
  - Implement dynamic styling based on the status value (e.g., "Pending" -> Yellow/Orange, "Completed" -> Green) to match the "pill" look in the design.

### 3. Verification
- Verify the layout matches the visual hierarchy of the provided design.
- Ensure all interactive elements (pickers) still function correctly.
- Check that the relative time displays correctly.