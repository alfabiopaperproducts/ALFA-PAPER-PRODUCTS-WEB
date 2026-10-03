import React from 'react';
import { majorClientsData } from '../../data/clients';
import { SectionHeading } from './SectionHeading';

interface ClientShowcaseProps {
  showHeading?: boolean;
  className?: string;
  pill?: string;
  title?: string;
  subtitle?: string;
}

export const ClientShowcase: React.FC<ClientShowcaseProps> = ({
  showHeading = true,
  className = '',
  pill = 'Trusted by Industry Leaders',
  title = 'Supplying Leading Hypermarkets & Supermarkets',
  subtitle = 'Premier retail and supermarket networks count on ALFA PAPER PRODUCTS for certified food-safe, compostable, and plastic-free packaging.',
}) => {
  return (
    <section className={`py-14 sm:py-20 bg-white border-y border-charcoal-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            align="center"
            pill={pill}
            title={title}
            subtitle={subtitle}
            className="mb-10 sm:mb-12"
          />
        )}

        {/* Major Clients Grid - Pure Logos Only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {majorClientsData.map((client) => (
            <div
              key={client.id}
              className="group relative flex items-center justify-center p-3 sm:p-4 h-26 sm:h-32 rounded-2xl bg-white border border-charcoal-200/80 shadow-xs hover:shadow-md hover:border-brand-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              title={client.name}
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Logo Image */}
              <div className="w-full h-full max-w-[170px] sm:max-w-[210px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* Screen reader only text for accessibility & SEO */}
              <span className="sr-only">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Secondary continuous marquee strip for a dynamic feel */}
        <div className="mt-8 pt-6 border-t border-charcoal-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-charcoal-500 uppercase tracking-wider text-center">
          <span>15+ Major Supermarket Chains</span>
          <span className="hidden sm:inline text-charcoal-300">•</span>
          <span>Pan-South India & GCC Distribution</span>
          <span className="hidden sm:inline text-charcoal-300">•</span>
          <span>100% Certified Food-Grade Quality</span>
        </div>
      </div>
    </section>
  );
};
