import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Leaf, ShieldBan, Utensils, Award } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { productsData } from '../data/products';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface ProductsProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const listRef = useGsapReveal<HTMLDivElement>({ stagger: 0.12, y: 25 });

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="Eco-Friendly Paper Products | Plates, Cups, Trays & Food Packaging | ALFA"
        description="Explore ALFA PAPER PRODUCTS range of biodegradable, compostable, food-grade paper plates, cups, trays, burger boxes, bakery packaging, and custom paper solutions."
        canonicalUrl="https://alfapaperproducts.com/products"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Products' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Commercial Paper Packaging Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Sustainable Paper Products for Everyday Applications
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Explore our range of practical paper-based products manufactured for food service, bakery, catering, hospitality and other commercial requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction & Highlights */}
      <section className="py-12 bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-kraft-50/70 rounded-2xl p-6 sm:p-8 border border-charcoal-200/80">
            <h2 className="text-lg font-bold text-charcoal-900 mb-2">Our Product Philosophy</h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-4xl">
              Our product portfolio combines usability, food safety and environmental responsibility. Depending on the application, our paper products are designed to offer features including biodegradability, compostability, recyclability, oil resistance, grease resistance and plastic-free construction.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-charcoal-200/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <Utensils className="w-4 h-4 text-brand-600" />
                <span>100% Food-Grade Board</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <ShieldBan className="w-4 h-4 text-brand-600" />
                <span>Plastic-Free Options</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <Leaf className="w-4 h-4 text-brand-600" />
                <span>Biodegradable & Compostable</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800">
                <Award className="w-4 h-4 text-brand-600" />
                <span>CIPET Kochi Tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Detailed Cards */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={listRef} className="space-y-12 sm:space-y-16">
            {productsData.map((prod, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={prod.id}
                  className={`gsap-stagger-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl border border-charcoal-200/80 hover:border-brand-500/50 hover:shadow-premium transition-all duration-300 bg-white ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#fbfbf9] p-6 flex items-center justify-center border border-charcoal-100 group">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="green" size="sm">
                          {prod.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content Column (7 cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                        Category 0{prod.sort_order}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
                      {prod.name}
                    </h3>

                    <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Suitable For Chips */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                        Suitable For:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.applications.map((app, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-kraft-50 border border-kraft-200 text-charcoal-700"
                          >
                            <CheckCircle2 className="w-3 h-3 text-brand-600 flex-shrink-0" />
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        to={`/products/${prod.slug}`}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        View {prod.name}
                      </Button>
                      <Button
                        variant="white"
                        size="md"
                        onClick={() => onOpenQuoteModal(prod.name)}
                      >
                        Enquire Bulk Order
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Products Banner */}
      <section className="py-16 bg-kraft-100/50 border-t border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
              Need a Custom Paper Size or Format?
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600">
              We engineer custom paper products based on your specific food-service dimensions, volume requirements, and functional challenges.
            </p>
            <div className="pt-2">
              <Button variant="primary" size="lg" to="/custom-solutions">
                Request a Custom Solution
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
