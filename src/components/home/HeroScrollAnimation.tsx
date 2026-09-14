import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { ArrowDown, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroScrollAnimationProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

interface ProductStep {
  stepIndex: number;
  startFrame: number;
  endFrame: number;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
  features: string[];
  productName: string;
  navLabel: string;
}

const TOTAL_FRAMES = 123; // Alfa_00000.webp to Alfa_00122.webp
const MILESTONES = [0, 0.25, 0.5, 0.75, 1.0];

const PRODUCT_STEPS: ProductStep[] = [
  {
    stepIndex: 0,
    startFrame: 0,
    endFrame: 31,
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
    startFrame: 32,
    endFrame: 61,
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
    startFrame: 62,
    endFrame: 91,
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
    startFrame: 92,
    endFrame: 122,
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
    startFrame: 122,
    endFrame: 122,
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

  // Store preloaded images in a ref to avoid React state re-renders during 60fps scrub
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const lastMilestoneRef = useRef<number>(0);
  const lastScrollDirectionRef = useRef<number>(1);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Helper to find closest available loaded image if user scrubs quickly
  const findNearestImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[targetIndex]?.complete && images[targetIndex]?.naturalWidth) {
      return images[targetIndex];
    }
    // Search outwards from targetIndex
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

  // Draw image on canvas using object-fit: cover logic
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
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

      // Object-fit: cover calculation
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

  // 3-Tier Progressive Preloading Architecture (Desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    let isCancelled = false;
    let loadedCount = 0;

    const updateProgress = () => {
      if (isCancelled) return;
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
    };

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          resolve(imagesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            updateProgress();
            // If this is the current active frame, render immediately
            if (index === currentFrameRef.current) {
              drawFrame(index);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          if (!isCancelled) {
            updateProgress();
          }
          resolve(img);
        };
      });
    };

    // Tier 1: Load frame 0 immediately for instant display (< 80ms)
    loadImage(0).then(() => {
      if (!isCancelled) {
        drawFrame(0);
      }

      // Tier 2: Preload sequence milestones in parallel
      const landmarks = [31, 61, 91, 122];
      Promise.all(landmarks.map((idx) => loadImage(idx))).then(() => {
        if (isCancelled) return;

        // Tier 3: Stride loading of remaining frames
        const remaining: number[] = [];
        for (let i = 2; i < TOTAL_FRAMES; i += 2) {
          if (!landmarks.includes(i)) remaining.push(i);
        }
        for (let i = 1; i < TOTAL_FRAMES; i += 2) {
          if (!landmarks.includes(i)) remaining.push(i);
        }

        const loadBatch = async (batch: number[]) => {
          for (const idx of batch) {
            if (isCancelled) break;
            await loadImage(idx);
          }
        };

        const chunkSize = Math.ceil(remaining.length / 4);
        for (let c = 0; c < 4; c++) {
          loadBatch(remaining.slice(c * chunkSize, (c + 1) * chunkSize));
        }
      });
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

  // Setup GSAP ScrollTrigger with Stepped Snap
  // Setup GSAP ScrollTrigger with Directional Auto-Scroll Snap (Desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Directional auto-scroll snap: even on the tiniest scroll gesture (1 point/notch),
      // auto-scroll forward to the next end sequence instead of reversing back!
      const customSnapTo = (progress: number) => {
        const currentMilestone = lastMilestoneRef.current;
        const currentBase = MILESTONES[currentMilestone] ?? 0;
        const delta = progress - currentBase;
        const dir = lastScrollDirectionRef.current;
        const threshold = 0.0005; // Any scroll > 0.05% of track (~1.8px)

        let targetIndex = currentMilestone;

        if (dir > 0 && (delta > threshold || progress > currentBase + threshold)) {
          // User scrolled DOWN: MUST advance to next sequence, NEVER reverse back!
          targetIndex = Math.min(currentMilestone + 1, MILESTONES.length - 1);

          // If user scrolled hard past multiple milestones
          for (let i = targetIndex; i < MILESTONES.length; i++) {
            if (progress > MILESTONES[i] - 0.04) {
              targetIndex = Math.min(i + 1, MILESTONES.length - 1);
            }
          }
        } else if (dir < 0 && (delta < -threshold || progress < currentBase - threshold)) {
          // User scrolled UP: MUST retreat to previous sequence, NEVER reverse forward!
          targetIndex = Math.max(currentMilestone - 1, 0);

          // If user scrolled hard backward past multiple milestones
          for (let i = targetIndex; i >= 0; i--) {
            if (progress < MILESTONES[i] + 0.04) {
              targetIndex = Math.max(i - 1, 0);
            }
          }
        } else {
          targetIndex = currentMilestone;
        }

        lastMilestoneRef.current = targetIndex;
        return MILESTONES[targetIndex];
      };

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 0.3,
        snap: {
          snapTo: customSnapTo,
          duration: { min: 0.35, max: 0.65 },
          delay: 0.02,
          ease: 'power2.out',
          inertia: false,
        },
        onUpdate: (self) => {
          const progress = self.progress; // 0.0 to 1.0

          if (self.direction !== 0) {
            lastScrollDirectionRef.current = self.direction;
          }

          // Keep lastMilestoneRef in sync when resting near any milestone
          for (let i = 0; i < MILESTONES.length; i++) {
            if (Math.abs(progress - MILESTONES[i]) < 0.015) {
              lastMilestoneRef.current = i;
              break;
            }
          }

          const targetFrame = Math.min(Math.round(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);

          // Calculate active step (5 milestones: 0, 1, 2, 3, 4)
          let step = 0;
          if (progress >= 0.875) step = 4;
          else if (progress >= 0.625) step = 3;
          else if (progress >= 0.375) step = 2;
          else if (progress >= 0.125) step = 1;
          else step = 0;

          setActiveStep(step);
        },
      });

      scrollTriggerRef.current = st;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [drawFrame]);

  const goToStep = (stepIdx: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    lastMilestoneRef.current = stepIdx;
    const targetProgress = MILESTONES[stepIdx];
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const handleSkipToContent = () => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    window.scrollTo({
      top: st.end + 20,
      behavior: 'smooth',
    });
  };

  const currentProduct = PRODUCT_STEPS[activeStep];

  return (
    <section ref={containerRef} className="relative w-full bg-[#f4f2ee] select-none hidden md:block">
      {/* Sticky Pinned Viewport Container (100vh) */}
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
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

        {/* Main Product Story Card Overlay (Bottom-Left Positioned for Full Product Visibility) */}
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

        {/* Bottom Scroll Prompt (Clean - Removed 1 scroll = 1 product text) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-charcoal-200/70 shadow-xs pointer-events-none text-charcoal-700">
          <span className="text-xs font-bold tracking-wide">
            Scroll down to advance sequence
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-brand-600 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroScrollAnimation;
