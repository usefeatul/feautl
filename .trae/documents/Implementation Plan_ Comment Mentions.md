# Implementation Plan: Comment Mentions

## 1. Schema & Backend Logic (`commentMention` & `comment.metadata.mentions`)
We need to utilize the existing `commentMention` table and `comment.metadata.mentions` field.

### 1.1 `commentMention` Table
- **Purpose**: Stores relational data for quick lookups, notifications, and integrity.
- **Fields**:
  - `commentId`: The comment containing the mention.
  - `mentionedUserId`: The user being mentioned.
  - `mentionedBy`: The author of the comment.
  - `isRead`: Tracks if the user has seen the notification.

### 1.2 `comment.metadata.mentions` (JSON)
- **Purpose**: Stores a list of usernames mentioned in the comment content for easy frontend rendering/highlighting without joining the user table every time.

## 2. Backend Implementation Steps
We will modify the `create` procedure in `packages/api/src/router/comment.ts`.

### 2.1 Parsing Logic
- **Regex**: Use a regex like `/@(\w+)/g` to find mentions in the `content`.
- **Validation**:
  - Query the `user` table (or `workspaceMember`) to verify these usernames exist in the current workspace.
  - Filter out invalid users.

### 2.2 Database Operations
- **Insert Mentions**:
  - For each valid user found, insert a row into `commentMention`.
- **Update Metadata**:
  - Store the array of *valid* usernames in `comment.metadata.mentions`.

### 2.3 Notifications (Future/Optional)
- The `commentMention` table is ready for a notification system. You can query `commentMention` where `isRead` is false to show unread notifications.

## 3. Frontend Implementation Steps
We need to enhance `CommentForm` to support the mention experience.

### 3.1 UI Components
- **Suggestion List**: Create a `MentionList` component that appears when the user types `@`.
  - Fetch workspace members using `client.team.membersByWorkspaceSlug`.
  - Filter list based on text typed after `@`.
- **Selection**:
  - Clicking a user inserts `@username ` into the textarea.

### 3.2 Rendering Mentions
- Update `CommentItem` to parse the content and wrap valid mentions (found in `metadata.mentions`) with a `Link` or highlighted span (e.g., `<span className="text-primary font-medium">@username</span>`).

## Summary of Changes
1.  **Backend**: Update `create` in `comment.ts` to parse mentions, verify users, insert into `commentMention`, and update metadata.
2.  **Frontend**:
    *   Update `CommentForm` to suggest users on `@`.
    *   Update `CommentItem` to highlight mentions.
