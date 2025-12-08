I will create a reusable `RequestImage` component that implements the image preview dialog using `next/image`, and then use this component in both `RequestContent.tsx` and `RequestDetail.tsx`.

1. **Create** **`RequestImage`** **Component**:

   * Create `apps/feed/src/components/requests/RequestImage.tsx`.

   * Implement it as a Client Component (`"use client"`).

   * Use `next/image` for the thumbnail with `fill` layout.

   * Use the `Dialog` component (similar to `CommentImage`) to show the full-size image on click.

   * Accept `className` to allow controlling dimensions (width/height) from the parent.

2. **Update** **`RequestContent.tsx`**:

   * File: `apps/feed/src/components/subdomain/request-detail/RequestContent.tsx`

   * Import `RequestImage`.

   * Replace the existing `<img>` tag with `<RequestImage>`.

   * Pass the existing classes (`w-48 h-36 rounded-md border mb-4`) to the new component.

3. **Update** **`RequestDetail.tsx`**:

   * File: `apps/feed/src/components/requests/RequestDetail.tsx`

   * Import `RequestImage`.

   * Replace the existing `<img>` tag with `<RequestImage>`.

   * Pass the existing classes (`w-48 h-36 rounded-md border`) to the new component.

