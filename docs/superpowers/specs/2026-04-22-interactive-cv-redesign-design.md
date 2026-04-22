# 73nko.es — Interactive CV Redesign

## Overview

Complete redesign of 73nko.es from a Gatsby blog to a single-page interactive CV built with Astro, GSAP/ScrollTrigger, and Tailwind CSS. The site serves as a high-impact landing page that funnels visitors to professional profiles (GitHub, LinkedIn, email) while showcasing experience and skills with scroll-driven animations.

**Goal:** Professional presence with a "wow effect" — clean, sophisticated, motion-driven.
**Domain:** 73nko.es (kept)
**Hosting:** Netlify (kept)
**Language:** English only
**No blog.** The previous blog content will be removed.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro | Zero JS by default, islands architecture, excellent Netlify support, fast builds |
| Animations | GSAP + ScrollTrigger | Industry standard for scroll-driven animations, performant, battle-tested |
| Styling | Tailwind CSS | Utility-first, custom design tokens from palette, fast iteration |
| Typography | Inter (body/headings) + JetBrains Mono (labels/code) | From the Sunset · Pool Splash style guide |
| Icons | Lucide (SVG) | Clean, consistent stroke weight, tree-shakeable |
| Deployment | Netlify | Existing setup, static site deploys instantly |

---

## Visual Design System — Sunset · Pool Splash

The site uses the user's existing personal palette, originally designed for their terminal stack (Ghostty, tmux, Neovim). This creates a cohesive personal brand across all tools.

### Design Principles

1. **Warm leads, cool balances.** Sunset pinks, corals, and tangerines drive identity. Pool turquoise is the counterweight.
2. **Accents earn their place.** Magenta and turquoise are reserved for things that matter — CTAs, active states, key headings.
3. **Glass, not chrome.** Backdrop blur, rounded corners, soft inner glows instead of hard borders.
4. **The gradient is the brand.** The magenta → tangerine → turquoise gradient is the signature visual element.

### Color Tokens

```
// Identity — warm
--sp-magenta:      #FF3D8A   /* primary CTA, keywords, active states */
--sp-magenta-hi:   #FFB8D5   /* titles, company names, highlights */
--sp-tangerine:    #FF8A3D   /* secondary accent, functions */
--sp-peach:        #FFB07A   /* soft warm glow */
--sp-gold:         #FFD67A   /* tertiary accent */

// Structure — cool
--sp-turquoise:    #4EC9D7   /* structural elements */
--sp-turquoise-hi: #7FE0EB   /* dates, active nav, strings */
--sp-aqua:         #8FE3E8   /* quieter cool accent */
--sp-deep-pool:    #0D4858   /* on-turquoise text */

// Ground
--sp-dusk:         #1A0A28   /* deep background */
--sp-dusk-deep:    #0D0518   /* darkest background */
--sp-plum:         #3A1550   /* mid background */
--sp-wine:         #6A2050   /* warm mid-tone */
--sp-sunburn:      #C95A4A   /* warm accent */
--sp-sunsoft:      #F2A070   /* warm light */
--sp-rosegold:     #FFC6A0   /* default foreground text */
--sp-cream:        #F5ECD7   /* high-contrast text, rare */

// Surfaces
--sp-paper:        #18101F   /* page background */
--sp-ink:          #1F1630   /* card/surface background */
--sp-ink-line:     rgba(255,198,160,.14)  /* borders */
--sp-fg:           #EFE2D2   /* primary text */
--sp-muted:        rgba(239,226,210,.62)  /* secondary text */
--sp-faint:        rgba(239,226,210,.35)  /* tertiary text */
```

### Usage Ratio

60% rosegold foreground, 12% magenta, 12% turquoise-hi, 8% tangerine, 5% gold, 3% muted.

### Typography

- **Headings:** Inter, 800 weight, tight letter-spacing (-2px for hero, -0.5px for sections)
- **Body:** Inter, 400 weight, 15-16px, line-height 1.6
- **Labels/Mono:** JetBrains Mono, 500 weight, 11px, letter-spacing 2px, uppercase
- **Hero name:** 64px+ with gradient text (magenta → tangerine → turquoise)
- Loaded via Google Fonts with `font-display: swap`

---

## Page Structure

Single scrolling page with 4 sections + fixed navigation.

### Navigation (fixed header)

- Appears after scrolling past hero (GSAP ScrollTrigger toggle)
- Glassmorphic: `backdrop-filter: blur(24px)`, semi-transparent dusk background
- Left: "73nko" in gradient text (small)
- Right: section links (Experience, Skills, Connect)
- Active section highlighted via ScrollTrigger scroll-spy
- Mobile: hamburger icon → slide-in panel with same glass effect
- Height: ~56px, rounded bottom corners

### Section 1 — Hero (100vh)

- Full viewport height
- Background: radial gradient glows (magenta top-right, turquoise bottom-left) over dusk-deep
- Content:
  - Eyebrow pill: "Senior Frontend Engineer" in JetBrains Mono, turquoise-hi on turquoise/8% bg
  - Name: "Alejandro Pérez Ramos" — large gradient text (64px+, Inter 800)
  - Tagline: "Building exceptional web experiences" — 20px, rosegold
  - Brief bio: 1-2 sentences mentioning 10+ years of experience and key companies (Awtomic, Eventbrite, EA)
  - CTA buttons: "GitHub →" (magenta primary), "LinkedIn" and "Email" (turquoise secondary pills)
- Scroll hint at bottom: "Scroll" + animated down arrow
- Animation on load:
  - Name: staggered letter reveal from below (custom span-wrapping per character, GSAP stagger tween, 30ms/char, ease-out)
  - Eyebrow: fade-in + slide-down (200ms delay)
  - Tagline + bio: fade-up (400ms delay)
  - CTAs: slide-up with 100ms stagger (600ms delay)
  - Gradient glow: subtle pulse animation (4s loop, opacity 0.6→1→0.6)
- On scroll: entire hero parallax-fades upward (opacity 1→0, translateY 0→-50px)

### Section 2 — Experience Timeline

- Vertical timeline with gradient line on the left (magenta → tangerine → turquoise)
- Section header: "Career Timeline" with numbered label "02"
- Timeline entries (from resume):
  1. **Jun 2021 – Present:** Senior Software Engineer @ Awtomic (YC-backed, Employee #7) — current, glowing turquoise dot
  2. **Sep 2019 – Jun 2021:** Senior Software Engineer (Online Events) @ Eventbrite
  3. **Dec 2018 – Aug 2019:** Senior Frontend Developer @ Electronic Arts (EA)
  4. **Sep 2018 – Dec 2018:** Senior Software Engineering @ ING Bank
  5. **Dec 2017 – Sep 2018:** JavaScript Engineer @ Solera Global Data & Content
  6. **Feb 2016 – Sep 2017:** JavaScript Engineer @ Mediaset España
  7. **Jan 2013 – Feb 2016:** Junior Software Engineer @ Babel
- Each entry is a card (ink background, inkLine border, 12px radius) with:
  - Date range (JetBrains Mono, turquoise-hi)
  - Role title (17px, Inter 600)
  - Company name (13px, magenta-hi)
  - Brief description (13px, muted)
- Animation:
  - Gradient line draws from top to bottom (GSAP ScrollTrigger scrub, tied to section scroll progress)
  - Cards fade-in + slide from left (translateX -20px → 0), staggered
  - Current role dot pulses with turquoise glow

### Section 3 — Skills

- Section header: "Technical Stack" with numbered label "03"
- Three cards in a grid (3 columns desktop, 1 column mobile):
  1. **Frontend** (warm accent — magenta border-top gradient): React, TypeScript, Next.js, HTML, CSS, JavaScript, Chakra UI, Emotion, React Query
  2. **Backend & Infra** (cool accent — turquoise border-top gradient): Node.js, AWS Lambda, SQS, DynamoDB, Django, MySQL, Redis, Kafka
  3. **Tools & Practices** (gold accent — tangerine border-top gradient): Shopify Integration, Design Systems, Serverless Architecture, Microservices, E-commerce
- Skills displayed as tags/pills (JetBrains Mono, 11px) — no bars, no percentages
- Each card has a 2px gradient top border matching its accent
- Animation:
  - Cards scale 0.95 → 1 + fade in, staggered by 80ms
  - Tags within each card cascade in with 30ms stagger

### Section 4 — Connect

- Centered layout
- Background: ink with radial magenta glow at bottom (mirrors hero's top glow — bookend)
- "Let's connect" in gradient text (magenta-hi → turquoise-hi)
- Subtitle: "Open to interesting conversations and opportunities."
- Social links as pill buttons (turquoise secondary style):
  - GitHub (github.com/73nko)
  - LinkedIn (Alejandro Pérez)
  - Twitter/X (@73nko)
  - Email (me@alejandroperez.dev)
- Animation:
  - Title gradient text shimmers once on scroll-enter
  - Links slide up with stagger

---

## Animation System

All animations use GSAP + ScrollTrigger.

### Load Animations (hero only)
- Staggered sequence: eyebrow → name (custom char-split into spans) → tagline → bio → CTAs
- Total entrance: ~1.2s
- Easing: `power3.out` for entrances

### Scroll Animations (all other sections)
- Trigger: element enters viewport (start: "top 80%")
- Default motion: fade-in + translateY(30px → 0) or translateX(-20px → 0)
- Duration: 0.6-0.8s per element
- Stagger: 30-100ms between siblings
- Easing: `power2.out`
- Timeline line draw: scrub mode (tied to scroll position)

### Parallax
- Hero only: content moves up at 0.5x scroll speed, fades to 0
- Subtle, not aggressive

### Performance
- Only animate `transform` and `opacity` (GPU-composited properties)
- Use `will-change: transform` sparingly on animated elements
- Lazy-load GSAP ScrollTrigger (not needed for above-fold)

### Accessibility
- `prefers-reduced-motion: reduce`: all animations disabled, content displayed instantly
- No content is hidden behind animations — everything is visible in reduced-motion mode
- Scroll hint hidden in reduced-motion

---

## Responsive Design

| Breakpoint | Layout Changes |
|-----------|----------------|
| < 640px (mobile) | Single column. Hero name ~36px. Skills cards stack. Nav → hamburger. Timeline cards full-width. |
| 640-1024px (tablet) | Skills 2-column grid. Hero name ~48px. Nav visible. |
| > 1024px (desktop) | Full 3-column skills grid. Hero name 64px. Max-width 1100px centered. |

- Mobile-first approach in Tailwind
- `min-h-dvh` for hero (not `100vh`) to handle mobile browser chrome
- Touch targets minimum 44x44px
- No horizontal scroll

---

## SEO & Meta

- Title: "Alejandro Pérez — Senior Software Engineer"
- Description: "Senior Software Engineer with 10+ years of experience building impactful web applications. React, TypeScript, Node.js, AWS."
- Open Graph image: static screenshot of hero section
- Canonical URL: https://www.73nko.es
- Sitemap generation via Astro integration
- Semantic HTML: proper heading hierarchy, landmark regions, alt text on any images

---

## Deployment

- Netlify with existing setup
- Astro static output (no SSR needed)
- Build command: `astro build`
- Publish directory: `dist/`
- No blog, no RSS feed, no offline/PWA needed

---

## Content Source

All content derived from the user's resume (alejandro-perez-ramos_resume.pdf):
- Name, title, bio from resume header
- Experience entries from work history
- Skills from technical skills section
- Social links from resume contact info

---

## Out of Scope

- Blog / articles
- Dark/light mode toggle (site is dark-only, matching the palette)
- Contact form (links to email/social instead)
- Analytics (can be added later)
- i18n / multi-language
- CMS integration
