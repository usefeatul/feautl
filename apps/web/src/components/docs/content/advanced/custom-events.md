---
title: Custom metadata
description: Attach structured context to feedback with custom fields and metadata.
---

## Why use custom metadata?

Beyond basic feedback, you often need additional context:

- Which customer plan or segment submitted this?
- Where in your product did this request originate?
- What related tickets exist in other systems?

Featul supports flexible metadata to capture this information.

## Post metadata

Every post can carry additional data:

| Type | Description |
|------|-------------|
| **Attachments** | Files, screenshots, or links |
| **Integration references** | Links to GitHub issues, Jira tickets, etc. |
| **Custom fields** | Any additional context you need |

## Using custom fields

Custom fields let you store structured data with each post. Example:

```json
{
  "source": "in_app_widget",
  "plan": "professional",
  "feature_area": "billing",
  "customer_id": "cust_12345"
}
```

These fields are available when:

- Viewing post details
- Building filters and segments
- Exporting data for analysis

## Activity log

Featul records important events in an activity log:

- Status changes (roadmap updates, moderation actions)
- Merge operations
- Team member actions
- Vote and comment activity

This creates an audit trail of how feedback flows through your process.

## Designing your metadata schema

Since metadata is flexible, plan your structure:

### Keep top-level keys consistent

Use stable field names across all posts:

```json
{
  "source": "...",
  "segment": "...",
  "feature_area": "..."
}
```

### Namespace integration data

Group external system data under namespaced keys:

```json
{
  "github": {
    "issue_url": "...",
    "repo": "..."
  },
  "jira": {
    "ticket_id": "...",
    "project": "..."
  }
}
```

## Use cases

- **Segmentation** – Filter feedback by customer plan, company size, or region
- **Source tracking** – Know which widget, page, or campaign generated feedback
- **Integration sync** – Link feedback to development tools
- **Analytics** – Export metadata for deeper analysis
