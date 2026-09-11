import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Award } from 'lucide-react';
import { productCategories } from '../../data/products';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121b14] text-white border-t border-brand-900/40 relative overflow-hidden">
      {/* Subtle background ambient graphic */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-brand-700/5 blur-3xl pointer-events-none" />

      {/* Trust & Heritage Banner */}
      <div className="border-b border-charcoal-800/80 bg-charcoal-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold text-sm">
                1985
              </span>
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Since 1985 – Manufacturing Sustainable Alternatives for a Better Tomorrow.
                </p>
                <p className="text-xs text-charcoal-400">
                  Four decades of trusted paper packaging manufacturing in Kerala, India.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-charcoal-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-800/80 border border-charcoal-700">
                <Award className="w-3.5 h-3.5 text-brand-400" />
                CIPET Tested
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-800/80 border border-charcoal-700">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                CPCB Approved & EPR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center bg-white px-3.5 py-2 rounded-xl" aria-label="ALFA Home">
              <img
                src={logoImg}
                alt="ALFA"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-charcoal-300 leading-relaxed">
              Committed to a Cleaner, Greener Future. Manufacturing food-grade, biodegradable, compostable and plastic-free paper solutions for commercial food service, bakery, and hospitality.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-400 mb-2">
                Certified Manufacturing
              </div>
              <p className="text-xs text-charcoal-400 leading-relaxed">
                CIPET Kochi Compostability Tested • CPCB Approved • EPR Registered • 100% Food-Grade Board
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-500 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Sustainability', href: '/sustainability' },
                { label: 'Quality & Compliance', href: '/quality' },
                { label: 'Custom Solutions', href: '/custom-solutions' },
                { label: 'Industries We Serve', href: '/industries' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-charcoal-300 hover:text-brand-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-xs text-charcoal-600 group-hover:text-brand-400">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-500 pl-2.5">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="text-charcoal-300 hover:text-brand-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-xs text-charcoal-600 group-hover:text-brand-400">›</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Factory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-brand-500 pl-2.5">
              Manufacturing Unit
            </h3>
            <div className="space-y-3.5 text-sm text-charcoal-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <address className="not-italic text-xs sm:text-sm leading-relaxed text-charcoal-300">
                  <strong className="text-white block font-medium">ALFA PAPER PRODUCTS</strong>
                  Vailathur, Athanikkal<br />
                  Tirur – 676106<br />
                  Kerala, India
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm space-y-0.5">
                  <a href="tel:+914942586155" className="hover:text-brand-400 block transition-colors">
                    +91 494 2586155
                  </a>
                  <a href="tel:+919895667040" className="hover:text-brand-400 block transition-colors">
                    +91 9895667040
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a
                  href="mailto:alfabiopaperproducts@gmail.com"
                  className="text-xs sm:text-sm hover:text-brand-400 transition-colors break-all"
                >
                  alfabiopaperproducts@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 uppercase tracking-wider group"
              >
                Send Direct Enquiry <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p>
            © {new Date().getFullYear()} ALFA PAPER PRODUCTS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-charcoal-500">Established 1985 • Tirur, Kerala</span>
            <Link to="/quality" className="hover:text-white transition-colors">
              CPCB Compliance
            </Link>
            <Link to="/sustainability" className="hover:text-white transition-colors">
              EPR Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
