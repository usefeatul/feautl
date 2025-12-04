# Comment System

A fully-featured, reusable comment system with threading, upvoting, editing, and moderation capabilities.

## Features

- ✅ **Create Comments** - Post comments with authentication
- ✅ **Threaded Replies** - Support for nested replies (up to 3 levels)
- ✅ **Upvoting** - Like comments with optimistic UI updates
- ✅ **Edit & Delete** - Authors can edit or delete their own comments
- ✅ **Moderation** - Report inappropriate comments
- ✅ **Real-time UI** - Optimistic updates for better UX
- ✅ **Avatar Support** - Automatic avatar generation using DiceBear
- ✅ **Time Display** - Relative time formatting (e.g., "5m ago")
- ✅ **Soft Delete** - Comments are soft-deleted, maintaining thread integrity

## Components

### CommentList
Main container component that displays all comments for a post.

```tsx
import { CommentList } from "@/components/comments"

<CommentList postId="post-uuid" initialCount={5} />
```

**Props:**
- `postId` (string, required) - The ID of the post
- `initialCount` (number, optional) - Initial comment count for display

### CommentForm
Form component for creating new comments or replies.

```tsx
import { CommentForm } from "@/components/comments"

<CommentForm 
  postId="post-uuid" 
  parentId="parent-comment-uuid" // optional for replies
  onSuccess={() => console.log("Comment posted!")}
  onCancel={() => console.log("Cancelled")}
/>
```

**Props:**
- `postId` (string, required) - The ID of the post
- `parentId` (string, optional) - Parent comment ID for replies
- `onSuccess` (function, optional) - Callback when comment is posted
- `onCancel` (function, optional) - Callback when form is cancelled
- `placeholder` (string, optional) - Form placeholder text
- `autoFocus` (boolean, optional) - Auto-focus the textarea
- `buttonText` (string, optional) - Submit button text

### CommentItem
Individual comment display with actions (reply, edit, delete, report, upvote).

```tsx
import { CommentItem } from "@/components/comments"

<CommentItem 
  comment={commentData}
  currentUserId="user-uuid"
  onReplySuccess={() => refetch()}
  onUpdate={() => refetch()}
/>
```

**Props:**
- `comment` (CommentData, required) - The comment object
- `currentUserId` (string, optional) - Current user's ID for auth checks
- `onReplySuccess` (function, optional) - Callback when reply is posted
- `onUpdate` (function, optional) - Callback when comment is updated
- `depth` (number, optional) - Current nesting depth

### CommentThread
Handles rendering of nested comment threads.

```tsx
import { CommentThread } from "@/components/comments"

<CommentThread 
  comments={commentsArray}
  currentUserId="user-uuid"
  onUpdate={() => refetch()}
/>
```

**Props:**
- `comments` (CommentData[], required) - Array of comments
- `currentUserId` (string, optional) - Current user's ID
- `onUpdate` (function, optional) - Callback when comments are updated

## API Endpoints

The comment system uses the following API endpoints:

### List Comments
```typescript
GET /api/comment/list?postId={uuid}
// Returns: { comments: CommentData[] }
```

### Create Comment
```typescript
POST /api/comment/create
Body: { postId: string, content: string, parentId?: string }
// Returns: { comment: CommentData }
```

### Update Comment
```typescript
POST /api/comment/update
Body: { commentId: string, content: string }
// Returns: { comment: CommentData }
```

### Delete Comment
```typescript
POST /api/comment/delete
Body: { commentId: string }
// Returns: { success: boolean }
```

### Upvote Comment
```typescript
POST /api/comment/upvote
Body: { commentId: string }
// Returns: { upvotes: number, hasVoted: boolean }
```

### Report Comment
```typescript
POST /api/comment/report
Body: { commentId: string, reason: string, description?: string }
// Returns: { success: boolean }
```

## Usage Example

### Basic Integration

```tsx
import { CommentList } from "@/components/comments"

export default function PostDetail({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      {/* Add comments */}
      <CommentList postId={post.id} initialCount={post.commentCount} />
    </div>
  )
}
```

### Custom Implementation

```tsx
import { CommentForm, CommentThread } from "@/components/comments"
import { useQuery } from "@tanstack/react-query"
import { client } from "@feedgot/api/client"

export default function CustomComments({ postId }) {
  const { data, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await client.comment.list.$get({ postId })
      return await res.json()
    }
  })

  return (
    <div>
      <CommentForm postId={postId} onSuccess={refetch} />
      <CommentThread 
        comments={data?.comments || []} 
        onUpdate={refetch}
      />
    </div>
  )
}
```

## Database Schema

Comments are stored with the following structure:
- Threading support via `parentId` and `depth` fields
- Soft delete with `status` field
- Upvote counter with separate reactions table
- Author info (supports both authenticated and anonymous users)
- Moderation fields (status, reports, etc.)

## Permissions

- **View Comments**: Public (if board allows comments)
- **Create Comment**: Authenticated users only
- **Edit Comment**: Comment author only
- **Delete Comment**: Comment author only
- **Upvote Comment**: Authenticated users only
- **Report Comment**: Authenticated users only

## Thread Nesting

Comments support up to 3 levels of nesting:
- Level 0: Root comments
- Level 1: Direct replies
- Level 2: Replies to replies
- Level 3: Maximum depth (reply button hidden)

This prevents infinite nesting while maintaining natural conversation flow.

## Styling

All components use Tailwind CSS and shadcn/ui components for consistent styling. The components respect your app's theme configuration (light/dark mode).

## Future Enhancements

Potential features that could be added:
- [ ] Rich text editor support
- [ ] @mentions with notifications
- [ ] Image/file attachments
- [ ] Comment reactions (beyond upvote)
- [ ] Sorting options (newest, oldest, top)
- [ ] Pagination for large comment threads
- [ ] Real-time updates via WebSockets
- [ ] Comment moderation dashboard
- [ ] Email notifications for replies

