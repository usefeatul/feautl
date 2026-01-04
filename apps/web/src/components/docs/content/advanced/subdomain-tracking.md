---
title: Subdomain tracking
description: Route feedback through workspace subdomains and custom domains.
---

## Workspace subdomains

Every workspace has a unique subdomain such as:

- `your-workspace.featul.com`

This subdomain is used to route visitors to the correct workspace so they see the right boards, roadmap, and changelog.

## Custom domains

For branded portals you can attach custom domains such as:

- `feedback.yourdomain.com`

The domain setup flow guides you through:

1. Adding DNS records with your DNS provider.
2. Waiting for verification.
3. Serving your workspace under the verified domain once everything is configured.

## How tracking works

Regardless of whether traffic comes through a workspace subdomain or a custom domain, requests are always scoped to a single workspace.

This means you can safely:

- Run multiple workspaces side by side.
- Serve portals on different domains.
- Keep data separation and tracking intact.
