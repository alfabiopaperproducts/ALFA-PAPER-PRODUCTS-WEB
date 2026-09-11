import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { productCategories } from '../../data/products';
import logoImg from '../../assets/logo.png';

interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Products',
      href: '/products',
      hasDropdown: true,
    },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Quality', href: '/quality' },
    { label: 'Custom Solutions', href: '/custom-solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-charcoal-100 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-charcoal-100/50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Exact Company Logo - Just the ALFA Logo */}
            <Link to="/" className="flex items-center focus:outline-none flex-shrink-0" aria-label="ALFA Home">
              <img
                src={logoImg}
                alt="ALFA"
                className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop Navigation - Single Line Guaranteed with whitespace-nowrap */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <Link
                        to={link.href}
                        className={`whitespace-nowrap inline-flex items-center gap-1 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                          isActive(link.href)
                            ? 'text-brand-600 bg-brand-50/70 font-semibold'
                            : 'text-charcoal-700 hover:text-brand-600 hover:bg-kraft-50'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            productsDropdownOpen ? 'rotate-180 text-brand-600' : 'text-charcoal-400'
                          }`}
                        />
                      </Link>

                      {/* Dropdown Menu */}
                      {productsDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 pt-2 z-50">
                          <div className="bg-white rounded-xl shadow-premium border border-charcoal-100 p-2.5 space-y-1">
                            <div className="px-3 py-1.5 border-b border-charcoal-100 mb-1 flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                                Product Categories
                              </span>
                              <Link
                                to="/products"
                                className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-0.5"
                              >
                                All Products <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                            {productCategories.map((cat) => (
                              <Link
                                key={cat.slug}
                                to={`/products/${cat.slug}`}
                                className="flex flex-col px-3 py-2 rounded-lg hover:bg-brand-50/60 transition-colors group"
                              >
                                <span className="text-sm font-semibold text-charcoal-800 group-hover:text-brand-600">
                                  {cat.name}
                                </span>
                                <span className="text-xs text-charcoal-500 line-clamp-1">
                                  {cat.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`whitespace-nowrap px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                      isActive(link.href)
                        ? 'text-brand-600 bg-brand-50/70 font-semibold'
                        : 'text-charcoal-700 hover:text-brand-600 hover:bg-kraft-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action: Single Line Button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Button
                variant="primary"
                size="sm"
                to={onOpenQuoteModal ? undefined : '/contact'}
                onClick={onOpenQuoteModal}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="whitespace-nowrap text-xs xl:text-sm px-3.5 xl:px-4 py-2"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Actions - Protected from overlapping */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden flex-shrink-0">
              <Button
                variant="primary"
                size="sm"
                to={onOpenQuoteModal ? undefined : '/contact'}
                onClick={onOpenQuoteModal}
                className="text-xs px-2.5 sm:px-3 py-1.5 whitespace-nowrap"
              >
                Quote
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-100/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col justify-between overflow-y-auto p-6 animate-in slide-in-from-right duration-200" data-lenis-prevent>
            <div className="space-y-1">
              <div className="pb-3 mb-2 border-b border-charcoal-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                  Navigation
                </span>
                <span className="text-xs font-medium text-brand-600">Est. 1985</span>
              </div>

              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      isActive(link.href)
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-charcoal-800 hover:bg-kraft-50'
                    }`}
                  >
                    {link.label}
                  </Link>

                  {/* Mobile Sub-categories for Products */}
                  {link.hasDropdown && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-kraft-50/50 rounded-lg mt-1 mb-2">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/products/${cat.slug}`}
                          className="block py-1.5 px-2 text-sm text-charcoal-600 hover:text-brand-600 font-medium"
                        >
                          • {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-charcoal-100 space-y-3">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                to="/contact"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get a Quote
              </Button>
              <div className="text-center text-xs text-charcoal-500 space-y-1">
                <p>ALFA PAPER PRODUCTS • Tirur, Kerala</p>
                <p>+91 494 2586155 | +91 9895667040</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
