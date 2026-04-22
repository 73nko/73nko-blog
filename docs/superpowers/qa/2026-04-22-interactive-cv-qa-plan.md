# QA Test Plan: 73nko.es Interactive CV

**Date:** 2026-04-22
**Build:** Astro 5 + GSAP + Tailwind CSS 4
**URL:** https://www.73nko.es (staging: http://localhost:4321)
**Browsers:** Chrome, Firefox, Safari (latest)

---

## 1. Hero Section

### TC-HERO-001: Layout and Content
**Priority:** P0 | **Type:** Functional/UI

1. Open the site at root URL
   **Expected:** Full-viewport hero section fills the screen
2. Verify eyebrow pill reads "Senior Software Engineer"
   **Expected:** Turquoise text on translucent turquoise background, pill shape
3. Verify name displays "Alejandro" and "Perez" on separate lines
   **Expected:** Large gradient text (magenta -> tangerine -> turquoise)
4. Verify tagline: "Building exceptional web experiences"
   **Expected:** "exceptional" highlighted in magenta-hi (#FFB8D5)
5. Verify bio paragraph mentions Awtomic, Eventbrite, EA
   **Expected:** Muted text, max-width constrained
6. Verify scroll hint at bottom center
   **Expected:** "Scroll" text + bouncing arrow, hidden when reduced motion enabled

### TC-HERO-002: CTA Buttons
**Priority:** P0 | **Type:** Functional

1. Verify 4 CTA buttons: GitHub, LinkedIn, Twitter, Email
   **Expected:** GitHub = magenta primary style with arrow. Others = turquoise outline style.
2. Click GitHub button
   **Expected:** Opens https://github.com/73nko in new tab
3. Click LinkedIn button
   **Expected:** Opens LinkedIn profile in new tab
4. Click Twitter button
   **Expected:** Opens https://twitter.com/73nko in new tab
5. Click Email button
   **Expected:** Opens mailto:me@alejandroperez.dev (no new tab)
6. Hover over each button
   **Expected:** Smooth color transition (200ms)

### TC-HERO-003: Background Glows
**Priority:** P2 | **Type:** UI

1. Inspect hero section background
   **Expected:** Subtle magenta glow top-right, turquoise glow bottom-left
2. Glows should not cause horizontal scroll
   **Expected:** Container has overflow hidden

---

## 2. Experience Timeline

### TC-EXP-001: Timeline Content
**Priority:** P0 | **Type:** Functional

1. Scroll to Experience section
   **Expected:** Section header shows "02" label and "Career Timeline" title
2. Verify 7 timeline entries exist in order:
   - Jun 2021 - Present: Senior Software Engineer @ Awtomic
   - Sep 2019 - Jun 2021: Senior Software Engineer @ Eventbrite
   - Dec 2018 - Aug 2019: Senior Frontend Developer @ EA
   - Sep 2018 - Dec 2018: Senior Software Engineer @ ING Bank
   - Dec 2017 - Sep 2018: JavaScript Engineer @ Solera
   - Feb 2016 - Sep 2017: JavaScript Engineer @ Mediaset Espana
   - Jan 2013 - Feb 2016: Junior Software Engineer @ Babel
   **Expected:** All entries present with correct dates, roles, companies

### TC-EXP-002: Timeline Visual Elements
**Priority:** P1 | **Type:** UI

1. Verify gradient vertical line on the left
   **Expected:** Line transitions from magenta to tangerine to turquoise
2. Verify current role (Awtomic) dot
   **Expected:** Turquoise dot with glow effect
3. Verify other role dots
   **Expected:** Magenta dots without glow

---

## 3. Skills Grid

### TC-SKILLS-001: Cards and Tags
**Priority:** P0 | **Type:** Functional

1. Scroll to Skills section
   **Expected:** Section header shows "03" label and "Technical Stack" title
2. Verify 3 skill cards exist:
   - Frontend (warm accent): React, TypeScript, Next.js, HTML, CSS, JavaScript, Chakra UI, Emotion, React Query
   - Backend & Infra (cool accent): Node.js, AWS Lambda, SQS, DynamoDB, Django, MySQL, Redis, Kafka
   - Tools & Practices (gold accent): Shopify Integration, Design Systems, Serverless, Microservices, E-commerce, Agile
   **Expected:** All skills present as monospace tags

### TC-SKILLS-002: Card Styling
**Priority:** P1 | **Type:** UI

1. Verify each card has a gradient top border matching its accent
   **Expected:** Frontend = magenta-to-tangerine, Backend = turquoise-to-turquoise-hi, Tools = tangerine-to-gold
2. Verify tag styling per accent color
   **Expected:** Tags have subtle background tint matching their card accent

---

## 4. Connect Section

### TC-CONNECT-001: Content and Links
**Priority:** P0 | **Type:** Functional

1. Scroll to Connect section
   **Expected:** "Let's connect" in gradient text
2. Verify subtitle: "Open to interesting conversations and opportunities."
3. Verify 4 social link buttons (GitHub, LinkedIn, Twitter, Email)
   **Expected:** All turquoise outline style, pill shape
4. Click each link
   **Expected:** Opens correct URL (same as hero CTAs)
5. Verify footer copyright
   **Expected:** "(c) 2026 Alejandro Perez. Built with Astro."

### TC-CONNECT-002: Visual Bookend
**Priority:** P2 | **Type:** UI

1. Verify bottom glow effect
   **Expected:** Subtle magenta glow at bottom, mirrors hero's top glow

---

## 5. Navigation

### TC-NAV-001: Show/Hide Behavior
**Priority:** P0 | **Type:** Functional

1. Load page fresh
   **Expected:** Nav is hidden (translated up off-screen)
2. Scroll past the hero section
   **Expected:** Nav slides down into view (smooth 300ms transition)
3. Scroll back up into hero
   **Expected:** Nav slides back up and hides

### TC-NAV-002: Desktop Navigation
**Priority:** P0 | **Type:** Functional

1. At desktop viewport (>=640px), verify nav shows "73nko" logo + 3 links
   **Expected:** Experience, Skills, Connect links visible
2. Click "Experience" link
   **Expected:** Smooth scroll to Experience section
3. Click "Skills" link
   **Expected:** Smooth scroll to Skills section
4. Click "Connect" link
   **Expected:** Smooth scroll to Connect section
5. Click "73nko" logo
   **Expected:** Smooth scroll to hero

### TC-NAV-003: Active Section Tracking
**Priority:** P1 | **Type:** Functional

1. Scroll through the page slowly
   **Expected:** Active section's nav link highlights in turquoise-hi
2. Scroll from Experience to Skills
   **Expected:** Experience link un-highlights, Skills link highlights

### TC-NAV-004: Mobile Navigation
**Priority:** P0 | **Type:** Functional

1. Set viewport to 375px
   **Expected:** Hamburger icon visible, desktop links hidden
2. Tap hamburger icon
   **Expected:** Mobile menu panel opens below nav
3. Tap a menu link (e.g., "Skills")
   **Expected:** Smooth scroll to section, mobile menu closes
4. Tap hamburger again to open, then tap outside
   **Expected:** Menu stays open (close only via link click or toggle)

### TC-NAV-005: Glassmorphic Styling
**Priority:** P2 | **Type:** UI

1. When nav is visible, verify styling
   **Expected:** Semi-transparent dusk background with backdrop blur effect

---

## 6. Animations

### TC-ANIM-001: Hero Entrance
**Priority:** P1 | **Type:** Functional

1. Hard refresh the page (Cmd+Shift+R)
   **Expected:** Hero elements animate in with staggered timing:
   - Eyebrow fades up
   - Name characters animate individually from below
   - Tagline and bio fade up
   - CTA buttons slide up with stagger

### TC-ANIM-002: Hero Parallax
**Priority:** P1 | **Type:** Functional

1. Scroll down slowly from hero
   **Expected:** Hero content moves up at slower rate than scroll and fades out

### TC-ANIM-003: Timeline Line Draw
**Priority:** P1 | **Type:** Functional

1. Scroll to Experience section
   **Expected:** Gradient line draws from top to bottom as you scroll through the section (tied to scroll position)

### TC-ANIM-004: Card Reveals
**Priority:** P1 | **Type:** Functional

1. Scroll to Experience section
   **Expected:** Timeline cards slide in from the left as they enter viewport
2. Scroll to Skills section
   **Expected:** Skill cards scale up (0.95 to 1) and fade in with stagger

### TC-ANIM-005: Connect Entrance
**Priority:** P1 | **Type:** Functional

1. Scroll to Connect section
   **Expected:** Title, subtitle, and links fade up with stagger

### TC-ANIM-006: Reduced Motion
**Priority:** P0 | **Type:** Accessibility

1. Enable "Reduce motion" in OS settings (or via DevTools emulation)
2. Hard refresh the page
   **Expected:** All content visible immediately, no animations play
3. Scroll through entire page
   **Expected:** No parallax, no scroll animations. All content static and visible.
4. Scroll hint arrow should be hidden
   **Expected:** No bouncing arrow in hero

---

## 7. Responsive Behavior

### TC-RESP-001: Mobile (375px)
**Priority:** P0 | **Type:** UI

1. Set viewport to 375px width
2. Verify hero:
   **Expected:** Name ~36px, CTAs wrap to multiple rows, content padded with px-6
3. Verify experience:
   **Expected:** Full-width cards, readable text
4. Verify skills:
   **Expected:** Single column (cards stack vertically)
5. Verify connect:
   **Expected:** Links wrap to multiple rows
6. Verify nav:
   **Expected:** Hamburger visible, no horizontal scroll

### TC-RESP-002: Tablet (768px)
**Priority:** P1 | **Type:** UI

1. Set viewport to 768px
2. Verify skills grid
   **Expected:** 2-column layout
3. Verify nav
   **Expected:** Desktop links visible (hamburger hidden)
4. Verify hero name
   **Expected:** ~48px font size

### TC-RESP-003: Desktop (1440px)
**Priority:** P1 | **Type:** UI

1. Set viewport to 1440px
2. Verify content centering
   **Expected:** Max-width 1100px, centered
3. Verify skills grid
   **Expected:** 3-column layout
4. Verify hero name
   **Expected:** 64px font size

### TC-RESP-004: No Horizontal Scroll
**Priority:** P0 | **Type:** UI

1. At each breakpoint (375px, 768px, 1440px)
   **Expected:** No horizontal scrollbar appears at any viewport size

---

## 8. Accessibility

### TC-A11Y-001: Keyboard Navigation
**Priority:** P0 | **Type:** Accessibility

1. Tab through the page
   **Expected:** All links and buttons are focusable in logical order
2. Verify focus rings are visible on interactive elements
   **Expected:** Clear visual focus indicator on each element

### TC-A11Y-002: Screen Reader
**Priority:** P1 | **Type:** Accessibility

1. Verify nav has `aria-label="Main navigation"`
2. Verify mobile hamburger has `aria-label="Toggle navigation menu"`
3. Verify decorative elements have `aria-hidden="true"` (background glows, scroll hint)
4. Verify heading hierarchy: h1 (name) -> h2 (section titles) -> h3 (role titles)

### TC-A11Y-003: Color Contrast
**Priority:** P0 | **Type:** Accessibility

1. Check primary text (#EFE2D2) on paper background (#18101F)
   **Expected:** Contrast ratio >= 4.5:1 (actual: ~10:1)
2. Check turquoise-hi (#7FE0EB) on ink background (#1F1630)
   **Expected:** Contrast ratio >= 4.5:1
3. Check magenta-hi (#FFB8D5) on ink background (#1F1630)
   **Expected:** Contrast ratio >= 4.5:1

### TC-A11Y-004: External Links
**Priority:** P1 | **Type:** Accessibility

1. Verify all external links have `target="_blank"` and `rel="noopener noreferrer"`
   **Expected:** All non-mailto links open in new tab safely
2. Verify mailto links do NOT have `target="_blank"`

---

## 9. Cross-Browser

### TC-BROWSER-001: Chrome (latest)
**Priority:** P0 | **Type:** Compatibility

1. Open site in Chrome
   **Expected:** All sections render correctly, animations work, gradient text visible

### TC-BROWSER-002: Firefox (latest)
**Priority:** P0 | **Type:** Compatibility

1. Open site in Firefox
   **Expected:** All sections render correctly, backdrop-blur works, gradient text visible

### TC-BROWSER-003: Safari (latest)
**Priority:** P0 | **Type:** Compatibility

1. Open site in Safari
   **Expected:** All sections render correctly, `-webkit-background-clip` works for gradient text, animations smooth

---

## 10. Performance

### TC-PERF-001: Lighthouse Score
**Priority:** P1 | **Type:** Performance

1. Run Lighthouse audit in Chrome DevTools (mobile preset)
   **Expected:**
   - Performance: >= 90
   - Accessibility: >= 90
   - Best Practices: >= 90
   - SEO: >= 90

### TC-PERF-002: Layout Shift
**Priority:** P1 | **Type:** Performance

1. Load the page and observe
   **Expected:** No visible layout shift (CLS < 0.1)
2. Font loading should not cause text reflow
   **Expected:** `font-display: swap` prevents invisible text

### TC-PERF-003: Animation Smoothness
**Priority:** P1 | **Type:** Performance

1. Scroll through the page at normal speed
   **Expected:** Animations run at 60fps, no jank or stutter
2. Open Performance tab in DevTools, record while scrolling
   **Expected:** No long frames (>16ms)

---

## Exit Criteria

- [ ] All P0 test cases pass
- [ ] 90%+ of P1 test cases pass
- [ ] No critical or high-severity bugs open
- [ ] Reduced motion fully respected
- [ ] No horizontal scroll at any viewport
- [ ] Build succeeds with zero warnings
