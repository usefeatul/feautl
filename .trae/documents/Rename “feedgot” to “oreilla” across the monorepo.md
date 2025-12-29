## Scope
- Rename brand, package scope, imports, URLs, emails, and dev hostnames from `feedgot` to `featul`.
- Keep environment variable names as-is; update their values to the new domain.
- Avoid changing data already stored in the database unless explicitly migrated.

## What To Rename
- NPM scope and package names:
  - `@featul/{ui,api,auth,db,tsconfig}` → `@featul/{ui,api,auth,db,tsconfig}`
  - Root `package.json` `name: "feedgot"` → `"featul"`
- Imports in app and packages:
  - Example: `/apps/feed/src/app/api/[[...route]]/route.ts:1` `import { app } from "@featul/api/elysia"` → `"@featul/api/elysia"`
- Domains/URLs/emails:
  - `featul.com` → `featul.com`
  - `app.featul.com` → `app.featul.com`
  - `status.featul.com` → `status.featul.com`
  - `origin.featul.com` → `origin.featul.com`
  - `contact@featul.com` → `contact@featul.com`, `no-reply@featul.com` → `no-reply@featul.com`
  - API/CDN/widget endpoints under `/plan/*.md` → `api.featul.com`, `cdn.featul.com`, `widget.featul.com`
- Display branding strings:
  - `Feedgot`/`FeedGot` → `featul` (case-sensitive replacements in SEO configs and UI)
- Dev hostname:
  - `app.featullocalhost` → `app.featul.localhost`

## Replacement Map
- Text replacements (code and content):
  - `@featul/` → `@featul/`
  - `feedgot` → `featul` (lowercase identifiers, slugs, folder names when appropriate)
  - `Feedgot` → `featul` (brand)
  - `FeedGot` → `featul` (rare; unify casing)
  - URLs: `https://featul.com`, `https://app.featul.com`, `https://status.featul.com`, `https://{slug}.featul.com`, `origin.featul.com`
  - Emails: `contact@featul.com`, `no-reply@featul.com`

## Automated Changes (Commands)
- Preview matches:
  - `rg -n --glob 'apps/**' --glob 'packages/**' '(@featul|feedgot|Feedgot|FeedGot|origin\.featul\.com|status\.featul\.com)'`
- Update imports and scope:
  - `rg -l --glob 'apps/**' --glob 'packages/**' '@featul/' | xargs sed -i '' -E 's/@featul\//@featul\//g'`
- Update package names and inter-deps:
  - `rg -l --glob 'packages/**/package.json' '"name":\s*"@featul/' | xargs sed -i '' -E 's/"@featul\//"@featul\//g'`
  - `rg -l --glob 'apps/**/package.json' --glob 'packages/**/package.json' '@featul/(ui|api|auth|db|tsconfig)' | xargs sed -i '' -E 's/@featul\//@featul\//g'`
  - Root name: `sed -i '' -E 's/"name":\s*"feedgot"/"name": "featul"/g' package.json`
- Update branding strings:
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'Feedgot|FeedGot' | xargs sed -i '' -E 's/Feedgot/featul/g; s/FeedGot/featul/g'`
- Update domains/URLs/emails:
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'feedgot\.com' | xargs sed -i '' -E 's/feedgot\.com/featul.com/g'`
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'app\.featul\.com' | xargs sed -i '' -E 's/app\.featul\.com/app.featul.com/g'`
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'status\.featul\.com' | xargs sed -i '' -E 's/status\.featul\.com/status.featul.com/g'`
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'origin\.featul\.com' | xargs sed -i '' -E 's/origin\.featul\.com/origin.featul.com/g'`
  - `rg -l --glob 'apps/**' --glob 'packages/**' 'contact@featul\.com|no-reply@featul\.com' | xargs sed -i '' -E 's/contact@featul\.com/contact@featul.com/g; s/no-reply@featul\.com/no-reply@featul.com/g'`
- Exclusions:
  - Add `--glob '!**/node_modules/**' --glob '!**/.next/**' --glob '!**/dist/**'` to all commands.

## Manual Updates
- Environment values:
  - `/apps/web/.env.example`: set `NEXT_PUBLIC_*` to `featul.com` and `app.featul.com`.
  - `/apps/feed/.env.example`: set `NEXT_PUBLIC_APP_URL`, `AUTH_COOKIE_DOMAIN=featul.com`, `AUTH_TRUSTED_ORIGINS` to `https://featul.com, https://app.featul.com, https://*.featul.com`.
  - Local `.env` files under `/apps/{web,feed}/` similar changes.
- CNAME target defaults:
  - `/packages/db/schema/workspace.ts` and drizzle files: replace `'origin.featul.com'` with `'origin.featul.com'`.
- UI and SEO configs:
  - `/apps/web/src/config/seo.ts`, `/apps/feed/src/config/seo.ts`: update `DEFAULT_TITLE`, `TITLE_TEMPLATE`, organization name, emails.
- Dev hostname:
  - `/apps/feed/package.json`: dev command hostname to `app.featul.localhost`.
- Middleware and URL builders:
  - `/apps/feed/src/middleware/host.ts`, `/apps/feed/src/config/nav.ts`, `/apps/feed/src/lib/seo.ts`: update `.featul.com` logic.
- Emails:
  - `/packages/auth/src/email/**`: update from address and URLs.

## Database & Data Safety
- Do not mass-rewrite stored records. Only update default values and generated URLs.
- If you need to migrate existing `*.featul.com` records, run a targeted migration with backups and audit logs.

## Verification
- Reinstall and link: `pnpm install`
- Build and typecheck: `pnpm -r build`; `pnpm -r lint`; `pnpm -r typecheck`
- Run dev apps and smoke test:
  - Web: check branding, links, demo/status URLs.
  - Feed: verify subdomain routing, CNAME target, email templates.
- Validate envs: cookies domain, trusted origins, SEO metadata.

## Risks & Rollback
- Commit changes on a branch and push for CI.
- If issues arise, revert specific replacements or adjust mapping.
- Coordinate DNS/SSL updates for `featul.com` subdomains and API/CDN endpoints before production deploy.

## Next Step
- After you confirm, I will execute the replacements, update configs, and verify builds locally end-to-end.