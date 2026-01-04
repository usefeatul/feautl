---
title: Identify users
description: Link feedback to user accounts while respecting privacy settings.
---

## User identity

User identity links feedback back to the people who created it. This allows you to:

- Filter feedback by customer or account.
- See which team member responded or updated a request.
- Power notifications and activity summaries.

## Anonymous vs identified posts

Posts and comments can be created either as identified or anonymous.

When a user is signed in and not posting anonymously:

- Their name and profile details can be shown in the interface.

When a user posts anonymously:

- Public views rely on generic labels such as “Guest” or “Anonymous”.

Board-level options such as identity masking control how much identity is exposed on public portals.

## Identifying users from your product

In many setups you will:

- Authenticate users in your own app.
- Mount a feedback widget or link to a feedback portal.
- Pass user identifiers into the widget or feedback creation calls.

This information is stored with posts and comments so you can later:

- Filter feedback by plan, segment, or account.
- Follow up with specific users when features ship.

Always make sure your implementation respects:

- Your privacy policy.
- GDPR or other regional requirements.
