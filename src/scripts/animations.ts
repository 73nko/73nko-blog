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
  const sections = ['#services', '#experience', '#skills', '#contact'];

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

  // --- HERO: name line reveal ---
  const nameLines = gsap.utils.toArray('[data-split-text]') as HTMLElement[];
  gsap.from(nameLines, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3,
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

  // --- SERVICES: fade in cards ---
  const serviceElements = gsap.utils.toArray('.services-animate') as HTMLElement[];
  if (serviceElements.length) {
    gsap.set(serviceElements, { y: 20, opacity: 0 });
    ScrollTrigger.create({
      trigger: '#services',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(serviceElements, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
      once: true,
    });
  }

  // --- CONTACT: fade in ---
  const contactElements = gsap.utils.toArray('#contact h2, #contact p, #contact a') as HTMLElement[];
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
