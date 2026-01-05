---
title: Custom domains
description: Set up workspace subdomains and custom domains for your feedback portal.
---

## Workspace subdomains

Every Featul workspace gets a free subdomain:

```
yourworkspace.featul.com
```

This is your default feedback portal URL. It's ready to use immediately after creating your workspace.

## Custom domains

For a branded experience, you can connect your own domain:

```
feedback.yourdomain.com
```

This gives customers a seamless experience that matches your brand.

## Setting up a custom domain

1. Go to **Settings → Domain** in your workspace
2. Enter your desired domain (e.g., `feedback.yourdomain.com`)
3. Add the required DNS records with your DNS provider:

| Type | Name | Value |
|------|------|-------|
| CNAME | feedback | `yourworkspace.featul.com` |

4. Wait for DNS propagation (usually a few minutes to a few hours)
5. Featul will verify the domain automatically
6. Once verified, your portal is accessible at your custom domain

## SSL certificates

Featul automatically provisions SSL certificates for custom domains. No manual configuration needed—your portal will be served over HTTPS.

## How routing works

Whether visitors access your portal via:

- Your workspace subdomain (`yourworkspace.featul.com`)
- Your custom domain (`feedback.yourdomain.com`)

They see the same content. Featul routes all requests to your workspace automatically.

## Multiple workspaces

If you run multiple products or companies, each workspace has its own:

- Unique subdomain
- Optional custom domain
- Separate data and settings

This keeps feedback completely isolated between workspaces.

## Troubleshooting

**Domain not verifying?**
- Check that DNS records are correct
- Wait for propagation (can take up to 48 hours)
- Ensure there are no conflicting records

**SSL certificate issues?**
- Certificates are provisioned automatically after domain verification
- If issues persist, try removing and re-adding the domain
