---
title: Data persistence
description: How Featul stores your workspaces, feedback, and activity.
---

## Overview

Featul stores all your data in a durable database. Your feedback, settings, and history are preserved reliably over time.

## What gets stored

| Category | Data |
|----------|------|
| **Workspace** | Name, slug, domain, plan, theme, branding |
| **Team** | Members, roles, permissions, invites |
| **Boards** | Settings, privacy, statuses, tags |
| **Feedback** | Posts, votes, comments, reactions |
| **Activity** | Status changes, moderation actions, history |

Every record includes timestamps for creation and last modification.

## Workspace data

When you create a workspace, Featul stores:

- **Identity** – Name, slug, subdomain
- **Configuration** – Plan, theme, feature flags
- **Branding** – Logo, colors, custom CSS
- **Team** – Owner, members, their roles and permissions

Workspace slugs can be reserved ahead of time so your desired URL isn't taken while completing setup.

## Feedback data

Posts include:

- **Content** – Title, body, optional images
- **Organization** – Board assignment, tags, roadmap status
- **State** – Moderation status (draft, published, archived, spam)
- **Engagement** – Vote counts, comment threads
- **Metadata** – Custom fields, attachments, integration references

Comments support:

- Nested threads (replies to replies)
- Moderation and pinning
- Reactions and mentions
- Author attribution

## Activity and audit trail

Important actions are recorded in an activity log:

- Who made changes and when
- Status transitions (roadmap, moderation)
- Merge operations
- Team member actions

Reports (for spam, harassment, etc.) track:

- Reporter and reason
- Resolution status
- Who handled the report

## Why this matters

Reliable data persistence means you can:

- **Trust your history** – Feedback, comments, and changes are preserved
- **Build on top** – Export data for analytics or custom dashboards
- **Stay flexible** – Migrate or self-host in the future if needed

Your feedback data is yours—it's stored in a well-structured format that you can access and export.
