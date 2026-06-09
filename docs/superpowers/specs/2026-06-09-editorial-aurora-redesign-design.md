# Editorial + Aurora Silk Redesign — Design Spec

**Date:** 2026-06-09
**Project:** 73nko-blog (Astro 5 + Tailwind 4 + GSAP)
**Style authority:** `~/.config/Styles/Violet Hour · Glass.html` (Violet Hour palette)

## Goal

Replace the Dijkstra hero canvas with a full-page ambient "Aurora Silk" background, and restructure the site from glass-card layout to an editorial, typography-led layout. Content (data files, copy) stays unchanged.

Decisions validated with live demos:
- Background: **Aurora Silk** (option B of three live demos)
- Placement: **full-page, fixed** — the aurora is the site's lighting rig
- Interactivity: **ambient only**, no mouse/scroll reaction
- Layout: **Editorial** (option A of two mockups) — type leads, glass retreats

## 1. Aurora Silk background

**New file: `src/scripts/aurora.ts`**

- Renders into a fixed, full-viewport `<canvas id="aurora-canvas">` added to `Layout.astro` as the first child of `<body>`, with `position: fixed; inset: 0; z-index: -1; pointer-events: none;` and `aria-hidden="true"`.
- Four ribbons in Violet Hour colors: orchid `(179,157,255)`, periwinkle `(141,167,255)`, ice `(168,201,255)`, rose-mist `(226,188,255)`.
- Each ribbon: 5 stacked translucent strokes (alpha ~0.03, widths 70–110px tapering per layer) + a 2px brighter spine (alpha ~0.10), path = sum of two sines over x, drifting with time. `globalCompositeOperation: 'lighter'`.
- A soft vertical sky gradient (mauve → indigo → transparent) drawn under the ribbons each frame.
- Body's existing radial-gradient sky in `global.css` stays as the static base beneath the canvas.
- Perf/safety:
  - DPR capped at 2.
  - `requestAnimationFrame` loop pauses on `document.visibilitychange` (hidden).
  - Resize handler re-sizes the canvas.
  - `prefers-reduced-motion: reduce` → canvas not started (static gradient sky remains).
- **Removed:** the entire Dijkstra canvas block (`#hero-canvas` + inline script) in `Hero.astro`, and the hero-local blur glow divs (the aurora replaces them).

## 2. Editorial layout

General system (applies to `Now.astro`, `Experience.astro`, `Skills.astro`, `Connect.astro`):

- **Section shell:** two-column grid `[200px | 1fr]` (collapses to stacked below `lg`), top hairline rule (`--vh-hairline`), generous vertical padding (~py-28).
- **Left column:** sticky mono label, e.g. `01 / Now`, orchid, uppercase, tracking 2.5px, with optional muted sub-line (e.g. date).
- **Ghost numbers:** huge outlined index numbers (~150px, `-webkit-text-stroke: 1px rgba(168,201,255,.10)`, transparent fill) absolutely positioned right of each section, behind content, hidden on mobile.
- **No glass cards** in sections. Hairline rules separate items.

Per component:

- **Hero.astro**
  - Eyebrow: `Software Engineer · Madrid`, mono, ice, preceded by a 36px hairline dash.
  - Name: weight 900, `clamp(64px, 12vw, 130px)`, gradient text, line 2 (`Pérez`) offset right (~110px at desktop, none on mobile), tracking -5px desktop.
  - Thesis + bio + meta row indented to match the line-2 offset on desktop.
  - Meta row replaces CTA buttons + social icon rows: mono line `Founding eng Awtomic (YC S20) · Prev Eventbrite · EA · ING` style. Social links move to a single row of small mono text links (no circle buttons). Keep mail/GitHub/LinkedIn/Twitter links functional.
  - Glass panel around hero content removed.
  - Scroll hint stays.
- **Now.astro:** items become key/value editorial rows — grid `[150px | 1fr]`, mono uppercase ice key, body text value, hairline between rows.
- **Experience.astro:** timeline line + dots removed. Each entry: mono ice date, `Role · Company` heading (company in lilac, weight 500), description, bullets kept as a compact list, hairline between entries. Collapsed entry stays visually quieter (muted).
- **Skills.astro:** chips become two inline mono tag rows separated by `◦` markers (ice), investing row full opacity, production row ~70% opacity. Intro paragraph kept.
- **Connect.astro:** glass card removed. `04 / Contact` label, `Let's talk.` in large gradient type (~64px), email as mono underlined link, secondary line with LinkedIn + coffee-chat link, small social row. Footer kept.
- **Nav.astro:** glass pill removed; flat bar with mono uppercase links and gradient logo, subtle `background: rgba(6,6,26,.6)` + backdrop-blur only when shown (after scrolling past hero — existing behavior kept). Mobile hamburger + menu kept, restyled flat.
- **Section numbering:** Hero implicit, Now `01`, Work `02`, Stack `03`, Contact `04` (renumbered from current 02–05).

## 3. Motion (`src/scripts/animations.ts`)

Keep GSAP + ScrollTrigger structure; retune:

- Hero name lines: clip-path/translate reveal upward, staggered.
- Hero eyebrow/thesis/meta: existing fade-up stagger kept.
- Section reveals: rows/entries fade-up with small stagger on scroll into view (replaces card scale/slide reveals).
- Ghost numbers: slight parallax y-shift, scrubbed.
- Timeline-line draw animation removed (element gone).
- Nav show/hide and active-link tracking unchanged.
- `prefers-reduced-motion` guard unchanged.

## 4. Out of scope

- Content/copy changes, data file changes.
- New sections or pages.
- OG image, SEO metadata.

## Verification

Visual only (no testable logic; per CLAUDE.md no TDD for styling):

1. `npm run dev` — aurora visible and drifting on every viewport, behind all content.
2. Hero, Now, Work, Stack, Contact match the editorial mockup (`.superpowers/redesign-options.html`, option A).
3. Text legibility over aurora at all sections.
4. Mobile (≤640px): name scales down, columns stack, ghost numbers hidden, nav menu works.
5. `prefers-reduced-motion`: no canvas animation, no GSAP entrance animation, content fully visible.
6. Tab hidden → animation paused (check via Performance panel or rAF logging).
7. `npm run build` passes.
