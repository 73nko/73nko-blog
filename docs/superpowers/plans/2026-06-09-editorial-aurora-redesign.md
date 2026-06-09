# Editorial + Aurora Silk Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Dijkstra hero canvas with a full-page ambient Aurora Silk background and restructure all sections into an editorial, typography-led layout.

**Architecture:** A new self-initializing `aurora.ts` script renders 4 sine-wave ribbons into a fixed full-viewport canvas mounted in `Layout.astro` at `z-index: -1`. Every section component is rewritten from glass-card layout to a shared editorial shell (two-column `[200px | 1fr]` grid, sticky mono label, ghost outline number, hairline rules). GSAP animations are retuned to a single `.reveal-row` pattern plus ghost-number parallax.

**Tech Stack:** Astro 5, Tailwind 4 (`@theme` tokens in `global.css`), GSAP + ScrollTrigger, Canvas 2D, TypeScript.

**Spec:** `docs/superpowers/specs/2026-06-09-editorial-aurora-redesign-design.md`

**Testing note:** This is a styling/visual change — per project CLAUDE.md, no TDD. Each task is verified visually in the dev server (`npm run dev`, http://localhost:4321) and the final task runs `npm run build`.

**File map:**

| File | Action | Responsibility |
|---|---|---|
| `src/scripts/aurora.ts` | Create | Aurora Silk canvas renderer (self-initializing) |
| `src/layouts/Layout.astro` | Modify | Mount fixed canvas + aurora script |
| `src/styles/global.css` | Modify | `.ghost-num` utility |
| `src/components/Hero.astro` | Rewrite | Editorial hero; Dijkstra canvas removed |
| `src/components/Nav.astro` | Modify | Flat editorial nav bar |
| `src/components/Now.astro` | Rewrite | Editorial key/value rows |
| `src/components/Experience.astro` | Rewrite | Editorial work list (no timeline) |
| `src/components/Skills.astro` | Rewrite | Inline mono tag rows |
| `src/components/Connect.astro` | Rewrite | "Let's talk." editorial contact |
| `src/scripts/animations.ts` | Modify | Retuned GSAP reveals |

---

### Task 1: Aurora Silk background

**Files:**
- Create: `src/scripts/aurora.ts`
- Modify: `src/layouts/Layout.astro` (body)
- Modify: `src/styles/global.css` (append utility)

- [ ] **Step 1: Create `src/scripts/aurora.ts`**

```ts
const canvas = document.getElementById('aurora-canvas') as HTMLCanvasElement | null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let rafId = 0;

  interface Ribbon {
    color: [number, number, number];
    yBase: number;
    amp: number;
    speed: number;
    width: number;
    phase: number;
  }

  // Violet Hour: orchid, periwinkle, ice, rose-mist
  const ribbons: Ribbon[] = [
    { color: [179, 157, 255], yBase: 0.26, amp: 46, speed: 0.0001, width: 90, phase: 0 },
    { color: [141, 167, 255], yBase: 0.46, amp: 60, speed: 0.00014, width: 110, phase: 2 },
    { color: [168, 201, 255], yBase: 0.6, amp: 38, speed: 0.00008, width: 70, phase: 4 },
    { color: [226, 188, 255], yBase: 0.8, amp: 52, speed: 0.00012, width: 95, phase: 1 },
  ];

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas!.width = w * dpr;
    canvas!.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function ribbonY(rb: Ribbon, x: number, t: number): number {
    return (
      h * rb.yBase +
      Math.sin(x * 0.006 + t * rb.speed * 9 + rb.phase) * rb.amp +
      Math.sin(x * 0.0023 - t * rb.speed * 5 + rb.phase * 2) * rb.amp * 0.7
    );
  }

  function draw(t: number) {
    ctx.clearRect(0, 0, w, h);

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, 'rgba(74,61,149,0.20)');
    sky.addColorStop(0.6, 'rgba(26,23,69,0.10)');
    sky.addColorStop(1, 'rgba(6,6,26,0)');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (const rb of ribbons) {
      const [r, g, b] = rb.color;
      // soft ribbon body: 5 stacked translucent strokes
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 12) {
          const y = ribbonY(rb, x, t) + (layer - 2) * rb.width * 0.16;
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},0.03)`;
        ctx.lineWidth = rb.width * (1 - layer * 0.14);
        ctx.stroke();
      }
      // bright spine
      ctx.beginPath();
      for (let x = -20; x <= w + 20; x += 12) {
        const y = ribbonY(rb, x, t);
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},0.10)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    rafId = requestAnimationFrame(draw);
  }

  resize();
  rafId = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!rafId) {
      rafId = requestAnimationFrame(draw);
    }
  });
}
```

- [ ] **Step 2: Mount canvas in `src/layouts/Layout.astro`**

Replace the current body:

```html
  <body>
    <slot />
  </body>
```

with:

```html
  <body>
    <canvas
      id="aurora-canvas"
      class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"></canvas>
    <slot />
    <script>
      import '../scripts/aurora';
    </script>
  </body>
```

- [ ] **Step 3: Append `.ghost-num` utility to `src/styles/global.css`** (after the `.gradient-text` block)

```css
/* Outlined ghost section numbers — editorial layout */
.ghost-num {
  color: transparent;
  -webkit-text-stroke: 1px rgba(168, 201, 255, 0.1);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -6px;
  user-select: none;
}
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`, open http://localhost:4321.
Expected: drifting aurora ribbons visible across the whole page height (scroll — they stay fixed behind content). Dijkstra constellation still present in hero (removed in Task 2).

- [ ] **Step 5: Commit**

```bash
git add src/scripts/aurora.ts src/layouts/Layout.astro src/styles/global.css
git commit -m "Add full-page Aurora Silk canvas background"
```

---

### Task 2: Editorial hero (removes Dijkstra)

**Files:**
- Rewrite: `src/components/Hero.astro`

- [ ] **Step 1: Replace the entire content of `src/components/Hero.astro`**

The Dijkstra canvas, its inline script, the glow divs, the glass panel, CTA buttons, and icon imports are all removed. Social links become a mono text row.

```astro
---
import { socialLinks } from '../data/social';
---

<section id="hero" class="relative flex min-h-dvh flex-col justify-center px-6 py-0 sm:px-12 lg:px-20">
  <!-- Logo — top left -->
  <div class="absolute left-6 top-6 z-20 sm:left-12 lg:left-20">
    <a href="#hero" class="gradient-text font-mono text-2xl font-bold tracking-[-1px] no-underline sm:text-3xl">
      73nko
    </a>
  </div>

  <div class="relative z-10 mx-auto w-full max-w-[1100px]">
    <!-- Eyebrow -->
    <div class="hero-animate flex items-center gap-3 font-mono text-[11px] uppercase tracking-[3px] text-vh-ice">
      <span class="h-px w-9 bg-vh-ice/50" aria-hidden="true"></span>
      Software Engineer · Madrid
    </div>

    <!-- Name -->
    <h1 class="my-6 text-[clamp(64px,12vw,130px)] font-black leading-[0.95] tracking-[-0.04em]">
      <span class="block overflow-hidden">
        <span class="gradient-text block" data-split-text>Alejandro</span>
      </span>
      <span class="block overflow-hidden lg:pl-[110px]">
        <span class="gradient-text block" data-split-text>Pérez</span>
      </span>
    </h1>

    <div class="lg:pl-[110px]">
      <!-- Thesis -->
      <p class="hero-animate mb-3 max-w-[560px] text-lg leading-relaxed text-vh-star/90 sm:text-[21px]">
        I build the backend infrastructure that gets <em class="not-italic font-medium text-vh-lilac">quieter</em>, not louder, as traffic grows.
      </p>

      <!-- Bio -->
      <p class="hero-animate mb-7 max-w-[560px] text-[15px] leading-relaxed text-[--vh-muted]">
        Founding engineer at <span class="text-vh-star/85">Awtomic</span> (YC S20). 10+ years across Eventbrite, EA, ING. Currently going deep on distributed systems, observability, and the next wave of frontend.
      </p>

      <!-- Social links — mono text row -->
      <div class="hero-animate flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] tracking-[0.5px]">
        {socialLinks.map((link) => (
          <a
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            class="text-vh-lilac/70 no-underline transition-colors duration-200 hover:text-vh-ice"
          >
            {link.name} ↗
          </a>
        ))}
      </div>
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[2px] text-[--vh-faint] motion-reduce:hidden" aria-hidden="true">
    <span>Scroll</span>
    <span class="animate-bounce text-base">↓</span>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: huge offset name over the aurora, no constellation, no glass panel, social links as mono text. Check at ~375px width: name shrinks via clamp, second line not indented.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "Rewrite hero as editorial type-led layout, remove Dijkstra canvas"
```

---

### Task 3: Flat editorial nav

**Files:**
- Modify: `src/components/Nav.astro` (markup only; keep the `<script>` block at the bottom unchanged)

- [ ] **Step 1: Replace the `<nav>` markup** (everything except the frontmatter and the trailing `<script>`)

```astro
<nav
  id="main-nav"
  class="fixed inset-x-0 top-0 z-50 translate-y-[-100%] border-b border-[--vh-hairline] bg-vh-abyss/60 backdrop-blur-xl transition-transform duration-300"
  aria-label="Main navigation"
  data-nav
>
  <div class="mx-auto flex h-12 w-full max-w-[1100px] items-center justify-between px-6 sm:px-12 lg:px-20">
    <a href="#hero" class="gradient-text font-mono text-sm font-bold tracking-[-0.5px] no-underline">
      73nko
    </a>

    {/* Desktop links */}
    <div class="hidden items-center gap-7 sm:flex">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="font-mono text-[11px] uppercase tracking-[1.5px] text-vh-lilac/60 no-underline transition-colors duration-200 hover:text-vh-ice"
          data-nav-link
        >
          {link.name}
        </a>
      ))}
    </div>

    {/* Mobile hamburger */}
    <button
      class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 hover:bg-vh-ice/10 sm:hidden"
      aria-label="Toggle navigation menu"
      data-nav-toggle
    >
      <svg class="h-4 w-4 text-vh-lilac" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {/* Mobile menu */}
  <div class="hidden border-t border-[--vh-hairline] bg-vh-abyss/80 backdrop-blur-xl sm:hidden" data-nav-mobile>
    <div class="flex flex-col gap-1 p-3">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-[1.5px] text-vh-lilac/60 no-underline transition-all duration-200 hover:bg-vh-ice/10 hover:text-vh-ice"
          data-nav-link
        >
          {link.name}
        </a>
      ))}
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Verify in browser**

Scroll past hero → flat translucent bar slides in with mono links. At mobile width, hamburger opens the flat menu; tapping a link closes it.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "Restyle nav as flat editorial bar"
```

---

### Task 4: Now — editorial key/value rows

**Files:**
- Rewrite: `src/components/Now.astro`

- [ ] **Step 1: Replace the entire content of `src/components/Now.astro`** (frontmatter `items` array stays identical)

```astro
---
const items = [
  {
    label: 'Building',
    body: 'An open-source web performance SDK. Lightweight, browser-first, OpenTelemetry-compatible.',
  },
  {
    label: 'Going deep on',
    body: 'ClickHouse for analytics workloads and OpenTelemetry for end-to-end observability.',
  },
  {
    label: 'Reading',
    body: '“Designing Data-Intensive Applications” — second pass, this time with notes.',
  },
  {
    label: 'Writing',
    body: 'First technical post lands in June: lessons from running a multi-tenant Shopify pipeline at Awtomic.',
  },
];
---

<section id="now" class="relative px-6 py-28 sm:px-12 lg:px-20">
  <div class="relative mx-auto w-full max-w-[1100px] border-t border-[--vh-hairline] pt-14">
    <div class="ghost-num pointer-events-none absolute -top-3 right-0 hidden text-[150px] lg:block" aria-hidden="true">01</div>

    <div class="relative grid gap-10 lg:grid-cols-[200px_1fr]">
      <!-- Sticky label -->
      <div>
        <div class="font-mono text-[11px] uppercase tracking-[2.5px] text-vh-orchid lg:sticky lg:top-24">
          01 / Now
          <span class="mt-1.5 block normal-case tracking-[1.5px] text-[--vh-faint]">May 2026</span>
        </div>
      </div>

      <!-- Content -->
      <div>
        <p class="reveal-row mb-8 max-w-[620px] text-[15px] leading-relaxed text-[--vh-muted]">
          What I'm working on this quarter. A snapshot, kept honest. <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="underline decoration-vh-ice/30 underline-offset-4 transition-colors hover:text-vh-ice hover:decoration-vh-ice">Inspired by /now pages</a>.
        </p>

        {items.map((item) => (
          <div class="reveal-row grid gap-2 border-b border-[--vh-hairline] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-5">
            <span class="pt-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[2px] text-vh-ice">
              {item.label}
            </span>
            <p class="text-[14.5px] leading-relaxed text-vh-star/85">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: hairline-ruled key/value rows, sticky `01 / Now` label on desktop, ghost `01` outline at top-right (hidden below `lg`).

- [ ] **Step 3: Commit**

```bash
git add src/components/Now.astro
git commit -m "Rewrite Now section as editorial key/value rows"
```

---

### Task 5: Experience — editorial work list

**Files:**
- Rewrite: `src/components/Experience.astro`

- [ ] **Step 1: Replace the entire content of `src/components/Experience.astro`**

Timeline line, dots, and glass cards removed.

```astro
---
import { experience } from '../data/experience';
---

<section id="experience" class="relative px-6 py-28 sm:px-12 lg:px-20">
  <div class="relative mx-auto w-full max-w-[1100px] border-t border-[--vh-hairline] pt-14">
    <div class="ghost-num pointer-events-none absolute -top-3 right-0 hidden text-[150px] lg:block" aria-hidden="true">02</div>

    <div class="relative grid gap-10 lg:grid-cols-[200px_1fr]">
      <div>
        <div class="font-mono text-[11px] uppercase tracking-[2.5px] text-vh-orchid lg:sticky lg:top-24">
          02 / Selected work
        </div>
      </div>

      <div>
        {experience.map((entry) => (
          <div class:list={[
            'reveal-row border-b border-[--vh-hairline] py-7 first:pt-0 last:border-b-0',
            entry.collapsed && 'opacity-70',
          ]}>
            <span class="font-mono text-[11px] tracking-[1px] text-vh-ice">{entry.dateRange}</span>
            <h3 class="mt-2 text-[19px] font-bold tracking-[-0.3px] text-vh-star">
              {entry.role} <span class="font-medium text-vh-lilac">· {entry.company}</span>
            </h3>
            <p class="mt-2 max-w-[620px] text-sm leading-relaxed text-[--vh-muted]">{entry.description}</p>
            {entry.bullets && (
              <ul class="mt-3 flex max-w-[620px] flex-col gap-1.5">
                {entry.bullets.map((bullet) => (
                  <li class="flex items-start gap-2 text-[13px] leading-relaxed text-[--vh-muted]">
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vh-ice/60"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: clean list with hairlines between jobs, no timeline line/dots, collapsed entry dimmed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.astro
git commit -m "Rewrite experience as editorial work list"
```

---

### Task 6: Skills — inline mono tag rows

**Files:**
- Rewrite: `src/components/Skills.astro`

- [ ] **Step 1: Replace the entire content of `src/components/Skills.astro`**

```astro
---
import { investingIn, productionExperience } from '../data/skills';
---

<section id="skills" class="relative px-6 py-28 sm:px-12 lg:px-20">
  <div class="relative mx-auto w-full max-w-[1100px] border-t border-[--vh-hairline] pt-14">
    <div class="ghost-num pointer-events-none absolute -top-3 right-0 hidden text-[150px] lg:block" aria-hidden="true">03</div>

    <div class="relative grid gap-10 lg:grid-cols-[200px_1fr]">
      <div>
        <div class="font-mono text-[11px] uppercase tracking-[2.5px] text-vh-orchid lg:sticky lg:top-24">
          03 / Stack
        </div>
      </div>

      <div>
        <p class="reveal-row mb-8 max-w-[620px] text-[15px] leading-relaxed text-[--vh-muted]">
          Two lists, kept honest. What I'm investing time in right now, and what I'd reach for in production tomorrow without a second thought.
        </p>

        <div class="reveal-row mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[2px] text-vh-ice">
          {investingIn.name}
        </div>
        <div class="reveal-row flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-[12.5px] text-vh-lilac">
          {investingIn.skills.map((skill) => (
            <span><span class="text-vh-ice">◦</span> {skill}</span>
          ))}
        </div>

        <div class="reveal-row mb-2 mt-9 font-mono text-[10.5px] font-medium uppercase tracking-[2px] text-vh-orchid">
          {productionExperience.name}
        </div>
        <div class="reveal-row flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-[12.5px] text-vh-lilac opacity-70">
          {productionExperience.skills.map((skill) => (
            <span><span class="text-vh-ice">◦</span> {skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: two labelled mono tag rows with `◦` markers, production row dimmed; no chips/cards.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.astro
git commit -m "Rewrite skills as inline mono tag rows"
```

---

### Task 7: Connect — "Let's talk."

**Files:**
- Rewrite: `src/components/Connect.astro`

- [ ] **Step 1: Replace the entire content of `src/components/Connect.astro`**

Glass card and icon buttons removed; lucide imports dropped.

```astro
---
import { socialLinks } from '../data/social';
import { CAL_BOOKING_URL, CONTACT_EMAIL } from '../data/links';

const trailingSocials = socialLinks.filter((link) => link.icon !== 'mail');
---

<section id="contact" class="relative px-6 py-28 sm:px-12 lg:px-20">
  <div class="relative mx-auto w-full max-w-[1100px] border-t border-[--vh-hairline] pt-14">
    <div class="ghost-num pointer-events-none absolute -top-3 right-0 hidden text-[150px] lg:block" aria-hidden="true">04</div>

    <div class="relative grid gap-10 lg:grid-cols-[200px_1fr]">
      <div>
        <div class="font-mono text-[11px] uppercase tracking-[2.5px] text-vh-orchid lg:sticky lg:top-24">
          04 / Contact
        </div>
      </div>

      <div>
        <h2 class="gradient-text text-[clamp(44px,7vw,64px)] font-black leading-[1.05] tracking-[-3px]">
          Let's talk.
        </h2>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          class="mt-7 inline-block border-b border-vh-ice/35 pb-1 font-mono text-base text-vh-ice no-underline transition-colors duration-200 hover:border-vh-ice"
        >
          {CONTACT_EMAIL} →
        </a>

        <p class="mt-7 max-w-[620px] text-[15px] leading-relaxed text-[--vh-muted]">
          Roles, collaborations, and technical conversations all welcome. Open to short coffee chats and mentoring:
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="ml-1 underline decoration-vh-ice/30 underline-offset-4 transition-colors hover:text-vh-ice hover:decoration-vh-ice"
          >
            book a 30-min coffee chat →
          </a>
        </p>

        <div class="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] tracking-[0.5px]">
          {trailingSocials.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-vh-lilac/70 no-underline transition-colors duration-200 hover:text-vh-ice"
            >
              {link.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer class="mt-20 border-t border-[--vh-hairline] pt-6 text-center font-mono text-xs text-[--vh-faint]">
      <p>&copy; {new Date().getFullYear()} Alejandro Pérez.</p>
    </footer>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Expected: big gradient "Let's talk.", mono email link, coffee-chat link, mono social row, footer intact. All links work.

- [ ] **Step 3: Commit**

```bash
git add src/components/Connect.astro
git commit -m "Rewrite contact as editorial Let's talk section"
```

---

### Task 8: Retune GSAP animations

**Files:**
- Modify: `src/scripts/animations.ts`

- [ ] **Step 1: Replace the entire content of `src/scripts/animations.ts`**

Changes vs. current: name lines use `yPercent` slide-out-of-overflow reveal; `.timeline-card` / `.skill-card` / `.services-animate` / timeline-line blocks replaced by one `.reveal-row` pattern; ghost-number parallax added; nav + contact blocks kept.

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  initAnimations();
}

function initAnimations() {
  // --- NAV: show/hide on scroll past hero ---
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top',
      onEnterBack: () => gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.in' }),
      onLeave: () => gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' }),
    });
  }

  // --- NAV: active section tracking ---
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = ['#now', '#experience', '#skills', '#contact'];

  sections.forEach((sectionId) => {
    ScrollTrigger.create({
      trigger: sectionId,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => {
        if (isActive) {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === sectionId) {
              link.classList.add('!text-vh-ice');
            } else {
              link.classList.remove('!text-vh-ice');
            }
          });
        }
      },
    });
  });

  // --- HERO: name lines slide up out of overflow wrappers ---
  const nameLines = gsap.utils.toArray('[data-split-text]') as HTMLElement[];
  gsap.from(nameLines, {
    yPercent: 110,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power4.out',
    delay: 0.25,
  });

  // --- HERO: staggered entrance for eyebrow / thesis / bio / socials ---
  const heroElements = gsap.utils.toArray('.hero-animate') as HTMLElement[];
  gsap.from(heroElements, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.5,
  });

  // --- HERO: parallax fade on scroll ---
  gsap.to('#hero > .relative', {
    y: -50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // --- SECTIONS: editorial row reveals ---
  gsap.utils.toArray('.reveal-row').forEach((row) => {
    gsap.from(row as HTMLElement, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: row as HTMLElement,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // --- SECTIONS: ghost number parallax ---
  gsap.utils.toArray('.ghost-num').forEach((num) => {
    const el = num as HTMLElement;
    gsap.fromTo(
      el,
      { y: 50 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });

  // --- CONTACT: fade in ---
  const contactElements = gsap.utils.toArray('#contact h2, #contact > div a') as HTMLElement[];
  if (contactElements.length) {
    gsap.set(contactElements, { y: 20, opacity: 0 });
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 85%',
      onEnter: () => {
        gsap.to(contactElements, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        });
      },
      once: true,
    });
  }
}
```

- [ ] **Step 2: Verify in browser**

Hard-reload http://localhost:4321. Expected: name lines slide up from behind overflow masks; rows fade up as you scroll; ghost numbers drift slowly; nav still appears after hero; no console errors; no permanently-invisible elements (scroll the entire page).

- [ ] **Step 3: Commit**

```bash
git add src/scripts/animations.ts
git commit -m "Retune animations for editorial layout"
```

---

### Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full visual pass against the spec**

With `npm run dev` running, check:
1. Aurora drifts on every viewport, fixed behind all content while scrolling.
2. Hero, Now (01), Work (02), Stack (03), Contact (04) match the editorial mockup (`.superpowers/redesign-options.html`, option A).
3. Text legible over the aurora in all sections.
4. Mobile ≤ 640px: columns stack, ghost numbers hidden, name scales down, hamburger menu opens/closes.
5. Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering): no aurora animation, all content visible without entrance animation.
6. Switch to another tab and back: aurora resumes (visibilitychange pause works).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Remove demo artifacts and commit anything outstanding**

```bash
git status
```

If `.superpowers/` is untracked, leave it (scratch dir); do not commit it. Confirm working tree otherwise clean.
