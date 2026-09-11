import React from 'react';
import { ArrowRight, CheckCircle2, Building2, Utensils, Coffee, Cake, Users, Hotel, Truck, Calendar, Landmark, ShoppingBag } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { industriesData } from '../data/industries';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface IndustriesProps {
  onOpenQuoteModal: (industryName?: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onOpenQuoteModal }) => {
  const cardsRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1, y: 20 });

  const industryIcons: Record<string, React.ReactNode> = {
    'restaurants-cafes': <Coffee className="w-5 h-5 text-brand-600" />,
    bakeries: <Cake className="w-5 h-5 text-brand-600" />,
    catering: <Users className="w-5 h-5 text-brand-600" />,
    hospitality: <Hotel className="w-5 h-5 text-brand-600" />,
    'takeaway-delivery': <Truck className="w-5 h-5 text-brand-600" />,
    'events-functions': <Calendar className="w-5 h-5 text-brand-600" />,
    institutional: <Landmark className="w-5 h-5 text-brand-600" />,
    'retail-distribution': <ShoppingBag className="w-5 h-5 text-brand-600" />,
  };

  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="Paper Solutions for Multiple Industries | ALFA PAPER PRODUCTS"
        description="Reliable food-grade, plastic-free paper tableware for restaurants, bakeries, catering, hotels, takeaway, events, institutional kitchens, and distributors."
        canonicalUrl="https://alfapaperproducts.com/industries"
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Industries We Serve' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Commercial Sectors
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Paper Solutions for Multiple Industries
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              Supporting businesses that require practical, hygienic and sustainable disposable products.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Detailed Cards */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industriesData.map((ind) => (
              <div
                key={ind.id}
                className="gsap-stagger-item bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between hover:border-brand-500/50"
              >
                <div>
                  <div className="aspect-[16/9] bg-kraft-100 overflow-hidden relative">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-xs">
                      {industryIcons[ind.id] || <Building2 className="w-5 h-5 text-brand-600" />}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl font-bold text-charcoal-900">{ind.name}</h3>
                    <p className="text-sm text-charcoal-600 leading-relaxed font-medium">
                      {ind.shortDesc}
                    </p>
                    <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                      {ind.detailedDesc}
                    </p>

                    {/* Key Recommended Products */}
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 block mb-2">
                        Common Products Supplied:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.keyProducts.map((p, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-kraft-50 border border-kraft-200 text-charcoal-700"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-charcoal-100 mt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenQuoteModal(ind.name)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enquire for {ind.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Supply & Distribution Callout */}
      <section className="py-16 bg-kraft-50/70 border-t border-charcoal-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900">
            Distributor and Institutional Contract Supplies
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Are you a regional food-service distributor or hospital/campus procurement officer? We provide guaranteed monthly production allotments, scheduled deliveries, and wholesale terms.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="lg" to="/contact">
              Connect With Institutional Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
