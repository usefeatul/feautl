## Overview

* Build a full Changelog settings section that follows the Team and Branding patterns.

* Add a board visibility toggle for the system `changelog` board (`board.isVisible`).

* Create a dedicated Changelog model with its own tags and entries.

* Allow adding/removing Changelog moderators (“team for changelog”) with plan-based limits via `apps/feed/src/lib/plan.ts`.

## Key References

* Board schema with system type: `packages/db/schema/feedback.ts:16–73` (`board.systemType`, `isVisible`).

* Team settings UX to mirror: `apps/feed/src/components/settings/team/Team.tsx:92–141` and `InviteMemberModal.tsx`.

* Branding layout patterns: `apps/feed/src/components/settings/branding/Branding.tsx:169–253`.

* Plan helpers: `apps/feed/src/lib/plan.ts:1–50`, server: `packages/api/src/shared/plan.ts`.

* Changelog settings placeholder: `apps/feed/src/components/settings/changelog/Changelog.tsx:5–6`.

## Database Changes

* Add new file `packages/db/schema/changelog.ts`:

  1. `changelogEntry` with fields: `id`, `workspaceId`, `boardId`, `title`, `summary`, `content`, `isPublished`, `publishedAt`, `createdBy`, `createdAt`, `updatedAt`.
  2. `changelogTag` with fields: `id`, `workspaceId`, `name`, `slug`, `color`, `description`, `isActive`, `createdAt`, `updatedAt`.
  3. `changelogEntryTag` join: `id`, `entryId`, `tagId`, `createdAt`; unique index on (`entryId`, `tagId`), indexes for `entryId` and `tagId`.

* Keep using the existing `board` table for the system `changelog` board; use `board.isVisible` for hide/show.

## API Changes

* Create `packages/api/src/router/changelog.ts` and wire into the API:

  * `settings`: GET `{ slug }` → returns changelog board visibility, moderators, tag list/count.

  * `toggleVisibility`: POST `{ slug, isVisible }` → updates `board.isVisible` for system `changelog`.

  * `moderators.list`: GET `{ slug }` → list `boardModerator` for `changelog` board.

  * `moderators.add`: POST `{ slug, userId }` → enforce plan limit, add to `board_moderator`.

  * `moderators.remove`: POST `{ slug, userId }` → remove moderator.

  * `tags.list`: GET `{ slug }` → list `changelogTag` with counts from `changelogEntryTag`.

  * `tags.create`: POST `{ slug, name, color }` → create `changelogTag`.

  * `tags.delete`: POST `{ slug, tagId }` → delete/deactivate tag.

  * `entries.list`: GET `{ slug, tagSlugs? }` → list published `changelogEntry` with joined tags, filter by tags.

  * `entries.create/update`: POST `{ slug, ... }` → create or update entries; attach tags via `changelogEntryTag`.

* Authorization: owner or member with `canManageBoards` for settings; public listing reads only `isPublic`+`isVisible` board.

## Plan Limits

* Extend `PlanLimits` in both `apps/feed/src/lib/plan.ts` and `packages/api/src/shared/plan.ts`:

  * Add `maxChangelogModerators` with values: `free: 5`, `starter: 10`, `professional: 20`.

  * Update helpers and normalization unchanged.

1

* Enforce in `moderators.add` endpoint by counting current `board_moderator` rows for the `changelog` board.

## UI: Settings Changelog

* Replace `ComingSoon` with a full section in `apps/feed/src/components/settings/changelog/Changelog.tsx`:

  1. Visibility Toggle: switch bound to `toggleVisibility` API; shows current state from `settings`.
  2. Tags Management: list with count chips; add/delete actions using `tags.*` endpoints; consistent `PopoverList` pattern like `TagsAction.tsx`.
  3. Moderators Management: table like Team; rows show user and a remove button; “Add Moderator” modal to pick a workspace member; enforce plan via API and show `PlanNotice`.
  4. Footer Save/feedback messages via `LoadingButton`/`toast`, matching Branding ergonomics.

* Update `PlanNotice` to accept `feature="changelog_team"` and render limits using `maxChangelogModerators`.

## UI: Changelog Pages

* Workspace page `apps/feed/src/app/workspaces/[slug]/changelog/page.tsx`:

  * Fetch `entries.list` and render cards with `title`, `summary`, `date`, and tag chips.

  * Optional tag filter using `tagSlugs` in URL and server-side filtering (like requests pages).

* Public subdomain page `apps/feed/src/app/[subdomain]/changelog/page.tsx`:

  * Render published entries with tags; respect board `isVisible`.

## Implementation Notes

* Reuse `boardModerator` table; no new "team" table required.

* Follow Team and Branding patterns: `SectionCard`, `PlanNotice`, `Table`, `Switch`, `LoadingButton`, React Query with `staleTime`/`gcTime`=5m.

* Keep consistent styles and naming; avoid comments in code.

## Validation

* Unit tests for API limits and visibility updates.

* Manual verification: create tags, entries, and moderators across `free`, `starter`, `professional` plans; confirm limits and UI notices.

* Confirm changelog is hidden when `isVisible=false` in both workspace and public pages.

