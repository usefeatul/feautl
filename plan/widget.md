# featul Widget Specification (`@featul/widget`)

This document defines the first version of the **Featul Widget** package used by customers to embed a unified feedback experience (feedback submit, roadmap, changelog) into their applications.

The goal is:

- One npm package: `@featul/widget`
- One integration point (provider + widget component)
- One unified UI with **three tabs** inside the same panel:
  - Feedback (submit only + similar suggestions)
  - Roadmap (planned only)
  - Changelog (release notes list)

The widget is React‑based and targets Next.js 15/16 and other React 18+ apps.

---

## 1. Package Overview

- **Name:** `@featul/widget`
- **Consumer Install:**

  ```bash
  npm install @featul/widget
  # or
  yarn add @featul/widget
  pnpm add @featul/widget
  ```

- **Tech stack inside the package**
  - React 18+ (function components)
  - TypeScript
  - Zustand for local widget state (open/close, active tab, selection)
  - TanStack React Query for data fetching and caching
  - Zod for runtime validation and type inference
  - UI built to be themable (reusing Featul’s design tokens)

- **High‑level exports**
  - `FeatulWidgetProvider` – top‑level provider with project config
  - `FeatulWidget` – main floating widget (panel + tabs)
  - `useFeatulWidget` – hook for imperative open/close/tab control

The package is intentionally self‑contained so customers do **not** need to understand internal board/roadmap/changelog internals.

---

## 2. Integration API (Consumer View)

Basic usage in a React/Next.js app:

```tsx
import { FeatulWidgetProvider, FeatulWidget } from "@featul/widget";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <FeatulWidgetProvider
      projectKey="ws_123_featul_slug" // maps to a workspace/subdomain
      user={{
        id: "user_123",
        email: "user@example.com",
        name: "Demo User",
      }}
      config={{
        theme: "system",
        defaultTab: "feedback",
      }}
    >
      {children}
      <FeatulWidget />
    </FeatulWidgetProvider>
  );
}
```

### 2.1 Provider Props

```ts
interface FeatulWidgetUser {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
}

type FeatulWidgetTab = "feedback" | "roadmap" | "changelog";

interface FeatulWidgetConfig {
  projectKey: string;
  user?: FeatulWidgetUser;
  config?: {
    theme?: "light" | "dark" | "system";
    defaultTab?: FeatulWidgetTab;
  };
}
```

- `projectKey`
  - Public identifier for a workspace/domain.
  - Internally resolved to:
    - Workspace ID
    - Workspace slug (subdomain)
    - Default public board for feedback submissions.
- `user`
  - Optional identified user; used to attribute feedback and votes.
  - If omitted, widget uses anonymous mode.
- `config.theme`
  - Forces light/dark or follows system.
- `config.defaultTab`
  - Initial tab when widget opens.

### 2.2 Control Hook

```ts
import { useFeatulWidget } from "@featul/widget";

function CustomButton() {
  const { open, setTab } = useFeatulWidget();

  function handleClick() {
    setTab("feedback");
    open();
  }

  return <button onClick={handleClick}>Give Feedback</button>;
}
```

Exposed fields:

```ts
interface FeatulWidgetController {
  isOpen: boolean;
  activeTab: FeatulWidgetTab;
  open: () => void;
  close: () => void;
  setTab: (tab: FeatulWidgetTab) => void;
}
```

---

## 3. Widget UI Behavior

The widget renders as a floating button on the page. When opened, it shows a panel with three tabs at the bottom:

1. **Feedback** – submit form + similar suggestions
2. **Roadmap** – planned roadmap items
3. **Changelog** – changelog entries

Roadmap and Changelog tabs are **conditionally visible** based on workspace settings.

### 3.1 Feedback Tab

Purpose:

- Collect new feedback posts.
- Prevent duplicates by showing similar posts during typing.

Behavior:

- Shows:
  - Title input (required)
  - Description / details textarea (optional)
  - Optional additional inputs later (tags, category, etc.)
- While user types title:
  - Debounced (e.g. 500–1000ms) search via `post.getSimilar`:
    - Inputs: `title`, `boardSlug`, `workspaceSlug`
    - Returns up to 3 similar posts with:
      - `id`, `title`, `slug`, `upvotes`, `commentCount`
  - Renders a “Similar posts” list:
    - Each item shows title, votes, comment count.
    - Link points to the public post page on the Featul subdomain.
- On submit:
  - Calls `post.create` (public procedure) with:
    - Workspace slug / ID (resolved from `projectKey`)
    - Board slug (default public feedback board)
    - Title, description, metadata (fingerprint, user id etc.)
  - The API:
    - Creates the post in the configured board.
    - Auto‑upvotes the new post for the user/fingerprint.
  - Widget behavior on success:
    - Clears the form.
    - Shows a success message.
    - Optionally keeps panel open on Feedback tab.

Notes:

- The Feedback tab **does not list all existing posts**.
- It is intentionally focused on submission + duplicate prevention via similar posts.

### 3.2 Roadmap Tab

Purpose:

- Show only **planned** roadmap items for the workspace.

Behavior:

- Fetches planned posts via a public API that maps to:
  - `getPlannedRoadmapPosts(workspaceSlug, { limit, offset, order })`
  - Only posts with roadmap status `planned`.
- Renders a vertical list of items:
  - Title
  - Optional short content snippet
  - Board name/status badge if desired.
- Supports simple pagination (page/limit) if needed.
- Does not expose additional status filters in the widget (future extension only).

Visibility:

- Tab is hidden if the workspace roadmap board is not:
  - `isVisible = true` and `isPublic = true` on the system roadmap board.

### 3.3 Changelog Tab

Purpose:

- Show public changelog entries (release notes).

Behavior:

- Uses the same data semantics as the subdomain Changelog page:
  - `client.changelog.entriesList.$get({ slug: workspaceSlug })` or equivalent widget endpoint.
  - Response contains:
    - `id`, `title`, `summary`, `publishedAt`, `tags[]`.
- Renders entries as cards:
  - Title
  - Published date
  - Summary text
  - Tag pills

Visibility:

- Tab is hidden if:
  - Changelog system board is not visible (`isVisible = false` or `isPublic = false`).

---

## 4. Data and Configuration Flow

### 4.1 Workspace Resolution

Input: `projectKey` (string provided to the widget).

Resolution strategy:

1. Widget calls a configuration endpoint, e.g.:

   ```http
   GET /api/widget/config?projectKey={projectKey}
   ```

2. The endpoint returns:

   ```json
   {
     "workspaceId": "ws_123",
     "workspaceSlug": "acme",
     "name": "Acme Inc",
     "logo": "https://...",
     "branding": {
       "primary": "#6366f1",
       "theme": "dark",
       "layoutStyle": "default",
       "sidebarPosition": "right",
       "hidePoweredBy": false
     },
     "visibility": {
       "roadmap": true,
       "changelog": true
     },
     "feedback": {
       "defaultBoardSlug": "feedback"
     }
   }
   ```

3. Widget stores this in a React Query cache + local Zustand store and uses it for:
   - Which tabs to show.
   - Which board to post feedback into.
   - Branding (theme, primary color, powered‑by).

### 4.2 API Endpoints Used by the Widget

Minimal required endpoints (public or authenticated via user session):

- **Config**
  - `GET /api/widget/config?projectKey=...`
- **Feedback**
  - `POST /api/post/create` – create feedback (maps to `post.create`).
  - `GET /api/post/getSimilar?workspaceSlug=...&boardSlug=...&title=...` – similar posts.
- **Roadmap**
  - `GET /api/roadmap/planned?workspaceSlug=...&page=...&limit=...`
    - Internally uses `getPlannedRoadmapPosts`.
- **Changelog**
  - `GET /api/changelog/entriesList?slug=...`

The widget package should not assume it is running on the same origin as the app; it must use a configurable `baseUrl` if needed.

---

## 5. Internal Package Structure

Planned directory layout inside `packages/widget`:

- `src/`
  - `index.ts` – public exports
  - `types.ts` – shared TypeScript/Zod schemas (user, config, tabs)
  - `store.ts` – Zustand store (open/close/tab state)
  - `context.tsx` – `FeatulWidgetProvider` + React Query client setup
  - `widget.tsx` – main floating widget + tab bar + layout
  - `hooks.ts` – `useFeatulWidget` hook
  - `api/`
    - `client.ts` – thin fetch client with base URL and helpers
    - `queries.ts` – React Query hooks for config, roadmap, changelog
  - `tabs/`
    - `feedback-tab.tsx` – Feedback form + similar posts
    - `roadmap-tab.tsx` – planned roadmap list
    - `changelog-tab.tsx` – changelog list
  - `components/`
    - Reusable primitives for buttons, list items, etc. (or wrappers around `@featul/ui` if shared).

---

## 6. Future Extensions (Optional)

Not part of the initial version, but planned:

- Show existing feedback list inside the Feedback tab (toggleable).
- Allow switching roadmap status filters (planned, in progress, completed).
- Support multiple widgets per page scoped to different projects.
- Allow custom triggers instead of the default floating button.
- Deeper theming (fonts, corner radius, dark/light preferences) passed from the host app.

The initial scope remains focused on:

- Feedback creation + duplicate suggestions.
- Planned roadmap visibility.
- Changelog visibility.

