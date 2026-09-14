import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

// ─── Product Configuration (Extensible: add remaining 3 when ready) ───
export interface Mobile3DProduct {
  id: string;
  modelUrl: string;
  fallbackUrl?: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  productName: string;
  navLabel: string;
  scaleModifier?: number;
  initialRotationY?: number;
}

export const MOBILE_PRODUCTS: Mobile3DProduct[] = [
  {
    id: 'cups',
    modelUrl: '/Assets/mobile-3d/glass.glb',
    fallbackUrl: '/Assets/Mobile%20scroll%20animation/Glass.glb',
    category: 'Hot Beverage Packaging',
    badge: '100% Biodegradable',
    title: 'Ripple Kraft Paper Cups',
    subtitle: 'Thermal Fluted Insulation & Pure Paper Rigidity',
    description:
      'Double and ripple-wall natural kraft cups engineered for hot coffees, teas, and specialty beverages.',
    features: ['Food-Grade Board', 'Heat-Resistant Fluting', 'Comfort Grip Outer', 'Zero Plastic Lamination'],
    productName: 'Paper Cups',
    navLabel: 'Cups',
    scaleModifier: 1.0,
    initialRotationY: 0.4,
  },
  {
    id: 'takeaway',
    modelUrl: '/Assets/mobile-3d/takeaway.glb',
    fallbackUrl: '/Assets/Mobile%20scroll%20animation/Take%20Away.glb',
    category: 'Commercial Food Takeaway',
    badge: 'Oil & Grease Resistant',
    title: 'Eco Clamshell Meal Boxes',
    subtitle: 'Heavy-Duty Burger & Meal Containers',
    description:
      'Sturdy natural kraft clamshell packaging with secure interlocking tabs. Resists scalding oils and sauces.',
    features: ['Steam-Vented Latch', 'Sauce & Oil Barrier', 'Rigid Reinforced Base', '100% Recyclable'],
    productName: 'Burger Boxes',
    navLabel: 'Boxes',
    scaleModifier: 1.1,
    initialRotationY: -0.5,
  },
  // Future products — simply add entries here:
  // { id: 'tubs',   modelUrl: '/Assets/mobile-3d/tub.glb',    ... },
  // { id: 'plates', modelUrl: '/Assets/mobile-3d/plate.glb',  ... },
  // { id: 'bakery', modelUrl: '/Assets/mobile-3d/bakery.glb', ... },
];

interface MobileHero3DProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

// ─── Constants ───
const TURNTABLE_RADIUS = 2.8; // Distance from center for each product on the virtual turntable
const TURNTABLE_SPEED = 0.6; // Animation smoothness

export const MobileHero3D: React.FC<MobileHero3DProps> = ({ onOpenQuoteModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const turntableRef = useRef<THREE.Group | null>(null);
  const modelGroupsRef = useRef<(THREE.Group | null)[]>(new Array(MOBILE_PRODUCTS.length).fill(null));
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Animation state refs
  const currentAngleRef = useRef(0); // Current turntable rotation angle
  const targetAngleRef = useRef(0); // Target turntable rotation angle
  const activeStepRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const isMountedRef = useRef(true);

  // Touch swipe state for horizontal gesture support
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    isSwiping: false,
    startAngle: 0,
  });

  activeStepRef.current = activeStep;

  // Calculate the turntable angle for a given product index
  const getAngleForStep = useCallback((stepIdx: number) => {
    const anglePerProduct = (Math.PI * 2) / MOBILE_PRODUCTS.length;
    return -stepIdx * anglePerProduct;
  }, []);

  // Initialize Three.js scene & load GLB models
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isMountedRef.current = true;

    // ── 1. Scene ──
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // ── 2. Camera ──
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 5.5);
    camera.lookAt(0, 0.4, 0);
    cameraRef.current = camera;

    // ── 3. Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // ── 4. Lighting (Warm studio, matching #f4f2ee background) ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.6);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f5e9, 1.0);
    fillLight.position.set(-4, 0, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // ── 5. Ground Contact Shadow ──
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(40, 35, 30, 0.20)');
      grad.addColorStop(0.5, 'rgba(40, 35, 30, 0.06)');
      grad.addColorStop(1, 'rgba(40, 35, 30, 0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.85, 0);
    scene.add(shadowMesh);

    // ── 6. Turntable Group (parent for all product models) ──
    const turntable = new THREE.Group();
    turntable.position.set(0, 0, 0);
    scene.add(turntable);
    turntableRef.current = turntable;

    // ── 7. Load GLB Models onto the turntable ──
    const loader = new GLTFLoader();
    let loadedCount = 0;

    const anglePerProduct = (Math.PI * 2) / MOBILE_PRODUCTS.length;

    const loadPromises = MOBILE_PRODUCTS.map((prod, index) => {
      return new Promise<void>((resolve) => {
        const loadUrl = (url: string, isRetry = false) => {
          loader.load(
            url,
            (gltf) => {
              if (!isMountedRef.current) return;
              const model = gltf.scene;

              // Normalize model size via bounding box
              const bbox = new THREE.Box3().setFromObject(model);
              const center = new THREE.Vector3();
              const size = new THREE.Vector3();
              bbox.getCenter(center);
              bbox.getSize(size);

              model.position.x = -center.x;
              model.position.y = -center.y;
              model.position.z = -center.z;

              const maxDim = Math.max(size.x, size.y, size.z) || 1;
              const targetSize = 2.0 * (prod.scaleModifier || 1);
              const scale = targetSize / maxDim;

              // Create a group for this product
              const productGroup = new THREE.Group();
              productGroup.scale.set(scale, scale, scale);
              productGroup.add(model);

              // Position on the virtual turntable circle
              const angle = index * anglePerProduct;
              productGroup.position.set(
                Math.sin(angle) * TURNTABLE_RADIUS,
                0.3,
                Math.cos(angle) * TURNTABLE_RADIUS
              );

              // Face outward from center
              productGroup.rotation.y = angle + Math.PI + (prod.initialRotationY || 0);

              turntable.add(productGroup);
              modelGroupsRef.current[index] = productGroup;

              loadedCount++;
              setLoadProgress(Math.round((loadedCount / MOBILE_PRODUCTS.length) * 100));
              resolve();
            },
            undefined,
            (err) => {
              if (!isRetry && prod.fallbackUrl) {
                loadUrl(prod.fallbackUrl, true);
              } else {
                console.error(`Failed to load 3D model for ${prod.title}:`, err);
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / MOBILE_PRODUCTS.length) * 100));
                resolve();
              }
            }
          );
        };

        loadUrl(prod.modelUrl);
      });
    });

    Promise.all(loadPromises).then(() => {
      if (!isMountedRef.current) return;
      setIsLoaded(true);
      setupScrollAnimation();
    });

    // ── 8. Render Loop with smooth turntable interpolation ──
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Smooth interpolation (lerp) toward target angle
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.08;

      if (turntableRef.current) {
        turntableRef.current.rotation.y = currentAngleRef.current;
      }

      // Gentle per-product self-rotation (slow spin on Y axis for visual life)
      const elapsed = clock.getElapsedTime();
      modelGroupsRef.current.forEach((group, idx) => {
        if (group) {
          const baseAngle = idx * anglePerProduct + Math.PI + (MOBILE_PRODUCTS[idx].initialRotationY || 0);
          group.rotation.y = baseAngle + Math.sin(elapsed * 0.3 + idx) * 0.08;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── 9. Resize handler ──
    const handleResize = () => {
      if (!canvas || !camera || !renderer) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMountedRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      renderer.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      scene.clear();
    };
  }, []);

  // ─── GSAP ScrollTrigger: Rotate turntable on scroll ───
  const setupScrollAnimation = useCallback(() => {
    if (!containerRef.current || !pinRef.current) return;

    const totalScrollDistance = MOBILE_PRODUCTS.length * 800;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: `+=${totalScrollDistance}`,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress; // 0 → 1

            // Map progress to product index
            const exactStep = progress * MOBILE_PRODUCTS.length;
            const newStep = Math.min(
              Math.floor(exactStep),
              MOBILE_PRODUCTS.length - 1
            );

            if (newStep !== activeStepRef.current) {
              setActiveStep(newStep);
            }

            // Rotate the turntable to show the current product
            const fullRotation = Math.PI * 2;
            targetAngleRef.current = progress * fullRotation;
          },
          onLeave: () => {
            // Snap to last product when exiting
            targetAngleRef.current = getAngleForStep(MOBILE_PRODUCTS.length - 1) + Math.PI * 2;
          },
        },
      });

      scrollTriggerRef.current = ScrollTrigger.getAll().pop() || null;
    }, containerRef);

    return () => ctx.revert();
  }, [getAngleForStep]);

  // ─── Touch Swipe Gesture Handlers (Horizontal swipe to switch products) ───
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current.startX = touch.clientX;
    touchRef.current.startY = touch.clientY;
    touchRef.current.isSwiping = false;
    touchRef.current.startAngle = currentAngleRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;

    // Only intercept horizontal swipes (threshold: |deltaX| > |deltaY| * 1.5)
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 15) {
      touchRef.current.isSwiping = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current.isSwiping) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX < 0 ? 1 : -1; // Swipe left = next, right = prev
      const newStep = Math.max(0, Math.min(MOBILE_PRODUCTS.length - 1, activeStepRef.current + direction));

      if (newStep !== activeStepRef.current) {
        goToStep(newStep);
      }
    }
  };

  // ─── Navigate to a specific product ───
  const goToStep = (stepIdx: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;

    // Calculate target scroll position
    const progressPerStep = 1 / MOBILE_PRODUCTS.length;
    const targetProgress = (stepIdx + 0.5) * progressPerStep;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // ─── Skip past the 3D section ───
  const handleSkipToContent = () => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    window.scrollTo({
      top: st.end + 20,
      behavior: 'smooth',
    });
  };

  const currentProduct = MOBILE_PRODUCTS[activeStep];

  return (
    <section ref={containerRef} className="relative w-full bg-[#f4f2ee] select-none block md:hidden">
      {/* Sticky Viewport Container */}
      <div ref={pinRef} className="relative w-full h-[100dvh] overflow-hidden">
        {/* WebGL 3D Canvas */}
        <canvas
          ref={canvasRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="absolute inset-0 w-full h-full block touch-pan-y"
        />

        {/* Subtle top/bottom edge fades */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#f4f2ee]/90 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#f4f2ee] via-[#f4f2ee]/80 to-transparent z-10" />

        {/* ── Top Brand Bar ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-charcoal-200/80 shadow-xs pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-900">
              ALFA 3D
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-[11px] font-semibold text-brand-700">
              {activeStep + 1} / {MOBILE_PRODUCTS.length}
            </span>
          </div>

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-900/80 text-white backdrop-blur-md text-[10px] font-medium pointer-events-auto">
              <Sparkles className="w-3 h-3 text-brand-400 animate-spin" />
              <span>Loading 3D {loadProgress}%</span>
            </div>
          )}
        </div>

        {/* ── Horizontal Swipe Navigation Arrows (Tap to switch) ── */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-2">
          {/* Left Arrow */}
          <button
            onClick={() => activeStep > 0 && goToStep(activeStep - 1)}
            disabled={activeStep === 0}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-90 ${
              activeStep === 0
                ? 'bg-white/30 border-charcoal-200/30 text-charcoal-300 cursor-not-allowed'
                : 'bg-white/80 border-charcoal-200/80 text-charcoal-700 shadow-sm hover:bg-white'
            }`}
            aria-label="Previous product"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => activeStep < MOBILE_PRODUCTS.length - 1 && goToStep(activeStep + 1)}
            disabled={activeStep === MOBILE_PRODUCTS.length - 1}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-90 ${
              activeStep === MOBILE_PRODUCTS.length - 1
                ? 'bg-white/30 border-charcoal-200/30 text-charcoal-300 cursor-not-allowed'
                : 'bg-white/80 border-charcoal-200/80 text-charcoal-700 shadow-sm hover:bg-white'
            }`}
            aria-label="Next product"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Bottom: Product Card + Pill Indicators ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3.5 pb-4 pointer-events-none">
          <div className="w-full pointer-events-auto bg-white/95 backdrop-blur-xl border border-charcoal-200/90 shadow-2xl rounded-2xl p-4 space-y-2.5">

            {/* Category & Badge + Step Dots */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-500/15 border border-brand-500/30 px-2 py-0.5 rounded-md">
                  {currentProduct.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-charcoal-700 bg-charcoal-100 px-1.5 py-0.5 rounded-md border border-charcoal-200">
                  <ShieldCheck className="w-3 h-3 text-brand-600" />
                  {currentProduct.badge}
                </span>
              </div>

              {/* Pill Tab Navigation (Swappable) */}
              <div className="flex items-center gap-1.5">
                {MOBILE_PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => goToStep(idx)}
                    aria-label={`View ${prod.title}`}
                    className={`transition-all duration-300 rounded-full ${
                      activeStep === idx
                        ? 'w-5 h-2 bg-brand-600 shadow-sm'
                        : 'w-2 h-2 bg-charcoal-300 hover:bg-brand-500/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="text-lg font-extrabold text-charcoal-900 tracking-tight leading-tight">
                {currentProduct.title}
              </h2>
              <p className="text-[11px] font-semibold text-brand-600 mt-0.5">
                {currentProduct.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-[11px] text-charcoal-600 leading-relaxed line-clamp-2">
              {currentProduct.description}
            </p>

            {/* Features 2×2 Grid */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-charcoal-100">
              {currentProduct.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1 text-[10px] font-medium text-charcoal-700">
                  <CheckCircle2 className="w-3 h-3 text-brand-600 flex-shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenQuoteModal?.(currentProduct.productName)}
                className="flex-1 inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/25 transition-all active:scale-95"
              >
                Request Quote
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleSkipToContent}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs font-semibold transition-colors"
              >
                Skip
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Scroll / Swipe Hint */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-[10px] font-bold text-charcoal-500">Swipe or scroll to explore products</span>
            <ArrowDown className="w-3 h-3 text-brand-600 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero3D;
