## Diagnosis
- Route `apps/feed/src/app/workspaces/[slug]/settings/[section]/page.tsx:8` forces dynamic rendering, disabling static caching and prefetch benefits.
- Page fetches session and a large initial payload before paint: `getServerSession` (page.tsx:24) + `getSettingsInitialData` (page.tsx:35). The loader runs 6–7 DB queries sequentially (workspace.ts:500–606).
- Tabs trigger a full server navigation (`SettingsTabsHeader.tsx:9–13`), with no `loading.tsx` skeleton, so you wait for the server before any UI changes.

## Plan
### 1) Trim server work on tab change
- Remove page-level prefetch: stop calling `getServerSession` and `getSettingsInitialData` in the settings page.
- Keep rendering `SettingsServer` with just `slug` and `selectedSection`; each section already hydrates itself via client APIs (Team, Branding, Changelog, Domain all use react-query/client loaders).
- Expected: immediate UI response on tab selection and client-side fetching per section.

### 2) If we keep server prefetch, make it fast
- Parallelize DB queries in `getSettingsInitialData` using `Promise.all` after fetching `ws` once.
- Narrow scope: optionally accept `section` and only fetch that section’s data (e.g., Team → members/invites; Domain → domain info; Branding → branding + workspace name; Changelog → visibility + tags).
- Expected: reduce TTFB from ~1s to ~250–400ms.

### 3) Add optimistic UX
- Add `apps/feed/src/app/workspaces/[slug]/settings/[section]/loading.tsx` with a lightweight skeleton for tabs and content frame to show instantly while data streams.
- Wrap content in client-side fallbacks so tabs feel snappy even during data fetch.

### 4) Prefetch for perceived speed (optional)
- Change tab navigation to use `<Link prefetch>` for each section or call `router.prefetch` for likely next sections on hover/mount.
- Note: With `force-dynamic` prefetch is less effective; removing heavy server work (Step 1) yields bigger wins.

### 5) Caching tune (when data safety allows)
- Replace `export const revalidate = 30` with `export const revalidate = 15` for settings, if content isn’t highly user-specific and correctness permits short-lived caching.
- Wrap read-mostly lib functions in `unstable_cache` (branding, domain info, workspace lookups) keyed by `slug` with small TTL (30–60s). Invalidate on mutations.

## Implementation Outline
- Update `page.tsx` to stop calling `getServerSession` and `getSettingsInitialData`; pass only `slug` and `selectedSection` to `SettingsServer`.
- Add `loading.tsx` under `[section]` with skeleton.
- Update `SettingsTabsHeader` to use `<Link prefetch>` or add `router.prefetch` for nearby sections.
- If keeping prefetch: refactor `getSettingsInitialData` to run queries in `Promise.all` and (optionally) accept `section`.

## Verification
- Capture timings with `performance.now()` at tab click → first paint → data loaded; target <100ms to show header/skeleton, <400ms for content.
- Check server logs/DB timings after parallelization; confirm fewer sequential waits.
- Navigate across sections repeatedly to ensure no regressions and correct data.

## Risk & Rollback
- If any section needs server-only data, keep that one server-rendered and cache it briefly.
- Rollback by re-enabling current server loader; changes are localized to settings page and loader.