# Verdafly site

`Verdafly/verdafly-site` is the source repository for the Verdafly public site.

GitHub Pages is retired; production is currently served by Cloudflare Workers:

- `www.verdafly.com` → Worker `verdafly-site`
- `verdafly.com` → Worker `verdafly-apex-redirect` → `https://www.verdafly.com/`

## Local development

Requirements: Node.js and npm.

```powershell
npm install
npm run verify:cloudflare
```

`npm run verify:cloudflare` builds the static assets into `dist/cloudflare` and verifies the stable public paths.

## Deployment

The normal deployment path is GitHub Actions on pushes to `main`. The workflow verifies the assets and deploys with Wrangler.

For an explicitly approved manual deployment:

```powershell
npm run deploy:cloudflare
```

This command changes the Cloudflare production Worker. Confirm the current DNS state, production hostname, and rollback path in `Z:\projects\VerdaflyDomainOps` before running it.

Operational source of truth: [VerdaflyDomainOps](Z:\projects\VerdaflyDomainOps\services\cloudflare.md).
