# Portfolio — Project A3

Next.js landing site for Project A3, deployed to Vercel. Style consistently with Alvin Chiew Portfolio (`../portfolio-alvinchiew/` or [alvinchiew.com](https://alvinchiew.com)).

Site: [project-a3.alvinchiew.com](https://project-a3.alvinchiew.com/)

Multi-root workspace and sibling-repo roles: see **`project-a3-private`** root `AGENTS.md`. Commits/PRs stay **per repo**.

## Scope (this repo only)

- Project A3 introduction and bilingual brand tone (tokens/copy details: private `a3-brand` skill when working multi-root).
- Tools showcase: `app/data/tools.js` (description, download/releases URL, video, logo under `public/tools/`). When a free tool ships installers, sync the matching row from public `project-a3/internal/releases-manifest.json` (`status: 'available'`, installer URL → `releasesUrl`) — `create-free-tool` Step 5.
- **Activation sign-up**: Name, business email, company, industry (and related fields). Form calls private `activation-key-validator` `POST /api/v1/issue` and shows `A3-XXXX-XXXX`. Do not reimplement the validator here.
- Contact: business inquiry email form + channel links (align with private `Contacts.md` / `a3-brand` when multi-root).
- Do not store free-tool source, releases manifest, or k3s configs here.
- Do not add `AGENTS.md` (or private-repo maps) to public `project-a3`.

## Local skills

| Skill | Use |
| ----- | --- |
| `portfolio-styling` | Match portfolio visual language |
| `vercel-deploy` | Deploy / Vercel workflow |
