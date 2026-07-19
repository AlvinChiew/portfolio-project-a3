# Portfolio — Project A3

Next.js landing site for Project A3, deployed to Vercel. Style consistently with Alvin Chiew Portfolio (`../portfolio-alvinchiew/` or [alvinchiew.com](https://alvinchiew.com)).

Site: [project-a3.alvinchiew.com](https://project-a3.alvinchiew.com/)

## Related repositories

Prefer opening **`a3.code-workspace`** from sibling **`project-a3-private`** so agents see all three roots. Commits/PRs are **per repo**.

| Repo | Role |
| ---- | ---- |
| **`project-a3-private`** | Private source: tools, activation-key-validator, skills (`a3-brand`, `build-lead-magnet`) |
| **`project-a3`** (public) | User guides, Releases, releases manifest |
| **`portfolio-project-a3`** (this) | Marketing site, tool showcase, activation sign-up |

## Scope (this repo only)

- Project A3 introduction and bilingual brand tone (tokens/copy details: private `a3-brand` skill when working multi-root).
- Tools showcase: description, download link, video link — downloads point at public `project-a3` Releases.
- **Activation sign-up**: Name, business email, company, industry (and related fields). Form calls private `activation-key-validator` `POST /api/v1/issue` and shows `A3-XXXX-XXXX`. Do not reimplement the validator here.
- Contact: business inquiry email form + channel links (align with private `Contacts.md` / `a3-brand` when multi-root).
- Do not store free-tool source, releases manifest, or k3s configs here.

## Local skills

| Skill | Use |
| ----- | --- |
| `portfolio-styling` | Match portfolio visual language |
| `vercel-deploy` | Deploy / Vercel workflow |
