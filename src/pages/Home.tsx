import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Recycle,
  Leaf,
  CheckCircle2,
  Droplets,
  Utensils,
  Globe2,
  ShieldBan,
  Building2,
  Sparkles,
} from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { TextEffect } from '../components/core/text-effect';
import { ProductCard } from '../components/products/ProductCard';
import { productsData } from '../data/products';
import { certificationsData } from '../data/certifications';
import { industriesData } from '../data/industries';
import { whyChooseFeatures, companyHeritageStats } from '../data/whyChooseUs';
import { generateOrganizationSchema } from '../utils/seo';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { gsap, ScrollTrigger } from '../lib/gsap';
import heroImg from '../assets/hero-sustainable-paper.jpg';
import factoryImg from '../assets/factory-paper-production.jpg';
import sustainabilityBg from '../assets/sustainability-bg.png';
import { HeroScrollAnimation } from '../components/home/HeroScrollAnimation';
import { MobileHero3D } from '../components/home/MobileHero3D';

interface HomeProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  // GSAP Ref containers for scroll triggered sections
  const heroRef = useGsapReveal<HTMLDivElement>({ duration: 1, y: 25 });
  const productsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, y: 25 });
  const featuresRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, y: 20 });
  const credentialsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, y: 25 });
  const industriesRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, y: 20 });

  useEffect(() => {
    // Subtle hero background floating animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      gsap.to('.hero-bg-leaf', {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  useEffect(() => {
    // Subtle hero background floating animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      gsap.to('.hero-bg-leaf', {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const featureIcons: Record<string, React.ReactNode> = {
    Leaf: <Leaf className="w-5 h-5 text-brand-600" />,
    Recycle: <Recycle className="w-5 h-5 text-brand-600" />,
    ShieldBan: <ShieldBan className="w-5 h-5 text-brand-600" />,
    RefreshCw: <Recycle className="w-5 h-5 text-brand-600" />,
    Utensils: <Utensils className="w-5 h-5 text-brand-600" />,
    Droplets: <Droplets className="w-5 h-5 text-brand-600" />,
    Globe2: <Globe2 className="w-5 h-5 text-brand-600" />,
    Award: <Award className="w-5 h-5 text-brand-600" />,
  };

  return (
    <div className="overflow-hidden">
      <SeoHead
        title="Sustainable Paper Products Manufacturer in Kerala | ALFA PAPER PRODUCTS"
        description="Manufacturers of biodegradable, compostable and plastic-free paper products since 1985. Food-grade plates, cups, trays, burger boxes, and bakery packaging in Tirur, Kerala."
        schema={generateOrganizationSchema()}
      />

      {/* 0A. DEDICATED 3D MOBILE HERO (Real-Time Three.js GLB Models) */}
      <MobileHero3D onOpenQuoteModal={onOpenQuoteModal} />

      {/* 0B. 3D STEPPED SCROLL SHOWCASE (Desktop & Tablet) */}
      <HeroScrollAnimation onOpenQuoteModal={onOpenQuoteModal} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-kraft-100/70 via-white to-white border-b border-charcoal-100/60 overflow-hidden">
        {/* Decorative background blur shapes */}
        <div className="absolute top-10 right-5 lg:right-20 w-72 lg:w-96 h-72 lg:h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none -z-10 hero-bg-leaf" />
        <div className="absolute bottom-5 left-5 w-64 h-64 rounded-full bg-kraft-300/20 blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Heritage Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-charcoal-200/80 shadow-xs max-w-full">
                <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 whitespace-nowrap">
                  SINCE 1985
                </span>
                <span className="text-charcoal-300 hidden sm:inline">•</span>
                <span className="text-xs font-medium text-charcoal-600 hidden sm:inline whitespace-nowrap">
                  Four Decades of Manufacturing Excellence
                </span>
              </div>

              {/* Main Headline */}
              <TextEffect
                per="word"
                as="h1"
                preset="blur"
                className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-charcoal-900 tracking-tight leading-[1.15] break-words"
                segmentWrapperClassName={(segment) =>
                  segment.includes('Cleaner') || segment.includes('Tomorrow')
                    ? 'text-brand-600'
                    : ''
                }
              >
                Sustainable Paper Products for a Cleaner Tomorrow
              </TextEffect>

              {/* Supporting Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-charcoal-700 font-medium leading-relaxed max-w-2xl">
                Manufacturing eco-friendly paper solutions since 1985.
              </p>

              {/* Value Proposition Body */}
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-2xl">
                ALFA PAPER PRODUCTS manufactures biodegradable, compostable and plastic-free paper products for food service, bakery, catering, hospitality and other commercial applications.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  to="/products"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Our Products
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  to="/contact"
                >
                  Contact Us
                </Button>
              </div>

              {/* Supporting Line & Badges */}
              <div className="pt-6 border-t border-charcoal-200/70">
                <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3 leading-relaxed">
                  Since 1985 • Food-Grade Materials • Plastic-Free Solutions • Sustainable Manufacturing
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="green" size="md" icon={<Leaf className="w-3.5 h-3.5 text-brand-600" />}>
                    Biodegradable
                  </Badge>
                  <Badge variant="green" size="md" icon={<Recycle className="w-3.5 h-3.5 text-brand-600" />}>
                    Compostable
                  </Badge>
                  <Badge variant="green" size="md" icon={<ShieldBan className="w-3.5 h-3.5 text-brand-600" />}>
                    Plastic Free
                  </Badge>
                  <Badge variant="green" size="md" icon={<Utensils className="w-3.5 h-3.5 text-brand-600" />}>
                    Food-Grade
                  </Badge>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Presentation (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Product Photography Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-premium border border-charcoal-200/80 bg-white">
                  <img
                    src={heroImg}
                    alt="Sustainable Food Grade Paper Products by ALFA"
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-transparent to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-300">
                      Food-Grade & Plastic-Free
                    </span>
                    <p className="text-base sm:text-lg font-bold text-white mt-1">
                      Good Food, Brighter Future
                    </p>
                    <p className="text-xs text-charcoal-200 mt-1 line-clamp-2">
                      Tested compostable tableware manufactured in Tirur, Kerala
                    </p>
                  </div>
                </div>

                {/* Floating Heritage Stat Card - Desktop only */}
                <div className="hidden sm:block absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-xl p-4 shadow-xl border border-charcoal-200/80 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-base border border-brand-200 flex-shrink-0">
                      40+
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal-900 whitespace-nowrap">Years Legacy</p>
                      <p className="text-[10px] text-charcoal-500 whitespace-nowrap">Established 1985</p>
                    </div>
                  </div>
                </div>

                {/* Floating CIPET Badge - Desktop only */}
                <div className="hidden sm:flex absolute -top-4 -right-4 sm:-right-6 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-charcoal-200/80 items-center gap-2">
                  <Award className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-charcoal-900 whitespace-nowrap">CIPET Kochi</p>
                    <p className="text-[10px] text-charcoal-500 whitespace-nowrap">Compostability Tested</p>
                  </div>
                </div>

                {/* Mobile-only Clean Trust Bar (eliminates card overlap on phones) */}
                <div className="flex sm:hidden items-center justify-between gap-2 mt-3 px-3.5 py-2.5 bg-white rounded-xl border border-charcoal-200/80 text-xs shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-600">40+ Years</span>
                    <span className="text-charcoal-300">•</span>
                    <span className="text-charcoal-600 text-[11px]">Est. 1985</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-700 text-[11px] font-medium">
                    <Award className="w-3.5 h-3.5 text-brand-600" />
                    <span>CIPET Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Image / Heritage Block (5 cols) */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-charcoal-200 shadow-soft bg-kraft-100">
                <img
                  src={factoryImg}
                  alt="ALFA PAPER PRODUCTS Sustainable Manufacturing"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              {/* Overlay Stat */}
              <div className="absolute bottom-6 right-6 bg-brand-500 text-white rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-extrabold leading-none">1985</p>
                <p className="text-xs font-medium text-brand-100 mt-1">Established Heritage</p>
              </div>
            </div>

            {/* Right Story Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <SectionHeading
                pill="About ALFA"
                title="Sustainable Manufacturing Since 1985"
                subtitle="For over four decades, ALFA PAPER PRODUCTS has been manufacturing practical and responsible alternatives to conventional single-use plastic products."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
                <p>
                  Based in Kerala, India, we manufacture a wide range of paper plates, cups, trays, food boxes, bakery packaging and customized paper products designed for modern food-service and packaging requirements.
                </p>
                <p>
                  Our focus is simple — delivering functional paper products while supporting a cleaner and more environmentally responsible future.
                </p>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-charcoal-100">
                {companyHeritageStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-xl sm:text-2xl font-extrabold text-brand-600">
                      <AnimatedNumber
                        value={stat.numericValue}
                        suffix={stat.valueSuffix || ''}
                        duration={stat.numericValue > 500 ? 2 : 1.6}
                        delay={idx * 0.05}
                      />
                      {stat.suffix && (
                        <span className="text-xs sm:text-sm font-bold text-charcoal-600 ml-1">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="md"
                  to="/about"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Know More About ALFA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES SECTION */}
      <section className="py-16 sm:py-24 bg-kraft-50/50 border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeading
              pill="Product Categories"
              title="Our Products"
              subtitle="Reliable paper-based solutions for food service, bakery, catering, hospitality and takeaway applications."
            />
            <Button
              variant="primary"
              size="md"
              to="/products"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="self-start md:self-auto flex-shrink-0"
            >
              View All Products
            </Button>
          </div>

          <div ref={productsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {productsData.map((prod) => (
                <div key={prod.id} className="gsap-stagger-item">
                  <ProductCard
                    product={prod}
                    onQuickQuote={(name) => onOpenQuoteModal(name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ALFA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Why Choose ALFA"
            title="Responsible Products. Reliable Performance."
            subtitle="Our products are designed to combine functionality, food safety and environmental responsibility."
            className="mb-14"
          />

          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feat) => (
              <div
                key={feat.id}
                className="gsap-stagger-item bg-white rounded-xl p-6 border border-charcoal-200/80 hover:border-brand-500/50 hover:shadow-soft transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {featureIcons[feat.icon] || <Sparkles className="w-5 h-5 text-brand-600" />}
                </div>
                <h3 className="text-base font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUSTAINABILITY HIGHLIGHT */}
      <section className="py-16 sm:py-24 lg:py-28 text-white relative overflow-hidden bg-[#061408] min-h-[580px] flex items-center">
        {/* Responsive Background Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={sustainabilityBg}
            alt="ALFA PAPER PRODUCTS Sustainable Eco Packaging"
            className="w-full h-full object-cover object-[center_top] md:object-center select-none"
            loading="lazy"
          />
          {/* Responsive Adaptive Gradient Overlays:
              - On mobile (< 768px): vertical gradient protects top text and bottom card
              - On tablet/desktop (>= 768px): horizontal bilateral gradient keeps products visible on edges while deepening center for text legibility
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#051307]/92 via-[#051307]/80 to-[#051307]/92 md:hidden" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#051307]/90 via-[#051307]/65 to-[#051307]/85" />
          <div className="absolute inset-0 bg-[#051307]/25" />
        </div>

        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/15 blur-3xl pointer-events-none z-[1]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                dark
                pill="Environmental Impact"
                title="Better Alternatives to Single-Use Plastics"
                subtitle="Single-use plastic pollution is one of the major environmental challenges faced by businesses and communities today."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-200 leading-relaxed max-w-2xl">
                <p>
                  At ALFA PAPER PRODUCTS, we believe responsible alternatives can make a meaningful difference.
                </p>
                <p>
                  Our paper-based products help restaurants, bakeries, caterers, hospitality businesses and other organizations reduce their dependence on conventional disposable plastics without compromising everyday usability.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  to="/sustainability"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Our Sustainability Commitment
                </Button>
              </div>
            </div>

            {/* Right Comparison Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#09180c]/85 backdrop-blur-md border border-brand-500/25 rounded-2xl p-6 sm:p-8 space-y-5 shadow-premium">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-brand-400" />
                  Practical Transition Strategy
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-[#112716]/80 border border-brand-500/20">
                    <p className="font-bold text-brand-300">01. 100% Food-Grade Board</p>
                    <p className="text-charcoal-300 mt-1">Zero toxic plasticisers or unsafe binders.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#112716]/80 border border-brand-500/20">
                    <p className="font-bold text-brand-300">02. CIPET Tested Compostability</p>
                    <p className="text-charcoal-300 mt-1">Confirmed disintegration under natural composting conditions.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#112716]/80 border border-brand-500/20">
                    <p className="font-bold text-brand-300">03. Full Regulatory Compliance</p>
                    <p className="text-charcoal-300 mt-1">CPCB approved and registered under EPR directives.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUALITY & COMPLIANCE PREVIEW */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <SectionHeading
                pill="Certified Manufacturing"
                title="Quality You Can Trust"
                subtitle="Environmental responsibility must be supported by quality, safety and compliance."
              />

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                Our product development and manufacturing practices focus on food-grade materials and responsible paper-based solutions.
              </p>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="md"
                  to="/quality"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Quality & Compliance
                </Button>
              </div>
            </div>

            {/* Right Credentials Grid (7 cols) */}
            <div ref={credentialsRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cred) => (
                <div
                  key={cred.id}
                  className="gsap-stagger-item bg-kraft-50/50 p-5 rounded-xl border border-charcoal-200/80 space-y-2 hover:border-brand-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-brand-50 text-brand-600">
                      {cred.iconName === 'Award' && <Award className="w-4 h-4" />}
                      {cred.iconName === 'ShieldCheck' && <ShieldCheck className="w-4 h-4" />}
                      {cred.iconName === 'Recycle' && <Recycle className="w-4 h-4" />}
                      {cred.iconName === 'CheckCircle2' && <CheckCircle2 className="w-4 h-4" />}
                      {cred.iconName === 'Leaf' && <Leaf className="w-4 h-4" />}
                    </span>
                    <Badge variant="green" size="sm">
                      {cred.badge}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-charcoal-900 text-sm">{cred.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{cred.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES WE SERVE PREVIEW */}
      <section className="py-16 sm:py-24 bg-kraft-100/40 border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeading
              pill="Commercial Applications"
              title="Industries We Serve"
              subtitle="Built for Everyday Business Applications across diverse hospitality and food service environments."
            />
            <Button
              variant="outline"
              size="md"
              to="/industries"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="self-start md:self-auto flex-shrink-0"
            >
              Explore All Industries
            </Button>
          </div>

          <div ref={industriesRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industriesData.map((ind) => (
              <Link
                key={ind.id}
                to="/industries"
                className="gsap-stagger-item bg-white p-4 sm:p-5 rounded-xl border border-charcoal-200/80 hover:border-brand-500 hover:shadow-soft transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <Building2 className="w-5 h-5 text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm sm:text-base text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">
                    {ind.shortDesc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-charcoal-100 flex items-center text-xs font-semibold text-brand-600">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOM MANUFACTURING CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-kraft-100 via-kraft-50 to-brand-50/40 rounded-3xl p-8 sm:p-12 border border-kraft-300/80 shadow-soft">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Custom Paper Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-900">
                Need a Paper Product for Your Business?
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                From standard food-service products to customized paper solutions, ALFA PAPER PRODUCTS can support a variety of business requirements. Talk to us about your required product type, dimensions, application and quantity.
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  to="/custom-solutions"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss Your Requirement
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  onClick={() => onOpenQuoteModal('Customized Paper Product')}
                >
                  Request Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CLOSING CTA BANNER */}
      <section className="py-16 sm:py-24 bg-[#182319] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/80 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-700/50">
            Partner With ALFA
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Make the Shift Towards Sustainable Packaging
          </h2>
          <p className="text-base sm:text-lg text-charcoal-300 leading-relaxed max-w-2xl mx-auto">
            Partner with a manufacturer backed by decades of experience in paper products.
          </p>
          <div className="pt-2">
            <p className="text-xs sm:text-sm font-semibold text-brand-400 uppercase tracking-widest mb-6">
              Since 1985 – Manufacturing Sustainable Alternatives for a Better Tomorrow.
            </p>
            <Button
              variant="primary"
              size="lg"
              to="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
