import React from 'react';
import { Settings, Sliders, CheckCircle2, ArrowRight, MessageSquare, Layers, Box, Cpu } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface CustomSolutionsProps {
  onOpenQuoteModal: () => void;
}

export const CustomSolutions: React.FC<CustomSolutionsProps> = ({ onOpenQuoteModal }) => {
  const stepsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, y: 20 });
  const optionsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.08, y: 15 });

  const customizableOptions = [
    { title: 'Product Dimensions', desc: 'Length, width, depth, diameter, and edge curvature customized to fit your contents perfectly.' },
    { title: 'Custom Shape & Die-cuts', desc: 'Unique locking tabs, ventilation ports, partitions, and ergonomic opening profiles.' },
    { title: 'Paperboard Specification', desc: 'Targeted GSM, caliper thickness, kraft vs. bleached virgin food-grade boards.' },
    { title: 'Food-Service Application', desc: 'Engineered grease, oil, and moisture barriers tailored to dry, wet, or hot foods.' },
    { title: 'Packaging Format', desc: 'Pre-erected or flat-packed for optimized storage and fast kitchen assembly.' },
    { title: 'Bulk Manufacturing Volumes', desc: 'Scaled production capacity for high-volume enterprise chains and seasonal surges.' },
    { title: 'Business-Specific Solutions', desc: 'Customized configurations for bakeries, cloud kitchens, meal kits, and hospitality.' },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Share Your Requirement',
      desc: 'Tell us what type of paper product you require, your target dimensions, and intended application.',
    },
    {
      num: '02',
      title: 'Product Evaluation',
      desc: 'Our manufacturing engineering team evaluates material specifications, food safety, and production feasibility.',
    },
    {
      num: '03',
      title: 'Product Development',
      desc: 'The appropriate dimensions, board GSM, barrier properties, and product die-lines are finalized.',
    },
    {
      num: '04',
      title: 'Commercial Production',
      desc: 'Products are manufactured according to the confirmed specifications, quality inspections, and agreed delivery schedules.',
    },
  ];

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="Custom Paper Product Manufacturer in Kerala | ALFA PAPER PRODUCTS"
        description="Bespoke paper packaging engineered to your exact dimensions, GSM, and food-service application. Decades of manufacturing expertise in Tirur, Kerala."
        canonicalUrl="https://alfapaperproducts.com/custom-solutions"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Custom Solutions' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Custom Engineering & Tooling
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Paper Products Designed Around Your Requirement
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Need a customized product for your business? ALFA PAPER PRODUCTS can develop paper-based products based on specific application, dimension and volume requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Manufacturing Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <SectionHeading
                pill="Tailored Engineering"
                title="Custom Manufacturing"
                subtitle="Every business has different packaging and food-service needs."
              />

              <div className="space-y-4 text-sm sm:text-base text-charcoal-600 leading-relaxed">
                <p>
                  Whether you require a specific product size, format or application-based solution, our team can work with you to identify an appropriate paper product.
                </p>
                <p>
                  Custom solutions can be developed depending on manufacturing feasibility, material requirements and order quantity.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    const el = document.getElementById('custom-form-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request a Custom Product
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-kraft-50 p-8 rounded-3xl border border-charcoal-200 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-charcoal-900">Custom Tooling Capability</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Backed by 40+ years of tooling and manufacturing experience, we assist food brands in moving from conceptual sketches to finished production lines with minimal turnaround.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Can Be Customized */}
      <section className="py-16 sm:py-24 bg-kraft-50/50 border-y border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Customization Parameters"
            title="What Can Be Customized?"
            subtitle="Explore the flexible variables we configure to match your commercial and technical specifications."
            className="mb-14"
          />

          <div ref={optionsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customizableOptions.map((opt, idx) => (
              <div
                key={idx}
                className="gsap-stagger-item bg-white p-6 rounded-2xl border border-charcoal-200/80 shadow-soft hover:border-brand-500/50 transition-all space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-charcoal-900">{opt.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 4 Steps */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            pill="Development Workflow"
            title="How It Works"
            subtitle="A structured 4-step collaborative process from initial brief to high-volume production."
            className="mb-14"
          />

          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="gsap-stagger-item relative bg-kraft-50/40 p-6 sm:p-8 rounded-2xl border border-charcoal-200/80 hover:border-brand-500/50 transition-all space-y-4"
              >
                <span className="text-3xl font-extrabold text-brand-500 block">
                  {step.num}.
                </span>
                <h3 className="text-lg font-bold text-charcoal-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Requirement Form Section */}
      <section id="custom-form-section" className="py-16 sm:py-24 bg-kraft-100/50 border-t border-charcoal-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Direct Production Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
              Have a Custom Requirement?
            </h2>
            <p className="text-sm text-charcoal-600">
              Share your product requirement with our team. We evaluate dimensions, feasibility and quote bulk pricing.
            </p>
          </div>

          <EnquiryForm
            defaultProduct="Customized Paper Product"
            sourcePage="custom_solutions"
            title="Submit Custom Specification"
            subtitle="Provide details regarding target dimensions, desired food application, and monthly quantity requirements."
          />
        </div>
      </section>
    </div>
  );
};
