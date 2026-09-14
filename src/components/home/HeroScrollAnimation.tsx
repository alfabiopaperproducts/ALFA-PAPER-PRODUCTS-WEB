import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { ArrowDown, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSmoothScroll } from '../common/SmoothScrollProvider';

interface HeroScrollAnimationProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

interface ProductStep {
  stepIndex: number;
  frame: number;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
  features: string[];
  productName: string;
  navLabel: string;
}

const TOTAL_FRAMES = 123; // Frame 0 to Frame 122
const STAGE_FRAMES = [0, 31, 61, 91, 122];

const PRODUCT_STEPS: ProductStep[] = [
  {
    stepIndex: 0,
    frame: 0,
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
    frame: 31,
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
    frame: 61,
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
    frame: 91,
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
    frame: 122,
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

const getFrameUrl = (index: number) => {
  const padded = String(index).padStart(5, '0');
  return `/Assets/scroll-animation/Alfa_${padded}.webp`;
};

export const HeroScrollAnimation: React.FC<HeroScrollAnimationProps> = ({ onOpenQuoteModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lenis } = useSmoothScroll();

  // Preloaded image references
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const animRef = useRef<{ frame: number }>({ frame: 0 });

  // Controlled stage state machine (0 to 4) - SINGLE SOURCE OF TRUTH
  const currentStageRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const wheelAccumulatorRef = useRef<number>(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Helper to find closest available loaded image if an intermediate frame is missing
  const findNearestImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[targetIndex]?.complete && images[targetIndex]?.naturalWidth) {
      return images[targetIndex];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const lower = targetIndex - offset;
      const upper = targetIndex + offset;
      if (lower >= 0 && images[lower]?.complete && images[lower]?.naturalWidth) {
        return images[lower];
      }
      if (upper < TOTAL_FRAMES && images[upper]?.complete && images[upper]?.naturalWidth) {
        return images[upper];
      }
    }
    return null;
  }, []);

  // Hardware-accelerated canvas renderer with object-fit: cover logic
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = findNearestImage(frameIndex);
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

  // Fast Concurrency Preloading Architecture
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]?.complete && imagesRef.current[index]?.naturalWidth) {
          resolve(imagesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            loadedCount++;
            if (loadedCount % 8 === 0 || loadedCount === TOTAL_FRAMES) {
              setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            }
            if (index === currentFrameRef.current) {
              drawFrame(index);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          if (!isCancelled) {
            loadedCount++;
            if (loadedCount % 8 === 0 || loadedCount === TOTAL_FRAMES) {
              setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            }
          }
          resolve(img);
        };
      });
    };

    // 1. Immediately load milestone keyframes (0, 31, 61, 91, 122) for instant landing
    Promise.all(STAGE_FRAMES.map((f) => loadImage(f))).then(() => {
      if (isCancelled) return;
      drawFrame(0);

      // 2. Stream all remaining frames in concurrent batches of 16
      const remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!STAGE_FRAMES.includes(i)) remaining.push(i);
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

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
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
      if (targetStage < 0 || targetStage >= STAGE_FRAMES.length) return;
      if (isAnimatingRef.current) return;

      const st = scrollTriggerRef.current;
      const fromFrame = currentFrameRef.current;
      const toFrame = STAGE_FRAMES[targetStage];
      const vh = window.innerHeight;
      const startPos = st ? st.start : 0;
      const targetScrollY = startPos + targetStage * vh;

      // Lock triggers while transition runs
      isAnimatingRef.current = true;
      currentStageRef.current = targetStage;
      setActiveStep(targetStage);

      // Duration: 0.65s to 0.85s per step
      const stepDistance = Math.abs(targetStage - (PRODUCT_STEPS.find((p) => p.frame === fromFrame)?.stepIndex ?? 0));
      const duration = Math.max(0.65, Math.min(0.65 + (stepDistance - 1) * 0.15, 0.85));

      // 1. Smoothly scroll the page to this stage's pinned offset
      if (lenis) {
        lenis.scrollTo(targetScrollY, {
          duration: duration,
          easing: (t: number) => 1 - Math.pow(1 - t, 3), // Smooth cubic deceleration
        });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }

      // 2. Smoothly interpolate canvas frames with exact landing
      gsap.killTweensOf(animRef.current);
      gsap.to(animRef.current, {
        frame: toFrame,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          const current = Math.round(animRef.current.frame);
          if (current !== currentFrameRef.current) {
            currentFrameRef.current = current;
            drawFrame(current);
          }
        },
        onComplete: () => {
          currentFrameRef.current = toFrame;
          animRef.current.frame = toFrame;
          drawFrame(toFrame);

          // Generous 280ms cooldown: ensures Lenis has settled and trackpad inertia is dead
          setTimeout(() => {
            isAnimatingRef.current = false;
            wheelAccumulatorRef.current = 0;
          }, 280);
        },
      });
    },
    [drawFrame, lenis]
  );

  // Setup GSAP ScrollTrigger Pinning exclusively for viewport lock (NO onUpdate frame hijacking)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    if (!isDesktop || !containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4}`,
        pinSpacing: true,
        anticipatePin: 1,
      });

      scrollTriggerRef.current = st;
    }, containerRef);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, []);

  // Controlled Desktop Scroll & Gesture Engine with Immediate Next-Section Transition
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    if (!isDesktop) return;

    const WHEEL_THRESHOLD = 22; // Required delta before advancing
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;
    let lastDirection = 0; // 1 = down, -1 = up
    let lastDirectionTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const st = scrollTriggerRef.current;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const startPos = st ? st.start : 0;
      const heroMaxScroll = startPos + 4 * vh; // Offset for Product 5 (Stage 4)

      const currentDir = e.deltaY > 0 ? 1 : -1;

      // Trackpad Rebound Guard (350ms deadzone)
      if (lastDirection !== 0 && currentDir !== lastDirection) {
        const timeSinceFlip = Date.now() - lastDirectionTime;
        if (timeSinceFlip < 350) {
          if (scrollY < heroMaxScroll + 100) {
            e.preventDefault();
          }
          return;
        }
      }

      // ── CASE 1: SCROLL DOWN (e.deltaY > 0) ──
      if (e.deltaY > 0) {
        lastDirection = 1;
        lastDirectionTime = Date.now();

        // While at Product 1 to 4 (stages 0, 1, 2, 3): Advance 1 product
        if (currentStageRef.current < 4) {
          e.preventDefault();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += e.deltaY;
          if (wheelAccumulatorRef.current >= WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            transitionToStage(currentStageRef.current + 1);
          }
          return;
        }

        // At Product 5 (Stage 4): The animation has finished!
        // Immediately smoothly scroll down to the next section on ONE single scroll!
        const heroSection = document.getElementById('hero-section');
        const nextSectionTop = heroSection ? heroSection.offsetTop : (st ? st.end : 4 * vh) + 60;

        if (scrollY < nextSectionTop - 30) {
          e.preventDefault();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += e.deltaY;
          if (wheelAccumulatorRef.current >= WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            isAnimatingRef.current = true;

            if (lenis) {
              lenis.scrollTo(nextSectionTop, {
                duration: 0.85,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                onComplete: () => {
                  setTimeout(() => {
                    isAnimatingRef.current = false;
                  }, 250);
                },
              });
            } else {
              window.scrollTo({ top: nextSectionTop, behavior: 'smooth' });
              setTimeout(() => {
                isAnimatingRef.current = false;
              }, 850);
            }
          }
          return;
        }

        // Already at/past the next section: normal page scroll continues
        return;
      }

      // ── CASE 2: SCROLL UP (e.deltaY < 0) ──
      if (e.deltaY < 0) {
        lastDirection = -1;
        lastDirectionTime = Date.now();

        const heroSection = document.getElementById('hero-section');
        const nextSectionTop = heroSection ? heroSection.offsetTop : (st ? st.end : 4 * vh) + 60;

        // If user is deep down in the website below hero:
        if (scrollY > nextSectionTop + 50) {
          // Allow normal upward scrolling back towards the hero
          return;
        }

        // If user is at or near the top of the next section, scroll UP immediately snaps back into Product 5:
        if (scrollY >= heroMaxScroll - 10 && scrollY <= nextSectionTop + 50) {
          e.preventDefault();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += e.deltaY;
          if (wheelAccumulatorRef.current <= -WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            transitionToStage(4); // Snap back to Product 5 (Frame 122)
          }
          return;
        }

        // Inside the hero pinned section (Stage 1 to 4): Step backward 1 product
        if (currentStageRef.current > 0) {
          e.preventDefault();

          if (isAnimatingRef.current) return;

          if (wheelResetTimer) clearTimeout(wheelResetTimer);
          wheelResetTimer = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 200);

          wheelAccumulatorRef.current += e.deltaY;
          if (wheelAccumulatorRef.current <= -WHEEL_THRESHOLD) {
            wheelAccumulatorRef.current = 0;
            const prevStage = Math.max(0, currentStageRef.current - 1);
            transitionToStage(prevStage);
          }
          return;
        }
      }
    };

    // Keyboard navigation (ArrowDown / ArrowUp)
    const handleKeyDown = (e: KeyboardEvent) => {
      const st = scrollTriggerRef.current;
      const vh = window.innerHeight;
      const heroSection = document.getElementById('hero-section');
      const nextSectionTop = heroSection ? heroSection.offsetTop : (st ? st.end : 4 * vh) + 60;

      if (window.scrollY > nextSectionTop + 50) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentStageRef.current < 4) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            transitionToStage(currentStageRef.current + 1);
          }
        } else if (currentStageRef.current === 4 && window.scrollY < nextSectionTop - 30) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            if (lenis) lenis.scrollTo(nextSectionTop, { duration: 0.85 });
            else window.scrollTo({ top: nextSectionTop, behavior: 'smooth' });
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentStageRef.current > 0) {
          e.preventDefault();
          if (!isAnimatingRef.current) {
            transitionToStage(currentStageRef.current - 1);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [transitionToStage]);

  // Jump directly to a specific milestone (e.g. via navigation dots)
  const goToStep = (stepIdx: number) => {
    if (stepIdx === currentStageRef.current || isAnimatingRef.current) return;
    transitionToStage(stepIdx);
  };

  // Skip animation button: jump directly to Frame 122 and scroll past hero into main website
  const handleSkipToContent = () => {
    gsap.killTweensOf(animRef.current);
    currentStageRef.current = 4;
    setActiveStep(4);
    currentFrameRef.current = 122;
    animRef.current.frame = 122;
    drawFrame(122);
    isAnimatingRef.current = false;

    const heroSection = document.getElementById('hero-section');
    const st = scrollTriggerRef.current;
    const vh = window.innerHeight;
    const targetScrollY = heroSection ? heroSection.offsetTop : (st ? st.end : 4 * vh) + 60;

    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 0.85 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  const currentProduct = PRODUCT_STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f4f2ee] select-none"
    >
      {/* 100% Guaranteed Pinned Viewport (100vh): Locked by GSAP ScrollTrigger throughout all 5 products */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Hardware-Accelerated 3D Product Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover"
        />

        {/* Top and bottom subtle edge fades */}
        <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-[#f4f2ee]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[#f4f2ee]/80 to-transparent" />

        {/* Top Brand Bar & Loading Indicator */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-charcoal-200/80 shadow-xs pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              ALFA 3D SHOWCASE
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-xs font-medium text-brand-700">
              Step {activeStep + 1} of {PRODUCT_STEPS.length}
            </span>
          </div>

          {/* Load progress badge */}
          {loadProgress < 100 && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900/80 text-white backdrop-blur-md text-[11px] font-medium transition-opacity duration-500">
              <Sparkles className="w-3 h-3 text-brand-400 animate-spin" />
              <span>Optimizing 3D Frames {loadProgress}%</span>
            </div>
          )}
        </div>

        {/* Main Product Story Card Overlay (Bottom-Left Positioned for 100% Unobstructed Product Visibility) */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 lg:left-12 z-20 pointer-events-none max-w-md lg:max-w-lg w-[calc(100%-2rem)] sm:w-auto">
          <div className="w-full pointer-events-auto transition-all duration-300 transform translate-y-0">
            <div className="bg-white/95 sm:bg-white/90 backdrop-blur-xl border border-charcoal-200/90 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-500/15 border border-brand-500/30 px-2.5 py-0.5 rounded-md">
                  {currentProduct.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-charcoal-700 bg-charcoal-100 px-2 py-0.5 rounded-md border border-charcoal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  {currentProduct.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
                  {currentProduct.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-brand-600 mt-0.5">
                  {currentProduct.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentProduct.description}
              </p>

              {/* Feature Checklist (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-charcoal-100">
                {currentProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-charcoal-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenQuoteModal?.(currentProduct.productName)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-600/25 transition-all active:scale-95"
                >
                  Request Quote
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSkipToContent}
                  className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Skip Animation
                  <ArrowDown className="w-3.5 h-3.5" />
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

        {/* Dynamic Bottom Scroll Prompt */}
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
