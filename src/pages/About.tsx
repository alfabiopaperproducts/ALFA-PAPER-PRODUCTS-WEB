import React from 'react';
import { ArrowRight, Award, CheckCircle2, ShieldCheck, Leaf, Compass, Target, Clock, Factory } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ClientShowcase } from '../components/common/ClientShowcase';
import { useGsapReveal } from '../hooks/useGsapReveal';
import heroImg from '../assets/hero-sustainable-paper.jpg';

interface AboutProps {
  onOpenQuoteModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal }) => {
  const storyRef = useGsapReveal<HTMLDivElement>({ y: 25, duration: 0.8 });
  const pillarsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, y: 20 });

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="About ALFA PAPER PRODUCTS | Sustainable Paper Packaging Manufacturer"
        description="Learn about ALFA PAPER PRODUCTS in Tirur, Kerala. Premier manufacturers of food-grade, biodegradable, compostable and plastic-free paper packaging for retail and food service."
        canonicalUrl="https://alfapaperproducts.com/about"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About Us' }]} />
      </div>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 to-white border-b border-charcoal-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
              Pioneering Sustainable Paper Packaging Solutions
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Precision engineering, certified food safety, and environmental stewardship for commercial retail leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                title="The ALFA Story"
                subtitle="From early industrial roots to modern automated sustainable manufacturing."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
                <p>
                  Founded in 1985 in Tirur, Kerala, ALFA PAPER PRODUCTS has evolved from a dedicated paper manufacturing unit into a premier producer of eco-friendly, certified food-grade packaging.
                </p>
                <p>
                  Built on a foundation of precision engineering and statutory compliance, we supply dependable, plastic-free packaging solutions for supermarket chains, food service providers, commercial bakeries, and hospitality networks across India and GCC export markets.
                </p>
                <p>
                  As enterprise brands transition toward circular sustainability, we develop biodegradable and compostable alternatives that match conventional plastics in thermal stability, structural rigidity, and barrier performance.
                </p>
                <p>
                  Our comprehensive product line includes food-grade paper plates, hot and cold beverage cups, compartmental trays, burger and meal boxes, bakery containers, and bespoke commercial packaging solutions.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button
                  variant="primary"
                  size="md"
                  to="/products"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Product Portfolio
                </Button>
                <Button variant="outline" size="md" onClick={onOpenQuoteModal}>
                  Request Commercial Quote
                </Button>
              </div>
            </div>

            {/* Right Visual & Key Milestones (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-charcoal-200/80 shadow-soft bg-kraft-100">
                <img
                  src={heroImg}
                  alt="ALFA Paper Products Manufacturing Facility"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Modern Automated Facility
                  </span>
                  <p className="text-base font-bold text-white mt-0.5">
                    Vailathur, Athanikkal, Tirur – Kerala
                  </p>
                </div>
              </div>

              <div className="bg-kraft-50/70 p-6 rounded-2xl border border-charcoal-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  <h4 className="font-bold text-sm text-charcoal-900">Certified Quality & Precision</h4>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Automated high-speed production ensuring consistent edge geometry, structural stability, and international food contact hygiene standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose, Mission & Vision Section */}
      <section className="py-16 sm:py-24 bg-kraft-50/50 border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            title="Our Mission, Vision & Purpose"
            subtitle="Championing the transition away from single-use plastics through industrial scale and scientific responsibility."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Purpose */}
            <div className="bg-white rounded-2xl p-8 border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Our Purpose</div>
                <h3 className="text-xl font-bold text-charcoal-900">Eliminating Single-Use Plastics</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Single-use plastic pollution requires immediate, industrial-grade alternatives. ALFA PAPER PRODUCTS exists to eliminate non-recyclable plastic disposables by manufacturing 100% biodegradable and compostable paper packaging that matches conventional plastics in durability, barrier resistance, and economic viability.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Our Mission</div>
                <h3 className="text-xl font-bold text-charcoal-900">Engineering Certified Food-Grade Packaging</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our mission is to engineer and manufacture certified food-safe, plastic-free paper products that empower supermarket chains, restaurants, and commercial bakeries to operate sustainably without compromising on functional performance, customer hygiene, or brand presentation.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Our Vision</div>
                <h3 className="text-xl font-bold text-charcoal-900">Setting the Benchmark in Circular Packaging</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our vision is to be South India's foremost sustainable packaging manufacturer and export partner, spearheading the circular economy transition and establishing zero-plastic benchmarks for commercial packaging across national and international markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Defines ALFA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            title="What Defines ALFA"
            subtitle="The foundational principles that guide every batch we manufacture."
            className="mb-14"
          />

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Manufacturing Depth',
                desc: 'Over four decades of specialized paper converting expertise and client trust.',
                icon: <Clock className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Certified Safety',
                desc: '100% virgin food-grade paperboard meeting strict hygiene and non-toxicity benchmarks.',
                icon: <Award className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Compliance Rigor',
                desc: 'Active adherence to statutory environmental directives, certified EPR registration, and verified lab standards.',
                icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Industrial Scale',
                desc: 'High-speed automated machinery delivering consistent supply to major retail chains.',
                icon: <Factory className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Eco Innovation',
                desc: 'Continuous development of plastic-free aqueous and natural barrier solutions.',
                icon: <Leaf className="w-5 h-5 text-brand-600" />,
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="gsap-stagger-item p-6 rounded-2xl bg-kraft-50/40 border border-charcoal-200/80 hover:border-brand-500/50 hover:shadow-soft transition-all text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-white mx-auto flex items-center justify-center shadow-xs border border-charcoal-200/60">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-base text-charcoal-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients Showcase - Logos Only */}
      <ClientShowcase
        title="Trusted by Major Supermarkets & Hypermarkets"
        subtitle="Supplying food-grade, certified sustainable paper packaging to leading retail and hypermarket brands across South India."
      />
    </div>
  );
};
