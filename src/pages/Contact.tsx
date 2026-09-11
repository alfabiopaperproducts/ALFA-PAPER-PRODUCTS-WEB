import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { generateOrganizationSchema } from '../utils/seo';

export const Contact: React.FC = () => {
  return (
    <div className="pt-24 lg:pt-28">
      <SeoHead
        title="Contact ALFA PAPER PRODUCTS | Paper Products Manufacturer in Tirur, Kerala"
        description="Get in touch with ALFA PAPER PRODUCTS for paper plates, cups, trays, and customized packaging. Located at Vailathur, Athanikkal, Tirur, Kerala. Phone: +91 494 2586155."
        canonicalUrl="https://alfapaperproducts.com/contact"
        schema={generateOrganizationSchema()}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-kraft-100/60 via-kraft-50/40 to-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Let's Build a More Sustainable Future Together
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              For product enquiries, bulk orders, customized requirements or business partnerships, connect with ALFA PAPER PRODUCTS.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900">
                  Manufacturing Facility & Sales Office
                </h2>
                <p className="text-sm text-charcoal-600 mt-2 leading-relaxed">
                  Established in 1985 in Malappuram district, Kerala. We serve commercial buyers, hotel chains, caterers, and wholesalers across South India and beyond.
                </p>
              </div>

              {/* Contact Card Details */}
              <div className="space-y-6 text-sm text-charcoal-700 bg-kraft-50/60 p-6 sm:p-8 rounded-2xl border border-charcoal-200/80">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-900">Factory Address</h3>
                    <address className="not-italic text-charcoal-600 mt-1 leading-relaxed">
                      <strong className="text-charcoal-900 block font-semibold">
                        ALFA PAPER PRODUCTS
                      </strong>
                      Vailathur, Athanikkal<br />
                      Tirur – 676106<br />
                      Kerala, India
                    </address>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4 pt-2 border-t border-charcoal-200/60">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-900">Phone & Mobile</h3>
                    <div className="mt-1 space-y-1">
                      <p>
                        Office:{' '}
                        <a href="tel:+914942586155" className="text-brand-600 hover:underline font-medium">
                          +91 494 2586155
                        </a>
                      </p>
                      <p>
                        Sales Desk:{' '}
                        <a href="tel:+919895667040" className="text-brand-600 hover:underline font-medium">
                          +91 9895667040
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pt-2 border-t border-charcoal-200/60">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-900">Email Address</h3>
                    <p className="mt-1">
                      <a
                        href="mailto:alfabiopaperproducts@gmail.com"
                        className="text-brand-600 hover:underline font-medium break-all"
                      >
                        alfabiopaperproducts@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-charcoal-200/60">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-900">Operating Hours</h3>
                    <p className="mt-1 text-charcoal-600">
                      Monday – Saturday: 9:00 AM – 6:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Card */}
              <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Prefer WhatsApp?</p>
                    <p className="text-[11px] text-charcoal-600">Get quick catalogue and dispatch updates</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919895667040?text=Hello%20ALFA%20Team%2C%20I%20would%20like%20to%20enquire%20about%20your%20paper%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Right Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <EnquiryForm
                sourcePage="contact_page"
                title="Send Commercial Enquiry"
                subtitle="Fill out the form below and our sales representatives will respond with pricing, samples, or production timelines."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location & Map Preview Section */}
      <section className="py-12 bg-kraft-50/60 border-t border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-charcoal-200 bg-white p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-charcoal-900 text-base sm:text-lg">
                  Factory Location: Tirur, Kerala
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500">
                  Conveniently situated near Vailathur, Athanikkal with seamless highway and freight connectivity across Kerala and neighboring states.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Vailathur+Athanikkal+Tirur+Kerala+676106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Clean stylized map preview frame */}
            <div className="relative rounded-xl overflow-hidden aspect-[21/9] bg-kraft-100 border border-charcoal-200 flex items-center justify-center text-center p-6">
              <div className="max-w-md space-y-2">
                <MapPin className="w-8 h-8 text-brand-600 mx-auto animate-bounce" />
                <p className="font-bold text-charcoal-800 text-sm sm:text-base">
                  ALFA PAPER PRODUCTS
                </p>
                <p className="text-xs text-charcoal-500">
                  Vailathur, Athanikkal, Tirur – 676106, Malappuram District, Kerala, India
                </p>
                <a
                  href="https://maps.google.com/?q=Vailathur+Athanikkal+Tirur+Kerala+676106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
