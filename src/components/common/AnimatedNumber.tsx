import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface AnimatedNumberProps {
  value: number;
  startValue?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  startValue = 0,
  duration = 1.8,
  delay = 0,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    // Initialize display with starting value
    el.textContent = `${prefix}${startValue}${suffix}`;

    const proxy = { val: startValue };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`;
          }
        },
        onComplete: () => {
          if (el) {
            el.textContent = `${prefix}${value}${suffix}`;
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, startValue, duration, delay, prefix, suffix]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
};
