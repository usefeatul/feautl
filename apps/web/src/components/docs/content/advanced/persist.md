---
title: Data persistence
description: How Featul stores your workspaces, feedback, and activity.
---

## Data Storage

All workspace data is stored in a durable PostgreSQL database with automatic backups and redundancy. Your feedback, settings, and history are preserved reliably over time.

## Stored Information

| Category | Data Types |
|----------|------------|
| **Workspace** | Name, slug, domain, plan, theme, branding |
| **Team** | Members, roles, permissions, invites |
| **Boards** | Settings, privacy, statuses, tags |
| **Feedback** | Posts, votes, comments, reactions |
| **Activity** | Status changes, moderation actions, history |

Every record includes creation and modification timestamps.

## Feedback Data Structure

Posts contain:
- **Content** – Title, body, optional images
- **Organization** – Board assignment, tags, roadmap status
- **State** – Moderation status (draft, published, archived, spam)
- **Engagement** – Vote counts, comment threads
- **Metadata** – Custom fields, attachments, integration references

Comments support nested threads, moderation, reactions, and author attribution.

## Activity Logging

Comprehensive audit trail tracks:
- Status transitions and moderation actions
- Merge operations
- Team member activities
- Vote and comment interactions

## Data Ownership

Your feedback data belongs to you. The structured storage format enables:
- Reliable history preservation
- Data export for analytics
- Future migration or self-hosting options
- Integration with external tools

Workspace slugs can be reserved during setup to ensure your desired URL remains available.