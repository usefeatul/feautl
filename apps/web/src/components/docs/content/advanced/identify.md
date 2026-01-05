---
title: Identify users
description: Link feedback to user accounts for better context and follow-up.
---

## Why identify users?

Linking feedback to user accounts lets you:

- Filter feedback by customer, plan, or segment
- Follow up with specific users when features ship
- See who on your team responded to requests
- Power notifications and activity summaries

## Anonymous vs identified feedback

| Type | You know who submitted | Best for |
|------|----------------------|----------|
| **Anonymous** | No | Low-friction public feedback |
| **Identified** | Yes | Customer relationships, follow-up |

When users are signed in and not posting anonymously:
- Their profile details are stored with the post
- You can see their information internally
- Board settings control what's shown publicly

## Identifying users from your product

If you embed Featul or link to it from your app, you can pass user information:

1. Authenticate users in your own application
2. Pass user identifiers when opening the feedback widget or portal
3. This data is stored with their posts and comments

Example user context:

```json
{
  "user_id": "user_12345",
  "email": "customer@example.com",
  "name": "Jane Doe",
  "plan": "professional",
  "company": "Acme Inc"
}
```

## What you can do with identified feedback

### Filter and segment

- View all feedback from Enterprise customers
- See requests from a specific account
- Identify patterns by customer segment

### Follow up

- Notify users when their requested feature ships
- Reach out for clarification or user research
- Close the loop on resolved requests

### Analyze trends

- Which customer segments request what features?
- How does feedback vary by plan tier?
- What are your most engaged customers asking for?

## Privacy considerations

When identifying users, ensure you:

- Follow your privacy policy
- Comply with GDPR and other regulations
- Only collect data you actually need
- Use identity masking if you want to hide user info publicly

See [Mask identities](/docs/getting-started/mask-identities) to learn how to hide user information on public boards while preserving it internally.
