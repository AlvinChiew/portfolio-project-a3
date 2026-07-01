---
name: portfolio-styling
description: Ensures Next.js landing pages match Alvin Chiew Portfolio styling by reusing Navbar, Footer, EmailSection, Tailwind theme, and layout patterns from the reference repo. Use when building or editing UI in portfolio-project-a3, adding sections, forms, or when the user mentions consistent styling, alvinchiew.com, header, footer, or contact.
---

# Portfolio Styling (Alvin Chiew)

## Reference source

Sibling repo (read-only source of truth):

```
../portfolio-alvinchiew/frontend/
```

Live reference: https://alvinchiew.com

Do not invent a new design system. Copy established patterns, then adapt only content and nav links.

## Reuse checklist

Before adding or changing UI, confirm:

```
Styling Progress:
- [ ] tailwind.config.js theme tokens match reference
- [ ] globals.css copied (custom animations included)
- [ ] layout.js uses Inter font
- [ ] Navbar + NavLink + MenuOverlay reused (links adapted only)
- [ ] Footer reused
- [ ] EmailSection reused for entire Contact block
- [ ] Page shell matches reference (bg-backdrop, container, px-12)
- [ ] New sections use reference typography and spacing
```

## Page shell

Match `page.js` structure from the reference:

```jsx
<main className="bg-backdrop flex min-h-screen flex-col">
  <Navbar />
  <div className="container mx-auto px-12">
    {/* project-specific sections */}
    <EmailSection />
  </div>
  <Footer />
</main>
```

Contact (`EmailSection`) stays inside the container. Footer stays outside it, full width.

## Components to reuse verbatim

Copy from reference; change only what the task requires (nav labels/paths, footer brand text, metadata).

| Component | Source path | Notes |
|-----------|-------------|-------|
| Navbar | `app/components/Navbar.jsx` | Update `navLinks` for Project A3 sections |
| NavLink | `app/components/NavLink.jsx` | No changes |
| MenuOverlay | `app/components/MenuOverlay.jsx` | No changes |
| Footer | `app/components/Footer.jsx` | Brand text may differ |
| EmailSection | `app/sections/EmailSection.jsx` | Entire Contact section — form + social links |
| Send API | `app/api/send/route.js` | Requires `RESEND_API_KEY`, `FROM_EMAIL` |

Also copy social SVG icons from `public/*-icon.svg`.

## Navbar links for Project A3

Keep reference styling; replace `navLinks` content only. Example:

```js
const navLinks = [
  { title: "About", path: "#about" },       // or Project A3 intro id
  { title: "Tools", path: "#tools" },
  { title: "Sign Up", path: "#signup" },
  { title: "Contact", path: "#contact" },
];
```

## Styling tokens

Use reference `tailwind.config.js` colors exactly:

| Token | Value | Usage |
|-------|-------|-------|
| `backdrop` | `#121212` | Page background |
| `secondaryBackdrop` | `#181818` | Cards, elevated surfaces |
| `borderline` | `#33353F` | Borders, inputs |
| `secondaryText` | `#ADB7BE` | Body copy, nav links |
| `formInput` | `#18191E` | Input backgrounds |
| `formPlaceholder` | `#9CA2A9` | Placeholder text |
| `primary-*` | Tailwind blue scale | Buttons, accents, gradients |
| `secondary-*` | Tailwind green scale | Gradient accents |

## Section patterns

New sections (intro, tools, signup) must follow reference conventions:

- Section ids for anchor nav: `id="tools"`, `id="signup"`, etc.
- Top padding accounts for fixed navbar: `pt-24 lg:pt-28` or `py-36 md:py-28`
- Headings: `text-4xl font-bold text-white` (h2) or `text-xl font-bold text-white` (h5)
- Body: `text-secondaryText`, often `text-justify`
- Primary CTA: `rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 px-6 py-3 text-white`
- Form submit: `rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600`
- Form fields: `rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder`
- Decorative blur orb (optional): radial gradient from `primary-900`, used in EmailSection

## Dependencies

Match reference versions where possible:

- `next`, `react`, `react-dom`
- `tailwindcss`, `postcss`, `autoprefixer`
- `@heroicons/react` (Navbar mobile menu)
- `resend` (contact form API)

## Contact section scope

Per AGENTS.md, Contact includes both:

1. **Email form** — Your email, Subject, Message (from `EmailSection`)
2. **Social / channel links** — GitHub, LinkedIn, Instagram, Messenger, Mail icons

Do not split or restyle these into a different layout.

## Sign-up form styling

The activation-code sign-up form (Name, Business email, Company, Industry) is project-specific content but must use the same form field and button classes as EmailSection.

## Additional resources

- File inventory and setup steps: [reference.md](reference.md)
