import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
  RotateCcw,
  Sparkles,
  MoveHorizontal,
} from 'lucide-react';

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
  initialRotation?: [number, number, number];
}

interface MobileHero3DProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

// Extensible Product Array (Currently 2 products, automatically scales to 5 when remaining GLB files are added)
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
      'Double and ripple-wall natural kraft cups engineered for hot coffees, teas, and specialty beverages. Compostable lining prevents sogginess without synthetic plastic coatings.',
    features: ['Food-Grade Board', 'Heat-Resistant Fluting', 'Comfort Grip Outer', 'Zero Plastic Lamination'],
    productName: 'Paper Cups',
    navLabel: 'Cups',
    scaleModifier: 1.05,
    initialRotation: [0.18, 0.4, 0],
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
      'Sturdy natural kraft clamshell packaging with secure interlocking tabs. Resists scalding oils, sauces, and vapor without soggy deformation or synthetic PFAS.',
    features: ['Steam-Vented Latch', 'Sauce & Oil Barrier', 'Rigid Reinforced Base', '100% Recyclable'],
    productName: 'Burger Boxes',
    navLabel: 'Boxes',
    scaleModifier: 1.15,
    initialRotation: [0.25, -0.5, 0],
  },
];

export const MobileHero3D: React.FC<MobileHero3DProps> = ({ onOpenQuoteModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Store references to Three.js scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupsRef = useRef<(THREE.Group | null)[]>(new Array(MOBILE_PRODUCTS.length).fill(null));
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Touch drag state for 360 degree user inspection
  const touchStateRef = useRef<{
    isDragging: boolean;
    lastX: number;
    lastY: number;
    dragRotX: number;
    dragRotY: number;
  }>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    dragRotX: 0,
    dragRotY: 0,
  });

  const activeStepRef = useRef<number>(0);
  activeStepRef.current = activeStep;

  // Initialize Three.js scene & load GLB models
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animFrameId: number;
    let isMounted = true;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);
    camera.lookAt(0, 0.3, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. Lighting setup (Warm natural studio lighting matching brand aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(3.5, 6, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f5e9, 1.2);
    fillLight.position.set(-3.5, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 5. Soft Ground Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(40, 35, 30, 0.22)');
      gradient.addColorStop(0.5, 'rgba(40, 35, 30, 0.08)');
      gradient.addColorStop(1, 'rgba(40, 35, 30, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.65, 0);
    scene.add(shadowMesh);

    // 6. Load GLTF Models
    const loader = new GLTFLoader();
    const loadPromises = MOBILE_PRODUCTS.map((prod, index) => {
      return new Promise<void>((resolve) => {
        const loadFromUrl = (url: string, isRetry: boolean = false) => {
          loader.load(
            url,
            (gltf) => {
              if (!isMounted) return;
              const model = gltf.scene;

              // Compute bounding box and normalize size
              const bbox = new THREE.Box3().setFromObject(model);
              const center = new THREE.Vector3();
              const size = new THREE.Vector3();
              bbox.getCenter(center);
              bbox.getSize(size);

              // Center model to origin
              model.position.x = -center.x;
              model.position.y = -center.y;
              model.position.z = -center.z;

              // Normalization scale factor
              const maxDim = Math.max(size.x, size.y, size.z) || 1;
              const targetSize = 1.95 * (prod.scaleModifier || 1);
              const scale = targetSize / maxDim;

              const group = new THREE.Group();
              group.scale.set(scale, scale, scale);
              group.add(model);

              // Position models: Product 0 starts centered, Product 1+ start below stage
              if (index === 0) {
                group.position.set(0, 0.35, 0);
                if (prod.initialRotation) {
                  group.rotation.set(...prod.initialRotation);
                }
                group.visible = true;
              } else {
                group.position.set(0, -2.6, -0.6);
                if (prod.initialRotation) {
                  group.rotation.set(...prod.initialRotation);
                }
                group.visible = false;
              }

              scene.add(group);
              modelGroupsRef.current[index] = group;
              resolve();
            },
            undefined,
            (err) => {
              if (!isRetry && prod.fallbackUrl) {
                console.warn(`Initial GLB load failed for ${prod.title}, retrying fallback:`, prod.fallbackUrl);
                loadFromUrl(prod.fallbackUrl, true);
              } else {
                console.error(`Failed to load 3D model for ${prod.title}:`, err);
                resolve();
              }
            }
          );
        };

        loadFromUrl(prod.modelUrl);
      });
    });

    Promise.all(loadPromises).then(() => {
      if (!isMounted) return;
      setIsLoaded(true);

      // Setup GSAP ScrollTrigger for 3D Fly-Through Morph
      setupScrollAnimation();
    });

    // 7. Render Loop with smooth dampening & touch rotation
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle ambient floating bob
      const currentIdx = activeStepRef.current;
      const activeGroup = modelGroupsRef.current[currentIdx];

      if (activeGroup && !touchStateRef.current.isDragging) {
        // Smoothly decay drag rotation back to base
        touchStateRef.current.dragRotX *= 0.92;
        touchStateRef.current.dragRotY *= 0.92;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!canvas || !camera || !renderer) return;
      const newWidth = canvas.clientWidth || window.innerWidth;
      const newHeight = canvas.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Dispose Three.js resources
      renderer.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      scene.clear();
    };
  }, []);

  // Setup GSAP ScrollTrigger timeline
  const setupScrollAnimation = useCallback(() => {
    if (!containerRef.current || !pinRef.current) return;

    const group0 = modelGroupsRef.current[0];
    const group1 = modelGroupsRef.current[1];
    if (!group0 || !group1) return;

    // Total scroll duration proportional to product count (snappy on mobile: 90vh per product)
    const totalDistance = MOBILE_PRODUCTS.length * 900;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Update active step for text card crossfade
            const stepThreshold = 0.5;
            const newStep = progress >= stepThreshold ? 1 : 0;
            if (newStep !== activeStepRef.current) {
              setActiveStep(newStep);
            }

            // PHASE 1: Product 0 Active & Rotating (0.0 -> 0.42)
            if (progress <= 0.42) {
              group0.visible = true;
              group1.visible = false;

              // Rotate cup 360 degrees
              const subProgress = progress / 0.42;
              group0.position.set(0, 0.35 + Math.sin(subProgress * Math.PI) * 0.06, 0);
              group0.scale.set(
                (MOBILE_PRODUCTS[0].scaleModifier || 1) * 1.95,
                (MOBILE_PRODUCTS[0].scaleModifier || 1) * 1.95,
                (MOBILE_PRODUCTS[0].scaleModifier || 1) * 1.95
              );
              group0.rotation.y = 0.4 + subProgress * (Math.PI * 1.8) + touchStateRef.current.dragRotY;
              group0.rotation.x = 0.18 + Math.sin(subProgress * Math.PI * 2) * 0.12 + touchStateRef.current.dragRotX;
            }
            // PHASE 2: Apple-Style Fly-Through Morph Transition (0.42 -> 0.58)
            else if (progress > 0.42 && progress < 0.58) {
              const transProgress = (progress - 0.42) / (0.58 - 0.42); // 0 to 1

              group0.visible = transProgress < 0.85;
              group1.visible = transProgress > 0.15;

              // Product 0: Glides upward, scales down, spins out
              const exitY = 0.35 + transProgress * 2.3;
              const exitScale = Math.max(0.01, 1 - transProgress * 0.6) * (MOBILE_PRODUCTS[0].scaleModifier || 1) * 1.95;
              group0.position.set(0, exitY, -transProgress * 0.8);
              group0.scale.set(exitScale, exitScale, exitScale);
              group0.rotation.y = 0.4 + Math.PI * 1.8 + transProgress * Math.PI * 1.2;

              // Product 1: Glides in from bottom, scales up, spins into view
              const enterY = -2.6 + transProgress * 2.95; // arrives at 0.35
              const enterScale = Math.min(1, 0.4 + transProgress * 0.6) * (MOBILE_PRODUCTS[1].scaleModifier || 1) * 1.95;
              group1.position.set(0, enterY, -(1 - transProgress) * 0.8);
              group1.scale.set(enterScale, enterScale, enterScale);
              group1.rotation.y = -0.5 - (1 - transProgress) * Math.PI * 1.5;
              group1.rotation.x = 0.25 - (1 - transProgress) * 0.3;
            }
            // PHASE 3: Product 1 Active & Rotating (0.58 -> 1.0)
            else {
              group0.visible = false;
              group1.visible = true;

              const subProgress = (progress - 0.58) / 0.42;
              group1.position.set(0, 0.35 + Math.sin(subProgress * Math.PI) * 0.06, 0);
              group1.scale.set(
                (MOBILE_PRODUCTS[1].scaleModifier || 1) * 1.95,
                (MOBILE_PRODUCTS[1].scaleModifier || 1) * 1.95,
                (MOBILE_PRODUCTS[1].scaleModifier || 1) * 1.95
              );
              group1.rotation.y = -0.5 + subProgress * (Math.PI * 1.8) + touchStateRef.current.dragRotY;
              group1.rotation.x = 0.25 + Math.sin(subProgress * Math.PI * 2) * 0.12 + touchStateRef.current.dragRotX;
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pointer / Touch Event Handlers for 360° Free Touch Inspection
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStateRef.current.isDragging = true;
    touchStateRef.current.lastX = e.clientX;
    touchStateRef.current.lastY = e.clientY;
    setHasInteracted(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!touchStateRef.current.isDragging) return;
    const deltaX = e.clientX - touchStateRef.current.lastX;
    const deltaY = e.clientY - touchStateRef.current.lastY;
    touchStateRef.current.lastX = e.clientX;
    touchStateRef.current.lastY = e.clientY;

    touchStateRef.current.dragRotY += deltaX * 0.008;
    touchStateRef.current.dragRotX += deltaY * 0.008;

    // Direct update to active group for instant 120fps response
    const activeGroup = modelGroupsRef.current[activeStepRef.current];
    if (activeGroup) {
      activeGroup.rotation.y += deltaX * 0.008;
      activeGroup.rotation.x += deltaY * 0.008;
    }
  };

  const handlePointerUp = () => {
    touchStateRef.current.isDragging = false;
  };

  // Jump directly to step
  const goToStep = (stepIdx: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const targetProgress = stepIdx === 0 ? 0.02 : 0.85;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Skip past the 3D scroll section
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
      <div ref={pinRef} className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between">
        {/* WebGL 3D Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing touch-none"
        />

        {/* Top Brand Bar & Touch Hint */}
        <div className="relative z-20 px-4 pt-20 flex items-center justify-between pointer-events-none">
          {/* Step Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-charcoal-200/80 shadow-xs pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-900">
              ALFA 3D SHOWCASE
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-[11px] font-semibold text-brand-700">
              {activeStep + 1} / {MOBILE_PRODUCTS.length}
            </span>
          </div>

          {/* 360° Touch Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-900/80 text-white backdrop-blur-md text-[10px] font-medium pointer-events-auto">
            <RotateCcw className="w-3 h-3 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Swipe to Rotate 3D</span>
          </div>
        </div>

        {/* Floating Swipe Gesture Hint (Fades out after first interaction) */}
        {!hasInteracted && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5 opacity-60 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-charcoal-200 flex items-center justify-center shadow-sm">
              <MoveHorizontal className="w-5 h-5 text-charcoal-700" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-700 bg-white/80 px-2 py-0.5 rounded-full">
              Drag to Inspect
            </span>
          </div>
        )}

        {/* Bottom Pinned Product Information Card */}
        <div className="relative z-20 px-3.5 pb-4 pointer-events-none">
          <div className="w-full pointer-events-auto bg-white/95 backdrop-blur-xl border border-charcoal-200/90 shadow-2xl rounded-2xl p-4 space-y-2.5">
            {/* Category & Badge Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-500/15 border border-brand-500/30 px-2 py-0.5 rounded-md">
                  {currentProduct.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-charcoal-700 bg-charcoal-100 px-1.5 py-0.5 rounded-md border border-charcoal-200">
                  <ShieldCheck className="w-3 h-3 text-brand-600" />
                  {currentProduct.badge}
                </span>
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center gap-1.5">
                {MOBILE_PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => goToStep(idx)}
                    aria-label={`Jump to ${prod.title}`}
                    className={`transition-all duration-300 rounded-full ${
                      activeStep === idx
                        ? 'w-5 h-2 bg-brand-600'
                        : 'w-2 h-2 bg-charcoal-300 hover:bg-brand-500/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Title & Subtitle */}
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

            {/* Key Features (2x2 Grid) */}
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

          {/* Clean Bottom Scroll Prompt */}
          <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] font-bold text-charcoal-600">
            <span>Scroll down for next product</span>
            <ArrowDown className="w-3 h-3 text-brand-600 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero3D;
