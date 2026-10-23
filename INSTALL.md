# PBTS UI upgrade — install steps

21 files: 4 new, 17 updated. All other files are unchanged.
Built and type-checked with Next.js 15 + React 19 + Motion 12.43.0.

## 1. Back up
Commit or copy your current `components/` folder first, so you can roll back.

## 2. Add Motion (pnpm only)
```
pnpm add motion@12.43.0
```
Pinned on purpose: Motion 14 is only a few weeks old; 12.43 is the stable line.

## 3. Copy the files
Copy everything in this zip's `components/` folder into your `components/`
folder (same folder as `hero.tsx`, `navbar.tsx` …), replacing when asked.

New files:
- `motion-provider.tsx`: site-wide animation settings (respects "Reduce motion")
- `section-header.tsx`: shared eyebrow + heading + intro block
- `blueprint-grid.tsx`: faint engineering-drawing grid background
- `use-dialog.ts`: shared scroll-lock / Esc / focus logic for pop-ups

Updated files:
about, certification-modal, certifications, contact, cta-banner, hero,
industries, legal-modal, navbar, projects, reveal, service-viewer, services,
testimonials, timeline, verified-certificates, why-choose

## 4. Wrap the app in MotionProvider (app/layout.tsx)
Add the import at the top:
```tsx
import { MotionProvider } from '@/components/motion-provider'
```
Then wrap what's inside `<body>`:
```tsx
<body className={…keep yours…}>
  <MotionProvider>
    {/* everything that was already inside <body> stays here */}
  </MotionProvider>
</body>
```
(If your components live somewhere other than `components/`, adjust the import path.)

## 5. Optional clean-up (globals.css)
`<Reveal>` no longer uses the `.reveal` / `.in-view` CSS classes. You can
delete those rules (and their @keyframes) from `globals.css`. Leaving them
does no harm.

## 6. Test
```
pnpm dev
```
Check:
- Hero: photo settles, headline lines rise in turn, orange line draws in
- Navbar: pill follows the section you're on; Services menu opens by hover,
  click, or Tab+Enter, and closes with Esc or a click outside; orange progress
  line appears along the bottom edge when you scroll
- Projects: orange chip slides between filters, cards rise in on each change
- Timeline: line fills orange as you scroll through it
- Contact: spinner while sending; form changes to "Message sent"
- Pop-ups (photo viewer, certificate, privacy/terms) fade and slide in and out
- Turn on Reduce Motion in your OS: you should see fades only

Then run `pnpm build` once before deploying.

## Roll back
Restore your backup of `components/`, remove the MotionProvider wrapper, and run
`pnpm remove motion`.
