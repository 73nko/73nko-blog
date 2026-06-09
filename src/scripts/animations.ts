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
