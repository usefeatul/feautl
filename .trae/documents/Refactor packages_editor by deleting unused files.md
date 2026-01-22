I have identified the unused files in `packages/editor` by checking usage in both `packages/editor` (internal usage) and `apps/app` (consumer usage).

The following files are confirmed to be unused and will be deleted:

1.  `packages/editor/src/components/changelog-renderer.tsx`
2.  `packages/editor/src/components/editor-character-count.tsx`
3.  `packages/editor/src/components/editor-content.tsx` (Wrapper component, unused as `apps/app` uses `@tiptap/react` directly)
4.  `packages/editor/src/components/icons/danger-delete.tsx`
5.  `packages/editor/src/components/icons/timezone.tsx`
6.  `packages/editor/src/components/menus/floating-menu.tsx`

I will also update the following index files to remove the exports of these deleted components:

1.  `packages/editor/src/components/index.ts`
2.  `packages/editor/src/components/icons/index.ts`
3.  `packages/editor/src/components/menus/index.ts`
4.  `packages/editor/src/index.ts`

This will clean up the codebase as requested.
