import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(options: {
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  threshold?: number;
} = {}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just ensure visibility
      gsap.set(el.querySelectorAll('.gsap-fade-up, .gsap-stagger-item'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.gsap-stagger-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: options.y ?? 30 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.8,
            delay: options.delay ?? 0.1,
            stagger: options.stagger ?? 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: options.y ?? 30 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.8,
            delay: options.delay ?? 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [options.delay, options.duration, options.stagger, options.y, options.threshold]);

  return containerRef;
}
