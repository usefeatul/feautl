---
title: Custom events
description: Attach structured context to feedback using metadata and activity logs.
---

## Why custom events

Beyond simple posts and votes, many teams want to attach structured context to feedback, such as:

- Which plan or segment a user is on.
- Where in the product a request originated.
- Which internal system or ticket it relates to.

featul supports this through flexible metadata fields and an activity log.

## Post metadata

Each post can carry extra metadata, including:

- Attachments such as files or links associated with a request.
- References to systems such as GitHub or Jira.
- Custom fields that store any additional context you need.

You can use custom fields to persist additional context for a post, for example:

```json
{
  "source": "in_app_widget",
  "plan": "professional",
  "featureArea": "billing"
}
```

34→These fields are available when rendering requests, building filters, or exporting data.

## Activity log

The activity log records important events that happen inside a workspace and can include extra context for each event.

This lets you:

- Track when roadmap statuses change.
- Capture moderation and merge actions.
- Analyse how feedback flows through your process over time.

## Designing your own event schema

Because metadata is flexible, you can define your own structure per workspace or integration. A common pattern is to:

- Keep top-level keys stable (for example `source`, `segment`, `featureArea`).
- Nest integration-specific payloads under namespaced keys (for example `jira`, `github`).

This gives you a consistent way to reason about custom events without having to change the underlying data model.
