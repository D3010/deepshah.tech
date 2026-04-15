# Deep Shah — Portfolio

Production-grade personal portfolio for Deep Shah (AI Engineer & Automation Expert) built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Dark luxury aesthetic, fully responsive, deploy-ready for Vercel + `deepshah.tech`.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build      # production build
npm run start      # run production build
npm run type-check # TypeScript only
npm run lint       # ESLint
```

Requires Node.js 18.18+ (Node 20 LTS recommended).

---

## Updating content (no code edits needed)

**All site copy lives in [`lib/constants.ts`](./lib/constants.ts).** Open that file and edit:

| Constant            | What it controls                              |
| ------------------- | --------------------------------------------- |
| `SITE`              | Name, title, description, email, location     |
| `NAV_LINKS`         | Navigation menu                               |
| `HERO`              | Hero eyebrow / headline / bio / CTAs / stats  |
| `ABOUT`             | About section paragraphs and highlight cards  |
| `SKILLS`            | Skill categories and icons                    |
| `EXPERIENCE`        | Timeline entries                              |
| `PROJECTS`          | Project cards (mark one `featured: true`)     |
| `TESTIMONIALS`      | Quote carousel                                |
| `CONTACT_SUBJECTS`  | Dropdown options on the contact form          |
| `SOCIAL`            | GitHub / LinkedIn / Twitter / Email URLs      |

Every placeholder is tagged `// TODO: Replace with actual content` — `grep TODO lib/constants.ts` to see them all.

---

## Adding your photo

1. Save a square portrait (≥ 800×800, ideally 1200×1200, < 300 KB) as **`public/images/deep-shah.jpg`**.
2. In `lib/constants.ts`, change:
   ```ts
   photoUrl: "/images/deep-shah.svg",
   ```
   to:
   ```ts
   photoUrl: "/images/deep-shah.jpg",
   ```
3. (Optional) In `next.config.ts`, set `dangerouslyAllowSVG: false` once you no longer need the SVG placeholder.

The Hero and About sections both reference `SITE.photoUrl`, so this single change updates both.

---

## Adding your resume

Replace `public/resume.pdf` with your actual PDF. The "Download Resume" button in the Hero already links to `/resume.pdf`.

---

## Setting up the contact form (Resend)

The contact form posts to `/api/contact` (a Next.js Route Handler). It uses [Resend](https://resend.com) to deliver email.

1. Create a Resend account, verify a sending domain (e.g. `deepshah.tech`).
2. Create an API key.
3. Copy `.env.local.example` to `.env.local` and fill in:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_FROM_EMAIL=hello@deepshah.tech     # must be on a verified domain
   CONTACT_TO_EMAIL=deep@deepshah.tech         # where messages are delivered
   NEXT_PUBLIC_SITE_URL=https://deepshah.tech
   ```
4. Restart `npm run dev`. Submit the form to test.

If `RESEND_API_KEY` is missing, the form will return a clear 500 error explaining what to set.

---

## Deploying to Vercel + custom domain

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new>, import the repo, accept defaults (framework: Next.js).
3. In **Project → Settings → Environment Variables**, add the four variables from `.env.local.example`.
4. Click **Deploy**.
5. **Connect `deepshah.tech`:**
   - Project → Settings → Domains → Add `deepshah.tech` and `www.deepshah.tech`.
   - At your domain registrar, add the DNS records Vercel shows you (typically `A 76.76.21.21` for the apex and `CNAME cname.vercel-dns.com` for `www`).
   - Vercel auto-provisions an SSL certificate. Allow up to a few minutes for DNS propagation.

`vercel.json` already configures security headers, long-lived asset caching, and the build command.

---

## Project structure

```
/app
  layout.tsx        global metadata, fonts, JSON-LD, skip link
  page.tsx          single-page composition
  globals.css       design tokens, base styles, utilities
  sitemap.ts        dynamic sitemap.xml
  robots.ts         dynamic robots.txt
  api/contact/route.ts  Resend handler

/components
  ui/        Button, Badge, Card, Input, Textarea, Spinner
  layout/    Navbar, Footer
  sections/  Hero, About, Skills, Experience, Projects, Testimonials, Contact
  effects/   CustomCursor, ParticleBackground, ScrollProgress, KonamiEasterEgg, CountUp

/lib
  constants.ts      single source of truth for all content
  animations.ts     Framer Motion variants
  utils.ts          cn(), formatDate(), prefersReducedMotion(), scrollToId()

/public
  images/   deep-shah.svg (replace with .jpg)
  icons/    favicon.svg, og-image.svg
  resume.pdf
```

---

## Design tokens

Defined in `app/globals.css` (CSS variables) and `tailwind.config.ts` (Tailwind theme):

- Background: `#0a0a0f` · Surface: `#111118`
- Primary: `#6366f1` (indigo-500) · Secondary: `#06b6d4` (cyan-500)
- Gradient: `linear-gradient(135deg, #6366f1, #06b6d4)`
- Text: `#f8fafc` · Muted: `#94a3b8`
- Glassmorphism: `.glass`, `.glass-strong` utilities

Modular type scale (1.25 ratio) and a `text-gradient` utility are defined in the same file.

---

## Performance & accessibility

- `next/font` with `display: swap` (Inter + Space Grotesk)
- `next/image` with `priority` on hero only, AVIF/WebP formats
- Semantic landmarks (`<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`)
- ARIA labels on every icon button and social link
- `prefers-reduced-motion` respected globally (CSS) and in JS effects
- Skip-to-content link, focus-visible rings, JSON-LD Person schema
- Security headers via `vercel.json` (X-Frame, HSTS, CSP for SVGs)

Lighthouse target: **95+ Performance / 100 Accessibility / 100 SEO**.

---

## Easter egg

Type the [Konami code](https://en.wikipedia.org/wiki/Konami_Code) — `↑ ↑ ↓ ↓ ← → ← → B A` — anywhere on the page to trigger a confetti burst. Source: `components/effects/KonamiEasterEgg.tsx`.

---

## Tech

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript (strict)
- [Tailwind CSS 3.4](https://tailwindcss.com)
- [Framer Motion 11](https://www.framer.com/motion)
- [tsParticles](https://particles.js.org)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- [Resend](https://resend.com)
- [Lucide](https://lucide.dev) + [react-icons](https://react-icons.github.io/react-icons)
- [canvas-confetti](https://github.com/catdad/canvas-confetti)

---

© Deep Shah. All rights reserved.
