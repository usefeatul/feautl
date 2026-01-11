## Overview
- Implement an opinionated state machine with binary choices per stage for submissions.
- Add a bottom-of-page Triage Bar on the request detail view that adapts to status, age, traction, and workspace context.
- Actions update roadmapStatus and surface contextual nudges (e.g., stale, low traction) to push items through the pipeline.

## State Machine
- **Statuses**: pending → review → planned → progress → completed → closed
- **Transitions (binary primary/secondary)**:
  - pending: Accept → planned (or review when high traction); Close → closed
  - review: Start Work → progress; Move to Planned → planned
  - planned: Move to Review → review; Keep Planned → planned
  - progress: Mark Complete → completed; Move to Planned → planned
  - completed: Draft Changelog → navigate to changelog compose; Reopen → pending
  - closed: Reopen → pending; Keep Closed → closed
- **Tertiary**: Merge, Skip, Delete are available across relevant statuses.

## Triage Signals & Heuristics
- **Derived signals** from post: ageDays, isStale, isLowTraction, isHighTraction.
- **Defaults**:
  - STALE_DAYS = 90
  - HIGH_TRACTION: upvotes ≥ 5 or comments ≥ 3
  - LOW_TRACTION: upvotes < 2 and comments = 0
- **Banners**:
  - Stale for N months → suggest Move to Review or Close depending on traction
  - Low traction → suggest Keep Open vs Close

## UI Additions
- **TriageBar component** (new): sticky-ish container visually anchored at the end of the detail page.
  - Uses @featul/ui Button variants and existing icons.
  - Shows primary and secondary CTA side by side, tertiary actions in a compact group.
  - Mobile: full-width stacked; Desktop: inline.
- **Placement**: add below comments, before the edit modal toggle in [RequestDetail.tsx](file:///Users/dalyjean/Desktop/featul/apps/app/src/components/requests/RequestDetail.tsx#L232-L250) so it’s at the bottom of the page.

## File Changes
- Create: apps/app/src/components/requests/TriageBar.tsx
  - Props: { post: RequestDetailData; workspaceSlug: string; readonly?: boolean }
  - Renders banner + actions computed by hook.
- Create: apps/app/src/components/requests/useTriage.ts
  - Exports useTriageSignals(post) and triageForStatus(status, signals) → decision model.
- Update: apps/app/src/components/requests/RequestDetail.tsx
  - Insert <TriageBar post={post} workspaceSlug={workspaceSlug} readonly={readonly} /> below <CommentList />.

## Types & Data
- **Literal union** type for statuses (no enums):
  - type SubmissionStatus = "pending" | "review" | "planned" | "progress" | "completed" | "closed"
- **Action type**:
  - interface TriageAction { id: string; label: string; intent?: "primary" | "secondary" | "danger" | "info"; onClick: () => Promise<void>; disabled?: boolean }
- **Signals type**:
  - interface TriageSignals { ageDays: number; isStale: boolean; isLowTraction: boolean; isHighTraction: boolean }

## API Integration
- Use existing endpoint: client.board.updatePostMeta.$post({ postId, roadmapStatus }) to update status, consistent with [StatusPicker](file:///Users/dalyjean/Desktop/featul/apps/app/src/components/requests/meta/StatusPicker.tsx#L23-L49) and [StatusIcon](file:///Users/dalyjean/Desktop/featul/apps/app/src/components/requests/StatusIcon.tsx#L10-L21).
- Dispatch workspace UI updates via react-query invalidations mirroring StatusPicker behavior.
- Merge continues via existing [MergePopover](file:///Users/dalyjean/Desktop/featul/apps/app/src/components/requests/MergePopover.tsx).

## Decision Mapping (examples)
- pending (high traction): Accept → review; Close
- pending (default): Accept → planned; Close
- planned (stale): Move to Review; Keep Planned; Banner: "Stale for 3 months"
- progress: Mark Complete; Move to Planned; Extras: Close
- review: Start Work; Move to Planned
- completed: Draft Changelog; Reopen; Subtext: "Let your users know"
- closed: Reopen; Keep Closed
- low traction: Keep Open; Close; Banner: "Low traction"

## Component Sketch
- TriageBar renders:
  - Optional banner based on signals
  - Primary and secondary buttons (Button variant="default"/"outline"), tertiary grouped nav-style buttons (variant="nav") including MergePopover and DeletePostButton
  - Actions call updatePostMeta and refresh via router / react-query

## Integration in RequestDetail
- Show triage only when canEdit ((post.role === "admin" || post.isOwner) && !readonly) and below comments.
- Mobile: align with existing mobile toolbars; Desktop: right-aligned or full-width bottom block.

## i18n & Accessibility
- All labels pass aria-labels; strings wrapped for future i18n.
- Tooltips optional for context (e.g., why stale).

## Testing & Verification
- Unit: triageForStatus(signal combinations) returns expected actions.
- Integration: click actions update roadmapStatus and UI counters per StatusPicker.
- Visual: verify banners and button states for sample posts.

## Example Pseudocode Snippets
- Hook:
```ts
export function useTriageSignals(post: RequestDetailData): TriageSignals {
  const created = new Date(post.publishedAt || post.createdAt);
  const ageDays = Math.floor((Date.now() - created.getTime()) / 86400000);
  const isStale = ageDays >= 90;
  const isHighTraction = (post.upvotes ?? 0) >= 5 || (post.commentCount ?? 0) >= 3;
  const isLowTraction = (post.upvotes ?? 0) < 2 && (post.commentCount ?? 0) === 0;
  return { ageDays, isStale, isLowTraction, isHighTraction };
}
```
- Decision:
```ts
export function triageForStatus(status: SubmissionStatus, s: TriageSignals) {
  switch (status) {
    case "pending":
      return s.isHighTraction
        ? { primary: { id:"accept-review", label:"Accept", next:"review" }, secondary:{ id:"close", label:"Close", next:"closed" } }
        : { primary: { id:"accept-planned", label:"Accept", next:"planned" }, secondary:{ id:"close", label:"Close", next:"closed" } };
    case "review":
      return { primary:{ id:"start", label:"Start Work", next:"progress" }, secondary:{ id:"move-planned", label:"Move to Planned", next:"planned" } };
    case "planned":
      return s.isStale
        ? { banner:`Stale for ${Math.floor(s.ageDays/30)} months`, primary:{ id:"move-review", label:"Move to Review", next:"review" }, secondary:{ id:"keep", label:"Keep Planned", next:"planned" } }
        : { primary:{ id:"start", label:"Start Work", next:"progress" }, secondary:{ id:"move-review", label:"Move to Review", next:"review" } };
    case "progress":
      return { primary:{ id:"complete", label:"Mark Complete", next:"completed" }, secondary:{ id:"move-planned", label:"Move to Planned", next:"planned" } };
    case "completed":
      return { primary:{ id:"changelog", label:"Draft Changelog" }, secondary:{ id:"reopen", label:"Reopen", next:"pending" } };
    case "closed":
      return { primary:{ id:"reopen", label:"Reopen", next:"pending" }, secondary:{ id:"keep", label:"Keep Closed", next:"closed" } };
  }
}
```
- TriageBar placement:
```tsx
// in RequestDetail.tsx near the bottom
{canEdit ? (
  <TriageBar post={post} workspaceSlug={workspaceSlug} readonly={readonly} />
) : null}
```

## Rollout
- Phase 1: UI + status transitions via updatePostMeta
- Phase 2: Optional metadata (e.g., reasons for close/skip), analytics, i18n strings
- Phase 3: Workspace-level triage mode list view

Confirm and I’ll implement TriageBar, hook logic, and integrate it at the bottom of RequestDetail.