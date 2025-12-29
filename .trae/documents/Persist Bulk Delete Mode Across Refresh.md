## Goal
- Keep the "bulk delete" selection mode active across page refreshes until the user toggles it off again with `Cmd+D`/`Ctrl+D`.

## Current Behavior
- Toggling bulk mode is implemented via a global keydown handler in `apps/app/src/components/requests/RequestList.tsx:215-218`.
- Pressing plain `D` triggers the delete confirmation when bulk mode is active in `apps/app/src/components/requests/RequestList.tsx:221-227`.
- Selection state is held in an in-memory store (`apps/app/src/lib/selection-store.ts:52-56`) and resets on refresh.

## Approach
- Persist only the bulk mode flag (`isSelecting`) per list key (workspace slug) using `localStorage`.
- Restore the persisted flag on mount for the requests list and mirror changes back to storage whenever `isSelecting` updates.

## Implementation Steps
1. In `RequestList.tsx`, compute a storage key like `requests:isSelecting:${workspaceSlug}`.
2. On mount, read the stored value and call `setSelecting(listKey, persistedValue)`; update `selectingRef.current` to keep shortcut logic in sync.
3. Add an effect to write `isSelecting` to `localStorage` on change.
4. Ensure all reads/writes guard against SSR and missing `window`.
5. Leave existing keyboard logic intact (still prevents default for `Cmd+D` and triggers confirmation on `D`).

## Edge Cases
- Initial load: if nothing is stored, default to false.
- After bulk delete completes, existing code sets selecting to false (`selection-store.ts:52-56`); the persistence effect will reflect that.
- Works per workspace (state keyed by `workspaceSlug`).

## Verification
- Toggle bulk mode with `Cmd+D`; refresh; toolbar remains visible.
- Toggle off with `Cmd+D`; refresh; toolbar is hidden.
- Confirm delete with `D`; verify the mode resets and persistence updates accordingly.

If you approve, I’ll implement the `localStorage` persistence in `RequestList.tsx` and verify the behavior end-to-end.