import React from 'react';
import { ShieldCheck, Award, Recycle, CheckCircle2, Leaf, ArrowRight, FileCheck, Check } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { certificationsData, qualityPriorities } from '../data/certifications';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface QualityProps {
  onOpenQuoteModal: () => void;
}

export const QualityCompliance: React.FC<QualityProps> = ({ onOpenQuoteModal }) => {
  const credsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, y: 20 });
  const prioritiesRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, y: 15 });

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="CPCB Approved & Compostability Tested Paper Products | ALFA"
        description="Learn about ALFA PAPER PRODUCTS quality and regulatory compliance: CIPET Kochi compostability testing, CPCB approval, EPR registration, and food-grade standards."
        canonicalUrl="https://alfapaperproducts.com/quality"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Quality & Compliance' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Regulatory Standards & Rigor
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Quality, Safety & Environmental Responsibility
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Manufacturing paper products backed by responsible materials, testing and regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach to Quality */}
      <section className="py-16 sm:py-20 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <SectionHeading
              pill="Our Approach"
              title="Our Approach to Quality"
              subtitle="Quality is fundamental to every product we manufacture."
            />

            <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
              <p>
                Our paper products are developed for real-world food-service and commercial applications where usability, durability, hygiene and material quality matter.
              </p>
              <p>
                We use food-grade paperboard and manufacture products designed according to their intended functional requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Credentials Grid */}
      <section className="py-16 sm:py-24 bg-kraft-50/50 border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Verified Standards"
            title="Certifications & Credentials"
            subtitle="Verified testing and active national statutory compliance."
            className="mb-14"
          />

          <div ref={credsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificationsData.map((cred) => (
              <div
                key={cred.id}
                className="gsap-stagger-item bg-white p-6 sm:p-8 rounded-2xl border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
                      {cred.iconName === 'Award' && <Award className="w-5 h-5" />}
                      {cred.iconName === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                      {cred.iconName === 'Recycle' && <Recycle className="w-5 h-5" />}
                      {cred.iconName === 'CheckCircle2' && <CheckCircle2 className="w-5 h-5" />}
                      {cred.iconName === 'Leaf' && <Leaf className="w-5 h-5" />}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-kraft-100 text-charcoal-800">
                      {cred.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal-900">{cred.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{cred.description}</p>
                </div>

                <div className="pt-3 border-t border-charcoal-100 text-xs font-medium text-brand-600 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{cred.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Quality Priorities */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Quality Priorities"
            title="Our Quality Priorities"
            subtitle="7 foundational pillars embedded in our daily production process."
            className="mb-14"
          />

          <div ref={prioritiesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {qualityPriorities.map((item, idx) => (
              <div
                key={idx}
                className="gsap-stagger-item p-6 rounded-2xl bg-kraft-50/40 border border-charcoal-200/80 hover:border-brand-500/50 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold border border-brand-200">
                    <Check className="w-3 h-3" />
                  </span>
                  <h3 className="font-bold text-base text-charcoal-900">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-brand-50/60 border border-brand-200">
              <p className="text-sm font-semibold text-charcoal-800">
                Need compliance documentation or technical specifications for institutional tenders?
              </p>
              <Button variant="primary" size="sm" onClick={onOpenQuoteModal}>
                Request Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
