## Overview
Implement smoother, slightly slower collapse/expand animations and drag-and-drop motion for the roadmap. Keep current dnd-kit + framer-motion setup, tune easing/durations/springs, and make highlight transitions feel gentle.

## Key Changes
1. Collapse/Expand feel
- Use longer tween durations (≈300–350ms) with ease-out cubic-bezier for height/opacity.
- Maintain layout animations for headers and containers, but slow them slightly.

2. Drag motion feel
- Soften spring animations for draggable items and the drag overlay (lower stiffness, higher damping) for a smooth glide.
- Keep overlay scale/opacity animation subtle; remove any snap.

3. Visual cues
- Smooth droppable highlight (border/ring) with a longer CSS transition duration.

## Files to Update
- `apps/feed/src/components/roadmap/RoadmapColumn.tsx`
  - Collapse container layout transition at `RoadmapColumn.tsx:35`.
  - Collapse list enter/exit transition at `RoadmapColumn.tsx:73`.
  - Optional: add `duration-300 ease-out` to the root container’s `className` for border/ring highlight.
- `apps/feed/src/components/roadmap/RoadmapBoard.tsx`
  - Drag overlay spring at `RoadmapBoard.tsx:155`.
- `apps/feed/src/components/roadmap/RoadmapDraggable.tsx`
  - Item spring at `RoadmapDraggable.tsx:26`.

## Implementation Details
- Collapse container (layout):
  - Change `transition={{ type: "tween", ease: "easeOut", duration: disableMotion ? 0 : 0.12 }}` → `duration: 0.28`.
- Collapse list (height + opacity):
  - Change `transition={{ type: "tween", ease: "easeOut", duration: disableMotion ? 0 : 0.1 }}` → `transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: disableMotion ? 0 : 0.32 }}`.
- Drag overlay spring:
  - Change `transition={{ type: "spring", stiffness: 260, damping: 26 }}` → `transition={{ type: "spring", stiffness: 180, damping: 32 }}`.
- Draggable item spring:
  - Change `transition={{ type: "spring", stiffness: 260, damping: 32 }}` → `transition={{ type: "spring", stiffness: 180, damping: 36 }}`.
- Droppable highlight CSS:
  - Root container class currently includes `transition-all`; augment with `duration-300 ease-out` for border/ring change.

## Optional Refinements
- Centralize motion constants in `apps/feed/src/components/roadmap/motion.ts` (e.g., `MOTION.tweenSlow`, `MOTION.springSoft`) and reuse across files for consistency.
- Increase `PointerSensor` activation `distance` from `4` → `6` to reduce accidental drags; only if desired.

## Verification
- Open a workspace roadmap and toggle columns; observe a smooth 300–350ms open/close with gentle ease, no snap.
- Drag an item between columns; overlay and item motion should feel soft and controlled, not bouncy.
- Watch droppable highlight ring/border fade in/out smoothly.
- Confirm accessibility remains: header is a button with `aria-expanded`, keyboard `Enter/Space` toggles still work.

## Rollback
All changes are parameter tweaks; easy to revert by restoring prior durations/spring values.