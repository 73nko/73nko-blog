# Interactive CV Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Gatsby blog with a single-page interactive CV built with Astro, GSAP scroll animations, and the Sunset · Pool Splash palette.

**Architecture:** Astro static site with zero-JS-by-default pages. GSAP + ScrollTrigger loaded as a client-side island for scroll-driven animations. Tailwind CSS with custom design tokens from the Sunset · Pool Splash palette. Single `index.astro` page composed of section components.

**Tech Stack:** Astro 5, GSAP 3 + ScrollTrigger, Tailwind CSS 4, TypeScript, Lucide icons, Google Fonts (Inter + JetBrains Mono), Netlify deployment.

**Content source:** All experience, skills, and bio content comes from `alejandro-perez-ramos_resume.pdf` in the project root.

**Design spec:** `docs/superpowers/specs/2026-04-22-interactive-cv-redesign-design.md`

---

## File Structure

```
src/
  layouts/
    Layout.astro              # Base HTML layout (head, fonts, meta, body)
  pages/
    index.astro               # Single page composing all sections
  components/
    Nav.astro                 # Fixed glassmorphic navigation header
    Hero.astro                # Hero section (name, role, bio, CTAs)
    Experience.astro          # Career timeline section
    Skills.astro              # Technical skills grid section
    Connect.astro             # Contact/social links section
  scripts/
    animations.ts             # GSAP ScrollTrigger setup for all sections
  data/
    experience.ts             # Experience entries data
    skills.ts                 # Skills data grouped by category
    social.ts                 # Social links data
  styles/
    global.css                # Tailwind directives + custom properties
public/
  favicon.svg                 # Simple favicon
astro.config.mjs              # Astro config with Tailwind + sitemap
tailwind.config.mjs           # Tailwind config with Sunset · Pool Splash tokens
tsconfig.json                 # TypeScript config
package.json                  # Dependencies and scripts
netlify.toml                  # Netlify build config
```

---

### Task 1: Scaffold Astro project with Tailwind and design tokens

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `tailwind.config.mjs`
- Create: `public/favicon.svg`
- Create: `netlify.toml`

- [ ] **Step 1: Initialize Astro project**

Run from the project root. This will overwrite the existing Gatsby files over time, but we start fresh with Astro scaffolding:

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about overwriting, accept — we're replacing the entire stack.

- [ ] **Step 2: Install dependencies**

```bash
npm install astro @astrojs/tailwind @astrojs/sitemap gsap lucide-astro
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Create `astro.config.mjs`**

```typescript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.73nko.es',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create `src/styles/global.css` with Tailwind directives and design tokens**

```css
@import 'tailwindcss';

@theme {
  /* Identity — warm */
  --color-sp-magenta: #FF3D8A;
  --color-sp-magenta-hi: #FFB8D5;
  --color-sp-tangerine: #FF8A3D;
  --color-sp-peach: #FFB07A;
  --color-sp-gold: #FFD67A;

  /* Structure — cool */
  --color-sp-turquoise: #4EC9D7;
  --color-sp-turquoise-hi: #7FE0EB;
  --color-sp-aqua: #8FE3E8;
  --color-sp-deep-pool: #0D4858;

  /* Ground */
  --color-sp-dusk: #1A0A28;
  --color-sp-dusk-deep: #0D0518;
  --color-sp-plum: #3A1550;
  --color-sp-wine: #6A2050;
  --color-sp-sunburn: #C95A4A;
  --color-sp-sunsoft: #F2A070;
  --color-sp-rosegold: #FFC6A0;
  --color-sp-cream: #F5ECD7;

  /* Surfaces */
  --color-sp-paper: #18101F;
  --color-sp-ink: #1F1630;
  --color-sp-fg: #EFE2D2;

  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Alpha colors (not supported in @theme) */
:root {
  --sp-ink-line: rgba(255, 198, 160, 0.14);
  --sp-muted: rgba(239, 226, 210, 0.62);
  --sp-faint: rgba(239, 226, 210, 0.35);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-sp-paper);
  color: var(--color-sp-fg);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(100deg, var(--color-sp-magenta-hi) 0%, var(--color-sp-magenta) 30%, var(--color-sp-tangerine) 55%, var(--color-sp-turquoise-hi) 95%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1A0A28"/>
  <text x="16" y="22" text-anchor="middle" font-family="monospace" font-weight="700" font-size="16" fill="#FF3D8A">73</text>
</svg>
```

- [ ] **Step 6: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

- [ ] **Step 7: Verify the project builds**

```bash
npx astro build
```

Expected: Build succeeds with output in `dist/`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/styles/global.css tailwind.config.mjs public/favicon.svg netlify.toml src/env.d.ts
git commit -m "Scaffold Astro project with Tailwind and Sunset Pool Splash tokens"
```

---

### Task 2: Create base layout and data files

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/social.ts`

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@73nko" />
    <title>{title}</title>
    <style>
      @import '../styles/global.css';
    </style>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Create `src/data/experience.ts`**

Content extracted directly from `alejandro-perez-ramos_resume.pdf`:

```typescript
export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  location: string;
  description: string;
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: 'Jun 2021 — Present',
    role: 'Senior Software Engineer',
    company: 'Awtomic',
    location: 'Remote, Spain',
    description:
      'Founding team member (#7) at YCombinator-backed startup. Architected scalable AWS serverless infrastructure (Lambda, SQS, DynamoDB) handling Shopify webhooks for 200+ businesses. Led creation of two React/Next.js frontend applications with custom design system.',
    current: true,
  },
  {
    dateRange: 'Sep 2019 — Jun 2021',
    role: 'Senior Software Engineer',
    company: 'Eventbrite',
    location: 'Remote, Spain',
    description:
      'Migrated critical high-traffic services from monolithic to service-oriented architecture. Integrated Zoom with Online Events, increasing online events from 6% to nearly 30%. Built with React, TypeScript, Django, MySQL, Redis, and Kafka.',
  },
  {
    dateRange: 'Dec 2018 — Aug 2019',
    role: 'Senior Frontend Developer',
    company: 'Electronic Arts (EA)',
    location: 'Madrid, Spain',
    description:
      'Senior frontend development for internal tools and gaming platforms.',
  },
  {
    dateRange: 'Sep 2018 — Dec 2018',
    role: 'Senior Software Engineer',
    company: 'ING Bank',
    location: 'Madrid, Spain',
    description:
      'Frontend engineering for banking applications.',
  },
  {
    dateRange: 'Dec 2017 — Sep 2018',
    role: 'JavaScript Engineer',
    company: 'Solera Global Data & Content',
    location: 'Madrid, Spain',
    description:
      'JavaScript development for data and content management platforms.',
  },
  {
    dateRange: 'Feb 2016 — Sep 2017',
    role: 'JavaScript Engineer',
    company: 'Mediaset España',
    location: 'Madrid, Spain',
    description:
      'Frontend development for media and broadcasting platforms.',
  },
  {
    dateRange: 'Jan 2013 — Feb 2016',
    role: 'Junior Software Engineer',
    company: 'Babel',
    location: 'Madrid, Spain',
    description:
      'Full-stack web development, database management, and server administration. First steps into the JavaScript ecosystem.',
  },
];
```

- [ ] **Step 3: Create `src/data/skills.ts`**

```typescript
export interface SkillCategory {
  name: string;
  accent: 'warm' | 'cool' | 'gold';
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    accent: 'warm',
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'HTML',
      'CSS',
      'JavaScript',
      'Chakra UI',
      'Emotion',
      'React Query',
    ],
  },
  {
    name: 'Backend & Infra',
    accent: 'cool',
    skills: [
      'Node.js',
      'AWS Lambda',
      'SQS',
      'DynamoDB',
      'Django',
      'MySQL',
      'Redis',
      'Kafka',
    ],
  },
  {
    name: 'Tools & Practices',
    accent: 'gold',
    skills: [
      'Shopify Integration',
      'Design Systems',
      'Serverless',
      'Microservices',
      'E-commerce',
      'Agile',
    ],
  },
];
```

- [ ] **Step 4: Create `src/data/social.ts`**

```typescript
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/73nko',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alejandroperez',
    icon: 'linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/73nko',
    icon: 'twitter',
  },
  {
    name: 'Email',
    url: 'mailto:me@alejandroperez.dev',
    icon: 'mail',
  },
];
```

- [ ] **Step 5: Verify build**

```bash
npx astro build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Layout.astro src/data/experience.ts src/data/skills.ts src/data/social.ts
git commit -m "Add base layout and content data files from resume"
```

---

### Task 3: Build Hero section component

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { socialLinks } from '../data/social';
---

<section id="hero" class="relative flex min-h-dvh flex-col items-start justify-center px-6 py-20 sm:px-12 lg:px-20">
  <!-- Background glows -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-sp-magenta/[0.08] blur-[120px]"></div>
    <div class="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-sp-turquoise-hi/[0.06] blur-[100px]"></div>
  </div>

  <div class="relative z-10 mx-auto w-full max-w-[1100px]">
    <!-- Eyebrow -->
    <span
      class="hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-sp-turquoise-hi/20 bg-sp-turquoise-hi/[0.08] px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[2px] text-sp-turquoise-hi"
    >
      Senior Software Engineer
    </span>

    <!-- Name -->
    <h1 class="hero-animate mb-4 text-4xl font-extrabold tracking-[-2px] sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
      <span class="gradient-text" data-split-text>Alejandro</span>
      <br />
      <span class="gradient-text" data-split-text>Pérez</span>
    </h1>

    <!-- Tagline -->
    <p class="hero-animate mb-2 text-lg text-sp-fg/85 sm:text-xl">
      Building <em class="not-italic font-medium text-sp-magenta-hi">exceptional</em> web experiences
    </p>

    <!-- Bio -->
    <p class="hero-animate mb-8 max-w-[520px] text-[15px] text-[--sp-muted]">
      10+ years crafting performant, scalable applications — from YC-backed startups to global platforms like Eventbrite and EA. Currently building e-commerce infrastructure at Awtomic.
    </p>

    <!-- CTAs -->
    <div class="hero-animate flex flex-wrap gap-3">
      {socialLinks.map((link) => (
        <a
          href={link.url}
          target={link.url.startsWith('mailto') ? undefined : '_blank'}
          rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          class:list={[
            'inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-medium tracking-[0.5px] transition-all duration-200',
            link.name === 'GitHub'
              ? 'bg-sp-magenta text-sp-dusk hover:bg-sp-magenta-hi'
              : 'border border-sp-turquoise-hi/25 bg-sp-turquoise-hi/[0.12] text-sp-turquoise-hi hover:bg-sp-turquoise-hi/20',
          ]}
        >
          {link.name}{link.name === 'GitHub' ? ' →' : ''}
        </a>
      ))}
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[2px] text-[--sp-faint] motion-reduce:hidden" aria-hidden="true">
    <span>Scroll</span>
    <span class="animate-bounce text-base">↓</span>
  </div>
</section>
```

- [ ] **Step 2: Create `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout
  title="Alejandro Pérez — Senior Software Engineer"
  description="Senior Software Engineer with 10+ years of experience building impactful web applications. React, TypeScript, Node.js, AWS."
>
  <main>
    <Hero />
  </main>
</Layout>
```

- [ ] **Step 3: Start dev server and verify in browser**

```bash
npx astro dev
```

Open `http://localhost:4321`. Expected: Hero section visible with gradient name, eyebrow pill, bio text, and CTA buttons. Dark background with subtle glows.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "Add Hero section with gradient text and CTA buttons"
```

---

### Task 4: Build Experience timeline component

**Files:**
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Experience.astro`**

```astro
---
import { experience } from '../data/experience';
---

<section id="experience" class="relative px-6 py-24 sm:px-12 lg:px-20">
  <div class="mx-auto w-full max-w-[1100px]">
    <!-- Section header -->
    <div class="mb-9 border-b border-[--sp-ink-line] pb-4">
      <span class="font-mono text-[13px] font-medium tracking-[2px] text-sp-magenta">02</span>
      <h2 class="mt-1 text-4xl font-bold tracking-[-0.6px]">
        Career <span class="text-sp-turquoise-hi">Timeline</span>
      </h2>
    </div>

    <!-- Timeline -->
    <div class="relative pl-8">
      <!-- Gradient line -->
      <div
        class="absolute bottom-0 left-0 top-0 w-0.5 rounded-full"
        style="background: linear-gradient(180deg, var(--color-sp-magenta), var(--color-sp-tangerine), var(--color-sp-turquoise-hi))"
        data-timeline-line
      ></div>

      <!-- Entries -->
      {experience.map((entry) => (
        <div class="timeline-card relative mb-4 rounded-xl border border-[--sp-ink-line] bg-sp-ink p-5 sm:p-6">
          <!-- Dot -->
          <div
            class:list={[
              'absolute -left-[38px] top-7 h-2.5 w-2.5 rounded-full border-2 border-sp-paper',
              entry.current
                ? 'bg-sp-turquoise-hi shadow-[0_0_12px_rgba(127,224,235,0.4)]'
                : 'bg-sp-magenta',
            ]}
          ></div>

          <span class="font-mono text-[11px] tracking-[1px] text-sp-turquoise-hi">
            {entry.dateRange}
          </span>
          <h3 class="mt-1 text-[17px] font-semibold text-sp-fg">{entry.role}</h3>
          <p class="text-[13px] font-medium text-sp-magenta-hi">{entry.company}</p>
          <p class="mt-2 text-[13px] leading-relaxed text-[--sp-muted]">{entry.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Experience to `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Experience from '../components/Experience.astro';
---

<Layout
  title="Alejandro Pérez — Senior Software Engineer"
  description="Senior Software Engineer with 10+ years of experience building impactful web applications. React, TypeScript, Node.js, AWS."
>
  <main>
    <Hero />
    <Experience />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:4321`. Expected: Experience timeline visible below hero with gradient line, dots, and all 7 entries. Current role (Awtomic) has a glowing turquoise dot.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.astro src/pages/index.astro
git commit -m "Add Experience timeline section with gradient line"
```

---

### Task 5: Build Skills grid component

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Skills.astro`**

```astro
---
import { skillCategories } from '../data/skills';

const accentStyles = {
  warm: {
    border: 'from-sp-magenta to-sp-tangerine',
    label: 'text-sp-magenta',
    tag: 'bg-sp-magenta/[0.08] border-sp-magenta/[0.12]',
  },
  cool: {
    border: 'from-sp-turquoise to-sp-turquoise-hi',
    label: 'text-sp-turquoise-hi',
    tag: 'bg-sp-turquoise-hi/[0.08] border-sp-turquoise-hi/[0.12]',
  },
  gold: {
    border: 'from-sp-tangerine to-sp-gold',
    label: 'text-sp-tangerine',
    tag: 'bg-sp-tangerine/[0.08] border-sp-tangerine/[0.12]',
  },
};
---

<section id="skills" class="relative px-6 py-24 sm:px-12 lg:px-20">
  <div class="mx-auto w-full max-w-[1100px]">
    <!-- Section header -->
    <div class="mb-9 border-b border-[--sp-ink-line] pb-4">
      <span class="font-mono text-[13px] font-medium tracking-[2px] text-sp-magenta">03</span>
      <h2 class="mt-1 text-4xl font-bold tracking-[-0.6px]">
        Technical <span class="text-sp-turquoise-hi">Stack</span>
      </h2>
    </div>

    <!-- Skills grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category) => {
        const style = accentStyles[category.accent];
        return (
          <div class="skill-card relative overflow-hidden rounded-xl border border-[--sp-ink-line] bg-sp-ink p-5">
            {/* Gradient top border */}
            <div class={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${style.border}`}></div>

            <span class={`font-mono text-[10px] font-medium uppercase tracking-[2px] ${style.label}`}>
              {category.name}
            </span>

            <div class="mt-3 flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span class={`rounded-md border px-2.5 py-1 font-mono text-[11px] text-sp-rosegold ${style.tag}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Skills to `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Experience from '../components/Experience.astro';
import Skills from '../components/Skills.astro';
---

<Layout
  title="Alejandro Pérez — Senior Software Engineer"
  description="Senior Software Engineer with 10+ years of experience building impactful web applications. React, TypeScript, Node.js, AWS."
>
  <main>
    <Hero />
    <Experience />
    <Skills />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:4321`. Expected: Three skill cards in a grid below experience. Each has a gradient top border matching its accent color. Skills displayed as monospace tags.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.astro src/pages/index.astro
git commit -m "Add Skills grid section with categorized tags"
```

---

### Task 6: Build Connect section and Nav components

**Files:**
- Create: `src/components/Connect.astro`
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Connect.astro`**

```astro
---
import { socialLinks } from '../data/social';
---

<section id="connect" class="relative px-6 py-24 sm:px-12 lg:px-20">
  <div class="mx-auto w-full max-w-[1100px]">
    <div class="relative overflow-hidden rounded-2xl border border-[--sp-ink-line] bg-sp-ink px-6 py-16 text-center sm:px-10">
      {/* Bottom glow — mirrors hero top glow */}
      <div class="pointer-events-none absolute -bottom-24 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-sp-magenta/[0.08] blur-[100px]" aria-hidden="true"></div>

      <h2 class="relative mb-3 text-4xl font-extrabold tracking-[-1px]">
        <span class="gradient-text">Let's connect</span>
      </h2>
      <p class="relative mb-7 text-[15px] text-[--sp-muted]">
        Open to interesting conversations and opportunities.
      </p>

      <div class="relative flex flex-wrap justify-center gap-3">
        {socialLinks.map((link) => (
          <a
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sp-turquoise-hi/20 bg-sp-turquoise-hi/[0.08] px-6 py-3 font-mono text-xs font-medium text-sp-turquoise-hi transition-all duration-200 hover:bg-sp-turquoise-hi/20"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>

    {/* Footer */}
    <footer class="mt-16 border-t border-[--sp-ink-line] pt-6 text-center font-mono text-xs text-[--sp-faint]">
      <p>&copy; {new Date().getFullYear()} Alejandro Pérez. Built with Astro.</p>
    </footer>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Nav.astro`**

```astro
---
const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Connect', href: '#connect' },
];
---

<nav
  id="main-nav"
  class="fixed inset-x-0 top-0 z-50 translate-y-[-100%] border-b border-[--sp-ink-line] bg-sp-dusk/70 backdrop-blur-xl transition-transform duration-300"
  aria-label="Main navigation"
  data-nav
>
  <div class="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6 sm:px-12 lg:px-20">
    <a href="#hero" class="gradient-text font-mono text-sm font-bold tracking-[-0.5px]">
      73nko
    </a>

    {/* Desktop links */}
    <div class="hidden gap-6 sm:flex">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="font-mono text-[11px] uppercase tracking-[1.5px] text-[--sp-muted] transition-colors duration-200 hover:text-sp-turquoise-hi"
          data-nav-link
        >
          {link.name}
        </a>
      ))}
    </div>

    {/* Mobile hamburger */}
    <button
      class="flex h-10 w-10 cursor-pointer items-center justify-center sm:hidden"
      aria-label="Toggle navigation menu"
      data-nav-toggle
    >
      <svg class="h-5 w-5 text-sp-rosegold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {/* Mobile menu */}
  <div class="hidden border-t border-[--sp-ink-line] bg-sp-dusk/90 backdrop-blur-xl sm:hidden" data-nav-mobile>
    <div class="flex flex-col gap-4 px-6 py-6">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class="font-mono text-xs uppercase tracking-[1.5px] text-[--sp-muted] transition-colors duration-200 hover:text-sp-turquoise-hi"
          data-nav-link
        >
          {link.name}
        </a>
      ))}
    </div>
  </div>
</nav>

<script>
  // Mobile toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.querySelector('[data-nav-mobile]');

  toggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  document.querySelectorAll('[data-nav-mobile] [data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });
</script>
```

- [ ] **Step 3: Update `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Experience from '../components/Experience.astro';
import Skills from '../components/Skills.astro';
import Connect from '../components/Connect.astro';
---

<Layout
  title="Alejandro Pérez — Senior Software Engineer"
  description="Senior Software Engineer with 10+ years of experience building impactful web applications. React, TypeScript, Node.js, AWS."
>
  <Nav />
  <main>
    <Hero />
    <Experience />
    <Skills />
    <Connect />
  </main>
</Layout>
```

- [ ] **Step 4: Verify in browser**

Refresh `http://localhost:4321`. Expected: All 4 sections visible. Nav is hidden initially (translated up). Connect section shows social links and footer. Scroll through the full page to verify layout.

- [ ] **Step 5: Commit**

```bash
git add src/components/Connect.astro src/components/Nav.astro src/pages/index.astro
git commit -m "Add Connect section, Nav header, and footer"
```

---

### Task 7: Add GSAP scroll animations

**Files:**
- Create: `src/scripts/animations.ts`
- Modify: `src/pages/index.astro` (add script import)

- [ ] **Step 1: Create `src/scripts/animations.ts`**

```typescript
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
  const sections = ['#experience', '#skills', '#connect'];

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
              link.classList.add('!text-sp-turquoise-hi');
            } else {
              link.classList.remove('!text-sp-turquoise-hi');
            }
          });
        }
      },
    });
  });

  // --- HERO: staggered entrance ---
  const heroElements = gsap.utils.toArray('.hero-animate') as HTMLElement[];
  gsap.from(heroElements, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.2,
  });

  // --- HERO: character split animation for name ---
  document.querySelectorAll('[data-split-text]').forEach((el) => {
    const text = el.textContent || '';
    el.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    gsap.from(el.querySelectorAll('span'), {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.4,
    });
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

  // --- EXPERIENCE: timeline line draw ---
  const timelineLine = document.querySelector('[data-timeline-line]');
  if (timelineLine) {
    gsap.from(timelineLine, {
      scaleY: 0,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
  }

  // --- EXPERIENCE: card reveals ---
  gsap.utils.toArray('.timeline-card').forEach((card) => {
    gsap.from(card as HTMLElement, {
      x: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card as HTMLElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // --- SKILLS: card reveals with stagger ---
  const skillCards = gsap.utils.toArray('.skill-card') as HTMLElement[];
  gsap.from(skillCards, {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // --- CONNECT: fade in ---
  ScrollTrigger.create({
    trigger: '#connect',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('#connect h2, #connect p, #connect a', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    },
    once: true,
  });
}
```

- [ ] **Step 2: Add the animation script to `src/pages/index.astro`**

Add at the bottom of the file, before the closing `</Layout>`:

```astro
  </main>
  <script>
    import '../scripts/animations';
  </script>
</Layout>
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:4321`. Expected:
- Hero: elements animate in on page load with stagger. Name characters animate individually.
- Scroll down: hero parallax-fades away. Nav slides down from top.
- Experience: timeline line draws as you scroll. Cards slide in from left.
- Skills: cards scale up and fade in with stagger.
- Connect: title and links fade up.
- Nav: active section is highlighted in turquoise.

- [ ] **Step 4: Test reduced motion**

In browser DevTools, enable "prefers-reduced-motion: reduce". Refresh. Expected: all content visible instantly with no animations.

- [ ] **Step 5: Commit**

```bash
git add src/scripts/animations.ts src/pages/index.astro
git commit -m "Add GSAP scroll-driven animations for all sections"
```

---

### Task 8: Responsive polish and final cleanup

**Files:**
- Modify: `src/components/Hero.astro` (if needed)
- Modify: `src/components/Experience.astro` (if needed)
- Modify: `src/components/Skills.astro` (if needed)
- Modify: `src/components/Connect.astro` (if needed)

- [ ] **Step 1: Test mobile layout (375px)**

In browser DevTools, set viewport to 375px width. Check:
- Hero: name wraps correctly at ~36px, CTAs wrap into multiple rows, scroll hint visible
- Experience: timeline cards full-width, readable text
- Skills: single column stack
- Connect: links wrap into rows
- Nav: hamburger visible, mobile menu opens/closes

- [ ] **Step 2: Test tablet layout (768px)**

Set viewport to 768px. Check:
- Skills: 2-column grid
- Nav: desktop links visible
- Hero: name at ~48px

- [ ] **Step 3: Test desktop layout (1440px)**

Set viewport to 1440px. Check:
- Content centered with max-width 1100px
- Skills: 3-column grid
- Hero: name at 64px
- All spacing comfortable

- [ ] **Step 4: Fix any responsive issues found**

Apply fixes to the specific component files as needed.

- [ ] **Step 5: Run production build and verify**

```bash
npx astro build && npx astro preview
```

Open `http://localhost:4321`. Navigate through the full page. Verify all animations work in the production build.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Responsive polish and production build verification"
```

---

### Task 9: Clean up old Gatsby files

**Files:**
- Remove: `gatsby-config.js`, `gatsby-browser.js`, `gatsby-node.js` (if present)
- Remove: `content/` directory
- Remove: `src/components/` (old Gatsby components)
- Remove: `src/templates/` directory
- Remove: `src/utils/` directory
- Remove: `src/constants/` directory
- Keep: `alejandro-perez-ramos_resume.pdf` (reference)
- Keep: `static/` directory content if useful, otherwise remove

- [ ] **Step 1: List old Gatsby files to remove**

```bash
ls gatsby-*.js gatsby-*.ts 2>/dev/null
ls -d content/ src/templates/ src/utils/ src/constants/ 2>/dev/null
```

- [ ] **Step 2: Remove old Gatsby config files**

```bash
rm -f gatsby-config.js gatsby-browser.js gatsby-node.js
```

- [ ] **Step 3: Remove old content and source directories**

```bash
rm -rf content/ src/templates/ src/utils/ src/constants/
```

- [ ] **Step 4: Remove old Gatsby-specific pages (404, old index)**

The old `src/pages/404.tsx` and `src/pages/index.tsx` should already be replaced. Remove any remaining `.tsx` pages:

```bash
find src/pages -name '*.tsx' -delete 2>/dev/null
```

- [ ] **Step 5: Clean up static directory**

```bash
ls static/
```

Keep any assets that are still referenced. Remove the rest.

- [ ] **Step 6: Verify build still works**

```bash
npx astro build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Remove old Gatsby files and content"
```

---

### Task 10: Generate QA test plan

**Files:**
- Create: `~/awtomic/docs/superpowers/qa/2026-04-22-interactive-cv-qa-plan.md`

- [ ] **Step 1: Invoke the `qa-test-planner` skill**

Use the `qa-test-planner` skill to generate a comprehensive manual QA test plan covering:
- Hero section (layout, gradient text, CTAs, scroll hint)
- Experience timeline (entries, gradient line, dots)
- Skills grid (cards, tags, responsive grid)
- Connect section (links, footer)
- Navigation (show/hide on scroll, active section, mobile menu)
- Animations (entrance, scroll-driven, parallax, reduced motion)
- Responsive behavior (375px, 768px, 1024px, 1440px)
- Accessibility (keyboard nav, screen reader, contrast, focus states)
- Cross-browser (Chrome, Firefox, Safari)
- Performance (Lighthouse score, no layout shift, smooth animations)

- [ ] **Step 2: Save the QA plan**

Save to `~/awtomic/docs/superpowers/qa/2026-04-22-interactive-cv-qa-plan.md`.

- [ ] **Step 3: Commit**

```bash
git add ~/awtomic/docs/superpowers/qa/2026-04-22-interactive-cv-qa-plan.md
git commit -m "Add QA test plan for interactive CV"
```
