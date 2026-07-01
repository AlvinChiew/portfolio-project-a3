# Portfolio Styling Reference

## Reference repo layout

```
portfolio-alvinchiew/frontend/
├── app/
│   ├── api/send/route.js
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── MenuOverlay.jsx
│   │   ├── Navbar.jsx
│   │   └── NavLink.jsx
│   ├── sections/
│   │   └── EmailSection.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
│   ├── github-icon.svg
│   ├── instagram-icon.svg
│   ├── linkedin-icon.svg
│   ├── mail-icon.svg
│   └── messenger-icon.svg
├── postcss.config.js
├── tailwind.config.js
└── package.json
```

## Initial setup (greenfield)

When scaffolding portfolio-project-a3 from scratch:

1. Initialize Next.js app with App Router and Tailwind (match reference Next 14 + Tailwind 3).
2. Copy `tailwind.config.js`, `postcss.config.js`, `globals.css` from reference.
3. Copy `layout.js`; update `metadata.title` and `metadata.description` for Project A3.
4. Copy Navbar stack: `Navbar.jsx`, `NavLink.jsx`, `MenuOverlay.jsx`.
5. Copy `Footer.jsx`.
6. Copy `EmailSection.jsx` and `api/send/route.js`.
7. Copy social icons from `public/`.
8. Install deps: `@heroicons/react`, `resend`.
9. Add env vars: `RESEND_API_KEY`, `FROM_EMAIL`.

## globals.css essentials

Beyond Tailwind directives, preserve custom animations used by EmailSection social icons:

- `@keyframes animate-ping-custom` + `.hover\:animate-ping-custom:hover`
- `@keyframes animate-bounce-custom` + `.hover\:animate-bounce-custom:hover` (used elsewhere in reference)

## Navbar implementation notes

- Fixed top: `fixed left-0 right-0 top-0 z-10`
- Background: `bg-backdrop border-borderline border`
- Horizontal padding: `px-12 py-3 lg:py-6`
- Brand link: `text-lg font-semibold text-white sm:text-xl lg:text-2xl`
- Mobile toggle uses `@heroicons/react/24/solid` (`Bars3Icon`, `XMarkIcon`)

## EmailSection implementation notes

- Section id: `id="contact"` (required for `#contact` nav anchor)
- Two-column grid on md+: intro + socials left, form right
- Form POSTs to `/api/send` with `{ email, subject, message }`
- Success state: green `text-green-300` confirmation message
- Social links open in new tab; icons use `hover:animate-ping-custom`

## Footer implementation notes

- `border-t-borderline border border-l-transparent border-r-transparent`
- `px-12 py-12 text-white`
- Flex row: brand name left, "All rights reserved." right (`text-slate-600`)

## Project A3–specific sections (styling only)

These are unique to portfolio-project-a3 but must follow reference patterns:

| Section | Suggested id | Reference pattern |
|---------|--------------|-------------------|
| Project A3 intro | `#about` or `#intro` | HeroSection / AboutSection spacing and headings |
| Tools showcase | `#tools` | ProjectsSection card layout |
| Activation sign-up | `#signup` | EmailSection form field classes |

Content differs; visual language must not.
