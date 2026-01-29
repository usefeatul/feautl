---
title: Custom metadata
description: Attach structured context to feedback with custom fields and metadata.
---

## Metadata Benefits

Enhance feedback with additional context beyond basic content:

- Customer segmentation (plan, company size, region)
- Source tracking (widget, page, campaign)
- Integration links (GitHub issues, Jira tickets)
- Custom business data

## Implementation

Every post supports flexible metadata storage:

```json
{
  "source": "in_app_widget",
  "plan": "professional", 
  "feature_area": "billing",
  "customer_id": "cust_12345"
}
```

## Custom Fields

Design consistent metadata schemas:

### Top-Level Structure
Use stable field names across all posts:
```json
{
  "source": "...",
  "segment": "...",
  "feature_area": "..."
}
```

### Namespaced Integration Data
Group external system references:
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

## Activity Logging

Automatic tracking of important events:
- Status changes and moderation actions
- Merge operations
- Team member activities
- Vote and comment interactions

Creates complete audit trail for feedback processing.

## Usage Applications

- **Segmentation** – Filter by customer characteristics
- **Source Attribution** – Identify high-converting channels
- **Integration Sync** – Maintain cross-system consistency
- **Analytics** – Export for deeper analysis