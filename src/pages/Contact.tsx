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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight">
              Let's Build a More Sustainable Future Together
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 font-medium">
              For product enquiries, bulk orders or customized requirements, connect with ALFA PAPER PRODUCTS.
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
                  Located in Malappuram district, Kerala, our modern manufacturing facility supplies hypermarket chains, retail supermarkets, hotel networks, and institutional caterers across South India and export markets.
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
                href="https://maps.app.goo.gl/RzLrnoaQFw6WdXr39"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded interactive Google Map */}
            <div className="relative rounded-xl overflow-hidden border border-charcoal-200 aspect-[16/9] sm:aspect-[21/9] min-h-[360px] sm:min-h-[420px] bg-charcoal-100 shadow-inner">
              <iframe
                title="ALFA PAPER PRODUCTS Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8653245465546!2d75.9367608!3d10.9556716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b24e16fe2c4f%3A0x4ad81e415a4bdc91!2sALFA%20PAPER%20PRODUCTS!5e0!3m2!1sen!2sin!4v1728300000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
