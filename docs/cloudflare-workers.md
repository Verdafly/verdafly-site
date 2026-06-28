# Cloudflare Workers Static Assets

This repo is served in production by Cloudflare Workers Static Assets.

`www.verdafly.com` is attached to Worker `verdafly-site`.
The apex `verdafly.com` is attached to Worker `verdafly-apex-redirect`, which redirects to `https://www.verdafly.com`.

No Cloudflare deployment or DNS change is performed by the commands below unless `npm run deploy:cloudflare` or a Cloudflare API change is explicitly approved.

## Commands

```powershell
npm install
npm run verify:cloudflare
```

`npm run verify:cloudflare` copies the public site files into `dist/cloudflare` and verifies the paths that must remain stable:

- `/`
- `/works/`
- `/digital-archive-movie-jp/`
- `/digital-archive-movie-jp/privacy/`
- `/digital-archive-movie-jp/terms/`

## Deployment Gate

Before running `npm run deploy:cloudflare`:

1. Confirm `VerdaflyDomainOps` has a current Cloudflare DNS export snapshot.
2. Confirm the production hostname and rollback path in `VerdaflyDomainOps`.
3. Confirm `digital-archive-movie-jp/` public URLs remain byte-for-byte compatible enough for YouTube API review/audit references.
4. Record rollback instructions in `Z:\projects\VerdaflyDomainOps`.

## GitHub Actions

The workflow `.github/workflows/deploy-cloudflare.yml` verifies the static assets and deploys with Wrangler.

Required repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

`CLOUDFLARE_ACCOUNT_ID` is configured. `CLOUDFLARE_API_TOKEN` must be a least-privilege Cloudflare token for Workers deploys and must not be committed.

## GitHub Pages

GitHub Pages has been retired as the production host.
This repo no longer keeps a `CNAME` file for `www.verdafly.com`, and GitHub Pages source is set to `None`.
