# Cloudflare Workers Static Assets

This repo is currently served by GitHub Pages. This document records the local-only preparation for moving the same static site to Cloudflare Workers Static Assets.

No Cloudflare deployment or DNS change is performed by the commands below unless `npm run deploy:cloudflare` is explicitly run.

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
2. Confirm `www.verdafly.com` is still safe to cut over from GitHub Pages.
3. Confirm `digital-archive-movie-jp/` public URLs remain byte-for-byte compatible enough for YouTube API review/audit references.
4. Record rollback instructions in `Z:\projects\VerdaflyDomainOps`.
