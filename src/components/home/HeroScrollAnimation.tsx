import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '../../lib/gsap';
import { ArrowDown, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSmoothScroll } from '../common/SmoothScrollProvider';

interface HeroScrollAnimationProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

interface ProductStep {
  stepIndex: number;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
  features: string[];
  productName: string;
  navLabel: string;
}

const DESKTOP_TOTAL_FRAMES = 123; // Frame 0 to Frame 122
const DESKTOP_STAGE_FRAMES = [0, 31, 61, 91, 122];

const MOBILE_TOTAL_FRAMES = 150; // Frame 0 to Frame 149
const MOBILE_STAGE_FRAMES = [0, 37, 74, 111, 149];

const PRODUCT_STEPS: ProductStep[] = [
  {
    stepIndex: 0,
    category: 'Hot Beverage Packaging',
    badge: '100% Biodegradable',
    title: 'Ripple Kraft Paper Cups',
    subtitle: 'Thermal Fluted Insulation & Pure Paper Rigidity',
    description:
      'Double and ripple-wall natural kraft cups engineered for hot coffees, teas, and specialty beverages. Compostable lining prevents sogginess without synthetic plastic coatings.',
    features: ['Food-Grade Board', 'Heat-Resistant Fluting', 'Comfort Grip Outer', 'Zero Plastic Lamination'],
    productName: 'Paper Cups',
    navLabel: 'Cups',
  },
  {
    stepIndex: 1,
    category: 'Commercial Food Takeaway',
    badge: 'Oil & Grease Resistant',
    title: 'Eco Clamshell Meal Boxes',
    subtitle: 'Heavy-Duty Burger & Meal Containers',
    description:
      'Sturdy natural kraft clamshell packaging with secure interlocking tabs. Resists scalding oils, sauces, and vapor without soggy deformation or synthetic PFAS.',
    features: ['Steam-Vented Latch', 'Sauce & Oil Barrier', 'Rigid Reinforced Base', '100% Recyclable'],
    productName: 'Burger Boxes',
    navLabel: 'Boxes',
  },
  {
    stepIndex: 2,
    category: 'Food Service Containers',
    badge: 'Compostability Tested',
    title: 'Paper Food Tubs & Bowls',
    subtitle: 'Leak-Resistant Bowls with Airtight Fit',
    description:
      'High-GSM food containers designed for hot gravies, soups, noodles, and meal bowls. Tested and validated for compostability at CIPET Kochi.',
    features: ['Leak-Proof Double Seam', 'Tight-Fit Paper Lids', 'Microwave Reheatable', 'CIPET Tested'],
    productName: 'Food Packaging',
    navLabel: 'Tubs',
  },
  {
    stepIndex: 3,
    category: 'Catering & Events',
    badge: 'CPCB Approved',
    title: 'Heavy-Duty Paper Plates',
    subtitle: 'Rigid Rim Fluted Dinner & Snack Plates',
    description:
      'Eco-friendly fluted rim paper plates engineered with superior structural strength. Certified 100% plastic-free and fully biodegradable for commercial catering.',
    features: ['Heavy-Duty Fluted Rim', 'Oil & Moisture Proof', '100% Plastic Free', 'Rigid Board Stability'],
    productName: 'Paper Plates',
    navLabel: 'Plates',
  },
  {
    stepIndex: 4,
    category: 'Bakery & Pastry',
    badge: 'Commercial Grade',
    title: 'Clear Window Bakery Boxes',
    subtitle: 'Premium Display Pastry & Cake Packaging',
    description:
      'Rigid kraft presentation boxes with crystal-clear bio window for pastries, cakes, and treats. Pristine food handling with complete environmental compliance.',
    features: ['High-Clarity Bio Window', 'Foldable Auto-Locking', 'Food-Safe Virgin Board', 'Custom Size Options'],
    productName: 'Bakery Boxes',
    navLabel: 'Bakery',
  },
];

const getFrameUrl = (index: number, isMobile: boolean) => {
  const padded = String(index).padStart(5, '0');
  if (isMobile) {
    return `/Assets/Mobile%20scroll%20animation/Alfa%201080_${padded}.webp`;
  }
  return `/Assets/scroll-animation/Alfa_${padded}.webp`;
};

export const HeroScrollAnimation: React.FC<HeroScrollAnimationProps> = ({ onOpenQuoteModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lenis } = useSmoothScroll();

  // Responsive device mode
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const isMobileRef = useRef<boolean>(isMobile);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // Preloaded image references: independent desktop and mobile caches
  const desktopImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(DESKTOP_TOTAL_FRAMES).fill(null));
  const mobileImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(MOBILE_TOTAL_FRAMES).fill(null));

  const currentFrameRef = useRef<number>(0);
  const animRef = useRef<{ frame: number }>({ frame: 0 });

  // Controlled stage state machine (0 to 4) - SINGLE SOURCE OF TRUTH
  const currentStageRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const isTransitioningSectionRef = useRef<boolean>(false);
  const wheelAccumulatorRef = useRef<number>(0);

  // Keep a stable ref to lenis to prevent stale closure in event listeners
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Helper to find closest available loaded image if an intermediate frame is missing
  const findNearestImage = useCallback((targetIndex: number, mobileMode: boolean): HTMLImageElement | null => {
    const images = mobileMode ? mobileImagesRef.current : desktopImagesRef.current;
    const total = mobileMode ? MOBILE_TOTAL_FRAMES : DESKTOP_TOTAL_FRAMES;

    if (images[targetIndex]?.complete && images[targetIndex]?.naturalWidth) {
      return images[targetIndex];
    }
    for (let offset = 1; offset < total; offset++) {
      const lower = targetIndex - offset;
      const upper = targetIndex + offset;
      if (lower >= 0 && images[lower]?.complete && images[lower]?.naturalWidth) {
        return images[lower];
      }
      if (upper < total && images[upper]?.complete && images[upper]?.naturalWidth) {
        return images[upper];
      }
    }
    return null;
  }, []);

  // Hardware-accelerated canvas renderer with object-fit: cover logic
  const drawFrame = useCallback(
    (frameIndex: number, mobileMode?: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const useMobile = mobileMode !== undefined ? mobileMode : isMobileRef.current;
      const img = findNearestImage(frameIndex, useMobile);
      if (!img || !img.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.fillStyle = '#f4f2ee';
      ctx.fillRect(0, 0, width, height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    },
    [findNearestImage]
  );

  // Fast Concurrency Preloading Architecture (Desktop & Mobile)
  useEffect(() => {
    let isCancelled = false;

    const preloadSet = (mobileMode: boolean) => {
      const total = mobileMode ? MOBILE_TOTAL_FRAMES : DESKTOP_TOTAL_FRAMES;
      const stageFrames = mobileMode ? MOBILE_STAGE_FRAMES : DESKTOP_STAGE_FRAMES;
      const targetImagesRef = mobileMode ? mobileImagesRef : desktopImagesRef;
      let loadedCount = 0;

      const loadImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          if (targetImagesRef.current[index]?.complete && targetImagesRef.current[index]?.naturalWidth) {
            resolve(targetImagesRef.current[index]!);
            return;
          }
          const img = new Image();
          img.src = getFrameUrl(index, mobileMode);
          img.onload = () => {
            if (!isCancelled) {
              targetImagesRef.current[index] = img;
              loadedCount++;
              if (loadedCount % 8 === 0 || loadedCount === total) {
                setLoadProgress(Math.round((loadedCount / total) * 100));
              }
              if (index === currentFrameRef.current && mobileMode === isMobileRef.current) {
                drawFrame(index, mobileMode);
              }
            }
            resolve(img);
          };
          img.onerror = () => {
            if (!isCancelled) {
              loadedCount++;
              if (loadedCount % 8 === 0 || loadedCount === total) {
                setLoadProgress(Math.round((loadedCount / total) * 100));
              }
            }
            resolve(img);
          };
        });
      };

      // 1. Load milestone keyframes immediately for instantaneous first paint
      Promise.all(stageFrames.map((f) => loadImage(f))).then(() => {
        if (isCancelled) return;
        const initialFrame = stageFrames[currentStageRef.current];
        drawFrame(initialFrame, mobileMode);

        // 2. Stream all remaining frames in concurrent batches of 16
        const remaining: number[] = [];
        for (let i = 0; i < total; i++) {
          if (!stageFrames.includes(i)) remaining.push(i);
        }

        const batchSize = 16;
        const loadBatches = async () => {
          for (let i = 0; i < remaining.length; i += batchSize) {
            if (isCancelled) break;
            const batch = remaining.slice(i, i + batchSize);
            await Promise.all(batch.map((idx) => loadImage(idx)));
          }
        };

        loadBatches();
      });
    };

    // Preload active mode's images
    preloadSet(isMobileRef.current);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobileRef.current) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
        preloadSet(mobile);
      }
      const stageFrames = mobile ? MOBILE_STAGE_FRAMES : DESKTOP_STAGE_FRAMES;
      const targetFrame = stageFrames[currentStageRef.current];
      currentFrameRef.current = targetFrame;
      animRef.current.frame = targetFrame;
      drawFrame(targetFrame, mobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame]);

  // Smooth Transition to Target Stage: Controlled Programmatic Transition
  const transitionToStage = useCallback(
    (targetStage: number) => {
      if (targetStage < 0 || targetStage >= 5) return;
      if (isAnimatingRef.current || isTransitioningSectionRef.current) return;

      const stageFrames = isMobileRef.current ? MOBILE_STAGE_FRAMES : DESKTOP_STAGE_FRAMES;
      const fromFrame = currentFrameRef.current;
      const toFrame = stageFrames[targetStage];

      // Lock triggers while transition runs
      isAnimatingRef.current = true;
      currentStageRef.current = targetStage;
      setActiveStep(targetStage);

      // Duration: 0.60s to 0.80s per step
      const stepDistance = Math.abs(targetStage - (PRODUCT_STEPS.find((_, i) => i === targetStage)?.stepIndex ?? 0));
      const duration = Math.max(0.6, Math.min(0.6 + stepDistance * 0.1, 0.8));

      // Smoothly interpolate canvas frames with exact landing
      gsap.killTweensOf(animRef.current);
      gsap.to(animRef.current, {
        frame: toFrame,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          const current = Math.round(animRef.current.frame);
          if (current !== currentFrameRef.current) {
            currentFrameRef.current = current;
            drawFrame(current, isMobileRef.current);
          }
        },
        onComplete: () => {
          currentFrameRef.current = toFrame;
          animRef.current.frame = toFrame;
          drawFrame(toFrame, isMobileRef.current);

          // Cooldown to absorb residual wheel momentum or touch bounce
          setTimeout(() => {
            isAnimatingRef.current = false;
            wheelAccumulatorRef.current = 0;
          }, 220);
        },
      });
    },
    [drawFrame]
  );

  // Seamless, uninterrupted glide from Product 5 down to #hero-section
  const scrollToNextSection = useCallback(() => {
    if (isTransitioningSectionRef.current) return;
    isTransitioningSectionRef.current = true;

    const heroSection = document.getElementById('hero-section');
    const targetY = heroSection ? heroSection.offsetTop : window.innerHeight;
    const activeLenis = lenisRef.current;

    if (activeLenis) {
      activeLenis.start();
      activeLenis.scrollTo(targetY, {
        duration: 0.85,
        lock: true,
        force: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          setTimeout(() => {
            isTransitioningSectionRef.current = false;
          }, 120);
        },
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      setTimeout(() => {
        isTransitioningSectionRef.current = false;
      }, 850);
    }

    // Safety failsafe timer
    setTimeout(() => {
      isTransitioningSectionRef.current = false;
    }, 1000);
  }, []);

  // Seamless glide from top of #hero-section back up into Product 5
  const scrollToHeroTop = useCallback(() => {
    if (isTransitioningSectionRef.current) return;
    isTransitioningSectionRef.current = true;

    // Display Product 5 when returning to hero
    const stageFrames = isMobileRef.current ? MOBILE_STAGE_FRAMES : DESKTOP_STAGE_FRAMES;
    const lastFrame = stageFrames[4];
    currentStageRef.current = 4;
    setActiveStep(4);
    currentFrameRef.current = lastFrame;
    animRef.current.frame = lastFrame;
    drawFrame(lastFrame, isMobileRef.current);

    const activeLenis = lenisRef.current;

    if (activeLenis) {
      activeLenis.scrollTo(0, {
        duration: 0.85,
        lock: true,
        force: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          activeLenis.stop();
          window.scrollTo(0, 0);
          setTimeout(() => {
            isTransitioningSectionRef.current = false;
          }, 120);
        },
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        isTransitioningSectionRef.current = false;
      }, 850);
    }

    // Safety failsafe timer
    setTimeout(() => {
      isTransitioningSectionRef.current = false;
    }, 1000);
  }, [drawFrame]);

  // Initial Lock: While inside hero showcase (stages 0 to 4), keep scroll locked at top
  useEffect(() => {
    if (!lenis) return;

    if (window.scrollY < 50 && currentStageRef.current < 4) {
      lenis.stop();
      window.scrollTo(0, 0);
    }
  }, [lenis]);

  // Unified Gesture Engine: Mobile Touch, Desktop Mouse Wheel, Keyboard (1 Gesture = 1 Product)
  useEffect(() => {
    const WHEEL_THRESHOLD = 20; // 1 deliberate wheel notch / flick
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;
    let lastDirection = 0; // 1 = down, -1 = up
    let lastDirectionTime = 0;

    // ── MOUSE WHEEL HANDLER (Desktop & Trackpads) ──
    const handleWheel = (e: WheelEvent) => {
      // 1. If currently gliding between Hero and #hero-section, prevent default & stop propagation
      if (isTransitioningSectionRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      // 2. Normalize delta across all browsers (Pixel, Firefox line deltaMode, Page)
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 33; // DOM_DELTA_LINE (Firefox line mode normalization)
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight; // DOM_DELTA_PAGE
      }

      if (Math.abs(delta) < 1) return;

      const currentDir = delta > 0 ? 1 : -1;
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero-section');
      const targetY = heroSection ? heroSection.offsetTop : window.innerHeight;

      // Trackpad Rebound Guard (350ms deadzone on sudden direction flip when at top)
      if (lastDirection !== 0 && currentDir !== lastDirection && scrollY < 50) {
        const timeSinceFlip = Date.now() - lastDirectionTime;
        if (timeSinceFlip < 350) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
      }

      // CASE 1: SCROLL DOWN (delta > 0)
      if (delta > 0) {
        lastDirection = 1;
        lastDirectionTime = Date.now();

        // 1A: While showing Products 1 to 4 (stages 0, 1, 2, 3):
        // Pinned at top: advance 1 product per scroll gesture
        if (currentStageRef.current < 4) {
          e.preventDefault();
          e.stopImmediatePropagation();
          if (scrollY > 0) window.scrollTo(0, 0);
          lenisRef.current?.stop();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += delta;
          if (wheelAccumulatorRef.current >= WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            transitionToStage(currentStageRef.current + 1);
          }
          return;
        }

        // 1B: At Product 5 (Stage 4) and at top (scrollY < 50):
        // The 5-product showcase is complete!
        // The very next scroll down IMMEDIATELY smoothly glides to #hero-section!
        if (scrollY < 50) {
          e.preventDefault();
          e.stopImmediatePropagation();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += delta;
          if (wheelAccumulatorRef.current >= WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            scrollToNextSection();
          }
          return;
        }

        // 1C: Below Hero (scrollY >= 50):
        // Normal page scrolling continues unrestricted through the rest of the website
        lenisRef.current?.start();
        return;
      }

      // CASE 2: SCROLL UP (delta < 0)
      if (delta < 0) {
        lastDirection = -1;
        lastDirectionTime = Date.now();

        // 2A: If user is deep down in the website below hero (more than 50px past #hero-section top):
        if (scrollY > targetY + 50) {
          return;
        }

        // 2B: If user is at or near the top of #hero-section (scrollY between 50 and targetY + 50):
        // 1 scroll UP immediately glides back into Product 5 at top!
        if (scrollY >= 50 && scrollY <= targetY + 50) {
          e.preventDefault();
          e.stopImmediatePropagation();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += delta;
          if (wheelAccumulatorRef.current <= -WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            scrollToHeroTop();
          }
          return;
        }

        // 2C: User is at the top (scrollY < 50):
        // Inside Hero Showcase: Step backward 1 product (4 -> 3 -> 2 -> 1 -> 0)
        if (scrollY < 50 && currentStageRef.current > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          lenisRef.current?.stop();
          if (scrollY > 0) window.scrollTo(0, 0);

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += delta;
          if (wheelAccumulatorRef.current <= -WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            const prevStage = Math.max(0, currentStageRef.current - 1);
            transitionToStage(prevStage);
          }
          return;
        }
      }
    };

    // ── TOUCH SWIPE HANDLER (Mobile Phones, Tablets & Touchscreens) ──
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioningSectionRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const dy = touchStartY - currentY;
      const dx = touchStartX - currentX;

      // While at top inside Hero (scrollY < 50):
      if (scrollY < 50 && Math.abs(dy) > Math.abs(dx)) {
        // While viewing Products 1 to 4, lock page scroll so hero stays pinned
        if (currentStageRef.current < 4 || isAnimatingRef.current) {
          if (e.cancelable) e.preventDefault();
        }
        // At Product 5, prevent scroll if swiping up to execute smooth glide cleanly
        else if (currentStageRef.current === 4 && dy > 0) {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioningSectionRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY; // > 0 = swiped UP (scroll DOWN)
      const deltaX = touchStartX - touchEndX;
      const distance = Math.abs(deltaY);
      const duration = Date.now() - touchStartTime;

      // Ignore horizontal swipes
      if (Math.abs(deltaX) > distance) return;

      // Detect deliberate swipe (threshold: 30px or quick flick)
      const isFlick = distance > 20 && duration < 300;
      const isDeliberate = distance > 35;
      if (!isFlick && !isDeliberate) return;

      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero-section');
      const targetY = heroSection ? heroSection.offsetTop : window.innerHeight;

      // SWIPE UP (User wants to scroll DOWN)
      if (deltaY > 0) {
        if (currentStageRef.current < 4) {
          if (!isAnimatingRef.current) {
            transitionToStage(currentStageRef.current + 1);
          }
        } else if (scrollY < 50) {
          // At Product 5: 1 swipe UP immediately glides down to #hero-section!
          if (!isAnimatingRef.current) {
            scrollToNextSection();
          }
        }
      }
      // SWIPE DOWN (User wants to scroll UP)
      else if (deltaY < 0) {
        if (scrollY >= 50 && scrollY <= targetY + 50) {
          if (!isAnimatingRef.current) {
            scrollToHeroTop();
          }
        } else if (scrollY < 50 && currentStageRef.current > 0) {
          if (!isAnimatingRef.current) {
            transitionToStage(currentStageRef.current - 1);
          }
        }
      }
    };

    // ── KEYBOARD NAVIGATION (ArrowDown / ArrowUp / PageDown / PageUp) ──
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningSectionRef.current) {
        e.preventDefault();
        return;
      }
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero-section');
      const targetY = heroSection ? heroSection.offsetTop : window.innerHeight;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentStageRef.current < 4) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            transitionToStage(currentStageRef.current + 1);
          }
        } else if (currentStageRef.current === 4 && scrollY < 50) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            scrollToNextSection();
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (scrollY >= 50 && scrollY <= targetY + 50) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            scrollToHeroTop();
          }
        } else if (currentStageRef.current > 0 && scrollY < 50) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            lenisRef.current?.stop();
            if (window.scrollY > 0) window.scrollTo(0, 0);
            transitionToStage(currentStageRef.current - 1);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      lenisRef.current?.start();
    };
  }, [transitionToStage, scrollToNextSection, scrollToHeroTop]);

  // Jump directly to a specific milestone (e.g. via navigation dots)
  const goToStep = (stepIdx: number) => {
    if (stepIdx === currentStageRef.current || isAnimatingRef.current) return;
    if (window.scrollY > 50) {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
      lenisRef.current?.stop();
    }
    transitionToStage(stepIdx);
  };

  // Skip animation button: jump directly to Product 5 and glide into main website
  const handleSkipToContent = () => {
    gsap.killTweensOf(animRef.current);
    const stageFrames = isMobileRef.current ? MOBILE_STAGE_FRAMES : DESKTOP_STAGE_FRAMES;
    const lastFrame = stageFrames[4];
    currentStageRef.current = 4;
    setActiveStep(4);
    currentFrameRef.current = lastFrame;
    animRef.current.frame = lastFrame;
    drawFrame(lastFrame, isMobileRef.current);
    isAnimatingRef.current = false;
    scrollToNextSection();
  };

  const currentProduct = PRODUCT_STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#f4f2ee] select-none overflow-hidden"
    >
      {/* Viewport Container (100vh) */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Hardware-Accelerated 3D Product Canvas (Mobile 9:16 + Desktop 16:9) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover"
        />

        {/* Top and bottom subtle edge fades */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 pointer-events-none bg-gradient-to-b from-[#f4f2ee]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[#f4f2ee]/80 to-transparent" />

        {/* Top Brand Bar & Loading Indicator */}
        <div className="absolute top-20 sm:top-24 left-3.5 sm:left-8 right-3.5 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-charcoal-200/80 shadow-xs pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-charcoal-900">
              ALFA 3D SHOWCASE
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-[11px] sm:text-xs font-medium text-brand-700">
              Step {activeStep + 1} of {PRODUCT_STEPS.length}
            </span>
          </div>

          {/* Load progress badge */}
          {loadProgress < 100 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-charcoal-900/80 text-white backdrop-blur-md text-[10px] sm:text-[11px] font-medium transition-opacity duration-500">
              <Sparkles className="w-3 h-3 text-brand-400 animate-spin" />
              <span>Optimizing 3D {loadProgress}%</span>
            </div>
          )}
        </div>

        {/* Main Product Story Card Overlay (Responsive: Compact on Mobile, Spacious on Desktop) */}
        <div className="absolute bottom-3 sm:bottom-8 left-3 sm:left-8 lg:left-12 right-3 sm:right-auto z-20 pointer-events-none max-w-md lg:max-w-lg">
          <div className="w-full pointer-events-auto transition-all duration-300 transform translate-y-0">
            <div className="bg-white/95 sm:bg-white/90 backdrop-blur-xl border border-charcoal-200/90 shadow-2xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 space-y-2 sm:space-y-3">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-500/15 border border-brand-500/30 px-2 sm:px-2.5 py-0.5 rounded-md">
                  {currentProduct.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-charcoal-700 bg-charcoal-100 px-2 py-0.5 rounded-md border border-charcoal-200">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600" />
                  {currentProduct.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
                  {currentProduct.title}
                </h2>
                <p className="text-[11px] sm:text-sm font-semibold text-brand-600 mt-0.5">
                  {currentProduct.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-2">
                {currentProduct.description}
              </p>

              {/* Feature Checklist (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1 border-t border-charcoal-100">
                {currentProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-charcoal-700">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600 flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Step Pagination Dots (Visible only on mobile/tablet) */}
              <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">
                {PRODUCT_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToStep(idx)}
                    aria-label={`Go to step ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === idx
                        ? 'w-6 bg-brand-600'
                        : 'w-2 bg-charcoal-300 hover:bg-charcoal-400'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 pt-1">
                <button
                  onClick={() => onOpenQuoteModal?.(currentProduct.productName)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-600/25 transition-all active:scale-95"
                >
                  Request Quote
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleSkipToContent}
                  className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Skip Animation
                  <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right-Side Stepped Navigation Indicators (Desktop & Tablet) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-3 pointer-events-auto">
          {PRODUCT_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => goToStep(idx)}
                aria-label={`Jump to ${step.title}`}
                className="group flex items-center gap-3 text-right transition-all"
              >
                <span
                  className={`text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-brand-700 font-bold translate-x-0 opacity-100'
                      : 'text-charcoal-500 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  {step.navLabel}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-8 bg-brand-600 shadow-md shadow-brand-600/40'
                      : 'w-2.5 h-2.5 bg-charcoal-300 group-hover:bg-brand-500/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Bottom Scroll Prompt (Desktop) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-charcoal-200/80 shadow-xs pointer-events-none text-charcoal-800 transition-all duration-300">
          <span className="text-xs font-bold tracking-wide">
            {activeStep < 4
              ? `Scroll down for next product (${activeStep + 1}/5)`
              : 'Scroll down to explore website'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-brand-600 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroScrollAnimation;
