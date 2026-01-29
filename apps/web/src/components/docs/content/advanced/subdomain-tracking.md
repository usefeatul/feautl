---
title: Custom domains
description: Set up workspace subdomains and custom domains for your feedback portal.
---

## Default Subdomain

Every workspace receives a free subdomain:
```
yourworkspace.featul.com
```

Ready to use immediately after workspace creation.

## Custom Domain Setup

Connect your branded domain for seamless customer experience:

1. Navigate to **Settings → Domain**
2. Enter desired domain (e.g., `feedback.yourdomain.com`)
3. Add DNS record with your provider:

| Type | Name | Value |
|------|------|-------|
| CNAME | feedback | `yourworkspace.featul.com` |

4. Wait for DNS propagation (few minutes to hours)
5. Featul verifies domain automatically
6. Portal becomes accessible at your custom domain

## SSL Certificates

Automatic SSL provisioning for all custom domains. No manual configuration required—your portal serves over HTTPS immediately after verification.

## Routing Behavior

Both URLs serve identical content:
- Workspace subdomain: `yourworkspace.featul.com`
- Custom domain: `feedback.yourdomain.com`

Featul handles routing automatically.

## Multiple Workspaces

Each workspace has independent domains:
- Unique subdomain
- Optional custom domain
- Completely isolated data and settings

## Troubleshooting

**Domain verification issues:**
- Verify DNS record accuracy
- Allow propagation time (up to 48 hours)
- Check for conflicting DNS records

**SSL certificate problems:**
- Certificates provision automatically after verification
- Remove and re-add domain if issues persist