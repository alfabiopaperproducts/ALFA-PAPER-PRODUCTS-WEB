import React from 'react';
import { Leaf, Recycle, ShieldBan, RefreshCw, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface SustainabilityProps {
  onOpenQuoteModal: () => void;
}

export const Sustainability: React.FC<SustainabilityProps> = ({ onOpenQuoteModal }) => {
  const principlesRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, y: 20 });

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="Biodegradable & Compostable Paper Products | ALFA PAPER PRODUCTS"
        description="Learn about our environmental commitment: CIPET tested compostability, biodegradable food packaging, and 100% plastic-free alternatives to single-use plastics."
        canonicalUrl="https://alfapaperproducts.com/sustainability"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Sustainability' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-brand-50/50 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Environmental Responsibility
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Sustainability Is at the Heart of What We Manufacture
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Creating better alternatives to conventional single-use plastic products.
            </p>
          </div>
        </div>
      </section>

      {/* Our Responsibility */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <SectionHeading
                pill="Our Responsibility"
                title="Supporting the Transition Away from Plastic"
                subtitle="Why modern food service packaging requires a conscious shift."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
                <p>
                  Single-use plastics provide convenience, but their long-term environmental impact has become a major global challenge.
                </p>
                <p>
                  Businesses across food service, hospitality, retail and catering are increasingly searching for responsible alternatives.
                </p>
                <p>
                  ALFA PAPER PRODUCTS supports this transition through the manufacture of biodegradable, compostable and plastic-free paper products.
                </p>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" to="/products" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Sustainable Products
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-kraft-50 p-8 rounded-3xl border border-charcoal-200 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-charcoal-900">
                  Tested for Compostability at CIPET
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Our products have undergone compostability testing at the Central Institute of Petrochemicals Engineering & Technology (CIPET), Kochi, reinforcing our commitment to developing environmentally responsible paper solutions.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                    <Award className="w-3.5 h-3.5" />
                    CIPET Kochi Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-16 sm:py-24 bg-kraft-50/50 border-y border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Core Principles"
            title="Designed with the Environment in Mind"
            subtitle="Our approach focuses on reducing dependence on conventional disposable plastics while maintaining everyday commercial usability."
            className="mb-14"
          />

          <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Biodegradability',
                desc: 'Products designed to break down naturally under suitable environmental conditions, returning nutrients safely to the soil.',
                icon: <Leaf className="w-6 h-6 text-brand-600" />,
              },
              {
                title: 'Compostability',
                desc: 'Selected products are developed to support compostable disposal methods, aligning with organic waste processing cycles.',
                icon: <Recycle className="w-6 h-6 text-brand-600" />,
              },
              {
                title: 'Plastic-Free Solutions',
                desc: 'We focus on paper-based alternatives that help businesses move away from conventional plastic disposable products completely.',
                icon: <ShieldBan className="w-6 h-6 text-brand-600" />,
              },
              {
                title: 'Recyclability',
                desc: 'Paper materials can contribute to circular material use when appropriate recycling facilities and segregation systems are available.',
                icon: <RefreshCw className="w-6 h-6 text-brand-600" />,
              },
              {
                title: 'Responsible Material Selection',
                desc: 'Food-grade paperboard is used to meet functional requirements while maintaining strict product safety and zero chemical leakage.',
                icon: <CheckCircle2 className="w-6 h-6 text-brand-600" />,
              },
              {
                title: 'Tested for Compostability',
                desc: 'Our products have undergone compostability testing at CIPET, Kochi, reinforcing our commitment to verified environmental stewardship.',
                icon: <Award className="w-6 h-6 text-brand-600" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="gsap-stagger-item bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center border border-brand-100">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal-900">{item.title}</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helping Businesses Make a Better Choice */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SectionHeading
            align="center"
            pill="Business Impact"
            title="Helping Businesses Make a Better Choice"
            subtitle="Every transition away from unnecessary plastic contributes to a larger environmental goal."
          />

          <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
            Whether you operate a restaurant, bakery, catering company, hotel, takeaway business or food-service organization, ALFA PAPER PRODUCTS can help you adopt practical paper-based alternatives.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" to="/products" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Sustainable Products
            </Button>
            <Button variant="outline" size="lg" onClick={onOpenQuoteModal}>
              Discuss Transition Plan
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
