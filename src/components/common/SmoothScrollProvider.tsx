import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isTouchDevice: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null, isTouchDevice: false });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Touch / Mobile Detection:
    // Mobile OS and touchscreens have native 120Hz compositor-driven momentum scrolling.
    // Lenis should ONLY run on desktop fine-pointer devices (mouse/trackpad).
    // Running Lenis on mobile hijacks touch events, causes touch traps, and freezes the screen on navigation.
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 1024;

    setIsTouchDevice(isTouch);

    if (isTouch) {
      // Use native mobile momentum scrolling with zero JavaScript touch interception.
      return;
    }

    // Initialize Lenis smooth scroll for desktop fine-pointer devices only
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false, // Never intercept touch events
    });

    setLenis(lenisInstance);

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame to GSAP ticker for 60/120Hz monitor synchronization
    const updateTicker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  // Handle route change:
  // ONLY scroll to top on 'PUSH' navigation (user explicitly clicked a new link to visit a page).
  // On 'POP' navigation (browser Back / Forward button), DO NOT force scroll to top.
  // This allows the browser to restore the user's previous scroll position without jumping to top.
  useEffect(() => {
    if (navigationType === 'POP') {
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis, navigationType]);

  return (
    <SmoothScrollContext.Provider value={{ lenis, isTouchDevice }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
