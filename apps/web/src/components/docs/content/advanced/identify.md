---
title: Identify users
description: Link feedback to user accounts for better context and follow-up.
---

## User Identification

Connect feedback to specific user accounts for enhanced relationship management and data analysis. Identified feedback enables follow-up, segmentation, and personalized responses.

## Identification Methods

| Method | Implementation |
|--------|----------------|
| **Anonymous** | No user data collected |
| **Identified** | User context stored with posts |

Identified users provide:
- Contact information for follow-up
- Account details for segmentation
- Submission history for analysis

## User Context Data

Pass user information from your application:

```json
{
  "user_id": "user_12345",
  "email": "customer@example.com",
  "name": "Jane Doe",
  "plan": "professional",
  "company": "Acme Inc"
}
```

## Benefits of Identification

### Enhanced Follow-up
- Notify users when requested features ship
- Contact for clarification or user research
- Close loops on resolved requests

### Advanced Segmentation
- Filter feedback by customer tier
- Analyze patterns by user segment
- Identify power user requests

### Relationship Management
- Track customer feedback history
- Identify most engaged users
- Personalize responses based on account context

## Privacy Considerations

When identifying users:
- Follow applicable privacy regulations (GDPR, CCPA)
- Comply with your privacy policy terms
- Collect only necessary user data
- Use identity masking for public board privacy

See [Mask identities](/docs/getting-started/mask-identities) to hide user information publicly while preserving internal access.