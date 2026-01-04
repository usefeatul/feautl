---
title: Persist data
description: Understand how featul stores workspaces, feedback, and activity over time.
---

## Core persistence model

featul stores everything in your workspace in a durable database so that feedback, configuration, and history are kept safe over time.

This includes:

- Workspaces and domains.
- Members, invites, and branding.
- Boards, posts, tags, and votes.
- Comments, reactions, and mentions.
- Activity logs and reports.

Each record includes timestamps so you can see when it was created and last changed.

## Workspace lifecycle

When you create a workspace, featul:

- Stores your workspace name, slug, domain, plan, and theme.
- Saves default branding options.
- Links the owner and initial members to the workspace.

Workspaces can also reserve slugs ahead of time so a desired address is not taken while a user completes sign‑up.

## Feedback and comments

Feedback is stored as posts that:

- Belong to a specific board.
- Include a title, main content, and optional image.
- Track moderation and roadmap status.
- Support metadata for attachments, integrations, and custom fields.

Comments are stored alongside posts and support:

- Nested threads.
- Status flags for moderation and pinning.
- Reactions and mentions for richer discussion.

## Activity and moderation history

Important actions across the app are recorded in an activity log so you can see what changed over time and who made the change.

Reports for posts and comments include:

- Reasons, status, and resolution details to manage moderation workflows.
- Information about who handled each report and when.

## Why this matters for you

Because all of this data is persisted in a well‑structured way, you can:

- Rely on **consistent history** for requests, comments, and updates.
- Build exports, analytics, or custom dashboards on top of the same schema.
- Confidently self‑host or migrate data in the future if needed.
