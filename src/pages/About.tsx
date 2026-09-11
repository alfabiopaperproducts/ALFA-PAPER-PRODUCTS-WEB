import React from 'react';
import { ArrowRight, Award, CheckCircle2, ShieldCheck, Leaf, Compass, Target, Clock, Factory } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
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
        title="About ALFA PAPER PRODUCTS | Sustainable Paper Manufacturer Since 1985"
        description="Learn about ALFA PAPER PRODUCTS, established in 1985 in Tirur, Kerala. Over four decades of manufacturing food-grade, biodegradable, and compostable paper packaging."
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold uppercase tracking-wider">
              Est. 1985 • Tirur, Kerala
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
              More Than Four Decades of Paper Product Manufacturing
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Established in 1985. Built around quality, responsibility and sustainable progress.
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
                pill="Our Heritage"
                title="ALFA PAPER PRODUCTS Story"
                subtitle="From our founding in 1985 to modern sustainable manufacturing."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
                <p>
                  Established in 1985, ALFA PAPER PRODUCTS is a manufacturer of eco-friendly and sustainable paper products based in Kerala, India.
                </p>
                <p>
                  With decades of experience in the paper products industry, we manufacture practical paper-based solutions for food service, bakery, catering, hospitality and related applications.
                </p>
                <p>
                  As businesses and consumers increasingly move away from conventional single-use plastics, we remain committed to developing reliable alternatives made with environmental responsibility in mind.
                </p>
                <p>
                  Today, our product portfolio includes paper plates, paper cups, paper trays, burger boxes, bakery boxes, food packaging products and customized paper solutions.
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
                  alt="ALFA Paper Products Heritage"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Trusted Since 1985
                  </span>
                  <p className="text-base font-bold text-white mt-0.5">
                    Vailathur, Athanikkal, Tirur – Kerala
                  </p>
                </div>
              </div>

              <div className="bg-kraft-50/70 p-6 rounded-2xl border border-charcoal-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  <h4 className="font-bold text-sm text-charcoal-900">40+ Years of Reliability</h4>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Decades of manufacturing know-how, ensuring every batch meets the highest benchmarks for hygiene, dimensional accuracy, and food-grade safety.
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
            pill="Core Direction"
            title="Our Purpose, Mission & Vision"
            subtitle="Driving the transition away from single-use plastics through responsible manufacturing."
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
                <h3 className="text-xl font-bold text-charcoal-900">Responsible Products for a Changing World</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  The environmental impact caused by single-use plastics has created a growing need for better alternatives. ALFA PAPER PRODUCTS exists to support that transition. We manufacture biodegradable, compostable and plastic-free paper products that help businesses meet everyday operational requirements while reducing dependence on conventional plastic disposables.
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
                <h3 className="text-xl font-bold text-charcoal-900">Replacing Single-Use Plastics with Responsible Alternatives</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our mission is to replace conventional single-use plastics with sustainable, biodegradable and compostable paper products. We believe environmental protection and business growth can progress together. Through continuous product development and responsible manufacturing, we aim to provide businesses with practical paper-based solutions for a cleaner future.
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
                <h3 className="text-xl font-bold text-charcoal-900">Building a More Sustainable Future</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our vision is to become a trusted manufacturer of sustainable paper products and contribute actively to India's transition toward a plastic-free and environmentally responsible future.
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
            pill="Core Values"
            title="What Defines ALFA"
            subtitle="The foundational principles that guide every product we create."
            className="mb-14"
          />

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Experience',
                desc: 'Manufacturing paper products since 1985.',
                icon: <Clock className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Quality',
                desc: 'Focus on functional, food-grade products for commercial applications.',
                icon: <Award className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Responsibility',
                desc: 'Products developed with environmental impact in mind.',
                icon: <ShieldCheck className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Reliability',
                desc: 'Manufacturing solutions suitable for businesses across multiple sectors.',
                icon: <Factory className="w-5 h-5 text-brand-600" />,
              },
              {
                title: 'Sustainability',
                desc: 'Supporting the transition away from conventional single-use plastics.',
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

      {/* CTA Strip */}
      <section className="py-16 bg-[#162118] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Partner with ALFA PAPER PRODUCTS?</h2>
          <p className="text-charcoal-300 text-sm sm:text-base max-w-xl mx-auto">
            Contact our sales and production team in Tirur, Kerala to discuss standard or custom paper requirements.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="lg" to="/contact">
              Connect With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
