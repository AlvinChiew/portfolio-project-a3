---
name: vercel-deploy
description: Deploys the portfolio-project-a3 Next.js app to Vercel, including env vars, GitHub integration, custom domain, and post-deploy checks. Use when the user asks to deploy, publish, ship, or release to Vercel, set up production, configure project-a3.alvinchiew.com, or troubleshoot Vercel builds.
---

# Deploy portfolio-project-a3 to Vercel

## Project context

| Item           | Value                                                |
| -------------- | ---------------------------------------------------- |
| Framework      | Next.js 14 (App Router)                              |
| Repo           | `git@github.com:AlvinChiew/portfolio-project-a3.git` |
| Production URL | https://project-a3.alvinchiew.com                    |
| Build command  | `npm run build` (default)                            |
| Output         | Next.js default (no `vercel.json` required)          |
| API routes     | `/api/send`, `/api/signup`                           |

## Pre-deploy checklist

Run locally before pushing:

```
Deploy Progress:
- [ ] `npm run lint` passes
- [ ] `npm run build` passes (if ENOENT on `.next`, delete `.next` and retry)
- [ ] Env vars documented in `.env.local.example` are set in Vercel
- [ ] Changes committed and pushed to GitHub
```

## Environment variables

Set in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if forms should work on preview URLs).

| Variable                   | Required | Purpose                                                              |
| -------------------------- | -------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`           | Yes      | Resend API for contact + sign-up emails                              |
| `FROM_EMAIL`               | Yes      | Verified sender in Resend (e.g. `contact.project.a3@alvinchiew.com`) |
| `ACTIVATION_ISSUE_URL`     | No       | Phase B — activation validator endpoint                              |
| `ACTIVATION_ISSUE_API_KEY` | No       | Bearer token for activation validator                                |

`FROM_EMAIL` must be a domain verified in [Resend](https://resend.com/domains). Without `RESEND_API_KEY` and `FROM_EMAIL`, `/api/send` and `/api/signup` return 500.

Copy names exactly from [.env.local.example](../../../.env.local.example). Never commit `.env.local` or secrets.

## Deployment methods

### A. Git integration (recommended)

Use when the Vercel project is already linked to GitHub.

1. Push to `main` (or the branch Vercel watches).
2. Vercel builds automatically on each push.
3. Check status: Vercel dashboard, or `gh` if a deploy hook/check exists on the repo.

First-time setup (dashboard):

1. [vercel.com/new](https://vercel.com/new) → Import `AlvinChiew/portfolio-project-a3`.
2. Framework preset: **Next.js** (auto-detected).
3. Root directory: `.` (repo root).
4. Add env vars above before the first production deploy.
5. Deploy.

### B. Vercel CLI

Use for one-off deploys or when the user wants terminal-driven deploys.

```bash
# Install CLI if needed
npm i -g vercel

# From repo root — link once, then deploy
cd portfolio-project-a3
vercel link          # select/create project, link to GitHub repo
vercel env pull      # optional: pull remote env to .env.local for local dev

# Preview deploy
vercel

# Production deploy
vercel --prod
```

Do not run `vercel --prod` unless the user asked for a production deploy.

## Custom domain

Production domain: **project-a3.alvinchiew.com**

1. Vercel → Project → **Settings → Domains** → Add `project-a3.alvinchiew.com`.
2. At the DNS host for `alvinchiew.com`, add the record Vercel shows (usually `CNAME` → `cname.vercel-dns.com`).
3. Wait for SSL provisioning; Vercel issues the certificate automatically.

## Post-deploy verification

After deploy completes:

1. Open https://project-a3.alvinchiew.com — page loads, styles match local.
2. Anchor nav works (`#tools`, `#signup`, `#contact`).
3. Contact form (`/api/send`) — submit test; check Resend dashboard for delivery.
4. Sign-up modal (`/api/signup`) — submit test; confirm notification email to `FROM_EMAIL`.
5. If `ACTIVATION_ISSUE_*` is unset, sign-up still works (Phase A manual code path).

## Troubleshooting

| Symptom                           | Fix                                                                |
| --------------------------------- | ------------------------------------------------------------------ |
| Build fails on Vercel             | Read build log; reproduce with `npm run build` locally             |
| `Email service is not configured` | Set `RESEND_API_KEY` and `FROM_EMAIL` in Vercel env                |
| Resend 403 / domain error         | Verify sending domain in Resend; `FROM_EMAIL` must use that domain |
| Preview URL forms fail            | Add env vars to **Preview** environment in Vercel                  |
| Stale deploy                      | Redeploy from Vercel dashboard or `vercel --prod`                  |

## What not to do

- Do not commit `.env.local`, `.vercel/`, or API keys.
- Do not add `vercel.json` unless a concrete need arises (this project uses Next.js defaults).
- Do not force-push `main` to fix deploy issues.
- Do not deploy production without user confirmation when using the CLI.

## Additional resources

- Env var reference: [.env.local.example](../../../.env.local.example)
- Site copy and sections: [AGENTS.md](../../../AGENTS.md)
